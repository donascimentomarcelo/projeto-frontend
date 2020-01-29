import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private path = '/projeto';

  constructor(private http: HttpClient) { }

  sendData(object: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}${this.path}`, object)
      .pipe(
        map(() => null)
      )
  }
}
