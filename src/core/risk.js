
import { parseSymbolFilters, roundToStep, roundPrice } from '../exchange/filters.js';
import { logger } from './logger.js';

export function computeOrderQty({ price, quoteFree, riskPerTradePct, symbolInfo }) {
  const filters = parseSymbolFilters(symbolInfo);
  const riskQuote = (quoteFree * riskPerTradePct) / 100;
  let qty = riskQuote / price;
  qty = roundToStep(qty, filters.stepSize);
  const notional = qty * price;
  if (notional < filters.minNotional) {
    logger.warn(`[risk] Notional ${notional.toFixed(8)} < minNotional ${filters.minNotional}`);
    return 0;
  }
  return qty;
}
