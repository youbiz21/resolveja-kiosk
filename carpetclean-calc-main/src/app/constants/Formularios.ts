import { TapeteFormFactory } from '../models/TapeteModels';
import { SofaFormFactory } from '../models/SofaModels';
import { ColchaoFormFactory } from '../models/ColchaoModels';
import { EstruturaCabFormFactory } from '../models/EstruturaCabeceiraModels';
import { CortinadoFormFactory } from '../models/CortinadoModels';
import { CadeiraFormFactory } from '../models/CadeiraModels';
import { PuffFormFactory } from '../models/PuffModels';
import { CarpeteFormFactory } from '../models/CarpeteModels';
import { PousaPesFormFactory } from '../models/PousaPesModels';
import { TapeteFormComponent } from '../views/forms/tapete-form/tapete-form.component';
import { SofaFormComponent } from '../views/forms/sofa-form/sofa-form.component';
import { ColchaoFormComponent } from '../views/forms/colchao-form/colchao-form.component';
import { EstruturaCabeceiraFormComponent } from '../views/forms/estrutura-cabeceira-form/estrutura-cabeceira-form.component';
import { CortinadosFormComponent } from '../views/forms/cortinados-form/cortinados-form.component';
import { CadeirasFormComponent } from '../views/forms/cadeiras-form/cadeiras-form.component';
import { PuffFormComponent } from '../views/forms/puff-form/puff-form.component';
import { CarpeteFormComponent } from '../views/forms/carpete-form/carpete-form.component';
import { PousaPesFormComponent } from '../views/forms/pousa-pes-form/pousa-pes-form.component';
import { Type } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';


export const Formularios = {
  tapete: {
    factory: TapeteFormFactory,
    nome: 'Tapete / Carpete (Lavandaria)',
    icone: 'tapete',
    component: TapeteFormComponent
  },
  sofa: {
    factory: SofaFormFactory,
    nome: 'Sofá',
    icone: 'sofa',
    component: SofaFormComponent
  },
  colchao: {
    factory: ColchaoFormFactory,
    nome: 'Colchão',
    icone: 'colchao-casal',
    component: ColchaoFormComponent
  },
  estruturaCabeceira: {
    factory: EstruturaCabFormFactory,
    nome: 'Estrutura / Cabeceira',
    icone: 'estrutura-cabeceira',
    component: EstruturaCabeceiraFormComponent
  },
  cortinados: {
    factory: CortinadoFormFactory,
    nome: 'Cortinado',
    icone: 'cortinados',
    component: CortinadosFormComponent
  },
  cadeiras: {
    factory: CadeiraFormFactory,
    nome: 'Cadeira',
    icone: 'cadeira',
    component: CadeirasFormComponent
  },
  puff: {
    factory: PuffFormFactory,
    nome: 'Puff',
    icone: 'puff',
    component: PuffFormComponent
  },
  carpete: {
    factory: CarpeteFormFactory,
    nome: 'Tapete / Carpete (Domicílio)',
    icone: 'tapete',
    component: CarpeteFormComponent
  },
  pousaPes: {
    factory: PousaPesFormFactory,
    nome: 'Pousa-Pés',
    icone: 'pousa-pes',
    component: PousaPesFormComponent
  },
} as const;

type FormularioIcones = {
  [K in SimuladorFormKeys]: (typeof Formularios[K])['icone'];
};

export const Icones = Object.entries(Formularios).reduce((prev, curr) => { prev[curr[0]] = curr[1].icone; return prev; }, {} as any) as FormularioIcones;

const _CONSTRAINT_FORM_TYPE: Record<string, StepperForm> = Formularios;

export type StepperForm = {
  factory: () => ISimuladorForm;
  nome: string;
  icone: string;
  component: Type<any>;
}

export type SimuladorFormKeys = keyof typeof Formularios;

export type FormFactory = () => IFormGroup<IAbstractForm>;

export interface IAbstractForm  {
  $type: FormControl<SimuladorFormKeys>
}

export interface IAbstractFormValue {
  limpeza: boolean;
  impermeabilizacao: boolean;
  antiAcaro: boolean;
  antiOdor: boolean;
  antiFogo: boolean;
  $type: SimuladorFormKeys;
  $service: 'lavanderia' | 'domicilio';
}
export type ISimuladorForm = IFormGroup<IAbstractForm>;

export interface IFormGroup<T extends { [K in keyof T]: AbstractControl<any, any>; }> extends FormGroup<T> { }