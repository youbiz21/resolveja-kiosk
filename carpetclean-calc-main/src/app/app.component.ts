import { Component, OnInit, Type, computed, inject, signal } from '@angular/core';
import { CartViewComponent } from './views/cart-view/cart-view.component';
import { FormViewComponent } from './views/form-view/form-view.component';
import { CommonModule } from '@angular/common';
import { StepperService } from './services/stepper.service';
import { CheckoutViewComponent } from './views/checkout-view/checkout-view.component';
import { CadastroViewComponent } from './views/cadastro-view/cadastro-view.component';
import { ConfirmacaoViewComponent } from './views/confirmacao-view/confirmacao-view.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ProgressSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  stepper = inject(StepperService);
  title = 'sim';

  viewArray: Type<any>[] = [
    CartViewComponent,
    FormViewComponent,
    CheckoutViewComponent,
    CadastroViewComponent,
    ConfirmacaoViewComponent,
  ];

  currentComponent = computed(() => this.viewArray.at(this.stepper.index()));

}
