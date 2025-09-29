
import { logger } from './logger.js';
import { fetchKlines } from './candles.js';
import { computeOrderQty } from './risk.js';
import { placeMarketOrder } from './order.js';
import { config } from '../config.js';
import { Spot } from '@binance/spot';

import * as rsiStrat from '../strategies/rsiMeanReversion.js';
import * as macdStrat from '../strategies/macdTrend.js';

function getStrategy(name) {
  switch (name) {
    case 'macd': return macdStrat;
    case 'rsi':
    default: return rsiStrat;
  }
}

export async function runOnce(client) {
  const strategy = getStrategy(config.strategy);
  logger.info(`[engine] Strategy=${config.strategy.toUpperCase()} symbols=${config.symbols.join(',')} interval=${config.interval}`);

  const exInfo = await client.exchangeInfo();
  const symbolsInfo = exInfo.data.symbols;

  const account = await client.account();
  const balances = Object.fromEntries(account.data.balances.map(b => [b.asset, Number(b.free)]));

  for (const symbol of config.symbols) {
    try {
      const candles = await fetchKlines(client, symbol, config.interval, 500);
      const last = candles[candles.length - 1];
      const price = last.close;

      const signal = strategy.generateSignal(candles);
      logger.info(`[signal] ${symbol} => ${signal.action} (${signal.reason}) price=${price}`);

      const info = symbolsInfo.find(s => s.symbol === symbol);
      if (!info) { logger.warn(`[engine] No exchangeInfo for ${symbol}`); continue; }

      const quoteAsset = info.quoteAsset;
      const quoteFree = Number(balances[quoteAsset] || 0);
      const baseAsset = info.baseAsset;
      const baseFree = Number(balances[baseAsset] || 0);

      if (signal.action === 'BUY' && baseFree === 0) {
        const qty = computeOrderQty({ price, quoteFree, riskPerTradePct: config.riskPerTradePct, symbolInfo: info });
        if (qty > 0) await placeMarketOrder(client, symbol, 'BUY', qty, config.dryRun);
      } else if (signal.action === 'SELL' && baseFree > 0) {
        await placeMarketOrder(client, symbol, 'SELL', baseFree, config.dryRun);
      } else {
        logger.info(`[engine] ${symbol} no trade. baseFree=${baseFree} quoteFree=${quoteFree}`);
      }
    } catch (err) {
      logger.error(`[engine] Error on ${symbol}: ${err.message || err}`);
    }
  }
}
