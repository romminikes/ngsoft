import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsPatternsService {

  constructor() { }

  private readonly phoneNumberRegEx: RegExp = /^05\d([-]{0,1})\d{7}$/
  private readonly telephoneNumberRegEx: RegExp = /^(?:(03([-]{0,1}))?\d{7})?$/
  private readonly idRegex: RegExp = /^\d{7,9}?$/
  private readonly numbersRegEx: RegExp = /^\d+$/
  private readonly faxRegEx: RegExp = /^(?:(03([-]{0,1}))?\d{7})?$/
  
  private readonly hebrewRegEx: RegExp = /^[a-z\u0590-\u05fe]+$/
  private readonly textRegEx: RegExp = /^[a-zA-Z\u0590-\u05FF\s]+$/

  validatePhoneNumber(){
    return (control: AbstractControl): {'invalidNumber': {value: any, msg: string}} | null => {
      const passed = this.phoneNumberRegEx.test(control.value);
      return passed ? null : {'invalidNumber': {value: control.value, msg: "מספר טלפון נייד לא תקין"}};
    }
  }

  validateTelePhoneNumber(){
    return (control: AbstractControl): {'invalidNumber': {value: any, msg: string}} | null => {
      const passed = this.telephoneNumberRegEx.test(control.value);
      return passed ? null : {'invalidNumber': {value: control.value, msg: "מספר טלפון לא תקין"}};
    }
  }

  validateId(){
    return (control: AbstractControl): {'invalidId': {value: any, msg: string}} | null => {
      const passed = this.idRegex.test(control.value);
      return passed ? null : {'invalidId': {value: control.value, msg: 'מספר ת"ז לא תקין'}};
    }
  }

  validateNumbers(){
    return (control: AbstractControl): {'invalidNumber': {value: any, msg: string}} | null => {
      const passed = this.numbersRegEx.test(control.value);
      return passed ? null : {'invalidNumber': {value: control.value, msg: 'נקלט סימן לא תקין, תמלא מספר'}};
    }
  }

  validateFax(){
    return (control: AbstractControl): {'invalidNumber': {value: any, msg: string}} | null => {
      const passed = this.faxRegEx.test(control.value);
      return passed ? null : {'invalidNumber': {value: control.value, msg: 'מספר פקס לא תקין'}};
    }
  }

  // validateText(){
  //   return (control: AbstractControl): {[key: string]: any} | null => {
  //     const passed = this.hebrewRegEx.test(control.value);
  //     return passed ? null : {'invalidId': {value: control.value, msg: 'מספר ת"ז לא תקין'}};
  //   }
  // }
}
