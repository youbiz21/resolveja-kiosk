import type { PrecoItem } from '../types/pricing'
import type {
  FormatoColchao,
  AcabamentoPuff,
  AreaAlimpar,
  PousaPesTamanho,
  CaracteristicaEstruturaCab,
  FormatoEstruturaCab
} from '../types/models'

export const PrecoSofa: Record<number, PrecoItem> = {
  [1]: {
    limpeza: 40,
    impermeabilizacao: 60,
    antiAcaro: 30,
    antiOdor: 15,
    antiFogo: 25,
    hidratacao: 60
  },
  [2]: {
    limpeza: 75,
    impermeabilizacao: 120,
    antiAcaro: 35,
    antiOdor: 20,
    antiFogo: 35,
    hidratacao: 95
  },
  [3]: {
    limpeza: 90,
    impermeabilizacao: 160,
    antiAcaro: 40,
    antiOdor: 25,
    antiFogo: 40,
    hidratacao: 125
  },
  [4]: {
    limpeza: 105,
    impermeabilizacao: 200,
    antiAcaro: 45,
    antiOdor: 27.5,
    antiFogo: 45,
    hidratacao: 145
  },
  [5]: {
    limpeza: 125,
    impermeabilizacao: 240,
    antiAcaro: 55,
    antiOdor: 30,
    antiFogo: 50,
    hidratacao: 165
  },
  [6]: {
    limpeza: 145,
    impermeabilizacao: 280,
    antiAcaro: 30,
    antiOdor: 32.5,
    antiFogo: 55,
    hidratacao: 185
  },
  [7]: {
    limpeza: 165,
    impermeabilizacao: 320,
    antiAcaro: 35,
    antiOdor: 35,
    antiFogo: 60,
    hidratacao: 205
  },
  [8]: {
    limpeza: 185,
    impermeabilizacao: 360,
    antiAcaro: 40,
    antiOdor: 37.5,
    antiFogo: 65,
    hidratacao: 225
  },
  [9]: {
    limpeza: 205,
    impermeabilizacao: 400,
    antiAcaro: 45,
    antiOdor: 40,
    antiFogo: 70,
    hidratacao: 250
  },
  [10]: {
    limpeza: 225,
    impermeabilizacao: 440,
    antiAcaro: 55,
    antiOdor: 42.5,
    antiFogo: 75,
    hidratacao: 275
  }
}

export const PrecoLavanderiaTapete: Record<number, PrecoItem> = {
  [Number.MAX_VALUE]: {
    limpeza: 12,
    impermeabilizacao: 20,
    antiAcaro: 5,
    antiOdor: 5,
    antiFogo: 5,
    hidratacao: 0
  }
}

export const PrecoColchao: Record<FormatoColchao, PrecoItem> = {
  berco: {
    limpeza: 0,
    impermeabilizacao: 0,
    antiAcaro: 12.5,
    antiOdor: 15,
    antiFogo: 10,
    hidratacao: 0
  },
  individual: {
    limpeza: 40,
    impermeabilizacao: 0,
    antiAcaro: 20,
    antiOdor: 20,
    antiFogo: 12.5,
    hidratacao: 0
  },
  casal: {
    limpeza: 70,
    impermeabilizacao: 0,
    antiAcaro: 30,
    antiOdor: 25,
    antiFogo: 15,
    hidratacao: 0
  },
  king: {
    limpeza: 80,
    impermeabilizacao: 20,
    antiAcaro: 60,
    antiOdor: 25,
    antiFogo: 15,
    hidratacao: 0
  }
}

export const PrecoPuff: Record<AcabamentoPuff, PrecoItem> = {
  tecido: {
    limpeza: 20,
    impermeabilizacao: 30,
    antiAcaro: 5,
    antiOdor: 5,
    antiFogo: 0,
    hidratacao: 0
  }
}

export const PrecoCadeira: Record<AreaAlimpar, PrecoItem> = {
  assento: {
    limpeza: 5,
    impermeabilizacao: 10,
    antiAcaro: 0,
    antiOdor: 0,
    antiFogo: 3,
    hidratacao: 75
  },
  assentoCostas: {
    limpeza: 7.5,
    impermeabilizacao: 15,
    antiAcaro: 0,
    antiOdor: 0,
    antiFogo: 5,
    hidratacao: 10
  },
  assentoCostasBraco: {
    limpeza: 10,
    impermeabilizacao: 20,
    antiAcaro: 0,
    antiOdor: 0,
    antiFogo: 7,
    hidratacao: 15
  }
}

export const PrecoCortinado: Record<number, PrecoItem> = {
  5: {
    limpeza: 12.5,
    impermeabilizacao: 25,
    antiAcaro: 0,
    antiOdor: 0,
    antiFogo: 6,
    hidratacao: 0
  },
  25: {
    limpeza: 10,
    impermeabilizacao: 20,
    antiAcaro: 0,
    antiOdor: 0,
    antiFogo: 6,
    hidratacao: 0
  },
  [Number.MAX_VALUE]: {
    limpeza: 8,
    impermeabilizacao: 16,
    antiAcaro: 0,
    antiOdor: 0,
    antiFogo: 6,
    hidratacao: 0
  }
}

export const PrecoEstruturaCabeceira: Record<
  CaracteristicaEstruturaCab,
  Record<FormatoEstruturaCab, PrecoItem>
> = {
  estrutura: {
    individual: {
      limpeza: 35,
      impermeabilizacao: 0,
      antiAcaro: 0,
      antiOdor: 0,
      antiFogo: 0,
      hidratacao: 0
    },
    casal: {
      limpeza: 50,
      impermeabilizacao: 0,
      antiAcaro: 0,
      antiOdor: 0,
      antiFogo: 0,
      hidratacao: 0
    }
  },
  cabeceira: {
    individual: {
      limpeza: 25,
      impermeabilizacao: 0,
      antiAcaro: 0,
      antiOdor: 0,
      antiFogo: 0,
      hidratacao: 0
    },
    casal: {
      limpeza: 40,
      impermeabilizacao: 0,
      antiAcaro: 0,
      antiOdor: 0,
      antiFogo: 0,
      hidratacao: 0
    }
  },
  ambos: {
    individual: {
      limpeza: 45,
      impermeabilizacao: 0,
      antiAcaro: 0,
      antiOdor: 0,
      antiFogo: 0,
      hidratacao: 0
    },
    casal: {
      limpeza: 70,
      impermeabilizacao: 0,
      antiAcaro: 0,
      antiOdor: 0,
      antiFogo: 0,
      hidratacao: 0
    }
  }
}

export const PrecoPousaPes: Record<PousaPesTamanho, PrecoItem> = {
  pequeno: {
    limpeza: 15,
    impermeabilizacao: 30,
    antiAcaro: 5,
    antiOdor: 10,
    antiFogo: 0,
    hidratacao: 0
  },
  medio: {
    limpeza: 20,
    impermeabilizacao: 40,
    antiAcaro: 10,
    antiOdor: 15,
    antiFogo: 0,
    hidratacao: 0
  },
  grande: {
    limpeza: 25,
    impermeabilizacao: 50,
    antiAcaro: 15,
    antiOdor: 20,
    antiFogo: 0,
    hidratacao: 0
  }
}

export const TabelaDePrecos = {
  tapete: PrecoLavanderiaTapete,
  cadeiras: PrecoCadeira,
  carpete: PrecoLavanderiaTapete,
  colchao: PrecoColchao,
  cortinados: PrecoCortinado,
  estruturaCabeceira: PrecoEstruturaCabeceira,
  pousaPes: PrecoPousaPes,
  puff: PrecoPuff,
  sofa: PrecoSofa
} as const
