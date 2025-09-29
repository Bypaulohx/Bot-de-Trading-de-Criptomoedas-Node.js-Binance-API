
# Strategies

## 1) RSI Mean Reversion (`rsi`)
- Buy when RSI < 30 and price is above SMA(200) to avoid strong downtrends.
- Sell when RSI > 70 **or** stop-loss/take-profit hit.

Parameters (environment):
- `RISK_PER_TRADE_PCT`
- `TAKE_PROFIT_PCT`
- `STOP_LOSS_PCT`

## 2) MACD Trend (`macd`)
- Buy on MACD signal cross up.
- Sell on MACD cross down **or** risk rules hit.

You can add new strategies by creating files in `src/strategies/` that export:
```js
export function generateSignal(candles) {
  // return { action: 'BUY' | 'SELL' | 'HOLD', reason: 'text' }
}
```
