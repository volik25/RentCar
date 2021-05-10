import { LoggerService } from '@nestjs/common';

import * as moment from 'moment';
import { createLogger, format, Logger, transports } from 'winston';

const { combine, timestamp, printf, label } = format;

const stdoutFormat = printf(info => {
  if (typeof info.message === 'string') {
    if (info.stack) {
      return `${process.pid} ${info.timestamp} [${info.label}] ${info.level}: ${info.message} ${JSON.stringify(info.stack)}`;
    } else {
      return `${process.pid} ${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
    }
  } else if (typeof info.message === 'object') {
    return `${process.pid} ${info.timestamp} [${info.label}] ${info.level}: ${JSON.stringify(info.message)}`;
  }
});

const debugFormat = printf(info => {
  if (typeof info.message === 'string') {
    if (info.stack) {
      return `${process.pid} ${info.timestamp} [${info.label}] ${info.level}: ${info.message} ${JSON.stringify(info.stack, null, 2)}`;
    } else {
      return `${process.pid} ${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
    }
  } else if (typeof info.message === 'object') {
    return `${process.pid} ${info.timestamp} [${info.label}] ${info.level}: ${JSON.stringify(info.message, null, 2)}`;
  }
});

export const logger: Logger = createLogger({
  level: 'debug',
  transports: [
    new transports.Console({
      level: 'debug',
      format: combine(
        (() => process.env.PRODUCTION ? null : format.colorize())(),
        timestamp({
          format: () => {
            return moment().format('DD.MM.YYYY HH:mm:ss');
          }
        }),
        label({ label: 'KMG' }),
        stdoutFormat
      )
    }),
    new transports.File({
      level: 'debug', format: combine(
        timestamp({
          format: () => {
            return moment().format('DD.MM.YYYY HH:mm:ss');
          }
        }),
        label({ label: 'KMG' }),
        debugFormat
      ), filename: 'debug.log'
    })
  ]
});


export class AppLogger implements LoggerService {
  log(message: string, context?: string) {
    logger.info(message, context);
  }

  error(message: string, trace: string, context?: string) {
    logger.error(message, trace, context);
  }

  warn(message: string, context?: string) {
    logger.warn(message, context);
  }

  debug(message: string, context?: string) {
    logger.debug(message, context);
  }

  verbose(message: string, context?: string) {
    logger.verbose(message, context);
  }
}
