import { Component, OnInit, Input, ContentChildren, QueryList, Output, EventEmitter } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() title: string = 'Modal Title';
  @Input() name: string;
  @Input() saveButtonText: string = 'Save';
  @Input() saveButtonClass: string = 'btn-primary';
  @Input() cancelButtonText: string = 'Cancel';
  @Output() saveClicked: EventEmitter<Array<NgModel>> = new EventEmitter();
  @Output() cancelClicked: EventEmitter<void> = new EventEmitter();

  @ContentChildren(NgModel) public models: QueryList<NgModel>;

  constructor() { }

  ngOnInit() { }

  save() {
    this.saveClicked.emit(this.models.toArray());
  }

  cancel() {
    this.cancelClicked.emit();
  }

}
