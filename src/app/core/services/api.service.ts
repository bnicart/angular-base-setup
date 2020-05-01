import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private BASE_URL: string = environment.apiUrl;
  private API_VERSION: string = environment.apiVersion;
  URL = `${this.BASE_URL}/${this.API_VERSION}`
  public http: HttpClient;

  constructor(private injector: Injector) {
    this.http = injector.get(HttpClient);
  }
}
