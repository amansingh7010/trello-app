import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Card } from './card';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  constructor(private http: HttpClient) {}

  private cardsUrl = 'http://localhost:9000/cards';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getCards(): Observable<Card[]> {
    return this.http.get<Card[]>(this.cardsUrl).pipe(
      tap((_) => console.log('fetched cards')),
      catchError(this.handleError<Card[]>('getCards', []))
    );
  }

  saveCard(card: Card): Observable<any> {
    return this.http.post(this.cardsUrl, card, this.httpOptions).pipe(
      tap((_) => console.log('Saved New Card')),
      catchError(this.handleError<any>('saveCard'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
