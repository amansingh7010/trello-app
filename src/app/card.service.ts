import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Card } from './card';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  constructor(private http: HttpClient) {}

  private dashboardUrl = 'http://localhost:9000/cards';

  getCards(): Observable<Card[]> {
    return this.http.get<Card[]>(this.dashboardUrl);
  }
}
