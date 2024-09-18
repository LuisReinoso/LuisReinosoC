import { AbstractControl, ValidatorFn } from '@angular/forms';

// Here we have to take care of different browsers and date values
// from the datepicker, (tested on Firefox and Chrome)
export function isTodayOrFutureDateValidator(control: AbstractControl): { [key: string]: any } | null {
  const today = new Date();

  if (!control.value) {
    return {dateValid: true};
  }

  let dateString = '';

  if (typeof control.value === 'string') {
    dateString = control.value;
  }

  if (control.value instanceof Date) {
    dateString = control.value.toISOString().split('T')[0];
  }

  const [year, month, day] = dateString.split('-').map(Number);
  const inputDate = new Date(year, month - 1, day); // month is 0-based in JS

  today.setHours(0, 0, 0, 0);
  inputDate.setHours(0, 0, 0, 0);

  return inputDate.getTime() >= today.getTime() ? null : { dateValid: true };
}

export function isRevisionDateOneYearLaterValidator(releaseControlName: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {

    const releaseDateControl = control.root.get(releaseControlName);
    if (!releaseDateControl || !releaseDateControl.value) {
      return null;
    }

    const releaseDate = new Date(releaseDateControl.value);
    const revisionDate = new Date(control.value);

    releaseDate.setHours(0, 0, 0, 0);
    revisionDate.setHours(0, 0, 0, 0);

    const oneYearLater = new Date(releaseDate);
    oneYearLater.setFullYear(releaseDate.getFullYear() + 1);
    oneYearLater.setHours(0, 0, 0, 0);

    return revisionDate.getTime() === oneYearLater.getTime() ? null : { dateValid: true };
  };
}
