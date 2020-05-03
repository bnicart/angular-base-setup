import { Injectable, Injector } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { Team, TeamCreate, TeamUpdate } from 'src/app/models/team.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService extends ApiService {

  url = `${this.URL}/teams`;

  constructor(injector: Injector) { super(injector); }

  create(data: TeamCreate): Observable<Team> {
    return this.http.post<Team>(`${this.url}`, { team : data });
  }

  get(id: string): Observable<Team> {
    return this.http.get<Team>(`${this.url}/${id}`);
  }

  update(id: string, data: TeamUpdate): Observable<Team> {
    return this.http.put<Team>(`${this.url}/${id}`, { team : data });
  }

  remove(id: string): Observable<Team> {
    return this.http.delete<Team>(`${this.url}/${id}`);
  }
}
