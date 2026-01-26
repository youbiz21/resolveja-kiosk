import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { StepperService } from '../../services/stepper.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SimuladorService } from '../../services/simulador.service';
import { CadastroService } from '../../services/cadastro.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';

export type PaisType = {
  nome: string;
  codigo: string;
  prefix: string;
}

@Component({
  selector: 'app-cadastro-view',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    InputMaskModule,
    DropdownModule
  ],
  templateUrl: './cadastro-view.component.html',
  styleUrl: './cadastro-view.component.scss'
})
export class CadastroViewComponent implements OnInit {
  stepper = inject(StepperService);
  simulador = inject(SimuladorService);
  cadastro = inject(CadastroService);

  get cadastroCache() {
    const storageData = localStorage.getItem('_cadastro');
    if(storageData) return JSON.parse(storageData) as typeof this.formCadastro.value;
    return null;
  }


  countries: PaisType[] =  [
    { nome: 'Portugal', prefix: '+351', codigo: 'PT' },
    { nome: 'Brasil', prefix: '+55', codigo: 'BR' },
    { nome: 'França', prefix: '+33', codigo: 'FR' },
    { nome: 'Itália', prefix: '+39', codigo: 'IT' },
    { nome: 'Marrocos', prefix: '+212', codigo: 'MA' },
    { nome: 'Alemanha', prefix: '+49', codigo: 'DE' },
    { nome: 'Espanha', prefix: '+34', codigo: 'ES' },
    { nome: 'Argélia', prefix: '+213', codigo: 'DZ' }
];

  loading = signal(false);

  formCadastro = new FormGroup({
    primeiroNome: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    ultimoNome: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    telefone: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    morada: new FormControl<string>('', { nonNullable: true }),
    pais: new FormControl<string>('+351', { nonNullable: true }),
    codigoPostal: new FormControl<string>('', { nonNullable: true }),
    localidade: new FormControl<string>('', { nonNullable: true }),
    total: new FormControl(this.simulador.total().value, { nonNullable: true }),
    items: new FormControl(this.simulador.items().value, { nonNullable: true })
  });

  ngOnInit(): void {
    if(this.cadastroCache) {
      this.formCadastro.patchValue({
        primeiroNome: this.cadastroCache.primeiroNome,
        ultimoNome: this.cadastroCache.ultimoNome,
        telefone: this.cadastroCache.telefone,
        email: this.cadastroCache.email,
        morada: this.cadastroCache.morada,
        pais: this.cadastroCache.pais,
        codigoPostal: this.cadastroCache.codigoPostal,
        localidade: this.cadastroCache.localidade,
      })
    }
  }

  enviar() {
    this.formCadastro.updateValueAndValidity();
    this.formCadastro.markAllAsTouched();
    if(this.formCadastro.invalid) return;
    localStorage.setItem('_cadastro', JSON.stringify(this.formCadastro.getRawValue()))
    this.loading.set(true);
    this.cadastro.enviar(this.formCadastro.value).subscribe(() => {
      this.loading.set(false);
      this.stepper.next();
    })
  }

  voltar() {
    this.stepper.prev();
  }
}
