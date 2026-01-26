import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";

export function atLeastOne(...args: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const someValid = args.some(c => (control as FormGroup).controls[c].value == true);
    if (someValid) return null;
    return { atLeastOne: true };
  };
}
