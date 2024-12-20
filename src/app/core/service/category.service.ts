import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private _url: string = 'http://localhost:3000/api/v1/category';
  constructor(private _http: HttpClient) {}

  createCategory(category: any): Observable<any> {
    return this._http.post<any>(`${this._url}/`, category);
  }

  getAllCategories(): Observable<any> {
    return this._http.get<any>(`${this._url}/`);
  }

  deleteCategory(id: number): Observable<any> {
    return this._http.delete(`${this._url}/${id}`);
  }
}
