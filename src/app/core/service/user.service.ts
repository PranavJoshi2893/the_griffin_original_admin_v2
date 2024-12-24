import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _url = 'http://localhost:3000/api/v1/users';
  constructor(private _http: HttpClient) {}

  loginUser(userInfo: any): Observable<any> {
    return this._http.post<any>(`${this._url}/login`, userInfo);
  }

  registerUser(userInfo: any): Observable<any> {
    return this._http.post<any>(`${this._url}/`, userInfo);
  }

  getUsers(): Observable<any> {
    return this._http.get<any>(`${this._url}/`);
  }

  getUser(id: string): Observable<any> {
    return this._http.get<any>(`${this._url}/${id}`);
  }

  deleteUser(id: string): Observable<any> {
    return this._http.delete<any>(`${this._url}/${id}`);
  }

  updateUser(userInfo: any, id: string): Observable<any> {
    return this._http.patch<any>(`${this._url}/${id}`, userInfo);
  }
}
