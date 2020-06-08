import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService extends DataService{
  constructor(httpClient: HttpClient) {
    super(
      'https://crudcrud.com/api/35bab3bfa43f4ca59879287309977ac3/Payment',
      httpClient
    );
  }
}
