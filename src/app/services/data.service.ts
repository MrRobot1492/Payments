import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { AppErrorHandler } from './../common/validators/app-error-handler';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  apperror = new AppErrorHandler();
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Accept: '*/*',
      'Cache-Control': 'Cache-Control',
    }),
  };
  constructor(@Inject(String) private url: string, private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient
      .get(this.url, this.httpOptions)
      .pipe(catchError(this.apperror.handleExpectedError));
  }

  create(resource) {
    return this.httpClient
      .post(this.url, JSON.stringify(resource), this.httpOptions)
      .pipe(catchError(this.apperror.handleExpectedError));
  }

  update(resource) {
    let id = resource['_id'];
    delete resource['_id'];
    return this.httpClient
      .put(this.url + '/' + id, JSON.stringify(resource), this.httpOptions)
      .pipe(catchError(this.apperror.handleExpectedError));
  }

  delete(id: string) {
    return this.httpClient
      .delete(this.url + '/' + id, this.httpOptions)
      .pipe(catchError(this.apperror.handleExpectedError));
  }
}