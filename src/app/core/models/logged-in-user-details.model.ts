export interface LoggedInUserDetails {
  id: string;
  name: string;
  initials: string;
  email: string;
  username: string;
  photo: string;
  current_organisation: Organisation;
  organisations: Array<Organisation>;
  teams: Array<Team>;
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
