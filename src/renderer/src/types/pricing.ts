export type PrecoItem = {
  limpeza: number
  impermeabilizacao: number
  antiAcaro: number
  antiOdor: number
  antiFogo: number
  hidratacao: number
}

export type DetalhamentoItem = {
  detalhe: string
  valor: number
}

export type ResumoServico = {
  limpeza: boolean
  valorLimpeza: number
  descontoLimpeza: number
  antiOdor: boolean
  valorAntiOdor: number
  antiFogo: boolean
  valorAntiFogo: number
  antiAcaro: boolean
  valorAntiAcaro: number
  impermeabilizacao: boolean
  valorImpermeabilizacao: number
  total: number
  detalhes: DetalhamentoItem[]
}

export type ResultadoItem = {
  descricao: string
  resumo: ResumoServico
  tipo: 'domicilio' | 'lavanderia'
}

export type TipoOferta = 'anti-acaro'

export type OfertaType = {
  tipo: TipoOferta
  valor: number
}
