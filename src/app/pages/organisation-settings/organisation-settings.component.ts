import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-organisation-settings',
  templateUrl: './organisation-settings.component.html',
  styleUrls: ['./organisation-settings.component.scss']
})
export class OrganisationSettingsComponent implements OnInit {
  userDetails: User;

  constructor(private sessionStorageService: SessionStorageService) { }

  ngOnInit() {
    this.setUserDetails();
    this.sessionStorageService.watchStorage().subscribe(() => this.setUserDetails());
  }

  setUserDetails(): void {
    this.userDetails = JSON.parse(this.sessionStorageService.getItem('userDetails'));
  }

}
