import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataFetchService } from '../services/data-fetch.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-delivery-details',
  templateUrl: './delivery-details.component.html',
  styleUrls: ['../step.share.less']
})
export class DeliveryDetailsComponent implements OnInit {
  @Input() data: IFirstStep
  @Output() goBack: EventEmitter<number>

  passage

  constructor() {
    this.goBack = new EventEmitter()
  }

  ngOnInit() {
  }

  edit() {
    this.goBack.emit(1)
  }

}
