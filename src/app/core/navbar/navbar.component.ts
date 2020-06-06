import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { SessionStorageService } from '../services/session-storage.service';
import { UserService } from '../services/custom/user.service';

import { LoggedInUserDetails, Organisation } from '../models/logged-in-user-details.model';
import { camelizeKeys } from '../utils/camelize-keys';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userDetails: LoggedInUserDetails;
  loading = false;
  currentOrganisationLogo = '';

  constructor(
    private authService: AuthService,
    private sessionStorageService: SessionStorageService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    const details = this.sessionStorageService.getItem('userDetails');
    if (details) {
      this.setUserDetails(JSON.parse(details));
    } else {
      this.setUserDetails(camelizeKeys(this.authService.getDecodeToken()) as LoggedInUserDetails);
    }
    this.setCurrentOrganisationLogo(this.userDetails.currentOrganisation);
  }

  setUserDetails(value: LoggedInUserDetails): void {
    this.userDetails = value;
    this.sessionStorageService.setItem('userDetails', JSON.stringify(this.userDetails));
  }

  setCurrentOrganisationLogo(organisation: Organisation): void {
    this.currentOrganisationLogo = organisation.logo || 'assets/images/placeholder-logo.png';
  }

  swithOrganisation(organisation: Organisation): void {
    this.loading = true;
    this.userService.update(this.userDetails.id, { currentOrganisationId: organisation.id })
    .subscribe((response: LoggedInUserDetails) => {
      this.loading = false;
      this.setUserDetails(response);
    }, (error) => {
      alert(error);
      this.loading = false;
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
