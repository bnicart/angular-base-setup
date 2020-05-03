import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgpSortModule } from 'ngp-sort-pipe';
import { ModalComponent } from '../components/modal/modal.component';

@NgModule({
  declarations: [
    ModalComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormsModule,
    NgpSortModule,

    ModalComponent
  ]
})
export class SharedModule { }
