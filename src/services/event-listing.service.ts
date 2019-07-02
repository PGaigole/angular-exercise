import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Events } from '../classes/events';

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventListingService {

  private apiUrl = `${environment.apiBaseUrl}/events-list.json`;

  constructor(
    private http: HttpClient
  ) { }

  getEvents(): Observable<Events> {
    return this.http.get<Events>(this.apiUrl).pipe(map(res => {
       return res;
    }))
  }
}
