import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FormValueFromFactory } from "../helpers/MappedTypes";
import { SimuladorFormKeys } from "../constants/Formularios";
import { atLeastOne } from "../helpers/atLeastOne";




export const EstruturaCabFormFactory = () => new FormGroup({
  caracteristica: new FormControl<CaracteristicaEstruturaCab>(null!, [Validators.required]),
  formato: new FormControl<FormatoEstruturaCab>(null!, [Validators.required]),
  limpeza: new FormControl<boolean>(false),
  impermeabilizacao: new FormControl<boolean>(false),
  antiFogo: new FormControl<boolean>(false),
  antiAcaro: new FormControl<boolean>(false),
  antiOdor: new FormControl<boolean>(false),
  $service: new FormControl<'domicilio'>('domicilio'),
  $type: new FormControl<SimuladorFormKeys>('estruturaCabeceira', { nonNullable: true })
}, [atLeastOne('limpeza', 'impermeabilizacao')]);

export type FormatoEstruturaCab = 'individual' | 'casal'
export type CaracteristicaEstruturaCab = 'cabeceira' | 'estrutura' | 'ambos'

export type EstruturaCabeceiraFormValue = FormValueFromFactory<typeof EstruturaCabFormFactory>;
