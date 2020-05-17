import { Organisation } from './organisation.model';
import { Team } from './team.model';

export interface User {
  id?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  initials?: string;
  email?: string;
  username?: string;
  photo?: string;
  state?: string;
  currentOrganisationId?: string;
  currentOrganisation?: Organisation;
  organisations?: Array<Organisation>;
  teamIds?: Array<string>;
  teams?: Array<Team>;
  password?: string;
  confirmPassword?: string;
}
