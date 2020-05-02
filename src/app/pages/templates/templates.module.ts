import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplatesComponent } from './templates.component';
import { TemplatesRoutingModule } from './templates-routing.module';

@NgModule({
  declarations: [TemplatesComponent],
  imports: [
    CommonModule,
    TemplatesRoutingModule
  ]
})
export class TemplatesModule { }
