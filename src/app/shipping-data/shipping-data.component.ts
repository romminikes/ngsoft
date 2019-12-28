import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { DataFetchService } from '../services/data-fetch.service';
import { Observable, of, Subscription } from 'rxjs';

enum TargetLocation {
  gaza = 1,
  aiosh = 2
}

interface IFirstStep {
  targetLocation: TargetLocation
  recieverName: string
  address: string
  requiredPassageId: string
  driverName: string
  recieverPhoneNumber: string
  capacity: string
  moneyValue: string
  driverId: string
}

@Component({
  selector: 'app-shipping-data',
  templateUrl: './shipping-data.component.html',
  styleUrls: ['../step.share.less']
})
export class ShippingDataComponent implements OnInit, OnDestroy {

  @Input() firstFormGroup: FormGroup;

  subscribtions: Array<Subscription> = []

  passages: Promise<DefaultType[]>;
  capacityUnits: Observable<DefaultType[]>
  moneyTypes: Observable<DefaultType[]>

  attaches: DefaultType[] = []

  constructor(private _formBuilder: FormBuilder, private dataFetchService: DataFetchService) { 
  }

  get recieverNameControl() {
    return this.firstFormGroup.get("deliveryTarget").get('recieverName') as FormControl;
  }
  get addressControl() {
    return this.firstFormGroup.get("deliveryTarget").get('address') as FormControl;
  }
  get requiredPassageIdControl() {
    return this.firstFormGroup.get("deliveryTarget").get('requiredPassage').get('id') as FormControl;
  }
  get requiredPassageTitleControl() {
    return this.firstFormGroup.get("deliveryTarget").get('requiredPassage').get('title') as FormControl;
  }
  get driverNameControl() {
    return this.firstFormGroup.get("deliveryTarget").get('driverName') as FormControl;
  }
  get recieverPhoneNumberControl() {
    return this.firstFormGroup.get("deliveryTarget").get('recieverPhoneNumber') as FormControl;
  }
  get capacityControl() {
    return this.firstFormGroup.get("deliveryTarget").get('capacity') as FormControl;
  }
  get moneyValueControl() {
    return this.firstFormGroup.get("deliveryTarget").get('moneyValue').get('value') as FormControl;
  }
  get moneyTypeControl() {
    return this.firstFormGroup.get("deliveryTarget").get('moneyValue').get('moneyType') as FormControl;
  }
  get driverIdControl() {
    return this.firstFormGroup.get("deliveryTarget").get('driverId') as FormControl;
  }

  
  get commenntsControl() {
    return this.firstFormGroup.get("moreData").get('comments') as FormControl;
  }
  get attachesControl() {
    return this.firstFormGroup.get("moreData").get('attaches') as FormArray;
  }

  ngOnInit() {
    this.passages = this.dataFetchService.getFirstStepData().toPromise()
    this.capacityUnits = this.getCapacityUnits()
    this.moneyTypes = this.getMoneyTypes()

    this.subscribtions.push(this.requiredPassageIdControl.valueChanges.subscribe(async id => {
      const title = (await this.passages).find(pass => pass.id == id).title
      this.requiredPassageTitleControl.setValue(title)
    }))

    this.subscribtions.push(this.attachesControl.valueChanges.subscribe(val =>{ this.attaches = val}))
  }

  ngOnDestroy(){
    this.subscribtions.forEach(sub => sub.unsubscribe())
  }

  public getCapacityUnits(): Observable<DefaultType[]> {
    const mocked: DefaultType[] = [
      { id: 1, title: 'סמ"ק' }
    ];
    return of(mocked);
  }

  
  public getMoneyTypes(): Observable<any[]> {
    const mocked: any[] = [
      { title: '$' },
      { title: '₪' },
      { title: '£' },
      { title: '€' },
    ];
    return of(mocked);
  }

  deleteAttach(i) {
    this.attachesControl.removeAt(i)
  }

  addAttach() {
    this.attachesControl.patchValue(["קובץ.doc"])
  }

  nextStep() {
    this.firstFormGroup.markAllAsTouched();
    this.firstFormGroup.markAsDirty();
  }
}
