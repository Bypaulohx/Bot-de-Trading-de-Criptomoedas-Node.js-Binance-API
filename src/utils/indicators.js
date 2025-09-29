
export function sma(values, period) {
  if (values.length < period) return null;
  const sum = values.slice(-period).reduce((a, b) => a + b, 0);
  return sum / period;
}

export function ema(values, period) {
  if (values.length < period) return null;
  const k = 2 / (period + 1);
  let emaPrev = values.slice(0, period).reduce((a, b) => a + b, 0) / period;
  for (let i = period; i < values.length; i++) {
    emaPrev = values[i] * k + emaPrev * (1 - k);
  }
  return emaPrev;
}

export function rsi(closes, period = 14) {
  if (closes.length < period + 1) return null;
  let gains = 0;
  let losses = 0;
  for (let i = 1; i <= period; i++) {
    const diff = closes[i] - closes[i - 1];
    if (diff >= 0) gains += diff;
    else losses -= diff;
  }
  gains /= period;
  losses /= period;
  let rs = losses === 0 ? 100 : gains / losses;
  let rsi = losses === 0 ? 100 : 100 - (100 / (1 + rs));
  for (let i = period + 1; i < closes.length; i++) {
    const change = closes[i] - closes[i - 1];
    const gain = Math.max(0, change);
    const loss = Math.max(0, -change);
    gains = (gains * (period - 1) + gain) / period;
    losses = (losses * (period - 1) + loss) / period;
    rs = losses === 0 ? 100 : gains / losses;
    rsi = losses === 0 ? 100 : 100 - (100 / (1 + rs));
  }
  return rsi;
}

export function macd(closes, fast = 12, slow = 26, signalPeriod = 9) {
  if (closes.length < slow + signalPeriod) return null;
  const emaFast = ema(closes, fast);
  const emaSlow = ema(closes, slow);
  if (emaFast === null || emaSlow === null) return null;
  const macdLine = emaFast - emaSlow;

  const macdSeries = [];
  for (let i = slow; i <= closes.length; i++) {
    const slice = closes.slice(0, i);
    const eFast = ema(slice, fast);
    const eSlow = ema(slice, slow);
    if (eFast !== null && eSlow !== null) macdSeries.push(eFast - eSlow);
  }
  const signal = ema(macdSeries, signalPeriod);
  if (signal === null) return null;
  const histogram = macdLine - signal;
  return { macd: macdLine, signal, histogram };
}
