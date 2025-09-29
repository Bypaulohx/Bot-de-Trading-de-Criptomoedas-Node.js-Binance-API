Aqui está a versão em português do texto que você enviou:

---

# Bot de Trading de Criptomoedas (Node.js + Binance Spot API)

> **Bot automatizado testnet-first** com estratégias plug-and-play (RSI reversão à média, MACD tendência), gerenciamento de risco e backtesting. Construído com o conector oficial `@binance/spot`.
> **⚠️ Uso educacional. Não é conselho financeiro. Utilize o Spot Testnet.**

## Funcionalidades

* ✅ Usa a biblioteca oficial `@binance/spot` (Node 22+)
* ✅ Pronto para Testnet (sem fundos reais)
* ✅ Estratégias modulares (adicione suas próprias regras)
* ✅ Gerenciamento de risco e dimensionamento de posição
* ✅ Backtesting com klines históricos
* ✅ Logs estruturados
* ✅ Suporte a Docker

## Início Rápido (VS Code)

1. **Instale Node 22+** (use `nvm`):

   ```bash
   nvm install 22 && nvm use 22
   ```
2. **Instale as dependências**:

   ```bash
   npm install
   ```
3. **Copie e configure o arquivo .env**:

   ```bash
   cp .env.example .env
   # Preencha API_KEY e API_SECRET do Spot Testnet (https://testnet.binance.vision/)
   # Ajuste SYMBOLS, INTERVAL, STRATEGY, DRY_RUN, etc.
   ```
4. **Execute em modo dry-run** (padrão):

   ```bash
   npm start
   ```
5. **Rode um backtest**:

   ```bash
   npm run backtest -- --symbol BTCUSDT --interval 1h --from 2024-01-01 --to 2024-12-31 --strategy rsi
   ```

> **Onde consigo as chaves da Testnet?**
> Siga a documentação do Binance Spot Testnet e use a URL base `https://testnet.binance.vision`. Apenas endpoints `/api/*` são suportados no testnet.

## Estrutura de Pastas

```
.
├── data/
├── src/
│   ├── core/
│   ├── exchange/
│   ├── strategies/
│   └── index.js
├── .env.example
├── .gitignore
└── package.json
```

## Comandos

```bash
npm start
npm run backtest
npm run lint
npm run format
```

### Flags de Backtest

```bash
npm run backtest --   --symbol BTCUSDT   --interval 1h   --from 2024-01-01   --to 2024-12-31   --strategy rsi
```

## Prints de Tela (placeholders)

Substitua os arquivos em `docs/screenshots/` pelos seus:

* `screenshot-setup.png` – Projeto no VS Code
* `screenshot-run.png` – Bot rodando (dry-run)
* `screenshot-backtest.png` – Resultado de backtest

## Avisos

* Este é um **software educacional**. Cripto é volátil. Você é responsável pelo uso.
* Sempre rode no **Spot Testnet** primeiro. Use `DRY_RUN=true` até entender completamente o código.
* Alguns endpoints ou limites podem mudar — confira sempre a documentação oficial da Binance.

---

Quer que eu também faça uma versão **resumida em português (tipo descrição curta para o GitHub)** baseada nesse README?
