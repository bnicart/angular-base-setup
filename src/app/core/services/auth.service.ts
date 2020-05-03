import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class AuthService {
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private router: Router, private localStorageService: LocalStorageService) { }

  setToken(token: string): void {
    if (token) {
      this.localStorageService.setItem('token', token);
    } else {
      this.localStorageService.clear();
    }
  }

  logout(): void {
    this.localStorageService.clear();
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    try {
      const token = this.localStorageService.getItem('token');
      return !this.jwtHelper.isTokenExpired(token);
    } catch {
      this.setToken('');
      this.router.navigate(['/login']);
    }
  }

  getDecodeToken(): {} {
    return this.jwtHelper.decodeToken(this.localStorageService.getItem('token'));
  }

  getExpiration(): Date {
    return this.jwtHelper.getTokenExpirationDate(this.localStorageService.getItem('token'));
  }
}
