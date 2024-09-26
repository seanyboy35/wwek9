import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    units: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
      return this.http.get<Product[]>(this.apiUrl);
  }

  addProduct(product: Product): Observable<any> {
      return this.http.post(this.apiUrl, product);
  }

  updateProduct(id: string, product: Product): Observable<any> {
      return this.http.put(`${this.apiUrl}/${id}`, product);
  }

  removeProduct(id: string): Observable<any> {
      return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
