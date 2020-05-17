export interface LoggedInUserDetails {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  initials: string;
  email: string;
  username: string;
  photo: string;
  currentOrganisation: Organisation;
  organisations: Array<Organisation>;
  teams: Array<Team>;
  password?: string;
  confirmPassword?: string;
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
