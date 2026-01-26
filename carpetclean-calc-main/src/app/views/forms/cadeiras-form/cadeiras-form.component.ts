import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { IconCardComponent } from '../../../components/icon-card/icon-card.component';
import { CadeiraFormFactory } from '../../../models/CadeiraModels';

@Component({
  selector: 'app-cadeiras-form',
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
  templateUrl: './cadeiras-form.component.html',
  styleUrl: './cadeiras-form.component.scss'
})
export class CadeirasFormComponent {
  form = input.required<ReturnType<typeof CadeiraFormFactory>>();
}
