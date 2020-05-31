import { Injectable, Injector } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { OrganisationObject } from 'src/app/models/organisation-object.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrganisationObjectService extends ApiService {

  url = `${this.URL}/organisation_objects`;

  constructor(injector: Injector) { super(injector); }

  create(data: OrganisationObject): Observable<OrganisationObject> {
    return this.http.post<OrganisationObject>(`${this.url}`, { organisation_object : data });
  }

  all(): Observable<Array<OrganisationObject>> {
    return this.http.get<Array<OrganisationObject>>(`${this.url}`)
      .pipe(map((response: any) => response.data ));
  }

  get(id: string): Observable<OrganisationObject> {
    return this.http.get<OrganisationObject>(`${this.url}/${id}`);
  }

  update(id: string, data: OrganisationObject): Observable<OrganisationObject> {
    return this.http.put<OrganisationObject>(`${this.url}/${id}`, { organisation_object : data });
  }

  remove(id: string): Observable<OrganisationObject> {
    return this.http.delete<OrganisationObject>(`${this.url}/${id}`);
  }
}
