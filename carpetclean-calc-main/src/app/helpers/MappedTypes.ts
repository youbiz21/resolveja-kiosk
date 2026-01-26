import { FormControl, FormGroup } from "@angular/forms";

export type FormValueFromFactory<T> = T extends () => FormGroup<infer U>
? { [K in keyof U]: U[K] extends FormControl<infer U> ? NonNullable<U> : never; }
: never;
