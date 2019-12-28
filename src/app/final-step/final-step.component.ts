import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-final-step',
  templateUrl: './final-step.component.html',
  styleUrls: ['./final-step.component.less']
})
export class FinalStepComponent implements OnInit {
  @Input() data: Data
  @Output() goBack: EventEmitter<number>


  constructor() {
    this.goBack = new EventEmitter()
  }

  ngOnInit() {
  }

}
