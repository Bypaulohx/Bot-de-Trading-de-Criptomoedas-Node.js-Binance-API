
import { macd } from '../utils/indicators.js';

export function generateSignal(candles) {
  if (candles.length < 40) return { action: 'HOLD', reason: 'not-enough-data' };
  const closes = candles.map(c => c.close);
  const m = macd(closes);
  if (!m) return { action: 'HOLD', reason: 'calc-null' };
  const hist = m.histogram;
  if (hist > 0) return { action: 'BUY', reason: `macdHist=${hist.toFixed(6)} > 0` };
  if (hist < 0) return { action: 'SELL', reason: `macdHist=${hist.toFixed(6)} < 0` };
  return { action: 'HOLD', reason: `macdHist≈0` };
}
