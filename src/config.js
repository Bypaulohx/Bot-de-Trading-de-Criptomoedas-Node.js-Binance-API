
import 'dotenv/config';

export const config = {
  apiKey: process.env.API_KEY || '',
  apiSecret: process.env.API_SECRET || '',
  useTestnet: (process.env.USE_TESTNET || 'true').toLowerCase() === 'true',
  symbols: (process.env.SYMBOLS || 'BTCUSDT').split(',').map(s => s.trim().toUpperCase()),
  interval: process.env.INTERVAL || '15m',
  strategy: (process.env.STRATEGY || 'rsi').toLowerCase(),
  riskPerTradePct: Number(process.env.RISK_PER_TRADE_PCT || 1.0),
  maxOpenTrades: Number(process.env.MAX_OPEN_TRADES || 1),
  takeProfitPct: Number(process.env.TAKE_PROFIT_PCT || 1.0),
  stopLossPct: Number(process.env.STOP_LOSS_PCT || 0.7),
  dryRun: (process.env.DRY_RUN || 'true').toLowerCase() === 'true',
  scheduleCron: process.env.SCHEDULE_CRON || null,
  intervalMs: Number(process.env.INTERVAL_MS || 0),
  quoteAsset: process.env.QUOTE_ASSET || 'USDT',
};
