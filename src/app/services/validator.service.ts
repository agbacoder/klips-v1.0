import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MaskedLengthValidator {
  static minLength(minLength: number, replace?: Array<string>): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (this.isEmptyInputValue(control.value)) {
        return null;  // don't validate empty values to allow optional controls
      }

      let value = control.value;

      if (!!replace && !!replace.length) {
        replace.forEach(c => {
          var regEx = new RegExp(c, 'g');
          value = value.replace(regEx, "");
        });
      } else {
        value = control.value.replace(/_/g, "");
      }

      const length: number = value ? value.length : 0;
      return length < minLength ?
          {'minlength': {'requiredLength': minLength, 'actualLength': length}} :
          null;
    };
  }

  static maxLength(maxLength: number, replace?: Array<string>): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {    
      let value = control.value;

      if (!!replace && !!replace.length) {
        replace.forEach(c => {
          var regEx = new RegExp(c, 'g');
          value = value.replace(regEx, "");
        });
      } else {
        value = !!value ? control.value.replace(/_/g, "") : value;
      }

      const length: number = value ? value.length : 0;
      return length > maxLength?
          {'maxLength': {'requiredLength': maxLength, 'actualLength': length}} :
          null;
    };
  }

  static isEmptyInputValue(value: any): boolean {
    // we don't check for string here so it also works with arrays
    return value == null || value.length === 0;
  }
}