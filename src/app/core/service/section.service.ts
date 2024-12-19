import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SectionService {
  private _url = 'http://localhost:3000/api/v1/section';

  constructor(private _http: HttpClient) {}

  createSection(section: any): Observable<any> {
    return this._http.post<any>(`${this._url}/`, section);
  }

  getAllSections(): Observable<any> {
    return this._http.get<any>(`${this._url}/`);
  }
}
