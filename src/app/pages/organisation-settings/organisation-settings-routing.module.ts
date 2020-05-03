import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganisationSettingsComponent } from './organisation-settings.component';
import { TeamSettingsComponent } from './team-settings/team-settings.component';
import { TeamMembersComponent } from './team-members/team-members.component';
import { FlowSetupsComponent } from './flow-setups/flow-setups.component';
import { FormsSetupsComponent } from './forms-setups/forms-setups.component';
import { AutomationComponent } from './automation/automation.component';
import { CommunicationComponent } from './communication/communication.component';
import { BillingComponent } from './billing/billing.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: OrganisationSettingsComponent,
    children: [
      { path: 'team-settings', component: TeamSettingsComponent },
      { path: 'team-members', component: TeamMembersComponent },
      { path: 'flow-setups', component: FlowSetupsComponent },
      { path: 'forms-setups', component: FormsSetupsComponent },
      { path: 'automation', component: AutomationComponent },
      { path: 'communication', component: CommunicationComponent },
      { path: 'billing', component: BillingComponent },
      { path: 'settings', component: SettingsComponent },

      { path: '', redirectTo: 'team-settings', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganisationSettingsRoutingModule { }
