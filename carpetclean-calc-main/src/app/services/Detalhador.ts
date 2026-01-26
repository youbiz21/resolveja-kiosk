import { IAbstractFormValue } from "../constants/Formularios";
import { TabelaDePreços } from "../constants/TabelaDePrecos";
import { CadeiraFormValue } from "../models/CadeiraModels";
import { CarpeteFormValue } from "../models/CarpeteModels";
import { ColchaoFormValue } from "../models/ColchaoModels";
import { CortinadoFormValue } from "../models/CortinadoModels";
import { EstruturaCabeceiraFormValue } from "../models/EstruturaCabeceiraModels";
import { PousaPesFormValue } from "../models/PousaPesModels";
import { PuffFormValue } from "../models/PuffModels";
import { SofaFormValue } from "../models/SofaModels";
import { TapeteFormValue } from "../models/TapeteModels";


export type DetalhamentoItem = {
    detalhe: string;
    valor: number;
}

export class Detalhador {
    constructor(private _tabela: typeof TabelaDePreços) {
    }
    public gerarDetalhamento(form: IAbstractFormValue) : DetalhamentoItem[] {
        switch(form.$type){
            case 'tapete':
                return this.detalharTapete(form as TapeteFormValue);

            case 'cadeiras':
                return this.detalharCadeira(form as CadeiraFormValue);

            case 'carpete':
                return this.detalharCarpete(form as CarpeteFormValue);

            case 'colchao':
                return this.detalharColchao(form as ColchaoFormValue)

            case 'cortinados':
                return this.detalharCortinado(form as CortinadoFormValue);

            case 'estruturaCabeceira':
                return this.detalharEstruturaCabeceira(form as EstruturaCabeceiraFormValue);

            case 'pousaPes':
                return this.detalharPousaPes(form as PousaPesFormValue);

            case 'puff':
                return this.detalharPuff(form as PuffFormValue);

            case 'sofa':
                return this.detalharSofa(form as SofaFormValue);
                default: return [];
        }
    }

    public detalharSofa(form: SofaFormValue): DetalhamentoItem[] {
        const preco = this._tabela.sofa;
        const detalhamento: DetalhamentoItem[] = []

        const categoriaPreco = preco[form.lugares];
        
        if(form.limpeza) detalhamento.push({ detalhe: 'Limpeza', valor: categoriaPreco.limpeza });
        if(form.impermeabilizacao) detalhamento.push({ detalhe: 'Impermeabilização', valor: categoriaPreco.impermeabilizacao });
        
        return detalhamento;
    }

    public detalharPuff(form: PuffFormValue): DetalhamentoItem[] {
        const preco = this._tabela.puff;
        const categoriaPreco = preco['tecido'];
        const detalhamento: DetalhamentoItem[] = []

        if(form.limpeza) detalhamento.push({ detalhe: 'Limpeza', valor: categoriaPreco.limpeza });
        if(form.impermeabilizacao) detalhamento.push({ detalhe: 'Impermeabilização', valor: categoriaPreco.impermeabilizacao });
        
        return detalhamento;
    }

    public detalharEstruturaCabeceira(form: EstruturaCabeceiraFormValue): DetalhamentoItem[] {
        const preco = this._tabela.estruturaCabeceira;

        const categoriaPreco = preco[form.caracteristica][form.formato];

        const detalhamento: DetalhamentoItem[] = []
        if(form.limpeza) detalhamento.push({ detalhe: 'Limpeza', valor: categoriaPreco.limpeza });
        if(form.impermeabilizacao) detalhamento.push({ detalhe: 'Impermeabilização', valor: categoriaPreco.impermeabilizacao });
        
        return detalhamento;
    }
    
    public detalharTapete(form: TapeteFormValue) : DetalhamentoItem[] {
        const preco = this._tabela.tapete;

        const categoriaPreco = Object.entries(preco)
            .sort((a, b) => Number(a[0]) - Number(b[0]))
            .find(value => form.medida < Number(value[0]))![1];
        
            const detalhamento: DetalhamentoItem[] = []

            if(form.limpeza) detalhamento.push({ detalhe: 'Limpeza', valor: categoriaPreco.limpeza * form.medida });
            if(form.impermeabilizacao) detalhamento.push({ detalhe: 'Impermeabilização', valor: categoriaPreco.impermeabilizacao });
            
            return detalhamento;
    }
    
    public detalharCarpete(form: CarpeteFormValue) : DetalhamentoItem[] {
        const preco = this._tabela.carpete;

        const categoriaPreco = Object.entries(preco)
            .sort((a, b) => Number(a[0]) - Number(b[0]))
            .find(value => form.medida < Number(value[0]))![1];
        
            const detalhamento: DetalhamentoItem[] = []

            if(form.limpeza) detalhamento.push({ detalhe: 'Limpeza', valor: categoriaPreco.limpeza * form.medida });
            if(form.impermeabilizacao) detalhamento.push({ detalhe: 'Impermeabilização', valor: categoriaPreco.impermeabilizacao });
            
            return detalhamento;
    }
    
    public detalharCadeira(form: CadeiraFormValue) : DetalhamentoItem[] {
        const preco = this._tabela.cadeiras;

        const categoriaPreco = preco[form.areaALimpar];
        
        const detalhamento: DetalhamentoItem[] = []

        if(form.limpeza) detalhamento.push({ detalhe: 'Limpeza', valor: categoriaPreco.limpeza });
        if(form.impermeabilizacao) detalhamento.push({ detalhe: 'Impermeabilização', valor: categoriaPreco.impermeabilizacao });
        
        return detalhamento;
    }

    public detalharColchao(form: ColchaoFormValue) : DetalhamentoItem[] {
        const preco = this._tabela.colchao;

        const categoriaPreco = preco[form.formato];
        const detalhamento: DetalhamentoItem[] = []

        if(form.limpeza) detalhamento.push({ detalhe: 'Limpeza', valor: categoriaPreco.limpeza });
        if(form.antiAcaro) detalhamento.push({ detalhe: 'Anti-Ácaro', valor: categoriaPreco.antiAcaro });
        
        return detalhamento;
    }
    public detalharCortinado(form: CortinadoFormValue) : DetalhamentoItem[] {
        const preco = this._tabela.cortinados;

        const categoriaPreco = Object.entries(preco)
        .sort((a, b) => Number(a[0]) - Number(b[0]))
        .find(value => form.formato < Number(value[0]))![1];
        
        const detalhamento: DetalhamentoItem[] = []

        if(form.limpeza) detalhamento.push({ detalhe: 'Limpeza', valor: categoriaPreco.limpeza * form.formato });
        if(form.impermeabilizacao) detalhamento.push({ detalhe: 'Impermeabilização', valor: categoriaPreco.impermeabilizacao * form.formato });
        
        return detalhamento;
    }
    public detalharPousaPes(form: PousaPesFormValue) : DetalhamentoItem[] {
        const preco = this._tabela.pousaPes;

        const categoriaPreco = preco[form.tamanho];
        
        const detalhamento: DetalhamentoItem[] = []

        if(form.limpeza) detalhamento.push({ detalhe: 'Limpeza', valor: categoriaPreco.limpeza });
        if(form.impermeabilizacao) detalhamento.push({ detalhe: 'Impermeabilização', valor: categoriaPreco.impermeabilizacao });
        
        return detalhamento;
    }
}