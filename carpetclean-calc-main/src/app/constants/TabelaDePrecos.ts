import { PrecoCadeira } from "./PrecoCadeira";
import { PrecoColchao } from "./PrecoColchao";
import { PrecoCortinado } from "./PrecoCortinado";
import { PrecoEstruturaCabeceira } from "./PrecoEstruturaCabeceira";
import { PrecoLavanderiaTapete } from "./PrecoLavanderiaTapete";
import { PrecoPousaPes } from "./PrecoPousaPes";
import { PrecoPuff } from "./PrecoPuff";
import { PrecoSofa } from "./PrecoSofa";

export type PrecoItem = {
    limpeza: number,
    impermeabilizacao: number,
    antiAcaro: number,
    antiOdor: number,
    antiFogo: number,
    hidratacao: number,
};

export const TabelaDePreços = {
    tapete: PrecoLavanderiaTapete,
    cadeiras: PrecoCadeira,
    carpete: PrecoLavanderiaTapete,
    colchao: PrecoColchao,
    cortinados: PrecoCortinado,
    estruturaCabeceira: PrecoEstruturaCabeceira,
    pousaPes: PrecoPousaPes,
    puff: PrecoPuff,
    sofa: PrecoSofa
} as const;