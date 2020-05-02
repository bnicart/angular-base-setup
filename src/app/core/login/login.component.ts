import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { UserService } from '../services/custom/user.service';
import { LoginDetail, LoginReponse } from './login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']

})
export class LoginComponent implements OnInit {
  loginDetails: LoginDetail = new LoginDetail('', '');
  loading: boolean = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/data']);
    }
  }

  login(): void {
    this.loading = true;
    this.userService.authenticate(this.loginDetails).subscribe((response: LoginReponse) => {
      this.authService.setToken(response.token);
      this.loading = false;
      this.router.navigate(['/data']);
    }, (error) => {
      this.loading = false;
      this.authService.setToken('');
    });
  }


}
