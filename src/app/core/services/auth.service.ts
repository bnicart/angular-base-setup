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

  isAuthenticated(token: string = null): boolean {
    token = token || this.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  decodeToken(token: string): {} {
    return this.jwtHelper.decodeToken(token);
  }
}
