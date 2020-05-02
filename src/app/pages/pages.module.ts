import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataModule } from './data/data.module';
import { FlowsModule } from './flows/flows.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    DataModule,
    FlowsModule
  ]
})
export class PagesModule { }
