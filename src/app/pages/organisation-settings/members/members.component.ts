import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { OrganisationService } from 'src/app/core/services/custom/organisation.service';
import { User } from 'src/app/models/user.model';
import { Organisation } from 'src/app/models/organisation.model';
import { UserService } from 'src/app/core/services/custom/user.service';
import { extract } from 'src/app/core/utils/extract-data-from-array';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  query = '';
  userDetails: User = {};
  selectedMember: User = {};
  currentOrganisationData: Organisation;

  constructor(
    private localStorageService: LocalStorageService,
    private organisationService: OrganisationService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.setOrganisationData();
    this.localStorageService.watchStorage().subscribe(() => this.setOrganisationData());
  }

  setOrganisationData(): void {
    this.userDetails = JSON.parse(this.localStorageService.getItem('userDetails'));
    this.organisationService.get(this.userDetails.currentOrganisation.id).subscribe((data: Organisation) => {
      this.currentOrganisationData = data;
    });
  }

  filteredMembers(users: Array<User>): Array<User> {
    if (!users) { users = []; }
    return users.filter((user: User) => user.name.toLowerCase().includes(this.query.toLowerCase()))
      .sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1);
  }

  createMember(data: Array<any>) {
    const params = this.getUserParams(data);

    this.userService.create(params).subscribe(() => this.setOrganisationData());
  }

  updateMember(data: Array<any>): void {
    const params = this.getUserParams(data);

    this.userService.update(this.selectedMember.id, params)
    .subscribe(() => this.setOrganisationData());
  }

  getUserParams(data: Array<any>): User {
    const firstName = extract('firstName').as('name').from(data);
    const lastName = extract('lastName').as('name').from(data);
    const email = extract('email').as('name').from(data);
    const username = extract('username').as('name').from(data);
    const password = extract('password').as('name').from(data);
    const state = extract('state').as('name').from(data);

    return {
      firstName,
      lastName,
      email,
      username,
      password,
      state,
      currentOrganisationId: this.currentOrganisationData.id
    } as User;
  }

  cancelMemberCreation() {
    console.log('Cancel clicked');
  }

  setSelectedMember(user: User): void {
    this.selectedMember = Object.assign({}, user) as User;
  }

}
