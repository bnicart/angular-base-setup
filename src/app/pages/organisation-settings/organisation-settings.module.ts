import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganisationSettingsComponent } from './organisation-settings.component';
import { OrganisationSettingsRoutingModule } from './organisation-settings-routing.module';

@NgModule({
  declarations: [OrganisationSettingsComponent],
  imports: [
    CommonModule,
    OrganisationSettingsRoutingModule
  ]
})
export class OrganisationSettingsModule { }
