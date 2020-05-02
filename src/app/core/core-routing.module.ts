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
      {
        path: 'data',
        loadChildren: () =>
          import('../pages/data/data.module').then(m => m.DataModule)
      },
      {
        path: 'flows',
        loadChildren: () =>
          import('../pages/flows/flows.module').then(m => m.FlowsModule)
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('../pages/forms/forms.module').then(m => m.FormsModule)
      },
      {
        path: 'templates',
        loadChildren: () =>
          import('../pages/templates/templates.module').then(m => m.TemplatesModule)
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../pages/profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'organisation-settings',
        loadChildren: () =>
          import('../pages/organisation-settings/organisation-settings.module').then(m => m.OrganisationSettingsModule)
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('../pages/settings/settings.module').then(m => m.SettingsModule)
      },
      { path: '', redirectTo: '/data', pathMatch: 'full' }
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
