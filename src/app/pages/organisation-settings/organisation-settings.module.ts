import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrganisationSettingsComponent } from './organisation-settings.component';
import { OrganisationSettingsRoutingModule } from './organisation-settings-routing.module';
import { TeamSettingsComponent } from './team-settings/team-settings.component';
import { TeamMembersComponent } from './team-members/team-members.component';
import { FlowSetupsComponent } from './flow-setups/flow-setups.component';
import { FormsSetupsComponent } from './forms-setups/forms-setups.component';
import { AutomationComponent } from './automation/automation.component';
import { CommunicationComponent } from './communication/communication.component';
import { BillingComponent } from './billing/billing.component';
import { SettingsComponent } from './settings/settings.component';
import { MembersComponent } from './members/members.component';

@NgModule({
  declarations: [
    OrganisationSettingsComponent,
    TeamSettingsComponent,
    TeamMembersComponent,
    FlowSetupsComponent,
    FormsSetupsComponent,
    AutomationComponent,
    CommunicationComponent,
    BillingComponent,
    SettingsComponent,
    MembersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    OrganisationSettingsRoutingModule
  ]
})
export class OrganisationSettingsModule { }
