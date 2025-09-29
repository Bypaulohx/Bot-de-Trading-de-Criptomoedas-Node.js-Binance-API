
import { Spot } from '@binance/spot';
import { createBinanceClient } from './exchange/binanceClient.js';
import { fetchKlinesRange } from './core/candles.js';
import * as rsiStrat from './strategies/rsiMeanReversion.js';
import * as macdStrat from './strategies/macdTrend.js';
import { logger } from './core/logger.js';

function parseArgs() {
  const args = process.argv.slice(2);
  const out = { symbol: 'BTCUSDT', interval: '1h', from: null, to: null, strategy: 'rsi' };
  for (let i = 0; i < args.length; i++) {
    const k = args[i];
    const v = args[i + 1];
    if (k === '--symbol') out.symbol = v;
    if (k === '--interval') out.interval = v;
    if (k === '--from') out.from = v;
    if (k === '--to') out.to = v;
    if (k === '--strategy') out.strategy = v;
  }
  return out;
}

function pickStrategy(name) {
  switch (name) {
    case 'macd': return macdStrat;
    case 'rsi':
    default: return rsiStrat;
  }
}

function parseDate(dateStr) {
  return new Date(dateStr).getTime();
}

export async function run() {
  const { symbol, interval, from, to, strategy } = parseArgs();
  logger.info(`[backtest] ${strategy.toUpperCase()} | ${symbol} ${interval} | ${from} -> ${to}`);
  const client = createBinanceClient();

  const startMs = parseDate(from);
  const endMs = parseDate(to);
  const candles = await fetchKlinesRange(client, symbol, interval, startMs, endMs);
  logger.info(`[backtest] Loaded ${candles.length} candles`);

  const strat = pickStrategy(strategy);
  let position = null;
  let quote = 1000;
  let base = 0;
  let trades = 0;

  for (let i = 210; i < candles.length; i++) {
    const slice = candles.slice(0, i + 1);
    const last = slice[slice.length - 1];
    const signal = strat.generateSignal(slice);

    if (signal.action === 'BUY' && !position) {
      const qty = quote / last.close;
      base += qty; quote = 0; position = { entryPrice: last.close, qty };
      trades++;
    } else if (signal.action === 'SELL' && position) {
      quote += base * last.close; base = 0; position = null; trades++;
    }
  }

  const finalNav = quote + base * (candles[candles.length - 1]?.close || 0);
  const retPct = ((finalNav - 1000) / 1000) * 100;

  console.log(JSON.stringify({ candles: candles.length, trades, startNav: 1000, finalNav, retPct }, null, 2));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  run();
}
