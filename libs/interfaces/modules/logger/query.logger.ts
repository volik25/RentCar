import { Logger, QueryRunner } from 'typeorm';
import { logger } from './logger';

export class QueryLogger implements Logger {

  log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: QueryRunner): any {
    if (level === 'log') {
      if (queryRunner) {
        logger.debug(queryRunner.getMemorySql());
      }
      if (message) {
        logger.debug(message);
      }
    } else if (level === 'info') {
      if (queryRunner) {
        logger.debug(queryRunner.getMemorySql());
      }
      if (message) {
        logger.debug(message);
      }
    } else if (level === 'warn') {
      if (queryRunner) {
        logger.warn(queryRunner.getMemorySql());
      }
      if (message) {
        logger.warn(message);
      }
    }
  }

  logMigration(message: string, queryRunner?: QueryRunner): any {
    if (message) {
      logger.debug(message);
    }
    if (queryRunner) {
      logger.debug(queryRunner.getMemorySql());
    }
  }

  logQuery(query: string, parameters?: any[]): any {
    if (query) {
      logger.debug(query);
    }
    if (parameters && parameters.length > 0) {
      logger.debug(parameters);
    }
  }

  logQueryError(error: string, query: string, parameters?: any[], queryRunner?: QueryRunner): any {
    if (error) {
      logger.error(error, '');
    }
    if (query) {
      logger.error(query, '');
    }
    if (parameters && parameters.length > 0) {
      logger.error(parameters);
    }
    if (queryRunner) {
      logger.error(queryRunner.getMemorySql());
    }
  }

  logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner): any {
    if (time) {
      logger.error('SLOW QUERY: ' + time);
    }
    if (query) {
      logger.error(query);
    }
    if (parameters && parameters.length > 0) {
      logger.error(parameters);
    }
    if (queryRunner) {
      logger.error(queryRunner.getMemorySql());
    }
  }

  logSchemaBuild(message: string, queryRunner?: QueryRunner): any {
    if (message) {
      logger.debug(message);
    }
    if (queryRunner) {
      logger.debug(queryRunner.getMemorySql());
    }
  }

}
