export function parseSymbolFilters(symbolInfo) {
  const lot = symbolInfo.filters.find(f => f.filterType === 'LOT_SIZE') || {};
  const price = symbolInfo.filters.find(f => f.filterType === 'PRICE_FILTER') || {};
  const minNotional = symbolInfo.filters.find(f => f.filterType === 'MIN_NOTIONAL') || {};
  return {
    stepSize: Number(lot.stepSize || 0.00000001),
    minQty: Number(lot.minQty || 0.0),
    minPrice: Number(price.minPrice || 0.0),
    tickSize: Number(price.tickSize || 0.00000001),
    minNotional: Number(minNotional.minNotional || 0.0),
  };
}

export function roundToStep(value, step) {
  return Math.floor(value / step) * step;
}

export function roundPrice(price, tickSize) {
  return Math.floor(price / tickSize) * tickSize;
}
