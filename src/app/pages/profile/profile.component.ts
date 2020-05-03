import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { UserService } from 'src/app/core/services/custom/user.service';
import { LoggedInUserDetails } from 'src/app/core/models/logged-in-user-details.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  loading: boolean = false;
  userDetails: LoggedInUserDetails;

  constructor(
    private localStorageService: LocalStorageService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.userDetails = JSON.parse(this.localStorageService.getItem('user_details'));
  }

  save(): void {
    this.loading = true;
    this.userService.update(this.userDetails.id, { ...this.userDetails })
    .subscribe((response: LoggedInUserDetails) => {
      this.loading = false;
      this.localStorageService.setItem('user_details', JSON.stringify(response));
      this.router.navigate(['/profile']);
    });
  }

}
