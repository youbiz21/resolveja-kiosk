import { TapeteFormValue } from "../models/TapeteModels";
import { CadeiraFormValue } from "../models/CadeiraModels";
import { CarpeteFormValue } from "../models/CarpeteModels";
import { ColchaoFormValue,  } from "../models/ColchaoModels";
import { CortinadoFormValue } from "../models/CortinadoModels";
import { PousaPesFormValue } from "../models/PousaPesModels";
import { SofaFormValue } from "../models/SofaModels";
import { PuffFormValue } from "../models/PuffModels";
import { EstruturaCabeceiraFormValue } from "../models/EstruturaCabeceiraModels";
import { TabelaDePreços } from "../constants/TabelaDePrecos";
import { IAbstractFormValue } from "../constants/Formularios";

export class CaluladorDePrecos {
    constructor(private _tabela: typeof TabelaDePreços) {}

    public calcularItem(formvalue: IAbstractFormValue): number {
        switch (formvalue.$type) {
            case 'tapete':
                return this.calcularTapete(formvalue as TapeteFormValue);

            case 'cadeiras':
                return this.calcularCadeira(formvalue as CadeiraFormValue);

            case 'carpete':
                return this.calcularCarpete(formvalue as CarpeteFormValue);

            case 'colchao':
                return this.calcularColchao(formvalue as ColchaoFormValue)

            case 'cortinados':
                return this.calcularCortinado(formvalue as CortinadoFormValue);

            case 'estruturaCabeceira':
                return this.calcularEstruturaCabeceira(formvalue as EstruturaCabeceiraFormValue);

            case 'pousaPes':
                return this.calcularPousaPes(formvalue as PousaPesFormValue);

            case 'puff':
                return this.calcularPuff(formvalue as PuffFormValue);

            case 'sofa':
                return this.calcularSofa(formvalue as SofaFormValue);
        }
    }


    public calcularPuff(puff: PuffFormValue): number {
        const preco = this._tabela.puff;
        const categoriaPreco = preco['tecido'];
        let valorFinal = 0;

        if(puff.limpeza) valorFinal += categoriaPreco.limpeza;
        if(puff.impermeabilizacao) valorFinal += categoriaPreco.impermeabilizacao;
        // if(puff.antiAcaro) valorFinal += categoriaPreco.antiAcaro;
        // if(puff.antiFogo) valorFinal += categoriaPreco.antiFogo;
        // if(puff.antiOdor) valorFinal += categoriaPreco.antiOdor;
        // if(puff.hidratacao) valorFinal += categoriaPreco.hidratacao;

        return valorFinal;
    }
    public calcularEstruturaCabeceira(estCab: EstruturaCabeceiraFormValue): number {
        const preco = this._tabela.estruturaCabeceira;

        const categoriaPreco = preco[estCab.caracteristica][estCab.formato];

        let valorFinal = 0;
        if(estCab.limpeza) valorFinal += categoriaPreco.limpeza;
        if(estCab.impermeabilizacao) valorFinal += categoriaPreco.impermeabilizacao;
        // if(estCab.antiAcaro) valorFinal += categoriaPreco.antiAcaro;
        // if(estCab.antiFogo) valorFinal += categoriaPreco.antiFogo;
        // if(estCab.antiOdor) valorFinal += categoriaPreco.antiOdor;
        // if(estCab.hidratacao) valorFinal += categoriaPreco.hidratacao;


        return valorFinal;
    }

    public calcularTapete(tapete: TapeteFormValue) : number {
        const preco = this._tabela.tapete;

        const categoriaPreco = Object.entries(preco)
            .sort((a, b) => Number(a[0]) - Number(b[0]))
            .find(value => tapete.medida < Number(value[0]))![1];
        
        let valorFinal = 0;
        if(tapete.limpeza) valorFinal += categoriaPreco.limpeza * tapete.medida;
        if(tapete.impermeabilizacao) valorFinal += categoriaPreco.impermeabilizacao * tapete.medida;
        // if(tapete.antiOdor) valorFinal += categoriaPreco.antiOdor * tapete.medida;
        // if(tapete.antiFogo) valorFinal += categoriaPreco.antiFogo * tapete.medida;
        // if(tapete.antiAcaro) valorFinal += categoriaPreco.antiAcaro * tapete.medida;

        return valorFinal;
    }
    public calcularCarpete(carpete: CarpeteFormValue) : number {
        const preco = this._tabela.carpete;

        const categoriaPreco = Object.entries(preco)
            .sort((a, b) => Number(a[0]) - Number(b[0]))
            .find(value => carpete.medida < Number(value[0]))![1];
        let valorFinal = 0;
        if(carpete.limpeza) valorFinal += categoriaPreco.limpeza * carpete.medida;
        if(carpete.impermeabilizacao) valorFinal += categoriaPreco.impermeabilizacao * carpete.medida;
        // if(carpete.antiOdor) valorFinal += categoriaPreco.antiOdor * carpete.medida;
        // if(carpete.antiFogo) valorFinal += categoriaPreco.antiFogo * carpete.medida;
        // if(carpete.antiAcaro) valorFinal += categoriaPreco.antiAcaro * carpete.medida;

        return valorFinal;
    }

    public calcularCadeira(cadeira: CadeiraFormValue) : number {
        const preco = this._tabela.cadeiras;

        const categoriaPreco = preco[cadeira.areaALimpar];
        
        let valorFinal = 0;
        if(cadeira.limpeza) valorFinal += categoriaPreco.limpeza;
        if(cadeira.impermeabilizacao) valorFinal += categoriaPreco.impermeabilizacao;
        // if(cadeira.antiFogo) valorFinal += categoriaPreco.antiFogo * cadeira.medida;
        // if(cadeira.hidratacao) valorFinal += categoriaPreco.antiAcaro * cadeira.medida;

        return valorFinal;
    }

    public calcularColchao(colchao: ColchaoFormValue) : number {
        const preco = this._tabela.colchao;

        const categoriaPreco = preco[colchao.formato];
        
        let valorFinal = 0;
        if(colchao.limpeza) valorFinal += categoriaPreco.limpeza;
        if(colchao.antiAcaro) valorFinal += categoriaPreco.antiAcaro;
        // if(colchao.antiFogo) valorFinal += categoriaPreco.antiFogo;
        // if(colchao.hidratacao) valorFinal += categoriaPreco.hidratacao;

        return valorFinal;
    }
    public calcularCortinado(cortinado: CortinadoFormValue) : number {
        const preco = this._tabela.cortinados;

        const categoriaPreco = Object.entries(preco)
        .sort((a, b) => Number(a[0]) - Number(b[0]))
        .find(value => cortinado.formato < Number(value[0]))![1];
        
        let valorFinal = 0;
        if(cortinado.limpeza) valorFinal += categoriaPreco.limpeza * cortinado.formato;
        if(cortinado.impermeabilizacao) valorFinal += categoriaPreco.impermeabilizacao * cortinado.formato;
        // if(cortinado.antiFogo) valorFinal += categoriaPreco.antiFogo * cortinado.formato;

        return valorFinal;
    }
    public calcularPousaPes(pousaPes: PousaPesFormValue) : number {
        const preco = this._tabela.pousaPes;

        const categoriaPreco = preco[pousaPes.tamanho];
        
        let valorFinal = 0;
        if(pousaPes.limpeza) valorFinal += categoriaPreco.limpeza;
        if(pousaPes.impermeabilizacao) valorFinal += categoriaPreco.impermeabilizacao;
        // if(pousaPes.antiFogo) valorFinal += categoriaPreco.antiFogo;
        // if(pousaPes.antiOdor) valorFinal += categoriaPreco.antiOdor;

        return valorFinal;
    }

    public calcularSofa(sofa: SofaFormValue): number {
        const preco = this._tabela.sofa;

        const categoriaPreco = preco[sofa.lugares];
        
        let valorFinal = 0;
        if(sofa.limpeza) valorFinal += categoriaPreco.limpeza;
        if(sofa.impermeabilizacao) valorFinal += categoriaPreco.impermeabilizacao;
        // if(sofa.antiAcaro) valorFinal += categoriaPreco.antiAcaro;
        // if(sofa.antiFogo) valorFinal += categoriaPreco.antiFogo;
        // if(sofa.antiOdor) valorFinal += categoriaPreco.antiOdor;
        // if(sofa.hidratacao) valorFinal += categoriaPreco.hidratacao;

        return valorFinal;
    }
}