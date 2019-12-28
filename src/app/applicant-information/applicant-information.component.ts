import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataFetchService } from '../services/data-fetch.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-applicant-information',
  templateUrl: './applicant-information.component.html',
  styleUrls: ['../step.share.less']
})
export class ApplicantInformationComponent implements OnInit {
  @Input() secondFormGroup: FormGroup;

  private _subscribtions: Array<Subscription> = []

  origins: Promise<DefaultType[]>;

  readonly labels = {
    supply: {
      name: "שם הספק",
      numhp: `מספר ח"פ`,
      origin: "מקור הטובין",
      originCountry: "מדינת מקור"
    },
    companyContact: {
      fullname: "שם מלא",
      email: "אימייל",
      phoneNumber: "מספר טלפון",
      id: `ת"ז`,
      cellPhoneNumber: "מספר טלפון נייד",
      faxNumber: "פקס"
    }

  }

  constructor(private dataFetchService: DataFetchService) { }

  get nameControl(){
    return this.secondFormGroup.get('supply').get('name') as FormControl
  }
  get numhpControl(){
    return this.secondFormGroup.get('supply').get('numhp') as FormControl
  }
  get originControlId(){
    return this.secondFormGroup.get('supply').get('origin').get('id') as FormControl
  }
  get originControlTitle(){
    return this.secondFormGroup.get('supply').get('origin').get('title') as FormControl
  }
  get originCountryControl(){
    return this.secondFormGroup.get('supply').get('originCountry') as FormControl
  }

  get fullnameControl(){
    return this.secondFormGroup.get('companyContact').get('fullname') as FormControl
  }
  get emailControl(){
    return this.secondFormGroup.get('companyContact').get('email') as FormControl
  }
  get phoneNumberControl() {
    return this.secondFormGroup.get('companyContact').get('phoneNumber') as FormControl
  }
  get idControl() {
    return this.secondFormGroup.get('companyContact').get('id') as FormControl
  }
  get cellPhoneNumberControl() {
    return this.secondFormGroup.get('companyContact').get('cellPhoneNumber') as FormControl
  }
  get faxNumberControl() {
    return this.secondFormGroup.get('companyContact').get('faxNumber') as FormControl
  }

  ngOnInit() {
    this.origins = this.dataFetchService.getSecondStepData().toPromise()
    
    this._subscribtions.push(this.originControlId.valueChanges.subscribe(async id => {
      const title = (await this.origins).find(o => o.id == id).title
      this.originControlTitle.setValue(title)
    }))

  }

  ngOnDestroy(){
    this._subscribtions.forEach(sub => sub.unsubscribe())
  }

  nextStep(){
    this.secondFormGroup.markAllAsTouched();
    this.secondFormGroup.markAsDirty();
  }

}
