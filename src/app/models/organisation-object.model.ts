export interface OrganisationObject {
  id?: string;
  name?: string;
  state?: string;
  config?: Array<OrgObjectConfig>;
  organisationId?: string;
  selected?: boolean;
}


export interface OrgObjectConfig {
  key?: string;
  slug?: string;
  type?: string;
  label?: string;
  state?: string;
}
