import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { Category } from 'src/model/category';

const apiUrl = 'https://localhost:7029/api/Categories';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(apiUrl)
      .pipe(
        tap(categories => console.log("Retrieve Categories")),
        catchError(this.handleError('getCategories', []))
      );
  }

  getCategory(id: number): Observable<Category> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Category>(url)
      .pipe(
        tap(categories => console.log("Retrieve Categories")),
        catchError(this.handleError<Category>(`getCategory id=${id}`))
      );
  }

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(apiUrl, category).
      pipe(
        catchError(this.handleError<Category>("addCategory"))
      );
  }

  updateCategory(id: number, category: Category): Observable<Category> {
    const url = `${apiUrl}/${id}`;
    return this.http.put<Category>(url, category)
      .pipe(
        catchError(this.handleError<any>('Category Update'))
      );
  }

  deleteCategory(id: number) : Observable<Category> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Category>(url)
      .pipe(
        catchError(this.handleError<Category>('Category Delete'))

      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
