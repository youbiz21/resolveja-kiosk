import { Component, input } from '@angular/core';
import { IconCardComponent } from '../../../components/icon-card/icon-card.component';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ColchaoFormFactory } from '../../../models/ColchaoModels';

@Component({
  selector: 'app-colchao-form',
  standalone: true,
  imports: [
    CommonModule,
    IconCardComponent,
    ButtonModule,
    ToggleButtonModule,
    ReactiveFormsModule,
    FormsModule,
    RadioButtonModule
  ],
  templateUrl: './colchao-form.component.html',
  styleUrl: './colchao-form.component.scss'
})
export class ColchaoFormComponent {
  form = input.required<ReturnType<typeof ColchaoFormFactory>>();
}
