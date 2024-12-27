import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { BYPASS_REFRESH } from '../interceptor/token.interceptor';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _url = 'http://localhost:3000/api/v1/users';
  constructor(private _http: HttpClient) {}

  storeToken(response: { access_token: string; refresh_token: string }): void {
    localStorage.setItem('access_token', response.access_token);
    localStorage.setItem('refresh_token', response.refresh_token);
  }

  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  getRefreshToken() {
    return localStorage.getItem('refresh_token');
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  logout(): void {
    localStorage.clear();
  }

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

  refresh(): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getRefreshToken()}`
    );
    const context = new HttpContext().set(BYPASS_REFRESH, true);
    return this._http
      .post<any>(`${this._url}/refresh`, {}, { headers, context })
      .pipe(
        tap((response: any) => {
          localStorage.setItem('access_token', response.access_token);
        }),
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }
}
