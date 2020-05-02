import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlowsComponent } from './flows.component';

const routes: Routes = [
  { path: '', component: FlowsComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class FlowsRoutingModule { }
