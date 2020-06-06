import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  private storage$ = new Subject<string>();

  constructor() { }

  watchStorage(): Observable<any> {
    return this.storage$.asObservable();
  }

  getItem(key: string): string {
    return sessionStorage.getItem(key);
  }

  setItem(key: string, value: string): void {
    sessionStorage.setItem(key, value);
    this.storage$.next('changed');
  }

  removeItem(key: string): void {
    sessionStorage.removeItem(key);
    this.storage$.next('changed');
  }

  clear(): void {
    sessionStorage.clear();
    this.storage$.next('changed');
  }
}
