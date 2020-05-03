import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { LoggedInUserDetails } from 'src/app/core/models/logged-in-user-details.model';

@Component({
  selector: 'app-organisation-settings',
  templateUrl: './organisation-settings.component.html',
  styleUrls: ['./organisation-settings.component.scss']
})
export class OrganisationSettingsComponent implements OnInit {
  userDetails: LoggedInUserDetails;

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.setUserDetails();
    this.localStorageService.watchStorage().subscribe(_data => this.setUserDetails());
  }

  setUserDetails(): void {
    this.userDetails = JSON.parse(this.localStorageService.getItem('user_details'));
  }

}
