import type { SimuladorFormKeys } from '../types/models'
import type { OfertaType } from '../types/pricing'

export const OFERTAS: Record<SimuladorFormKeys, OfertaType | undefined> = {
  tapete: {
    tipo: 'anti-acaro',
    valor: 5
  },
  sofa: {
    tipo: 'anti-acaro',
    valor: 30
  },
  cortinados: {
    tipo: 'anti-acaro',
    valor: 20
  },
  pousaPes: {
    tipo: 'anti-acaro',
    valor: 10
  },
  colchao: undefined,
  puff: undefined,
  estruturaCabeceira: undefined,
  cadeiras: undefined,
  carpete: undefined
}
