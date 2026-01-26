import { Component, computed, inject } from '@angular/core';
import { StepperService } from '../../services/stepper.service';
import { Formularios, ISimuladorForm } from '../../constants/Formularios';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { TapeteFormComponent } from '../forms/tapete-form/tapete-form.component';
import { SofaFormComponent } from '../forms/sofa-form/sofa-form.component';
import { ColchaoFormComponent } from '../forms/colchao-form/colchao-form.component';
import { EstruturaCabeceiraFormComponent } from '../forms/estrutura-cabeceira-form/estrutura-cabeceira-form.component';
import { CortinadosFormComponent } from '../forms/cortinados-form/cortinados-form.component';
import { CadeirasFormComponent } from '../forms/cadeiras-form/cadeiras-form.component';
import { PousaPesFormComponent } from '../forms/pousa-pes-form/pousa-pes-form.component';
import { PuffFormComponent } from '../forms/puff-form/puff-form.component';
import { CarpeteFormComponent } from '../forms/carpete-form/carpete-form.component';
import { ButtonModule } from 'primeng/button';
import { FormService } from '../../services/form.service';
import { IconComponent } from '../../components/icon/icon.component';

@Component({
  selector: 'app-form-view',
  standalone: true,
  imports: [
    CommonModule,
    TabViewModule,
    TapeteFormComponent,
    SofaFormComponent,
    ColchaoFormComponent,
    EstruturaCabeceiraFormComponent,
    CortinadosFormComponent,
    CadeirasFormComponent,
    PousaPesFormComponent,
    PuffFormComponent,
    ButtonModule,
    CarpeteFormComponent,
    IconComponent
  ],
  templateUrl: './form-view.component.html',
  styleUrl: './form-view.component.scss'
})
export class FormViewComponent {
  stepper = inject(StepperService);
  form = inject(FormService);

  FORMS = Formularios;

  tabIndex = 0;

  avancar(f: ISimuladorForm) {
    if(f.invalid) return;
    if(this.form.form().length == (this.tabIndex + 1)) {
      this.stepper.next()
    } else {
      this.tabIndex++;
    }
  }

  voltar() {
    this.stepper.prev()
  }
}
