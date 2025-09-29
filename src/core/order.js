
import { logger } from './logger.js';

export async function placeMarketOrder(client, symbol, side, quantity, dryRun) {
  if (dryRun) {
    logger.info(`[order] DRY-RUN ${side} ${symbol} qty=${quantity}`);
    return { data: { symbol, side, type: 'MARKET', status: 'FILLED', executedQty: quantity, price: null } };
  }
  const res = await client.newOrder(symbol, side, 'MARKET', { quantity: quantity.toString() });
  logger.info(`[order] Sent ${side} ${symbol} MARKET qty=${quantity}`);
  return res;
}
