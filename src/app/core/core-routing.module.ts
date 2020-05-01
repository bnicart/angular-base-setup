import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRootComponent } from './app-root/app-root.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: AppRootComponent,
    canActivate: [AuthGuard],
    children: [
      // {
      //   path: 'component',
      //   loadChildren: () =>
      //     import('../component/component.module').then(m => m.ComponentModule)
      // }
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })]
})
export class CoreRoutingModule { }
