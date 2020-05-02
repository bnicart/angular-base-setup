import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoggedInUserDetails } from '../models/logged-in-user-details.model';

@Injectable()
export class AuthService {
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private router: Router) { }

  getItem(itemName: string): string {
    return localStorage.getItem(itemName);
  }

  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  setToken(token: string): void {
    if (token) {
      localStorage.setItem('token', token);
      this.setOtherData(); // Used for setting other custom local storage data.
    } else {
      localStorage.clear();
    }

  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    try {
      const token = this.getItem('token');
      return !this.jwtHelper.isTokenExpired(token);
    } catch {
      this.setToken('');
      this.router.navigate(['/login']);
    }
  }

  getDecodeToken(): {} {
    return this.jwtHelper.decodeToken(this.getItem('token'));
  }

  getExpiration(): Date {
    return this.jwtHelper.getTokenExpirationDate(this.getItem('token'));
  }

  setOtherData(): void {
    const data = this.getDecodeToken() as LoggedInUserDetails;
    console.log(data);
    this.setItem('current_organisation', JSON.stringify(data.current_organisation))
  }
}
