import { CaracteristicaEstruturaCab, FormatoEstruturaCab } from "../models/EstruturaCabeceiraModels";
import { PrecoItem } from "./TabelaDePrecos";

export const PrecoEstruturaCabeceira: Record<CaracteristicaEstruturaCab, Record<FormatoEstruturaCab, PrecoItem>> = {
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
};
