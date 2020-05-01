import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from './login.service';
import { LoginDetail, LoginReponse } from './login.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']

})
export class LoginComponent implements OnInit {
  loginDetails: LoginDetail = new LoginDetail('', '');
  loading: boolean = false;

  constructor(
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  login(): void {
    this.loading = true;
    this.loginService.authenticate(this.loginDetails).subscribe((response: LoginReponse) => {
      this.authService.setToken(response.token);
      this.loading = false;
      this.router.navigate(['/']);
    }, (error) => {
      this.loading = false;
      this.authService.setToken('');
    });
  }


}
