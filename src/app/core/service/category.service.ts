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
}
