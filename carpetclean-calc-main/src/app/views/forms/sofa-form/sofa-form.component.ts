import { Component, computed, input, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import { IconCardComponent } from '../../../components/icon-card/icon-card.component';
import { SofaFormFactory } from '../../../models/SofaModels';
import { CounterComponent } from '../../../components/counter/counter.component';
import { CommonModule } from '@angular/common';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { IconComponent } from '../../../components/icon/icon.component';

@Component({
  selector: 'app-sofa-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RadioButtonModule,
    InputNumberModule,
    ButtonModule,
    ToggleButtonModule,
    IconCardComponent,
    IconComponent,
    CounterComponent,
    CommonModule
  ],
  templateUrl: './sofa-form.component.html',
  styleUrl: './sofa-form.component.scss'
})
export class SofaFormComponent {
  form = input.required<ReturnType<typeof SofaFormFactory>>();

  iconSize = signal(30)
  sofa = signal(`sofa-1`);
  
  increment() {
    let lugares = this.form().controls.lugares.value || 0;
    this.form().controls.lugares.setValue(lugares + 1);
    lugares = this.form().controls.lugares.getRawValue() || 0; 
    this.sofa.set(`sofa-${lugares}`);
    this.iconSize.set(25 + lugares * 7);
  }
  decrement() {
    let lugares = this.form().controls.lugares.value || 0;
    this.form().controls.lugares.setValue(lugares - 1);
    lugares = this.form().controls.lugares.getRawValue() || 0; 
    this.sofa.set(`sofa-${lugares}`);
    this.iconSize.set(25 + lugares * 7);
  }
}
