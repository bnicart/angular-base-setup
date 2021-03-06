import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { Organisation } from 'src/app/models/organisation.model';
import { OrganisationObject, OrgObjectConfig } from 'src/app/models/organisation-object.model';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';
import { OrganisationService } from 'src/app/core/services/custom/organisation.service';
import { OrganisationObjectService } from 'src/app/core/services/custom/organisation-object.service';
import { extract } from 'src/app/core/utils/extract-data-from-array';
import { guid } from 'src/app/core/utils/guid';

@Component({
  selector: 'app-org-objects',
  templateUrl: './org-objects.component.html',
  styleUrls: ['./org-objects.component.scss']
})
export class OrgObjectsComponent implements OnInit {

  subscriptions: Array<Subscription> = [];

  query = '';
  userDetails: User = {};
  selectedOrgObject: OrganisationObject = {};
  currentOrganisationData: Organisation;
  currentOrganisationObjects: Array<OrganisationObject> = [];

  orgObjectConfigTypes = [
    { value: 'string', text: 'String' },
    { value: 'password', text: 'Password' },
    { value: 'number', text: 'Number' },
    { value: 'date', text: 'Date' },
    { value: 'datetime', text: 'Date Time' },
    { value: 'boolean', text: 'Boolean' },
    { value: 'file_url', text: 'File URL' },
    { value: 'reference', text: 'Reference' },
    { value: 'array', text: 'Array' }
  ];

  constructor(
    private sessionStorageService: SessionStorageService,
    private organisationService: OrganisationService,
    private organisationObjectService: OrganisationObjectService,
  ) { }

  ngOnInit() {
    this.setOrganisationData();
    const sessionStorageService$ = this.sessionStorageService.watchStorage().subscribe(() => this.setOrganisationData());
    this.subscriptions.push(sessionStorageService$);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  setOrganisationData(): void {
    this.userDetails = JSON.parse(this.sessionStorageService.getItem('userDetails'));

    if (!this.userDetails) { return; }

    this.organisationService.get(this.userDetails.currentOrganisation.id).subscribe((data: Organisation) => {
      this.currentOrganisationData = data;
      this.currentOrganisationObjects = data.objects;
    });
  }

  filteredOrgObjects(orgObjects: Array<OrganisationObject>): Array<OrganisationObject> {
    if (!orgObjects) { orgObjects = []; }
    return orgObjects.filter((orgObject: OrganisationObject) => orgObject.name.toLowerCase().includes(this.query.toLowerCase()))
      .sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1);
  }

  addConfig(orgObject: OrganisationObject): void {
    const orgObjectConfig: OrgObjectConfig = {
      key: guid(),
      label: '',
      type: 'string',
      state: 'active',
    };

    if (!orgObject.config) { orgObject.config = []; }

    orgObject.config.push(orgObjectConfig);
  }

  createOrgObject(data: Array<any>) {
    const params = this.getOrgObjectParams(data);

    this.organisationObjectService.create(params).subscribe(() => this.setOrganisationData());
  }

  updateOrgObject(data: Array<any>): void {
    let params = this.getOrgObjectParams(data);

    this.organisationObjectService.update(this.selectedOrgObject.id, params)
    .subscribe(() => this.setOrganisationData());
  }

  getOrgObjectParams(data: Array<any>): User {
    const name = extract('name').as('name').from(data);
    const state = extract('state').as('name').from(data);
    const config = extract('config').as('name').from(data);
    config.map((c: OrgObjectConfig) => c.slug = c.label.toLowerCase().replace(' ', '_'));

    return {
      name,
      config,
      state,
      organisationId: this.currentOrganisationData.id
    } as User;
  }

  modalClosed() {
    console.log('Cancel clicked');
  }

  setSelectedOrgObject(orgObject: OrganisationObject): void {
    if (!Array.isArray(orgObject.config)) {
      this.addConfig(orgObject);
    }
    this.selectedOrgObject = Object.assign({}, orgObject) as OrganisationObject;
  }

}
