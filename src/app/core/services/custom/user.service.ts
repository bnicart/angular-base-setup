import { Injectable, Injector } from '@angular/core';
import { ApiService } from '../api.service';
import { LoginDetail } from '../../login/login.model';
import { User } from 'src/app/models/user.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  all(): Observable<Array<User>> {
    return this.http.get<Array<User>>(`${this.url}`)
      .pipe(map((response: any) => response.data ));
  }

  create(data: User): Observable<User> {
    return this.http.post<User>(`${this.url}`, { user : data });
  }

  get(id: string): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}`);
  }

  update(id: string, data: User): Observable<any> {
    return this.http.patch<User>(`${this.url}/${id}`, { user : data });
  }

  remove(id: string): Observable<User> {
    return this.http.delete<User>(`${this.url}/${id}`);
  }
}
