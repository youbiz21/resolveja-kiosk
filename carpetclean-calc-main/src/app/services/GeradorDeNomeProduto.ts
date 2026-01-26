import { TapeteFormValue } from "../models/TapeteModels";
import { CadeiraFormValue } from "../models/CadeiraModels";
import { CarpeteFormValue } from "../models/CarpeteModels";
import { ColchaoFormValue } from "../models/ColchaoModels";
import { CortinadoFormValue } from "../models/CortinadoModels";
import { PousaPesFormValue } from "../models/PousaPesModels";
import { SofaFormValue } from "../models/SofaModels";
import { PuffFormValue } from "../models/PuffModels";
import {EstruturaCabeceiraFormValue } from "../models/EstruturaCabeceiraModels";
import { IAbstractFormValue } from "../constants/Formularios";

export class GeradorDeNomeProduto {

    readonly ServicoDomicilio = 'Serviço ao domicílio';
    readonly Lavanderia = 'Lavandaria';
    readonly Limpeza = 'Limpeza';
    readonly Impermeabilizacao = 'Impermeabilização';
    readonly AntiAcaro = 'Anti-ácaro';
    readonly AntiFogo = 'Anti fogo';
    readonly AntiOdor = 'Anti odor';

    public geraNomeItems(form: IAbstractFormValue[]) {
        return form.reduce((prev, curr) => {
            let resultado = this.gerarNome(curr);
            if(resultado) prev.push(resultado);
            return prev;
        }, [] as string[]);
    }

    public gerarNome(formvalue: IAbstractFormValue): string | undefined {
        switch (formvalue.$type) {
            case 'tapete':
                return this.nomeTapete(formvalue as TapeteFormValue);

            case 'cadeiras':
                return this.nomeCadeira(formvalue as CadeiraFormValue);

            case 'carpete':
                return this.nomeCarpete(formvalue as CarpeteFormValue);

            case 'colchao':
                return this.nomeColchao(formvalue as ColchaoFormValue)

            case 'cortinados':
                return this.nomeCortinado(formvalue as CortinadoFormValue);

            case 'estruturaCabeceira':
                return this.nomeEstruturaCabeceira(formvalue as EstruturaCabeceiraFormValue);

            case 'pousaPes':
                return this.nomePousaPes(formvalue as PousaPesFormValue);

            case 'puff':
                return this.nomePuff(formvalue as PuffFormValue);

            case 'sofa':
                return this.nomeSofa(formvalue as SofaFormValue);

        }
        return undefined;
    }


    public nomePuff(puff: PuffFormValue): string {
        let tokens: string[] = [];
        tokens.push(`Puff ${ puff.acabamento == 'tecido' ? 'Tecido' : ''}`);

        // if(puff.limpeza) tokens.push(this.Limpeza);
        // if(puff.impermeabilizacao) tokens.push(this.Impermeabilizacao);
        // if(puff.antiAcaro) tokens.push(this.AntiAcaro);
        // if(puff.antiFogo) tokens.push(this.AntiFogo);
        // if(puff.antiOdor) tokens.push(this.AntiOdor);

        tokens.push(this.ServicoDomicilio);
        return tokens.join('/ ');
    }

    public nomeEstruturaCabeceira(estCab: EstruturaCabeceiraFormValue): string {
        let tokens: string[] = [];
        let caracteristica = `${estCab.caracteristica == 'cabeceira' ? 'Cabeceira' : estCab.caracteristica == 'estrutura' ? 'Estrutura' : 'Estrutura e Cabeceira'}`;
        let formato = estCab.formato == 'individual' ? 'Individual' : 'Casal'
        tokens.push(`${caracteristica} (${formato})`);

        // if(estCab.limpeza) tokens.push(this.Limpeza);
        // if(estCab.impermeabilizacao) tokens.push(this.Impermeabilizacao);
        // if(estCab.antiAcaro) tokens.push(this.AntiAcaro);
        // if(estCab.antiFogo) tokens.push(this.AntiFogo);
        // if(estCab.antiOdor) tokens.push(this.AntiOdor);

        tokens.push(this.ServicoDomicilio);
        return tokens.join('/ ');
    }

    public nomeTapete(tapete: TapeteFormValue) : string {
        let tokens: string[] = [];
        let formato = tapete.formato == 'quadrado' ? 'Quadrado' : tapete.formato == 'redondo' ? 'Redondo' : 'Retângulo';
        let medida = tapete.formato == 'quadrado' ? `${tapete.a.toFixed(2)} m` : tapete.formato == 'redondo' ? `${tapete.d.toFixed(2)} m` : `${tapete.x.toFixed(2)} m x ${tapete.y.toFixed(2)} m`;
        tokens.push(`Tapete/Carpete ${formato} (${medida})`);

        // if(tapete.limpeza) tokens.push(this.Limpeza);
        // if(tapete.impermeabilizacao) tokens.push(this.Impermeabilizacao);
        // if(tapete.antiAcaro) tokens.push(this.AntiAcaro);
        // if(tapete.antiFogo) tokens.push(this.AntiFogo);
        // if(tapete.antiOdor) tokens.push(this.AntiOdor);

        tokens.push(this.Lavanderia);
        return tokens.join('/ ');
    }
    public nomeCarpete(carpete: CarpeteFormValue) : string {
        let tokens: string[] = [];

        let formato = carpete.formato == 'quadrado' ? 'Quadrado' : carpete.formato == 'redondo' ? 'Redondo' : 'Retângulo';
        let medida = carpete.formato == 'quadrado' ? `${carpete.a.toFixed(2)} m` : carpete.formato == 'redondo' ? `${carpete.d.toFixed(2)} m` : `${carpete.x.toFixed(2)} m x ${carpete.y.toFixed(2)} m`;

        tokens.push(`Tapete/Carpete ${formato} (${medida})`);

        // if(carpete.limpeza) tokens.push(this.Limpeza);
        // if(carpete.impermeabilizacao) tokens.push(this.Impermeabilizacao);
        // if(carpete.antiAcaro) tokens.push(this.AntiAcaro);
        // if(carpete.antiFogo) tokens.push(this.AntiFogo);
        // if(carpete.antiOdor) tokens.push(this.AntiOdor);

        tokens.push(this.ServicoDomicilio);
        return tokens.join('/ ');
    }

    public nomeCadeira(cadeira: CadeiraFormValue) : string {
        let tokens: string[] = [];
        let areaLimpar = cadeira.areaALimpar == 'assento' ? 'Assento' : cadeira.areaALimpar == 'assentoCostas' ? 'Assento e Costas' : 'Assento, Costas e Banco'
        tokens.push(`Cadeira ${cadeira.caracteristica == 'pele' ? 'de Pele' : 'de Tecido'} (${areaLimpar})`);

        // if(cadeira.limpeza) tokens.push(this.Limpeza);
        // if(cadeira.impermeabilizacao) tokens.push(this.Impermeabilizacao);
        // if(cadeira.antiAcaro) tokens.push(this.AntiAcaro);
        // if(cadeira.antiFogo) tokens.push(this.AntiFogo);
        // if(cadeira.antiOdor) tokens.push(this.AntiOdor);

        tokens.push(this.ServicoDomicilio);
        return tokens.join('/ ');
    }

    public nomeColchao(colchao: ColchaoFormValue) : string {
        let tokens: string[] = [];

        let formato;

        switch(colchao.formato)
        {
            case 'berco':
                formato = 'Berço';
            break;

            case 'casal':
                formato = 'Casal';
                break;
            case 'individual':
                formato = 'Individual';
                break;
            case 'king':
                formato = 'King';
                break;
        }

        tokens.push(`Colchão ${formato}`);

        // if(colchao.limpeza) tokens.push(this.Limpeza);
        // if(colchao.antiAcaro) tokens.push(this.AntiAcaro);
        // if(colchao.impermeabilizacao) tokens.push(this.Impermeabilizacao);
        // if(colchao.antiFogo) tokens.push(this.AntiFogo);
        // if(colchao.antiOdor) tokens.push(this.AntiOdor);

        tokens.push(this.ServicoDomicilio);
        return tokens.join('/ ');
    }
    public nomeCortinado(cortinado: CortinadoFormValue) : string {
        let tokens: string[] = [];
        tokens.push(`Cortinado (${cortinado.x.toFixed(2)} m)`);

        // if(cortinado.limpeza) tokens.push(this.Limpeza);
        // if(cortinado.impermeabilizacao) tokens.push(this.Impermeabilizacao);
        // if(cortinado.antiAcaro) tokens.push(this.AntiAcaro);
        // if(cortinado.antiFogo) tokens.push(this.AntiFogo);
        // if(cortinado.antiOdor) tokens.push(this.AntiOdor);

        tokens.push(this.ServicoDomicilio);
        return tokens.join('/ ');
    }
    public nomePousaPes(pousaPes: PousaPesFormValue) : string {
        let tokens: string[] = [];
        tokens.push(`Pousa Pés ${pousaPes.tamanho == 'pequeno' ? 'Pequeno' : pousaPes.tamanho == 'medio' ? 'Médio' : 'Grande'}`);

        // if(pousaPes.limpeza) tokens.push(this.Limpeza);
        // if(pousaPes.impermeabilizacao) tokens.push(this.Impermeabilizacao);
        // if(pousaPes.antiAcaro) tokens.push(this.AntiAcaro);
        // if(pousaPes.antiFogo) tokens.push(this.AntiFogo);
        // if(pousaPes.antiOdor) tokens.push(this.AntiOdor);

        tokens.push(this.ServicoDomicilio);
        return tokens.join('/ ');
    }

    public nomeSofa(sofa: SofaFormValue): string {
        let tokens: string[] = [];
        tokens.push(`Sofá ${sofa.acabamento == 'pele' ? 'de Pele' : 'de Tecido'} (${sofa.lugares} lugares)`);

        // if(sofa.limpeza) tokens.push(this.Limpeza);
        // if(sofa.impermeabilizacao) tokens.push(this.Impermeabilizacao);
        // if(sofa.antiAcaro) tokens.push(this.AntiAcaro);
        // if(sofa.antiFogo) tokens.push(this.AntiFogo);
        // if(sofa.antiOdor) tokens.push(this.AntiOdor);

        tokens.push(this.ServicoDomicilio);
        return tokens.join('/ ');
    }
}