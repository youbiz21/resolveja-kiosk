import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FormValueFromFactory } from "../helpers/MappedTypes";
import { SimuladorFormKeys } from "../constants/Formularios";
import { atLeastOne } from "../helpers/atLeastOne";




export const PuffFormFactory = () => new FormGroup({
  acabamento: new FormControl<AcabamentoPuff>({ value: 'tecido', disabled: true }, [Validators.required]),
  limpeza: new FormControl<boolean>(false),
  impermeabilizacao: new FormControl<boolean>(false),
  antiFogo: new FormControl<boolean>(false),
  antiAcaro: new FormControl<boolean>(false),
  antiOdor: new FormControl<boolean>(false),
  $service: new FormControl<'domicilio'>('domicilio'),
  $type: new FormControl<SimuladorFormKeys>('puff', { nonNullable: true })
}, [atLeastOne('limpeza', 'impermeabilizacao')]);

export type AcabamentoPuff = 'tecido'

export type PuffFormValue = FormValueFromFactory<typeof PuffFormFactory>;
