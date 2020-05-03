import { Injectable, Injector } from '@angular/core';
import { ApiService } from '../api.service';
import { LoginDetail } from '../../login/login.model';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiService {

  url = `${this.URL}/users`;

  constructor(injector: Injector) { super(injector); }

  authenticate(loginDetails: LoginDetail) {
    const credentials = { user: loginDetails };
    return this.http.post(`${this.url}/authenticate`, credentials);
  }

  update(id: string, data: object) {
    return this.http.patch(`${this.url}/${id}`, { user: data });
  }
}
