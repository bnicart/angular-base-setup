import { Organisation } from './organisation.model';
import { Team } from './team.model';

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  name: string;
  initials: string;
  email: string;
  username: string;
  photo: string;
  current_organisation: Organisation;
  organisations: Array<Organisation>;
  teams: Array<Team>;
  password?: string;
  confirm_password?: string;
}
