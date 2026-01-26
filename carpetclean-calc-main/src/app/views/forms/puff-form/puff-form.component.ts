import { Component, input } from '@angular/core';
import { PuffFormFactory } from '../../../models/PuffModels';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ToggleButtonModule } from 'primeng/togglebutton';

@Component({
  selector: 'app-puff-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToggleButtonModule,
  ],
  templateUrl: './puff-form.component.html',
  styleUrl: './puff-form.component.scss'
})
export class PuffFormComponent {
  form = input.required<ReturnType<typeof PuffFormFactory>>()
}
