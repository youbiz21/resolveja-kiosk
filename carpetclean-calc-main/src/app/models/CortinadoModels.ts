import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FormValueFromFactory } from "../helpers/MappedTypes";
import { SimuladorFormKeys } from "../constants/Formularios";
import { atLeastOne } from "../helpers/atLeastOne";


export const CortinadoFormFactory = () => new FormGroup({
  formato: new FormControl<number>(0, [Validators.required]),
  x: new FormControl<number>(0, [Validators.required]),
  limpeza: new FormControl<boolean>(false),
  impermeabilizacao: new FormControl<boolean>(false),
  antiFogo: new FormControl<boolean>(false),
  antiAcaro: new FormControl<boolean>(false),
  antiOdor: new FormControl<boolean>(false),
  $service: new FormControl<'domicilio'>('domicilio'),
  $type: new FormControl<SimuladorFormKeys>('cortinados', { nonNullable: true })
}, [atLeastOne('limpeza', 'impermeabilizacao')]);

export type CortinadoFormValue = FormValueFromFactory<typeof CortinadoFormFactory>;
