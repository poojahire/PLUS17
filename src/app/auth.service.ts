// auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://api-v1-dev.pplplus.org/auth1';
  private tokenKey = 'token'; // Key for storing the token in local storage
  private userKey = 'currentUser'; // Key for storing user data in local storage

  constructor(private http: HttpClient) {
    // Check if there is a stored user token on application startup
    this.retrieveStoredUserToken();
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials)
      .pipe(
        map((response: any) => {
          if (response.token) {
            localStorage.setItem(this.userKey, JSON.stringify(response));
            localStorage.setItem(this.tokenKey, response.token);
          }
          return response;
        })
      );
  }

  isAuthenticated(): boolean {
    // Check if there is a user token
    return !!this.getUserToken();
  }

  getUserToken(): string | null {
    // Retrieve the user token from local storage
    const currentUser = this.getCurrentUser();
    return currentUser ? currentUser.token : null;
  }

  getCurrentUser(): any {
    // Retrieve the user data from local storage
    const storedUser = localStorage.getItem(this.userKey);
    return storedUser ? JSON.parse(storedUser) : null;
  }

  private retrieveStoredUserToken(): void {
    // Retrieve the user token from local storage
    // (If you need to perform any additional logic with the token, you can do it here)
  }

  logout(): void {
    // Clear the stored user data and token
    localStorage.removeItem(this.userKey);
    localStorage.removeItem(this.tokenKey);
  }
}
