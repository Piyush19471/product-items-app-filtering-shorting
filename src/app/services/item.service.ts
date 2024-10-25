import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private apiUrl = 'https://fakestoreapi.com/products'; // API URL

  constructor(private http: HttpClient) {}

  // Method to fetch items from the API
  getItems(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError(this.handleError) // Handle errors here
    );
  }

  // Handle HTTP errors
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error ${error.status}: ${error.message}`;
    }

    // specific cases for empty responses or network failures
    if (error.status === 0) {
      errorMessage = 'Network error. Please check your internet connection.';
    } else if (error.status === 204) {
      errorMessage = 'No data found.';
    }

    console.error(errorMessage); // Log to console or any logging service
    return throwError(errorMessage);
  }
}
