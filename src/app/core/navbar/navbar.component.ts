import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoggedInUserDetails, Organisation } from '../models/logged-in-user-details.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userDetails: LoggedInUserDetails;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userDetails = this.authService.getDecodeToken() as LoggedInUserDetails;
  }

  getCurrentOrganisationLogo(organisation: Organisation): string {
    const logoUrl: string = organisation.logo || 'assets/images/placeholder-logo.png';
    return logoUrl;
  }

  logout(): void {
    this.authService.logout();
  }
}
