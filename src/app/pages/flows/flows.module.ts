import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlowsComponent } from './flows.component';
import { FlowsRoutingModule } from './flows-routing.module';

@NgModule({
  declarations: [FlowsComponent],
  imports: [
    CommonModule,
    FlowsRoutingModule
  ]
})
export class FlowsModule { }
