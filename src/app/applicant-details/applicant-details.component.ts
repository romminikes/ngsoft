import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-applicant-details',
  templateUrl: './applicant-details.component.html',
  styleUrls: ['../step.share.less']
})
export class ApplicantDetailsComponent implements OnInit, OnDestroy {
  @Input() data: ISecondStep
  @Output() goBack: EventEmitter<number>

  constructor() { 
    this.goBack = new EventEmitter()
  }

  ngOnInit() {
  }
  
  ngOnDestroy() {
  }

  edit(){
    this.goBack.emit(2)
  }

}
