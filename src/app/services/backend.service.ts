import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resp } from './interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  // apiPath: string = 'http://3.25.253.53:8080/api/';
  // apiPath: string = 'http://localhost:8080/api';
  // apiGet: string = 'http://jsonplaceholder.typicode.com/posts';
  // apiBase: string = 'http://localhost:8080/';
  apiBase: string = 'http://3.25.253.53:8080/';

  constructor(private http: HttpClient) {}

  PostRequest(data: any): Observable<Resp[]> {
    return this.http.post<Resp[]>(this.apiBase + 'api', data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  GetRequest(): Observable<Resp[]> {
    return this.http.get<Resp[]>(this.apiBase);
  }
}
