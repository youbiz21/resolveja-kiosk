import { FormatoColchao } from "../models/ColchaoModels";
import { PrecoItem } from "./TabelaDePrecos";

export const PrecoColchao: Record<FormatoColchao, PrecoItem> = {
    'berco': {
        limpeza: 0,
        impermeabilizacao: 0,
        antiAcaro: 12.5,
        antiOdor: 15,
        antiFogo: 10,
        hidratacao: 0,
    },
    'individual': {
        limpeza: 40,
        impermeabilizacao: 0,
        antiAcaro: 20,
        antiOdor: 20,
        antiFogo: 12.5,
        hidratacao: 0,
    },
    'casal': {
        limpeza: 70,
        impermeabilizacao: 0,
        antiAcaro: 30,
        antiOdor: 25,
        antiFogo: 15,
        hidratacao: 0,
    },
    'king': {
        limpeza: 80,
        impermeabilizacao: 20,
        antiAcaro: 60,
        antiOdor: 25,
        antiFogo: 15,
        hidratacao: 0,
    }
};
