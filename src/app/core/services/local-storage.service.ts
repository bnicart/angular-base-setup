import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private storage$ = new Subject<String>();

  constructor() { }

  watchStorage(): Observable<any> {
    return this.storage$.asObservable();
  }

  getItem(key: string): string {
    return localStorage.getItem(key);
  }

  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
    this.storage$.next('changed');
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
    this.storage$.next('changed');
  }

  clear(): void {
    localStorage.clear();
    this.storage$.next('changed');
  }
}
