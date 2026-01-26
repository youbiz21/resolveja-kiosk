import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { IconCardComponent } from '../../../components/icon-card/icon-card.component';
import { EstruturaCabFormFactory } from '../../../models/EstruturaCabeceiraModels';

@Component({
  selector: 'app-estrutura-cabeceira-form',
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
  templateUrl: './estrutura-cabeceira-form.component.html',
  styleUrl: './estrutura-cabeceira-form.component.scss'
})
export class EstruturaCabeceiraFormComponent {
  form = input.required<ReturnType<typeof EstruturaCabFormFactory>>();
}
