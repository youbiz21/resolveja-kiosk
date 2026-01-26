import { PrecoItem } from "./TabelaDePrecos";

export const PrecoLavanderiaTapete: Record<number, PrecoItem> = {
    [Number.MAX_VALUE]: {
        limpeza: 12,
        impermeabilizacao: 20,
        antiAcaro: 5,
        antiOdor: 5,
        antiFogo: 5,
        hidratacao: 0,
    }
} as const;
