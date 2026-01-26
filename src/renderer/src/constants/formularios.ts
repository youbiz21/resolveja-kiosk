import type {
  SimuladorFormKeys,
  IAbstractFormValue,
  TapeteFormValue,
  SofaFormValue,
  ColchaoFormValue,
  EstruturaCabeceiraFormValue,
  CortinadoFormValue,
  CadeiraFormValue,
  PuffFormValue,
  CarpeteFormValue,
  PousaPesFormValue
} from '../types/models'

export type FormularioEntry = {
  nome: string
  icone: string
  defaultValues: () => IAbstractFormValue
}

export const Formularios: Record<SimuladorFormKeys, FormularioEntry> = {
  tapete: {
    nome: 'Tapete / Carpete (Lavandaria)',
    icone: 'tapete',
    defaultValues: (): TapeteFormValue => ({
      formato: 'retangulo',
      limpeza: false,
      impermeabilizacao: false,
      medida: 0,
      x: 0,
      y: 0,
      a: 0,
      d: 0,
      antiFogo: false,
      antiAcaro: false,
      antiOdor: false,
      $service: 'lavanderia',
      $type: 'tapete'
    })
  },
  sofa: {
    nome: 'Sofá',
    icone: 'sofa',
    defaultValues: (): SofaFormValue => ({
      lugares: 1,
      acabamento: 'tecido',
      limpeza: false,
      impermeabilizacao: false,
      antiFogo: false,
      antiAcaro: false,
      antiOdor: false,
      $service: 'domicilio',
      $type: 'sofa'
    })
  },
  colchao: {
    nome: 'Colchão',
    icone: 'colchao-casal',
    defaultValues: (): ColchaoFormValue => ({
      formato: 'casal',
      limpeza: false,
      impermeabilizacao: false,
      antiAcaro: false,
      antiFogo: false,
      antiOdor: false,
      $service: 'domicilio',
      $type: 'colchao'
    })
  },
  estruturaCabeceira: {
    nome: 'Estrutura / Cabeceira',
    icone: 'estrutura-cabeceira',
    defaultValues: (): EstruturaCabeceiraFormValue => ({
      caracteristica: 'cabeceira',
      formato: 'individual',
      limpeza: false,
      impermeabilizacao: false,
      antiFogo: false,
      antiAcaro: false,
      antiOdor: false,
      $service: 'domicilio',
      $type: 'estruturaCabeceira'
    })
  },
  cortinados: {
    nome: 'Cortinado',
    icone: 'cortinados',
    defaultValues: (): CortinadoFormValue => ({
      formato: 0,
      x: 0,
      limpeza: false,
      impermeabilizacao: false,
      antiFogo: false,
      antiAcaro: false,
      antiOdor: false,
      $service: 'domicilio',
      $type: 'cortinados'
    })
  },
  cadeiras: {
    nome: 'Cadeira',
    icone: 'cadeira',
    defaultValues: (): CadeiraFormValue => ({
      areaALimpar: 'assento',
      caracteristica: 'tecido',
      limpeza: false,
      impermeabilizacao: false,
      antiFogo: false,
      antiAcaro: false,
      antiOdor: false,
      $service: 'domicilio',
      $type: 'cadeiras'
    })
  },
  puff: {
    nome: 'Puff',
    icone: 'puff',
    defaultValues: (): PuffFormValue => ({
      acabamento: 'tecido',
      limpeza: false,
      impermeabilizacao: false,
      antiFogo: false,
      antiAcaro: false,
      antiOdor: false,
      $service: 'domicilio',
      $type: 'puff'
    })
  },
  carpete: {
    nome: 'Tapete / Carpete (Domicílio)',
    icone: 'tapete',
    defaultValues: (): CarpeteFormValue => ({
      formato: 'retangulo',
      limpeza: false,
      impermeabilizacao: false,
      medida: 0,
      x: 0,
      y: 0,
      a: 0,
      d: 0,
      antiFogo: false,
      antiAcaro: false,
      antiOdor: false,
      $service: 'domicilio',
      $type: 'carpete'
    })
  },
  pousaPes: {
    nome: 'Pousa-Pés',
    icone: 'pousa-pes',
    defaultValues: (): PousaPesFormValue => ({
      tamanho: 'pequeno',
      limpeza: false,
      impermeabilizacao: false,
      antiFogo: false,
      antiAcaro: false,
      antiOdor: false,
      $service: 'domicilio',
      $type: 'pousaPes'
    })
  }
}

export const Icones: Record<SimuladorFormKeys, string> = Object.entries(Formularios).reduce(
  (prev, [key, val]) => {
    prev[key as SimuladorFormKeys] = val.icone
    return prev
  },
  {} as Record<SimuladorFormKeys, string>
)
