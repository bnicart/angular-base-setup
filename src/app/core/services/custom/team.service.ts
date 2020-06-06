import { Injectable, Injector } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { Team } from 'src/app/models/team.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeamService extends ApiService {

  url = `${this.URL}/teams`;

  constructor(injector: Injector) { super(injector); }

  all(): Observable<Array<Team>> {
    return this.http.get<Array<Team>>(`${this.url}`)
      .pipe(map((response: any) => response.data ));
  }

  create(data: Team): Observable<Team> {
    return this.http.post<Team>(`${this.url}`, { team : data });
  }

  get(id: string): Observable<Team> {
    return this.http.get<Team>(`${this.url}/${id}`);
  }

  update(id: string, data: Team): Observable<Team> {
    return this.http.put<Team>(`${this.url}/${id}`, { team : data });
  }

  remove(id: string): Observable<Team> {
    return this.http.delete<Team>(`${this.url}/${id}`);
  }
}
