import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HandleError } from '../app/http-error-handler.service';
import { Pay } from './payment-list/pay';

const maxAge = 30000; 
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root',
})
export class PaymentListService {
  url:'https://crudcrud.com/api/';
  uri:'35bab3bfa43f4ca59879287309977ac3';
  prefix:'/Payment';
  api: string;
  pays;
  private handleError: HandleError;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.api = this.url+this.uri+this.prefix;
  }

  addPays(inputPays) {
    let success=true;
    try {
      this.http.post(this.api, inputPays).subscribe((data) => {
        console.log(inputPays);
      });
    } catch (error) {
      success = false;
      console.error(error);
    }
    return success;
  }

    getPays (): Observable<Pay[]> {
      return this.http.get<Pay[]>(this.api)
        .pipe(
          //catchError(this.handleError('getPays', []))
        );
    }
  
    searchPays(term: string): Observable<Pay[]> {
      term = term.trim();
 
      const options = term ?
       { params: new HttpParams().set('name', term) } : {};
  
      return this.http.get<Pay[]>(this.api, options)
        .pipe(
          //catchError(this.handleError<Pay[]>('searchPays', []))
        );
    }
  
    addPay (pay: Pay): Observable<Pay> {
      return this.http.post<Pay>(this.api, pay, httpOptions)
        .pipe(
          //catchError(this.handleError('addPay', pay))
        );
    }
  
    deletePay (id: number): Observable<{}> {
      const url = `${this.api}/${id}`;
      return this.http.delete(url, httpOptions)
        .pipe(
          //catchError(this.handleError('deletePay'))
        );
    }
  
    updatePay (pay: Pay): Observable<Pay> {
      httpOptions.headers =
        httpOptions.headers.set('Authorization', 'my-new-auth-token');
  
      return this.http.put<Pay>(this.api, pay, httpOptions)
        .pipe(
          //catchError(this.handleError('updatePay', pay))
        );
    }
}