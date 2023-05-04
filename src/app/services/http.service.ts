import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private url =
    'https://scripbox-4d466-default-rtdb.asia-southeast1.firebasedatabase.app/ideas.json';

  // private url =
  //   'https://firebasestorage.googleapis.com/v0/b/scripbox-4d466.appspot.com/o/ideas.json?alt=media&token=96f9f96d-5b36-4a15-94aa-bc9fea8bb352';
  constructor(private http: HttpClient) { }

  get(): Observable<any> {

    return this.http.get(this.url);
  }

  post(body: any) {
    return this.http.put(this.url, body);
  }
}
