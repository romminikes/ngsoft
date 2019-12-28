import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-components-table',
  templateUrl: './components-table.component.html',
  styleUrls: ['./components-table.component.less']
})
export class ComponentsTableComponent implements OnInit {
  @Input() editable: boolean;
  @Input() componentsFormArray: FormArray;
  @Input() components: Array<Ingredient>;
  @Output() deleteComponent: EventEmitter<string>

  private _subscribtions: Array<Subscription> = []


  readonly headers = {
    name: "שם המרכיב",
    formula: "פורמולה",
    cas: "מספר CAS",
    percentages: "% מכל התערובת"
  }

  constructor() {
    this.deleteComponent = new EventEmitter();
   }

  ngOnInit() {
    if(this.componentsFormArray){
      this._subscribtions.push(this.componentsFormArray.valueChanges.subscribe(change => {
        this.components = change;
      }))
      this.components = this.componentsFormArray.getRawValue();
    }
  }
  
  ngOnDestroy(){
    this._subscribtions.forEach(sub => sub.unsubscribe())
  }

  delete(id){
    this.deleteComponent.emit(id)
  }

}
