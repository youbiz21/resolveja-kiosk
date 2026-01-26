import { AreaAlimpar } from "../models/CadeiraModels";
import { PrecoItem } from "./TabelaDePrecos";

export const PrecoCadeira: Record<AreaAlimpar, PrecoItem> = {
    'assento': {
        limpeza: 5,
        impermeabilizacao: 10,
        antiAcaro: 0,
        antiOdor: 0,
        antiFogo: 3,
        hidratacao: 75,
    },
    'assentoCostas': {
        limpeza: 7.5,
        impermeabilizacao: 15,
        antiAcaro: 0,
        antiOdor: 0,
        antiFogo: 5,
        hidratacao: 10,
    },
    'assentoCostasBraco': {
        limpeza: 10,
        impermeabilizacao: 20,
        antiAcaro: 0,
        antiOdor: 0,
        antiFogo: 7,
        hidratacao: 15,
    }
};
