import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faQuestionCircle, faUserCircle, faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import { faArrowRight, faTimes, faBox, faPeopleCarry } from '@fortawesome/free-solid-svg-icons';
import { ValidatorsPatternsService } from './services/validators-patterns.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnDestroy {
  title = 'ngsoft';

  private _subscribtions: Array<Subscription> = []

  mainFormGroup: FormGroup;
  allData: Data
  formValid = false

  constructor(private _formBuilder: FormBuilder, private library: FaIconLibrary, private validation: ValidatorsPatternsService) {

    this.library.addIcons(faArrowRight, faTimes, faQuestionCircle, faUserCircle, faBox, faPeopleCarry, faPaperPlane);
  }

  ngOnInit() {

    this.mainFormGroup = this._formBuilder.group({
      firstFormGroup: this._formBuilder.group({
        deliveryTarget: this._formBuilder.group({
          location: [null, Validators.required],
          recieverName: [null, Validators.required],
          address: [null, Validators.required],
          requiredPassage: this._formBuilder.group({
            id: [null, Validators.required],
            title: [null],
          }, [Validators.required]),
          driverName: [null, Validators.required],
          recieverPhoneNumber: [null, [Validators.required, this.validation.validatePhoneNumber()]],
          capacity: [null, Validators.required],
          moneyValue: this._formBuilder.group({
            value: [null, [Validators.required, this.validation.validateNumbers()]],
            moneyType: [null, Validators.required]
          }),
          driverId: [null, [Validators.required, this.validation.validateId()]]
        }),
        moreData: this._formBuilder.group({
          comments: [null],
          attaches: this._formBuilder.array([])
        })
      }),

      secondFormGroup: this._formBuilder.group({
        supply: this._formBuilder.group({
          name: [null, Validators.required],
          numhp: [null, [Validators.required, this.validation.validateNumbers()]],
          origin: this._formBuilder.group({
            id: [null, Validators.required],
            title: [null]
          }),
          originCountry: [null, Validators.required]
        }),
        companyContact: this._formBuilder.group({
          fullname: [null, Validators.required],
          email: [null, [Validators.required, Validators.email]],
          phoneNumber: ['', [this.validation.validateTelePhoneNumber()]],
          id: [null, [Validators.required, this.validation.validateId()]],
          cellPhoneNumber: [null, [this.validation.validatePhoneNumber()]],
          faxNumber: ['', [this.validation.validateFax()]],
        })
      }),

      thirdFormGroup: this._formBuilder.group({
        material: this._formBuilder.group({
          name: [null, Validators.required],
          designation: [null, Validators.required],
          category: this._formBuilder.group({
            id: [null, Validators.required],
            title: [null],
          }),
          requestedNum: this._formBuilder.group({
            amount: [null, [Validators.required, this.validation.validateNumbers()]],
            measureType: this._formBuilder.group({
              id: [null, Validators.required],
              title: [null],
            }),
          }),
          components: this._formBuilder.array([])
        })
      })
    })

    this._subscribtions.push(this.mainFormGroup.statusChanges.subscribe(s => {
      this.formValid = false
      if (s === 'VALID') {
        this.allData = this.mainFormGroup.getRawValue()
        this.formValid = true

      }
    }))
  }

  ngOnDestroy() {
    this._subscribtions.forEach(sub => sub.unsubscribe())
  }

  goBack(step, stepper) {
    switch (step) {
      case 1:
        stepper.previous();
        stepper.previous();
        stepper.previous();
        break;
      case 2:
        stepper.previous();
        stepper.previous();
        break;
      case 3:
        stepper.previous();
        break
    }
  }
}
