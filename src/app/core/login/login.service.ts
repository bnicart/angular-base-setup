import { Injectable, Injector } from '@angular/core';

import { ApiService } from '../services/api.service';
import { LoginDetail } from './login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends ApiService {

  loginUrl = `${this.URL}/users/authenticate`;

  constructor(injector: Injector) { super(injector); }

  authenticate(loginDetails: LoginDetail) {
    const credentials = { user: loginDetails };
    return this.http.post(this.loginUrl, credentials);
  }
}
