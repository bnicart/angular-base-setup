import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';

const routes: Routes = [
  { path: '', component: SettingsComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class SettingsRoutingModule { }
