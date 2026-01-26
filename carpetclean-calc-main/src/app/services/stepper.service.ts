import { Injectable, signal } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { ISimuladorForm } from '../constants/Formularios';



@Injectable({
  providedIn: 'root'
})
export class StepperService {
  private _index = signal(0);

  get index() {
    return this._index.asReadonly();
  }

  public to(index: number) {
    this._index.set(index);
  }

  public next() {
    this._index.update(i => i + 1);
  }

  public prev() {
    this._index.update(i => i - 1);
  }
}


