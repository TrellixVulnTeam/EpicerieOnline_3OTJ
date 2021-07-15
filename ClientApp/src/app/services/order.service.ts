import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

//Services

import { TokenService } from './../services/token.service';

///Models

import { Product } from './../models/product';
import { Order, OrderFromServer, UpdateOrder } from './../models/order';







@Injectable({
  providedIn: 'root'
})
export class OrderService {

  token: string = '';


  constructor(
    private http: HttpClient,
    private tokenService: TokenService) {

    this.token = tokenService.getToken();
  }



  //Gall orders

  getOrders(): Observable<any> {
    return this.http.get('/api/orders'); 
  }



  //Create order

  createOrder(order: Order): Observable<any> {

     //var  headers = new HttpHeaders({
     // 'Authorization': `Bearer ${this.token}`
     //});

    const headers = { 'Authorization': `Bearer ${this.token}` };

    return this.http.post("/api/orders", order,{ headers });


  }



  //Update order

  updateOrder(order: UpdateOrder): Observable<any> {
    return this.http.put("/api/orders/" + order.id, order);
  }




  //Delete order

  deleteOrder(orderId:number): Observable<any>  {
    return  this.http.delete("/api/orders/" + orderId);
  }
}
