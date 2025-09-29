
# Arquitetura

```mermaid
flowchart LR
    A[Agendador] --> B[Motor]
    B --> C[Cliente Binance (@binance/spot)]
    B --> D[Gerenciador de Risco]
    B --> E[Estratégias]
    C --> F[Dados de Mercado (klines)]
    E --> G[Sinais]
    D --> H[Dimensionamento de Posição]
    G --> I{Comprar/Vender?}
    I -- Comprar --> J[Módulo de Ordem -> newOrder()]
    I -- Vender --> J
    J --> K[Execução Simulada?]
    K -- sim --> L[Apenas Log]
    K -- não --> M[Enviar para Testnet]
```