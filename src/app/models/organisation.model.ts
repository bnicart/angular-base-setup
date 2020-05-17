import { User } from './user.model';
import { Team } from './team.model';

export interface Organisation {
  id?: string;
  name?: string;
  logo?: string;
  users?: Array<User>;
  teams?: Array<Team>;
}
