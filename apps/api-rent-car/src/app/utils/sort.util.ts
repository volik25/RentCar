/* eslint-disable @typescript-eslint/no-explicit-any */
import { BadRequestException, Injectable } from "@nestjs/common";
import moment = require("moment");
import { logger } from "../../../../../libs/interfaces/modules/logger/logger";

@Injectable()
export class SortUtil {
  public static sortItems = (items: any[], sorting: string): any[] => {
    try {
      if (typeof sorting[0] === 'undefined' || !Array.isArray(items)) {
        logger.error('[SortUtil]: sortItems: wrong sorting or items.');
        return items;
      }

      const descending = sorting[0] === '-';
      const guidance = sorting.replace('-', '').split(':');
      const keys = guidance[0].split('.');
      const type = guidance[1];
      let subtype = guidance[2];

      if (!keys || keys.length === 0 || !type) {
        logger.error('[SortUtil]: sortItems: wrong sorting or items.');
        return items;
      }

      items.sort((a: any, b: any) => {
        let diff = 0;
        if (!a) {
          diff = b ? -1 : 0;
          return descending ? -diff : diff;
        } else if (!b) {
          diff = 1;
          return descending ? -diff : diff;
        }
        let value1: any = null;
        let value2: any = null;
        let type1 = typeof value1;
        let type2 = typeof value2;

        if (keys.length === 1) {
          value1 = a[keys[0]];
          value2 = b[keys[0]];
          type1 = typeof value1;
          type2 = typeof value2;
        } else {
          let aCheckDone = false;
          let bCheckDone = false;
          for (const key of keys) {
            if (!aCheckDone) {
              value1 = value1 || a;
              value1 = value1[key];
              type1 = typeof value1;
              if (!value1 || type1 !== 'object' || Array.isArray(value1)) {
                aCheckDone = true;
              }
            }
            if (!bCheckDone) {
              value2 = value2 || b;
              value2 = value2[key];
              type2 = typeof value2;
              if (!value2 || type2 !== 'object' || Array.isArray(value2)) {
                bCheckDone = true;
              }
            }
            if (aCheckDone && bCheckDone) {
              break;
            }
          }
        }

        let earlyReturn = false;

        if (!value2 && value2 !== 0) {
          earlyReturn = true;
          diff = value1 || value1 === 0 ? 1 : 0;
        } else if (!value1 && value1 !== 0) {
          earlyReturn = true;
          diff = -1;
        } else if (type1 !== type2) {
          earlyReturn = true;
          if (type2 === type) {
            diff = -1;
          } else if (type1 === type) {
            diff = 1;
          } else {
            return 0;
          }
        } else if (Array.isArray(value2)) {
          earlyReturn = true;
          diff = Array.isArray(value1) ? 0 : 1;
        } else if (Array.isArray(value1)) {
          earlyReturn = true;
          diff = Array.isArray(value2) ? 0 : -1;
        }

        if (earlyReturn) {
          return descending ? -diff : diff;
        }

        switch (type) {
          case 'date':
            diff = +moment(value1).unix() - +moment(value2).unix() || 0;
            break;
          case 'number':
            diff = +value1 - +value2 || 0;
            break;
          case 'formattedDate':
            subtype = subtype || 'DD.MM.YYYY HH:mm:ss';
            diff = +moment(value1, subtype).unix() - +moment(value2, subtype).unix() || 0;
            break;
          case 'boolean':
            if ((!value1 && !value2) || (value1 && value2)) {
              diff = 0;
            } else {
              diff = value1 ? 1 : -1;
            }
            break;
          case 'string':
            if (type1 === 'string') {
              value1 = value1.trim().toLowerCase();
              value2 = value2.trim().toLowerCase();
              if (value1 < value2) {
                diff = -1;
              } else if (value1 > value2) {
                diff = 1;
              }
            }
            break;
          default:
            if (value1 < value2) {
              diff = -1;
            } else if (value1 > value2) {
              diff = 1;
            }
            break;
        }

        return descending ? -diff : diff;
      });

      return items;
    } catch (err) {
      logger.error('[SortUtil]: sortItems: ');
      throw new BadRequestException(err.message);
    }
  };


}