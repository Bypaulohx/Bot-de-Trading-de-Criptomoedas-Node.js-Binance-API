
# USAGE (How-To)

## 1) Configure o ambiente
- Instale Node 22+ (sugestão: `nvm`).
- Crie `.env` a partir de `.env.example`.
- Garanta `USE_TESTNET=true` até dominar o fluxo.

## 2) Rodar o bot (agendado ou on-demand)
- On-demand (uma execução):
  ```bash
  npm start
  ```
- A cada X minutos (via CRON):
  - Ajuste `SCHEDULE_CRON` no `.env`, por exemplo: `*/5 * * * *`
  - Rode: `npm start`
- A cada N ms:
  - Defina `INTERVAL_MS=60000` (1 minuto) no `.env`
  - Rode: `npm start`

## 3) Escolher estratégia
- `STRATEGY=rsi` — Reversão à média usando RSI (<30 compra, >70 venda, com filtro SMA200).
- `STRATEGY=macd` — Tendência via MACD (histograma positivo compra, negativo venda).

## 4) Gerenciamento de Risco
- `RISK_PER_TRADE_PCT` (ex: `1.0`) — % do saldo em **moeda de cotação** a arriscar por trade.
- `MAX_OPEN_TRADES` — simples controle de nº de posições (neste exemplo, 1).
- `STOP_LOSS_PCT` / `TAKE_PROFIT_PCT` — parâmetros básicos. (O exemplo de ordem usa **MARKET** e venda total no sinal; expanda conforme necessidade).

## 5) Backtesting
```bash
npm run backtest -- --symbol BTCUSDT --interval 1h --from 2024-01-01 --to 2024-12-31 --strategy rsi
```
- O script baixa klines do período e aplica a estratégia.
- Resultado: nº de candles, nº de trades e retorno aproximado do portfólio virtual.

## 6) Produção (Docker opcional)
- Build:
  ```bash
  docker build -t crypto-bot .
  ```
- Compose:
  ```bash
  docker compose up -d
  ```

## 7) Onde editar
- `src/strategies/*` — regras de entrada/saída.
- `src/core/risk.js` — cálculo de tamanho de posição.
- `src/core/engine.js` — orquestração.
- `src/core/order.js` — envio de ordens (implemente TP/SL/OCO conforme necessidade).
