import {FormGroup} from '@angular/forms';

export function mustMatch(controlName: string, matchingControlName: string, errorText: string): (formGroup: FormGroup) => void {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors[errorText]) {
      return;
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({[errorText]: true});
    } else {
      matchingControl.setErrors(null);
    }
  }
}
