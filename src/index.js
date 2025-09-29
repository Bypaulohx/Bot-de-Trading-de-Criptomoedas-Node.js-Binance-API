
import { createBinanceClient } from './exchange/binanceClient.js';
import { runOnce } from './core/engine.js';
import { logger } from './core/logger.js';
import { config } from './config.js';
import schedule from 'node-schedule';

async function main() {
  const client = createBinanceClient();

  if (config.intervalMs > 0) {
    logger.info(`[main] Running every ${config.intervalMs}ms`);
    await runOnce(client);
    setInterval(() => runOnce(client), config.intervalMs);
  } else if (config.scheduleCron) {
    logger.info(`[main] Running on CRON ${config.scheduleCron}`);
    await runOnce(client);
    schedule.scheduleJob(config.scheduleCron, () => runOnce(client));
  } else {
    logger.info(`[main] Single run`);
    await runOnce(client);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
