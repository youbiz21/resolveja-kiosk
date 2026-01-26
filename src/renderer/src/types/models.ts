export type SimuladorFormKeys =
  | 'tapete'
  | 'sofa'
  | 'colchao'
  | 'estruturaCabeceira'
  | 'cortinados'
  | 'cadeiras'
  | 'puff'
  | 'carpete'
  | 'pousaPes'

export interface IAbstractFormValue {
  limpeza: boolean
  impermeabilizacao: boolean
  antiAcaro: boolean
  antiOdor: boolean
  antiFogo: boolean
  $type: SimuladorFormKeys
  $service: 'lavanderia' | 'domicilio'
}

export type FormatoTapete = 'retangulo' | 'quadrado' | 'redondo'

export interface TapeteFormValue extends IAbstractFormValue {
  formato: FormatoTapete
  medida: number
  x: number
  y: number
  a: number
  d: number
  $service: 'lavanderia'
  $type: 'tapete'
}

export type FormatoCarpete = 'retangulo' | 'quadrado' | 'redondo'

export interface CarpeteFormValue extends IAbstractFormValue {
  formato: FormatoCarpete
  medida: number
  x: number
  y: number
  a: number
  d: number
  $service: 'domicilio'
  $type: 'carpete'
}

export type TipoAcabamentoSofa = 'tecido' | 'pele'

export interface SofaFormValue extends IAbstractFormValue {
  lugares: number
  acabamento: TipoAcabamentoSofa
  $service: 'domicilio'
  $type: 'sofa'
}

export type FormatoColchao = 'casal' | 'king' | 'individual' | 'berco'

export interface ColchaoFormValue extends IAbstractFormValue {
  formato: FormatoColchao
  $service: 'domicilio'
  $type: 'colchao'
}

export type AreaAlimpar = 'assento' | 'assentoCostas' | 'assentoCostasBraco'
export type CaracteristicaCadeira = 'tecido' | 'pele'

export interface CadeiraFormValue extends IAbstractFormValue {
  areaALimpar: AreaAlimpar
  caracteristica: CaracteristicaCadeira
  $service: 'domicilio'
  $type: 'cadeiras'
}

export interface CortinadoFormValue extends IAbstractFormValue {
  formato: number
  x: number
  $service: 'domicilio'
  $type: 'cortinados'
}

export type PousaPesTamanho = 'pequeno' | 'medio' | 'grande'

export interface PousaPesFormValue extends IAbstractFormValue {
  tamanho: PousaPesTamanho
  $service: 'domicilio'
  $type: 'pousaPes'
}

export type AcabamentoPuff = 'tecido'

export interface PuffFormValue extends IAbstractFormValue {
  acabamento: AcabamentoPuff
  $service: 'domicilio'
  $type: 'puff'
}

export type FormatoEstruturaCab = 'individual' | 'casal'
export type CaracteristicaEstruturaCab = 'cabeceira' | 'estrutura' | 'ambos'

export interface EstruturaCabeceiraFormValue extends IAbstractFormValue {
  caracteristica: CaracteristicaEstruturaCab
  formato: FormatoEstruturaCab
  $service: 'domicilio'
  $type: 'estruturaCabeceira'
}
