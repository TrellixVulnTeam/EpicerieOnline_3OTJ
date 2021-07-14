import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }


  getCategories(): Observable<any> {

    //var  headers = new HttpHeaders({
    //  'Authorization': `Bearer ${this.token}`
    //});
    //return this.http.get("/api/categories", { headers: headers });


    return this.http.get("/api/categories");

  }


}
