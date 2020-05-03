export interface Team {
  id?: string;
  name?: string;
  member_count?: number;
  logo?: string;
}

export interface TeamCreate {
  name: string;
  organisation_id: string;
}

export interface TeamUpdate {
  name: string;
}
