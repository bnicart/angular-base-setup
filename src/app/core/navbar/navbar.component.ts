import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';
import { UserService } from '../services/custom/user.service';

import { LoggedInUserDetails, Organisation } from '../models/logged-in-user-details.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userDetails: LoggedInUserDetails;
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    const details = this.localStorageService.getItem('user_details');
    if (details) {
      this.setUserDetails(JSON.parse(details));
    } else {
      this.setUserDetails(this.authService.getDecodeToken() as LoggedInUserDetails);
    }
  }

  setUserDetails(value: LoggedInUserDetails): void {
    this.userDetails = value;
    this.localStorageService.setItem('user_details', JSON.stringify(this.userDetails));
  }

  getCurrentOrganisationLogo(organisation: Organisation): string {
    const logoUrl: string = organisation.logo || 'assets/images/placeholder-logo.png';
    return logoUrl;
  }

  swithOrganisation(organisation: Organisation): void {
    this.loading = true;
    this.userService.update(this.userDetails.id, { current_organisation_id: organisation.id })
    .subscribe((response: LoggedInUserDetails) => {
      this.loading = false;
      this.setUserDetails(response);
    }, (error) => {
      alert(error);
      this.loading = false;
    })
  }

  logout(): void {
    this.authService.logout();
  }
}
