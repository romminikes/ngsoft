import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-component-row',
  templateUrl: './component-row.component.html',
  styleUrls: ['./component-row.component.less']
})
export class ComponentRowComponent implements OnInit {
  @Input() component: Ingredient;
  @Input() editable: boolean;
  @Input() percentagesControl: FormControl
  @Output() delete: EventEmitter<string>

  percentages: number = null

  constructor() {
    this.delete = new EventEmitter();
  }

  ngOnInit() {
  }

  deleteRow() {
    this.delete.emit(this.component.id)
  }
}
