import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Card } from './card';
import * as apis from '../constants/apis.constants';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  constructor(private http: HttpClient) {}

  private cardsUrl = `${environment.apiBaseUrl}/${apis.CARDS}`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getCards(): Observable<Card[]> {
    return this.http.get<Card[]>(this.cardsUrl).pipe(
      tap((_) => console.log('Fetched cards')),
      catchError(this.handleError<Card[]>('getCards', []))
    );
  }

  saveCard(card: Card): Observable<any> {
    return this.http.post(this.cardsUrl, card, this.httpOptions).pipe(
      tap((_) => console.log('Saved New Card')),
      catchError(this.handleError<any>('saveCard'))
    );
  }

  updateCard(card: Card): Observable<any> {
    return this.http
      .put(`${this.cardsUrl}/${card._id}`, card, this.httpOptions)
      .pipe(
        tap((_) => console.log('Saved New Card')),
        catchError(this.handleError<any>('updateCard'))
      );
  }

  deleteCard(cardId: string): Observable<any> {
    return this.http.delete(`${this.cardsUrl}/${cardId}`).pipe(
      tap((_) => console.log('Saved New Card')),
      catchError(this.handleError<any>('deleteCard'))
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
      console.error(operation, error);
      return of(result as T);
    };
  }
}
