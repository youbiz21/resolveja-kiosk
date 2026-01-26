import { PrecoItem } from "./TabelaDePrecos";

export const PrecoCortinado: Record<number, PrecoItem> = {
    5: {
        limpeza: 12.5,
        impermeabilizacao: 25,
        antiAcaro: 0,
        antiOdor: 0,
        antiFogo: 6,
        hidratacao: 0,
    },
    25: {
        limpeza: 10,
        impermeabilizacao: 20,
        antiAcaro: 0,
        antiOdor: 0,
        antiFogo: 6,
        hidratacao: 0,
    },
    [Number.MAX_VALUE]: {
        limpeza: 8,
        impermeabilizacao: 16,
        antiAcaro: 0,
        antiOdor: 0,
        antiFogo: 6,
        hidratacao: 0,
    },
};
