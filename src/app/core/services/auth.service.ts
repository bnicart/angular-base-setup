import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private router: Router) { }

  getItem(itemName: string): string {
    return localStorage.getItem(itemName);
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
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
}
