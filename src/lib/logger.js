'use strict';

const fs = require('node:fs');
const path = require('node:path');
const pino = require('pino');
const pretty = require('pino-pretty');
const { bindMethods } = require('./utils.js');

const LOG_PATH = path.join('./logs');
const LOG_FILE = path.join(LOG_PATH, '/log');

try {
  fs.statSync(LOG_PATH);
} catch {
  fs.mkdirSync(LOG_PATH);
}

const streams = [
  { stream: pretty() },
  { level: 'info', stream: fs.createWriteStream(LOG_FILE) },
];

const terminalOpts = {
  transport: { target: 'pino-pretty' },
  customLevels: { log: 35 },
};

const terminal = pino(terminalOpts);

const logger = pino({ level: 'info' }, pino.multistream(streams));

bindMethods(logger);

logger.log = terminal.log.bind(terminal);

module.exports = { logger };
