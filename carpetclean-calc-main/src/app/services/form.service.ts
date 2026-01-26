import { Injectable, signal } from "@angular/core";
import { FormArray } from "@angular/forms";
import { ISimuladorForm } from "../constants/Formularios";

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private _form = signal(new FormArray<ISimuladorForm>([]));

  get form() {
    return this._form;
  }

}
