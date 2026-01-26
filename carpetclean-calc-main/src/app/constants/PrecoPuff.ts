import { AcabamentoPuff } from "../models/PuffModels";
import { PrecoItem } from "./TabelaDePrecos";

export const PrecoPuff: Record<AcabamentoPuff, PrecoItem> = {
    tecido: {
        limpeza: 20,
        impermeabilizacao: 30,
        antiAcaro: 5,
        antiOdor: 5,
        antiFogo: 0,
        hidratacao: 0
    }
};
