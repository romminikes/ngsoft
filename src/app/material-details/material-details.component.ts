import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DataFetchService } from '../services/data-fetch.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-material-details',
  templateUrl: './material-details.component.html',
  styleUrls: ['../step.share.less']
})
export class MaterialDetailsComponent implements OnInit {
  @Input() data: IThirdStep
  @Output() goBack: EventEmitter<number>

  constructor(private s: DataFetchService) { 
    this.goBack = new EventEmitter()
  }

  ngOnInit() {
  }

  edit(){
    this.goBack.emit(3)
  }
}
