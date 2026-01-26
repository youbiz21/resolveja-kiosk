import { Component, input } from '@angular/core';
import { CortinadoFormFactory } from '../../../models/CortinadoModels';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { IconComponent } from '../../../components/icon/icon.component';

@Component({
  selector: 'app-cortinados-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputNumberModule,
    ToggleButtonModule,
    IconComponent
  ],
  templateUrl: './cortinados-form.component.html',
  styleUrl: './cortinados-form.component.scss'
})
export class CortinadosFormComponent {
  form = input.required<ReturnType<typeof CortinadoFormFactory>>();


  ngOnInit() {
    this.form().controls.x.valueChanges.subscribe(v => {
      this.form().controls.formato.setValue(v || 0);
    })
  }
}
