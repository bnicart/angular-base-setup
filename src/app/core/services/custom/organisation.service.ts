import { Injectable, Injector } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { Organisation } from 'src/app/models/organisation.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrganisationService extends ApiService {

  url = `${this.URL}/organisations`;

  constructor(injector: Injector) { super(injector); }

  all(): Observable<Array<Organisation>> {
    return this.http.get<Array<Organisation>>(`${this.url}`)
      .pipe(map((response: any) => response.data ));
  }

  get(id: string): Observable<Organisation> {
    return this.http.get<Organisation>(`${this.url}/${id}`);
  }
}
