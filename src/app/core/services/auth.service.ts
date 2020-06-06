import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SessionStorageService } from './session-storage.service';

@Injectable()
export class AuthService {
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private router: Router, private sessionStorageService: SessionStorageService) { }

  setToken(token: string): void {
    if (token) {
      this.sessionStorageService.setItem('token', token);
    } else {
      this.sessionStorageService.clear();
    }
  }

  logout(): void {
    this.sessionStorageService.clear();
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    try {
      const token = this.sessionStorageService.getItem('token');
      return !this.jwtHelper.isTokenExpired(token);
    } catch {
      this.setToken('');
      this.router.navigate(['/login']);
    }
  }

  getDecodeToken(): {} {
    return this.jwtHelper.decodeToken(this.sessionStorageService.getItem('token'));
  }

  getExpiration(): Date {
    return this.jwtHelper.getTokenExpirationDate(this.sessionStorageService.getItem('token'));
  }
}
