import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { StepperService } from '../../services/stepper.service';
import { ButtonModule } from 'primeng/button';
import { SimuladorService } from '../../services/simulador.service';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-confirmacao-view',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule
  ],
  templateUrl: './confirmacao-view.component.html',
  styleUrl: './confirmacao-view.component.scss'
})
export class ConfirmacaoViewComponent {
  stepper = inject(StepperService);
  form = inject(FormService);
  simulador = inject(SimuladorService);

  voltar() {
    this.form.form().clear();
    this.stepper.to(0);
  }
}
