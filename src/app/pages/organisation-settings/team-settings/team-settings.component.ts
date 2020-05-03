import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { OrganisationService } from 'src/app/core/services/custom/organisation.service';
import { TeamService } from 'src/app/core/services/custom/team.service';
import { Organisation } from 'src/app/models/organisation.model';
import { User } from 'src/app/models/user.model';
import { Team } from 'src/app/models/team.model';

@Component({
  selector: 'app-team-settings',
  templateUrl: './team-settings.component.html',
  styleUrls: ['./team-settings.component.scss']
})
export class TeamSettingsComponent implements OnInit {
  query: string = '';
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
    this.localStorageService.watchStorage().subscribe(_data => this.setOrganisationData());
  }

  setOrganisationData(): void {
    this.userDetails = JSON.parse(this.localStorageService.getItem('user_details'));
    this.organisationService.get(this.userDetails.current_organisation.id).subscribe((data: Organisation) => {
      this.currentOrganisationData = data;
    });
  }

  filteredTeams(teams: Array<Team>): Array<Team> {
    if (!teams) { teams = []; }
    return teams.filter((team: Team) => team.name.toLowerCase().includes(this.query.toLowerCase()))
      .sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1);
  }

  createTeam(data: Array<any>) {
    const teamName = data.find(d => d.name === 'teamName').value;

    this.teamService.create({name: teamName, organisation_id: this.currentOrganisationData.id})
    .subscribe(_response => this.setOrganisationData());
  }

  updateTeam(data: Array<any>): void {
    const teamName = data.find(d => d.name === 'teamName').value;

    this.teamService.update(this.selectedTeam.id, { name: teamName })
    .subscribe(_response => this.setOrganisationData());
  }

  deleteTeam(): void {
    this.teamService.remove(this.selectedTeam.id)
    .subscribe(_response => this.setOrganisationData());
  }

  cancelTeamCreation() {
    console.log('Cancel clicked');
  }

  setSelectedTeam(team: Team): void {
    this.selectedTeam = Object.assign({}, team);
  }
}
