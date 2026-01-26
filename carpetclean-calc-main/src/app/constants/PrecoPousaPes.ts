import { PousaPesTamanho } from "../models/PousaPesModels";
import { PrecoItem } from "./TabelaDePrecos";

export const PrecoPousaPes: Record<PousaPesTamanho, PrecoItem> = {
    pequeno: {
        limpeza: 15,
        impermeabilizacao: 30,
        antiAcaro: 5,
        antiOdor: 10,
        antiFogo: 0,
        hidratacao: 0,
    },
    medio: {
        limpeza: 20,
        impermeabilizacao: 40,
        antiAcaro: 10,
        antiOdor: 15,
        antiFogo: 0,
        hidratacao: 0,
    },
    grande: {
        limpeza: 25,
        impermeabilizacao: 50,
        antiAcaro: 15,
        antiOdor: 20,
        antiFogo: 0,
        hidratacao: 0,
    }
};
