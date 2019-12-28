import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-attach-box',
  templateUrl: './attach-box.component.html',
  styleUrls: ['./attach-box.component.less']
})
export class AttachBoxComponent implements OnInit {
  @Input() attach: FormControl
  @Output() delete: EventEmitter<any>

  constructor() {
    this.delete = new EventEmitter();
   }

   get name(){
     return this.attach? this.attach.value: null
   }

  ngOnInit() {
  }

  deleteAttach(){
    this.delete.emit()
  }

}
