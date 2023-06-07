import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  isLoggedIn(): boolean {
    const isLoggedIn = localStorage.getItem('loggedIn');
    if (isLoggedIn) return true;
    return false;
  }
}
