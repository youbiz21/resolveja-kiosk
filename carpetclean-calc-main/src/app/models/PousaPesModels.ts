import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FormValueFromFactory } from "../helpers/MappedTypes";
import { SimuladorFormKeys } from "../constants/Formularios";
import { atLeastOne } from "../helpers/atLeastOne";




export const PousaPesFormFactory = () => new FormGroup({
  tamanho: new FormControl<PousaPesTamanho>(null!, [Validators.required]),
  limpeza: new FormControl<boolean>(false),
  impermeabilizacao: new FormControl<boolean>(false),
  antiFogo: new FormControl<boolean>(false),
  antiAcaro: new FormControl<boolean>(false),
  antiOdor: new FormControl<boolean>(false),
  $service: new FormControl<'domicilio'>('domicilio'),
  $type: new FormControl<SimuladorFormKeys>('pousaPes', { nonNullable: true })
}, [atLeastOne('limpeza', 'impermeabilizacao')]);

export type PousaPesTamanho = 'pequeno' | 'medio' | 'grande'

export type PousaPesFormValue = FormValueFromFactory<typeof PousaPesFormFactory>;
