import winston from 'winston';
import path from 'path';
import { fileURLToPath } from 'url';


const levels = { 
    error: 0, 
    warn: 1, 
    info: 2, 
    verbose: 3, 
    debug: 4, 
    silly: 5 
};


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


/**
 * Configures and creates a Winston logger instance for logging messages to the console
 * and log files, with specific formatting and log levels.
 *
 * The logger is set up to:
 * 1. Log messages to both the console and two separate files: `infos.log` for info-level logs
 *    and `errors.log` for error-level logs.
 * 2. Format log messages with a timestamp (`YYYY-MM-DD HH:mm:ss`), colorized output in the console, 
 *    and include the stack trace if an error occurs.
 * 3. Support structured logging with message formatting via `winston.format.splat()` to handle string interpolation.
 *
 * @constant {Object} logger - A Winston logger instance.
 *
 * @format
 * - `timestamp`: Each log message is prefixed with the timestamp in the format `YYYY-MM-DD HH:mm:ss`.
 * - `colorize`: Console logs are colorized based on log levels for easier reading.
 * - `printf`: Custom formatting is applied to include timestamps, log levels, and stack traces (if present).
 *
 * @transports
 * - `Console`: Logs are printed to the console.
 * - `File` (info level): Logs are written to `infos.log` for all logs at 'info' level or higher.
 * - `File` (error level): Logs are written to `errors.log` for all logs at 'error' level or higher.
 *
 * @files
 * - Logs are stored in the `logs` directory within the same directory as this script.
 * - `infos.log`: Stores informational and higher-level logs (e.g., info, warn, error).
 * - `errors.log`: Stores only error-level logs.
 *
 * @example
 * logger.info('This is an info message');
 * logger.error(new Error('This is an error message'));
 *
 * @requires winston - Winston library for logging.
 * @requires path - Node.js path module for handling file paths.
 * @requires {__filename, __dirname} - Resolves the current filename and directory using `fileURLToPath`.
 */
const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.splat(),
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.colorize(),
    winston.format.printf(log => {
      if (log.stack) return `[${log.timestamp}] [${log.level}] ${log.stack}`;
      return `[${log.timestamp}] [${log.level}] ${log.message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      level: 'info',
      filename: path.join(`${__dirname}\\logs`, 'infos.log')
    }),
    new winston.transports.File({
        level: 'error',
        filename: path.join(`${__dirname}\\logs`, 'errors.log')
    })
  ],
});


export default logger;