import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FormValueFromFactory } from "../helpers/MappedTypes";
import { SimuladorFormKeys } from "../constants/Formularios";
import { atLeastOne } from "../helpers/atLeastOne";


export const SofaFormFactory = () => new FormGroup({
  lugares: new FormControl<number>(1, [Validators.required]),
  acabamento: new FormControl<TipoAcabamentoSofa>('tecido', [Validators.required]),
  limpeza: new FormControl<boolean>(false),
  impermeabilizacao: new FormControl<boolean>(false),
  antiFogo: new FormControl<boolean>(false),
  antiAcaro: new FormControl<boolean>(false),
  antiOdor: new FormControl<boolean>(false),
  $service: new FormControl<'domicilio'>('domicilio'),
  $type: new FormControl<SimuladorFormKeys>('sofa', { nonNullable: true })
}, [atLeastOne('limpeza', 'impermeabilizacao')]);

export type TipoAcabamentoSofa = 'tecido' | 'pele';


export type SofaFormValue = FormValueFromFactory<typeof SofaFormFactory>;
