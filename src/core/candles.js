import { logger } from './logger.js';

export function mapKline(k) {
  return {
    openTime: Number(k[0]),
    open: Number(k[1]),
    high: Number(k[2]),
    low: Number(k[3]),
    close: Number(k[4]),
    volume: Number(k[5]),
    closeTime: Number(k[6]),
  };
}

export async function fetchKlines(client, symbol, interval, limit = 500, startTime = undefined, endTime = undefined) {
  const params = { limit };
  if (startTime) params.startTime = startTime;
  if (endTime) params.endTime = endTime;
  const res = await client.klines(symbol, interval, params);
  const rows = res.data || res;
  return rows.map(mapKline);
}

export async function fetchKlinesRange(client, symbol, interval, startMs, endMs) {
  const out = [];
  let cursor = startMs;
  const limit = 1000;
  while (cursor < endMs) {
    const batch = await fetchKlines(client, symbol, interval, limit, cursor, endMs);
    if (!batch.length) break;
    out.push(...batch);
    const lastClose = batch[batch.length - 1].closeTime;
    cursor = lastClose + 1;
    if (batch.length < limit) break;
  }
  return out;
}
