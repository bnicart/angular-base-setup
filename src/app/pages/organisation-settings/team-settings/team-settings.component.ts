import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { OrganisationService } from 'src/app/core/services/custom/organisation.service';
import { TeamService } from 'src/app/core/services/custom/team.service';
import { Organisation } from 'src/app/models/organisation.model';
import { User } from 'src/app/models/user.model';
import { Team } from 'src/app/models/team.model';
import { extract } from 'src/app/core/utils/extract-data-from-array';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-team-settings',
  templateUrl: './team-settings.component.html',
  styleUrls: ['./team-settings.component.scss']
})
export class TeamSettingsComponent implements OnInit, OnDestroy {
  subscriptions: Array<Subscription> = [];

  query = '';
  userDetails: User;
  currentOrganisationData: Organisation;
  selectedTeam: Team = {};

  constructor(
    private localStorageService: LocalStorageService,
    private organisationService: OrganisationService,
    private teamService: TeamService
  ) { }

  ngOnInit() {
    this.setOrganisationData();
    const localStorageService$ = this.localStorageService.watchStorage().subscribe(() => this.setOrganisationData());
    this.subscriptions.push(localStorageService$);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  setOrganisationData(): void {
    this.userDetails = JSON.parse(this.localStorageService.getItem('userDetails'));

    if (!this.userDetails) { return; }

    this.organisationService.get(this.userDetails.currentOrganisation.id).subscribe((data: Organisation) => {
      this.currentOrganisationData = data;
    });
  }

  filteredTeams(teams: Array<Team>): Array<Team> {
    if (!teams) { teams = []; }
    return teams.filter((team: Team) => team.name.toLowerCase().includes(this.query.toLowerCase()))
      .sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1);
  }

  createTeam(data: Array<any>) {
    const params = this.getTeamParams(data);

    this.teamService.create(params)
    .subscribe(() => this.setOrganisationData());
  }

  updateTeam(data: Array<any>): void {
    const params = this.getTeamParams(data);

    this.teamService.update(this.selectedTeam.id, params)
    .subscribe(() => this.setOrganisationData());
  }

  deleteTeam(): void {
    this.teamService.remove(this.selectedTeam.id)
    .subscribe(() => this.setOrganisationData());
  }

  getTeamParams(data: Array<any>): Team {
    const teamName = extract('teamName').as('name').from(data);
    const teamState = extract('teamState').as('name').from(data);

    return {
      name: teamName,
      state: teamState,
      organisationId: this.currentOrganisationData.id
    } as Team;
  }

  cancelTeamCreation() {
    console.log('Cancel clicked');
  }

  setSelectedTeam(team: Team): void {
    this.selectedTeam = Object.assign({}, team);
  }
}
