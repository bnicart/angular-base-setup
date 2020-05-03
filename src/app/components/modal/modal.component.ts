import { Component, OnInit, Input, ContentChildren, QueryList, Output, EventEmitter } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() title = 'Modal Title';
  @Input() name: string;
  @Input() saveButtonText = 'Save';
  @Input() saveButtonClass = 'btn-primary';
  @Input() cancelButtonText = 'Cancel';
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
