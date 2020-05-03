import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-organisation-settings',
  templateUrl: './organisation-settings.component.html',
  styleUrls: ['./organisation-settings.component.scss']
})
export class OrganisationSettingsComponent implements OnInit {
  userDetails: User;

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.setUserDetails();
    this.localStorageService.watchStorage().subscribe(() => this.setUserDetails());
  }

  setUserDetails(): void {
    this.userDetails = JSON.parse(this.localStorageService.getItem('user_details'));
  }

}
