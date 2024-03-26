import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../model/item'

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  item_url: string = "http://localhost:3000/items";

  constructor(private http: HttpClient) { }

  // Fetch available items from server
  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.item_url);
  }
}
