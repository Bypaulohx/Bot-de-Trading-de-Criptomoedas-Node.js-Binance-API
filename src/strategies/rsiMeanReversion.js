
import { rsi, sma } from '../utils/indicators.js';

export function generateSignal(candles) {
  if (candles.length < 210) return { action: 'HOLD', reason: 'not-enough-data' };
  const closes = candles.map(c => c.close);
  const last = closes[closes.length - 1];
  const r = rsi(closes, 14);
  const s200 = sma(closes, 200);
  if (r === null || s200 === null) return { action: 'HOLD', reason: 'calc-null' };
  if (last > s200 && r < 30) return { action: 'BUY', reason: `rsi=${r.toFixed(2)} < 30 and above SMA200` };
  if (r > 70) return { action: 'SELL', reason: `rsi=${r.toFixed(2)} > 70` };
  return { action: 'HOLD', reason: `rsi=${r.toFixed(2)}` };
}
