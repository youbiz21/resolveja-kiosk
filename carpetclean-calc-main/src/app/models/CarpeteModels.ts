import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FormValueFromFactory } from "../helpers/MappedTypes";
import { SimuladorFormKeys } from "../constants/Formularios";
import { atLeastOne } from "../helpers/atLeastOne";


export const CarpeteFormFactory = () => new FormGroup({
  formato: new FormControl<FormatoCarpete>('retangulo', [Validators.required]),
  limpeza: new FormControl<boolean>(false),
  impermeabilizacao: new FormControl<boolean>(false),
  medida: new FormControl<number>(0, [Validators.required]),
  x: new FormControl<number>(0, [Validators.required]),
  y: new FormControl<number>(0, [Validators.required]),
  a: new FormControl<number>(0, [Validators.required]),
  d: new FormControl<number>(0, [Validators.required]),
  antiFogo: new FormControl<boolean>(false),
  antiAcaro: new FormControl<boolean>(false),
  antiOdor: new FormControl<boolean>(false),
  $service: new FormControl<'domicilio'>('domicilio'),
  $type: new FormControl<SimuladorFormKeys>('carpete', { nonNullable: true })
}, [atLeastOne('limpeza', 'impermeabilizacao')]);


export type FormatoCarpete = 'retangulo' | 'quadrado' | 'redondo'

export type CarpeteFormValue = FormValueFromFactory<typeof CarpeteFormFactory>;
