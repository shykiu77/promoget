import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private baseUrl = 'https://promoget-backend.onrender.com/';
  // private baseUrl = 'http://localhost:8000/';
  constructor(private http: HttpClient) {}

  getProducts(
    page: number = 1,
    query: string = '',
    sortBy: string = 'created_at',
    sortOrder: string = 'asc',
    priceMin: number | null = null,
    priceMax: number | null = null,
    daysAgo: number | null = null,
    limit: number = 15
  ): Observable<any> {
    let url = `${this.baseUrl}products?page=${page}&limit=${limit}&sort_by=${sortBy}&order=${sortOrder}`;
    if (query) {
      url += `&query=${encodeURIComponent(query)}`;
    }
    if (priceMin !== null) {
      url += `&priceMin=${priceMin}`;
    }
    if (priceMax !== null) {
      url += `&priceMax=${priceMax}`;
    }
    if (daysAgo !== null) {
      url += `&daysAgo=${daysAgo}`;
    }
    return this.http.get(url);
  }
}
