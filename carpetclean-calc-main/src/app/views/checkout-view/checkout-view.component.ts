import { Component, OnInit, computed, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ResultadoItem, SimuladorService } from '../../services/simulador.service';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { StepperService } from '../../services/stepper.service';
import { FormService } from '../../services/form.service';
import { IAbstractFormValue } from '../../constants/Formularios';
import { OfertaService } from '../../services/oferta.service';
import { RadioButtonModule  } from 'primeng/radiobutton';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout-view',
  standalone: true,
  imports: [CommonModule, ButtonModule, ProgressSpinnerModule, RadioButtonModule, ReactiveFormsModule],
  templateUrl: './checkout-view.component.html',
  styleUrl: './checkout-view.component.scss'
})
export class CheckoutViewComponent implements OnInit {
  simulador = inject(SimuladorService);
  stepper = inject(StepperService);
  form = inject(FormService);
  oferta = inject(OfertaService);

  possuiOferta = computed(() => {
    if(this.form.form().controls.length > 1) return null;
    return this.oferta.getOferta(this.form.form().controls[0].value.$type)
  });
  
  adicionalForm = new FormGroup({
    adicional: new FormControl<boolean>(false)
  });

  totalComDesconto = computed(() => {
    return this.totalDomicilio() + this.totalLavanderia() - this.descontosLavanderia() - this.descontosDomicilio();
  });

  totalLavanderia = computed(() => {
    const simulador = this.simulador.items();
    if(simulador.loading) return 0;
    return simulador.value.filter(e => e.tipo == 'lavanderia').reduce((acc, curr) => acc + curr.resumo.total, 0)
  })

  descontosLavanderia = computed(() => {
    const simulador = this.simulador.items();
    if(simulador.loading) return 0;
    return simulador.value.filter(e => e.tipo == 'lavanderia').reduce((acc, curr) => acc + curr.resumo.descontoLimpeza, 0)

  })

  totalDomicilio = computed(() => {
    const items = this.simulador.items();
    if(items.loading) return 0;
    return items.value.filter(e => e.tipo == 'domicilio').reduce((acc , curr)=> acc + curr.resumo.total , 0)
  });

  descontosDomicilio = computed(() => {
    const total = this.totalDomicilio();
    const tabelaDesconto = [
      { desconto: 200, value: 0 },
      { desconto: 350, value: 10 },
      { desconto: 700, value: 15 },
      { desconto: Number.MAX_VALUE, value: 20 },
    ]

    const categoriaDesconto = tabelaDesconto.sort(e => e.desconto).find(e => e.desconto >= total )?.value || 0;
    return  total * categoriaDesconto / 100;
  });

  ngOnInit(): void {
    this.form.form().updateValueAndValidity();
    const form = this.form.form().value as IAbstractFormValue[];
    this.simulador.calcular(form).subscribe();

    this.adicionalForm.controls.adicional.valueChanges.subscribe(v => {
      const adicional = v ? this.possuiOferta()!.valor : 0;
      this.simulador.adicional.set(adicional);
    });
  }

  deleteItem(item: ResultadoItem) {
    this.simulador.items.update(i => i.loading ? i : { value: i.value.filter(v => v != item) });
  }

  voltar() {
    this.stepper.prev();
  }

  voltarHome() {
    this.stepper.to(0);
  }

  finalizar() {
    this.stepper.next();
  }
}
