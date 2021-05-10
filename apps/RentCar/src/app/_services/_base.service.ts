import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseEntity } from '../../../../../libs/interfaces/modules/core/base.entity';

import { Observable } from 'rxjs';

/**
 * Базовый сервис
 * Определяет стандартные методы API
 * @class BaseService
 */
@Injectable()
export class BaseService {

  /**
   * Базовый url сервиса
   */
  protected baseUrl: string;

  /**
   * Инжектим HTTP клиент
   * @param {HttpClient} http
   * @param router
   */
  constructor(protected http: HttpClient, protected router: Router) {
  }

  get headers() {
    return {
      'Authorization': localStorage.getItem('rentCar.user.token') || ''
    };
  }

  /**
   * Параметры запроса
   * @options {}
   * Получение массива объектов
   * @returns {Observable<[T]>}
   */
  find<T>(options?: any): Observable<T[]> {
    const params = {};
    if (options) {
      Object.entries(options).map(o => {
        params[o[0]] = o[1];
      });
    }
    return this.http.get<[T]>(
      this.baseUrl,
      {
        params,
        withCredentials: true,
        headers: {
          'Authorization': localStorage.getItem('rentCar.user.token') || ''
        }
      });
  }

  /**
   * Получение объекта по идентификатору
   * @param {number} id
   * @returns {Observable<T>}
   */
  findById<T>(id: number): Observable<T> {
    return this.http.get<T>(this.baseUrl + '/' + id, {
      withCredentials: true,
      headers: {
        'Authorization': localStorage.getItem('rentCar.user.token') || ''
      }
    });
  }

  /**
   * Создание объекта
   * @param {BaseEntity} model
   * @returns {Observable<T>}
   */
  create<T>(model): Observable<T> {
    return this.http.post<T>(this.baseUrl, model, {
      withCredentials: true,
      headers: {
        'Authorization': localStorage.getItem('rentCar.user.token') || ''
      }
    });
  }

  /**
   * Изменение объекта
   * @param {BaseEntity} model
   * @returns {Observable<T>}
   */
  update<T>(model: BaseEntity): Observable<T> {
    return this.http.put<T>(this.baseUrl + '/' + model.id, model, {
      withCredentials: true,
      headers: {
        'Authorization': localStorage.getItem('rentCar.user.token') || ''
      }
    });
  }

  /**
   * Удаление объекта
   * @returns {Observable<T>}
   * @param id
   */
  deleteById<T>(id: number): Observable<T> {
    return this.http.delete<T>(this.baseUrl + '/' + id, {
      withCredentials: true,
      headers: { 'Authorization': localStorage.getItem('rentCar.user.token') }
    });
  }

  getParams(options) {
    const params = {};
    if (options) {
      Object.entries(options).map(o => {
        params[o[0]] = o[1];
      });
    }
    return params;
  }
}