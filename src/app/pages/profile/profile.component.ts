import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { UserService } from 'src/app/core/services/custom/user.service';
import { User } from 'src/app/models/user.model';
import { camelizeKeys } from 'src/app/core/utils/camelize-keys';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  loading = false;
  userDetails: User;

  constructor(
    private localStorageService: LocalStorageService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.userDetails = camelizeKeys(JSON.parse(this.localStorageService.getItem('userDetails')));
  }

  save(): void {
    this.loading = true;
    this.userService.update(this.userDetails.id, { ...this.userDetails })
    .subscribe((response: User) => {
      this.loading = false;
      this.localStorageService.setItem('userDetails', JSON.stringify(response));
      this.router.navigate(['/profile']);
    }, _ => { this.loading = false; });
  }

}
