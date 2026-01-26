import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FormValueFromFactory } from "../helpers/MappedTypes";
import { SimuladorFormKeys } from "../constants/Formularios";
import { atLeastOne } from "../helpers/atLeastOne";


export type FormatoColchao = 'casal' | 'king' | 'individual' | 'berco'


export const ColchaoFormFactory = () => new FormGroup({
  formato: new FormControl<FormatoColchao>('casal', [Validators.required]),
  limpeza: new FormControl<boolean>(false),
  impermeabilizacao: new FormControl<boolean>(false),
  antiAcaro: new FormControl<boolean>(false),
  antiFogo: new FormControl<boolean>(false),
  antiOdor: new FormControl<boolean>(false),
  $service: new FormControl<'domicilio'>('domicilio'),
  $type: new FormControl<SimuladorFormKeys>('colchao', { nonNullable: true })
}, [atLeastOne('limpeza', 'antiAcaro')]);


export type ColchaoFormValue = FormValueFromFactory<typeof ColchaoFormFactory>;
