
import { Spot } from '@binance/spot';
import { config } from '../config.js';
import { logger } from '../core/logger.js';

export function createBinanceClient() {
  const baseURL = config.useTestnet ? 'https://testnet.binance.vision' : 'https://api.binance.com';
  logger.info(`[binance] Using baseURL: ${baseURL} | testnet=${config.useTestnet}`);
  const client = new Spot(config.apiKey, config.apiSecret, { baseURL });
  return client;
}
