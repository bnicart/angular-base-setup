import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { OrganisationService } from 'src/app/core/services/custom/organisation.service';
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

  constructor(
    private localStorageService: LocalStorageService,
    private organisationService: OrganisationService
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
    return teams.filter((team: Team) => team.name.toLowerCase().includes(this.query.toLowerCase()));
  }

}
