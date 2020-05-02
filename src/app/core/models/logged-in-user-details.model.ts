export interface LoggedInUserDetails {
  name: string;
  initials: string;
  current_organisation: Organisation;
  teams: Array<Team>;
  organisations: Array<Organisation>;
}

export interface Team {
  id: string;
  name: string;
}

export interface Organisation {
  id: string;
  name: string;
  logo?: string;
}
