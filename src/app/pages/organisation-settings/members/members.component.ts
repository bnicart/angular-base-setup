import { Component, OnInit, OnDestroy } from '@angular/core';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';
import { OrganisationService } from 'src/app/core/services/custom/organisation.service';
import { User } from 'src/app/models/user.model';
import { Organisation } from 'src/app/models/organisation.model';
import { UserService } from 'src/app/core/services/custom/user.service';
import { extract } from 'src/app/core/utils/extract-data-from-array';
import { Team } from 'src/app/models/team.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit, OnDestroy {

  subscriptions: Array<Subscription> = [];

  query = '';
  userDetails: User = {};
  selectedMember: User = {};
  currentOrganisationData: Organisation;
  currentOrganisationTeams: Array<Team> = [];
  currentOrganisationTeamsCopy: Array<Team> = [];
  currentOrganisationUsers: Array<User> = [];

  constructor(
    private sessionStorageService: SessionStorageService,
    private organisationService: OrganisationService,
    private userService: UserService
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
      this.currentOrganisationTeams = Array.from(this.currentOrganisationData.teams).filter(team => team.state === 'active');
      this.currentOrganisationUsers = data.users;
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
    let params = this.getUserParams(data);
    params = {
      ...params,
      teamIds: this.currentOrganisationTeamsCopy.filter(team => team.selected).map(team => team.id)
    };

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

  modalClosed() {
    console.log('Cancel clicked');
    this.currentOrganisationTeamsCopy = [];
  }

  setSelectedMember(user: User): void {
    this.selectedMember = Object.assign({}, user) as User;
    this.currentOrganisationTeamsCopy = JSON.parse(JSON.stringify(this.currentOrganisationTeams));
    this.currentOrganisationTeamsCopy.forEach((team: Team) => {
      team.selected = !!this.selectedMember.teams.find((t: Team) => t.id === team.id);
    });
  }

}
