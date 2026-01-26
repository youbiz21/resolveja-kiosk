import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FormValueFromFactory } from "../helpers/MappedTypes";
import { SimuladorFormKeys } from "../constants/Formularios";
import { atLeastOne } from "../helpers/atLeastOne";




export const CadeiraFormFactory = () => new FormGroup({
  areaALimpar: new FormControl<AreaAlimpar>('assento', [Validators.required]),
  caracteristica: new FormControl<CarasteristicaCadeira>(null!, [Validators.required]), 
  limpeza: new FormControl<boolean>(false),
  impermeabilizacao: new FormControl<boolean>(false),
  antiFogo: new FormControl<boolean>(false),
  antiAcaro: new FormControl<boolean>(false),
  antiOdor: new FormControl<boolean>(false),
  $service: new FormControl<'domicilio'>('domicilio'),
  $type: new FormControl<SimuladorFormKeys>('cadeiras', { nonNullable: true })
}, [atLeastOne('limpeza', 'impermeabilizacao')]);

export type AreaAlimpar = 'assento' | 'assentoCostas' | 'assentoCostasBraco'
export type CarasteristicaCadeira = 'tecido' | 'pele'

export type CadeiraFormValue = FormValueFromFactory<typeof CadeiraFormFactory>;
