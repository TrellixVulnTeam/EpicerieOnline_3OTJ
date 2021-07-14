import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SaveCustomer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }



  create(customer: SaveCustomer) {
    return this.http.post('/api/customers', customer);
  }


  login(customer: SaveCustomer) {
    return this.http.post('/api/customers/login', customer,
      { withCredentials: true, responseType: 'text' });
  }


}
