import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  URL: string = 'http://localhost:3001/orders';

  constructor(private http: HttpClient) { }

  // Post placed order details to server
  addOrder(order: any): Observable<any> {
    return this.http.post(this.URL, order);
  }

  // Fetch all placed order details from server
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.URL);
  }
}
