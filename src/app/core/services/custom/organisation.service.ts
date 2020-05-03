import { Injectable, Injector } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { Organisation } from 'src/app/models/organisation.model';

@Injectable({
  providedIn: 'root'
})
export class OrganisationService extends ApiService {

  userUrl = `${this.URL}/organisations`;

  constructor(injector: Injector) { super(injector); }

  get(id: string): Observable<Organisation> {
    return this.http.get<Organisation>(`${this.userUrl}/${id}`);
  }
}
