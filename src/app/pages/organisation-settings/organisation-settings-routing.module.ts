import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganisationSettingsComponent } from './organisation-settings.component';

const routes: Routes = [
  { path: '', component: OrganisationSettingsComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class OrganisationSettingsRoutingModule { }
