import { Component, input } from '@angular/core';
import { PousaPesFormFactory } from '../../../models/PousaPesModels';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { IconCardComponent } from '../../../components/icon-card/icon-card.component';

@Component({
  selector: 'app-pousa-pes-form',
  standalone: true,
  imports: [
    CommonModule,
    IconCardComponent,
    ToggleButtonModule,
    RadioButtonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './pousa-pes-form.component.html',
  styleUrl: './pousa-pes-form.component.scss'
})
export class PousaPesFormComponent {
  form = input.required<ReturnType<typeof PousaPesFormFactory>>()
}
