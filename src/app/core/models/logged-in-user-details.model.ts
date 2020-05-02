export interface LoggedInUserDetails {
  name: string;
  initials: string;
  currentOrganisationId: string;
  currentOrganisationName: string;
  teams: Array<Team>;
  organisations: Array<Organisation>;
}

interface Team {
  id: string;
  name: string;
}

interface Organisation {
  id: string;
  name: string;
}
