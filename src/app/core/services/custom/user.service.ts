import { Injectable, Injector } from '@angular/core';
import { ApiService } from '../api.service';
import { LoginDetail } from '../../login/login.model';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiService {

  userUrl = `${this.URL}/users`;

  constructor(injector: Injector) { super(injector); }

  authenticate(loginDetails: LoginDetail) {
    const credentials = { user: loginDetails };
    return this.http.post(`${this.userUrl}/authenticate`, credentials);
  }

  update(id: string, data: object) {
    return this.http.patch(`${this.userUrl}/${id}`, { user: data });
  }
}
