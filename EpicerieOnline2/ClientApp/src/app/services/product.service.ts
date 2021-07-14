import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }


  getProduct(id: number): Observable<any> {
    return this.http.get('/api/products/' + id);
  }

  getProducts(): Observable<any> {
    return this.http.get('/api/products');
  }

  createProduct(product: Product) {
    return this.http.post('/api/products', product);
  }


  deleteProduct(id: number): Observable<any> {
    return this.http.delete('/api/products/' + id);
  }


  updateProduct(product: Product): Observable<any> {
    return this.http.put('/api/products/' + product.id, product); 
  }
  




}
