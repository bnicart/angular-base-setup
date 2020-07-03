import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgpSortModule } from 'ngp-sort-pipe';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { ToastrModule } from 'ngx-toastr';

import { CoreRoutingModule } from './core-routing.module';

import { AppRootComponent } from './app-root/app-root.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';
import { HttpErrorInterceptor } from './services/http-error.interceptor';
import { TokenInterceptor } from './services/token.interceptor';

@NgModule({
  imports: [
    // Angular Modules
    CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,

    // Core
    CoreRoutingModule,

    // Plugins
    FontAwesomeModule,
    NgpSortModule,
    LoadingBarHttpClientModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-left',
      preventDuplicates: true
    }),
  ],
  exports: [RouterModule, NavbarComponent],
  declarations: [
    AppRootComponent,
    NavbarComponent,
    LoginComponent,
    PageNotFoundComponent,
  ],
  providers: [
    AuthGuard,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
})
export class CoreModule {}
