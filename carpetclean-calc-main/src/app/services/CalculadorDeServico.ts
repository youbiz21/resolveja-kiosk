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
import { DetalhamentoItem } from "./Detalhador";

export type ResumoServico = {
    limpeza: boolean,
    valorLimpeza: number,
    descontoLimpeza: number,
    antiOdor: boolean,
    valorAntiOdor: number,
    antiFogo: boolean,
    valorAntiFogo: number,
    antiAcaro: boolean,
    valorAntiAcaro: number,
    impermeabilizacao: boolean,
    valorImpermeabilizacao: number;
    total: number,
    detalhes: DetalhamentoItem[]
}

export class CaluladorDeServico {
    constructor(private _tabela: typeof TabelaDePreços) {}

    public calcularItem(formvalue: IAbstractFormValue): ResumoServico {
        switch (formvalue.$type) {
            case 'tapete':
                return this.calcularTapete(formvalue as TapeteFormValue);

            case 'carpete':
                return this.calcularCarpete(formvalue as CarpeteFormValue);
            
            default: throw '';

            case 'cadeiras':
                return this.calcularCadeira(formvalue as CadeiraFormValue);

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


    public calcularPuff(form: PuffFormValue): ResumoServico {
        const preco = this._tabela.puff;
        const categoriaPreco = preco['tecido'];
        let detalhes: DetalhamentoItem[] = [];
        let total = 0;

        const valorLimpeza = categoriaPreco.limpeza;
        const valorAntiOdor = categoriaPreco.antiOdor;
        const valorAntiFogo = categoriaPreco.antiFogo;
        const valorAntiAcaro = categoriaPreco.antiAcaro;
        const valorImpermeabilizacao = categoriaPreco.impermeabilizacao;

        if(form.limpeza) {
            total += categoriaPreco.limpeza;
            detalhes.push({ detalhe: 'Limpeza', valor: categoriaPreco.limpeza });
        }
            
        if(form.antiAcaro) {
            total += categoriaPreco.antiAcaro;
            detalhes.push({ detalhe: 'Anti Ácaro', valor: categoriaPreco.antiAcaro });
        }
            
        if(form.antiOdor) {
            total += categoriaPreco.antiOdor;
            detalhes.push({ detalhe: 'Anti Odor', valor: categoriaPreco.antiOdor });
        }

        if(form.impermeabilizacao) {
            total += valorImpermeabilizacao;
            detalhes.push({ detalhe: 'Impermeabilização', valor: categoriaPreco.impermeabilizacao });
        }

        if(form.antiFogo) {
            total += categoriaPreco.antiFogo;
            detalhes.push({ detalhe: 'Anti Fogo', valor: categoriaPreco.antiFogo })
        }

        return {
            limpeza: form.limpeza,
            valorLimpeza,
            descontoLimpeza: 0,
            antiOdor: form.antiOdor,
            valorAntiOdor,
            antiFogo: form.antiFogo,
            valorAntiFogo,
            antiAcaro: form.antiAcaro,
            valorAntiAcaro,
            impermeabilizacao: form.impermeabilizacao,
            valorImpermeabilizacao,
            total,
            detalhes
        };
    }

    public calcularEstruturaCabeceira(form: EstruturaCabeceiraFormValue): ResumoServico {
        const preco = this._tabela.estruturaCabeceira;

        const categoriaPreco = preco[form.caracteristica][form.formato];

        let detalhes: DetalhamentoItem[] = [];
        let total = 0;

        const valorLimpeza = categoriaPreco.limpeza;
        const valorAntiOdor = categoriaPreco.antiOdor;
        const valorAntiFogo = categoriaPreco.antiFogo;
        const valorAntiAcaro = categoriaPreco.antiAcaro;
        const valorImpermeabilizacao = categoriaPreco.impermeabilizacao;

        if(form.limpeza) {
            total += categoriaPreco.limpeza;
            detalhes.push({ detalhe: 'Limpeza', valor: categoriaPreco.limpeza });
        }
            
        if(form.antiAcaro) {
            total += categoriaPreco.antiAcaro;
            detalhes.push({ detalhe: 'Anti Ácaro', valor: categoriaPreco.antiAcaro });
        }
            
        if(form.antiOdor) {
            total += categoriaPreco.antiOdor;
            detalhes.push({ detalhe: 'Anti Odor', valor: categoriaPreco.antiOdor });
        }

        if(form.impermeabilizacao) {
            total += valorImpermeabilizacao;
            detalhes.push({ detalhe: 'Impermeabilização', valor: categoriaPreco.impermeabilizacao });
        }

        if(form.antiFogo) {
            total += categoriaPreco.antiFogo;
            detalhes.push({ detalhe: 'Anti Fogo', valor: categoriaPreco.antiFogo })
        }

        return {
            limpeza: form.limpeza,
            valorLimpeza,
            descontoLimpeza: 0,
            antiOdor: form.antiOdor,
            valorAntiOdor,
            antiFogo: form.antiFogo,
            valorAntiFogo,
            antiAcaro: form.antiAcaro,
            valorAntiAcaro,
            impermeabilizacao: form.impermeabilizacao,
            valorImpermeabilizacao,
            total,
            detalhes
        };
    }

    public calcularTapete(form: TapeteFormValue) : ResumoServico {
        const preco = this._tabela.tapete;

        const categoriaPreco = Object.entries(preco)
            .sort((a, b) => Number(a[0]) - Number(b[0]))
            .find(value => form.medida < Number(value[0]))![1];

        const tabelaDesconto = [
            { desconto: 10, valor: 0 },
            { desconto: 20, valor: 10 },
            { desconto: 30, valor: 12.5 },
            { desconto: 40, valor: 15 },
            { desconto: 50, valor: 17.5 },
            { desconto: Number.MAX_VALUE, valor: 20 },
        ];

        const valorLimpeza = categoriaPreco.limpeza * form.medida;
        const categoriaDesconto = tabelaDesconto.sort(e => e.desconto).find(e => form.medida <= e.desconto)?.valor || 0;
        const descontoLimpeza = (categoriaDesconto / 100) * valorLimpeza;
        const valorAntiOdor = categoriaPreco.antiOdor * form.medida;
        const valorAntiFogo = categoriaPreco.antiFogo * form.medida;
        const valorAntiAcaro = categoriaPreco.antiAcaro * form.medida;
        const valorImpermeabilizacao = categoriaPreco.impermeabilizacao;

        let detalhes: DetalhamentoItem[] = [];
        let total = 0;

        if(form.limpeza) {
            total += valorLimpeza;
            detalhes.push({ detalhe: 'Limpeza', valor: valorLimpeza });
        }
            
        if(form.antiAcaro) {
            total += categoriaPreco.antiAcaro;
            detalhes.push({ detalhe: 'Anti Ácaro', valor: categoriaPreco.antiAcaro });
        }
            
        if(form.antiOdor) {
            total += categoriaPreco.antiOdor;
            detalhes.push({ detalhe: 'Anti Odor', valor: categoriaPreco.antiOdor });
        }

        if(form.impermeabilizacao) {
            total += valorImpermeabilizacao;
            detalhes.push({ detalhe: 'Impermeabilização', valor: categoriaPreco.impermeabilizacao });
        }

        if(form.antiFogo) {
            total += categoriaPreco.antiFogo;
            detalhes.push({ detalhe: 'Anti Fogo', valor: categoriaPreco.antiFogo })
        }

        if(descontoLimpeza != 0) {
            detalhes.push({ detalhe: 'Desconto Limpeza', valor: - descontoLimpeza });
        } 

        return {
            limpeza: form.limpeza,
            valorLimpeza,
            descontoLimpeza,
            antiOdor: form.antiOdor,
            valorAntiOdor,
            antiFogo: form.antiFogo,
            valorAntiFogo,
            antiAcaro: form.antiAcaro,
            valorAntiAcaro,
            impermeabilizacao: form.impermeabilizacao,
            valorImpermeabilizacao,
            total,
            detalhes
        };
    }

    public calcularCarpete(form: CarpeteFormValue) : ResumoServico {
        const preco = this._tabela.carpete;

        const categoriaPreco = Object.entries(preco)
            .sort((a, b) => Number(a[0]) - Number(b[0]))
            .find(value => form.medida < Number(value[0]))![1];
        

        const valorLimpeza = categoriaPreco.limpeza * form.medida;
        const valorAntiOdor = categoriaPreco.antiOdor * form.medida;
        const valorAntiFogo = categoriaPreco.antiFogo * form.medida;
        const valorAntiAcaro = categoriaPreco.antiAcaro * form.medida;
        const valorImpermeabilizacao = categoriaPreco.impermeabilizacao;

        let detalhes: DetalhamentoItem[] = [];
        let total = 0;

        if(form.limpeza) {
            total += valorLimpeza;
            detalhes.push({ detalhe: 'Limpeza', valor: valorLimpeza });
        }
            
        if(form.antiAcaro) {
            total += categoriaPreco.antiAcaro;
            detalhes.push({ detalhe: 'Anti Ácaro', valor: categoriaPreco.antiAcaro });
        }
            
        if(form.antiOdor) {
            total += categoriaPreco.antiOdor;
            detalhes.push({ detalhe: 'Anti Odor', valor: categoriaPreco.antiOdor });
        }

        if(form.impermeabilizacao) {
            total += valorImpermeabilizacao;
            detalhes.push({ detalhe: 'Impermeabilização', valor: categoriaPreco.impermeabilizacao });
        }

        if(form.antiFogo) {
            total += categoriaPreco.antiFogo;
            detalhes.push({ detalhe: 'Anti Fogo', valor: categoriaPreco.antiFogo })
        }

        return {
            limpeza: form.limpeza,
            valorLimpeza,
            descontoLimpeza: 0,
            antiOdor: form.antiOdor,
            valorAntiOdor,
            antiFogo: form.antiFogo,
            valorAntiFogo,
            antiAcaro: form.antiAcaro,
            valorAntiAcaro,
            impermeabilizacao: form.impermeabilizacao,
            valorImpermeabilizacao,
            total,
            detalhes
        };
    }

    public calcularCadeira(form: CadeiraFormValue) : ResumoServico {
        const preco = this._tabela.cadeiras;

        const categoriaPreco = preco[form.areaALimpar];

        let detalhes: DetalhamentoItem[] = [];
        let total = 0;

        const valorLimpeza = categoriaPreco.limpeza;
        const valorAntiOdor = categoriaPreco.antiOdor;
        const valorAntiFogo = categoriaPreco.antiFogo;
        const valorAntiAcaro = categoriaPreco.antiAcaro;
        const valorImpermeabilizacao = categoriaPreco.impermeabilizacao;

        if(form.limpeza) {
            total += categoriaPreco.limpeza;
            detalhes.push({ detalhe: 'Limpeza', valor: categoriaPreco.limpeza });
        }
            
        if(form.antiAcaro) {
            total += categoriaPreco.antiAcaro;
            detalhes.push({ detalhe: 'Anti Ácaro', valor: categoriaPreco.antiAcaro });
        }
            
        if(form.antiOdor) {
            total += categoriaPreco.antiOdor;
            detalhes.push({ detalhe: 'Anti Odor', valor: categoriaPreco.antiOdor });
        }

        if(form.impermeabilizacao) {
            total += valorImpermeabilizacao;
            detalhes.push({ detalhe: 'Impermeabilização', valor: categoriaPreco.impermeabilizacao });
        }

        if(form.antiFogo) {
            total += categoriaPreco.antiFogo;
            detalhes.push({ detalhe: 'Anti Fogo', valor: categoriaPreco.antiFogo })
        }

            

        return {
            limpeza: form.limpeza,
            valorLimpeza,
            descontoLimpeza: 0,
            antiOdor: form.antiOdor,
            valorAntiOdor,
            antiFogo: form.antiFogo,
            valorAntiFogo,
            antiAcaro: form.antiAcaro,
            valorAntiAcaro,
            impermeabilizacao: form.impermeabilizacao,
            valorImpermeabilizacao,
            total,
            detalhes
        };
    }

    public calcularColchao(form: ColchaoFormValue) : ResumoServico {
        const preco = this._tabela.colchao;

        const categoriaPreco = preco[form.formato];
        
        let detalhes: DetalhamentoItem[] = [];
        let total = 0;

        const valorLimpeza = categoriaPreco.limpeza;
        const valorAntiOdor = categoriaPreco.antiOdor;
        const valorAntiFogo = categoriaPreco.antiFogo;
        const valorAntiAcaro = categoriaPreco.antiAcaro;
        const valorImpermeabilizacao = categoriaPreco.impermeabilizacao;

        if(form.limpeza) {
            total += categoriaPreco.limpeza;
            detalhes.push({ detalhe: 'Limpeza', valor: categoriaPreco.limpeza });
        }
            
        if(form.antiAcaro) {
            total += categoriaPreco.antiAcaro;
            detalhes.push({ detalhe: 'Anti Ácaro', valor: categoriaPreco.antiAcaro });
        }
            
        if(form.antiOdor) {
            total += categoriaPreco.antiOdor;
            detalhes.push({ detalhe: 'Anti Odor', valor: categoriaPreco.antiOdor });
        }

        if(form.impermeabilizacao) {
            total += valorImpermeabilizacao;
            detalhes.push({ detalhe: 'Impermeabilização', valor: categoriaPreco.impermeabilizacao });
        }

        if(form.antiFogo) {
            total += categoriaPreco.antiFogo;
            detalhes.push({ detalhe: 'Anti Fogo', valor: categoriaPreco.antiFogo })
        }

        return {
            limpeza: form.limpeza,
            valorLimpeza,
            descontoLimpeza: 0,
            antiOdor: form.antiOdor,
            valorAntiOdor,
            antiFogo: form.antiFogo,
            valorAntiFogo,
            antiAcaro: form.antiAcaro,
            valorAntiAcaro,
            impermeabilizacao: form.impermeabilizacao,
            valorImpermeabilizacao,
            total,
            detalhes
        };
    }
    public calcularCortinado(form: CortinadoFormValue) : ResumoServico {
        const preco = this._tabela.cortinados;

        const categoriaPreco = Object.entries(preco)
        .sort((a, b) => Number(a[0]) - Number(b[0]))
        .find(value => form.formato < Number(value[0]))![1];
        
        let detalhes: DetalhamentoItem[] = [];
        let total = 0;

        const valorLimpeza = categoriaPreco.limpeza;
        const valorAntiOdor = categoriaPreco.antiOdor;
        const valorAntiFogo = categoriaPreco.antiFogo;
        const valorAntiAcaro = categoriaPreco.antiAcaro;
        const valorImpermeabilizacao = categoriaPreco.impermeabilizacao;

        if(form.limpeza) {
            total += categoriaPreco.limpeza;
            detalhes.push({ detalhe: 'Limpeza', valor: categoriaPreco.limpeza });
        }
            
        if(form.antiAcaro) {
            total += categoriaPreco.antiAcaro;
            detalhes.push({ detalhe: 'Anti Ácaro', valor: categoriaPreco.antiAcaro });
        }
            
        if(form.antiOdor) {
            total += categoriaPreco.antiOdor;
            detalhes.push({ detalhe: 'Anti Odor', valor: categoriaPreco.antiOdor });
        }

        if(form.impermeabilizacao) {
            total += valorImpermeabilizacao;
            detalhes.push({ detalhe: 'Impermeabilização', valor: categoriaPreco.impermeabilizacao });
        }

        if(form.antiFogo) {
            total += categoriaPreco.antiFogo;
            detalhes.push({ detalhe: 'Anti Fogo', valor: categoriaPreco.antiFogo })
        }

        return {
            limpeza: form.limpeza,
            valorLimpeza,
            descontoLimpeza: 0,
            antiOdor: form.antiOdor,
            valorAntiOdor,
            antiFogo: form.antiFogo,
            valorAntiFogo,
            antiAcaro: form.antiAcaro,
            valorAntiAcaro,
            impermeabilizacao: form.impermeabilizacao,
            valorImpermeabilizacao,
            total,
            detalhes
        };
    }
    public calcularPousaPes(form: PousaPesFormValue) : ResumoServico {
        const preco = this._tabela.pousaPes;

        const categoriaPreco = preco[form.tamanho];
        
        let detalhes: DetalhamentoItem[] = [];
        let total = 0;

        const valorLimpeza = categoriaPreco.limpeza;
        const valorAntiOdor = categoriaPreco.antiOdor;
        const valorAntiFogo = categoriaPreco.antiFogo;
        const valorAntiAcaro = categoriaPreco.antiAcaro;
        const valorImpermeabilizacao = categoriaPreco.impermeabilizacao;

        if(form.limpeza) {
            total += categoriaPreco.limpeza;
            detalhes.push({ detalhe: 'Limpeza', valor: categoriaPreco.limpeza });
        }
            
        if(form.antiAcaro) {
            total += categoriaPreco.antiAcaro;
            detalhes.push({ detalhe: 'Anti Ácaro', valor: categoriaPreco.antiAcaro });
        }
            
        if(form.antiOdor) {
            total += categoriaPreco.antiOdor;
            detalhes.push({ detalhe: 'Anti Odor', valor: categoriaPreco.antiOdor });
        }

        if(form.impermeabilizacao) {
            total += valorImpermeabilizacao;
            detalhes.push({ detalhe: 'Impermeabilização', valor: categoriaPreco.impermeabilizacao });
        }

        if(form.antiFogo) {
            total += categoriaPreco.antiFogo;
            detalhes.push({ detalhe: 'Anti Fogo', valor: categoriaPreco.antiFogo })
        }

        return {
            limpeza: form.limpeza,
            valorLimpeza,
            descontoLimpeza: 0,
            antiOdor: form.antiOdor,
            valorAntiOdor,
            antiFogo: form.antiFogo,
            valorAntiFogo,
            antiAcaro: form.antiAcaro,
            valorAntiAcaro,
            impermeabilizacao: form.impermeabilizacao,
            valorImpermeabilizacao,
            total,
            detalhes
        };
    }

    public calcularSofa(form: SofaFormValue): ResumoServico {
        const preco = this._tabela.sofa;

        const categoriaPreco = preco[form.lugares];
        
        let detalhes: DetalhamentoItem[] = [];
        let total = 0;

        const valorLimpeza = categoriaPreco.limpeza;
        const valorAntiOdor = categoriaPreco.antiOdor;
        const valorAntiFogo = categoriaPreco.antiFogo;
        const valorAntiAcaro = categoriaPreco.antiAcaro;
        const valorImpermeabilizacao = categoriaPreco.impermeabilizacao;

        if(form.limpeza) {
            total += categoriaPreco.limpeza;
            detalhes.push({ detalhe: 'Limpeza', valor: categoriaPreco.limpeza });
        }
            
        if(form.antiAcaro) {
            total += categoriaPreco.antiAcaro;
            detalhes.push({ detalhe: 'Anti Ácaro', valor: categoriaPreco.antiAcaro });
        }
            
        if(form.antiOdor) {
            total += categoriaPreco.antiOdor;
            detalhes.push({ detalhe: 'Anti Odor', valor: categoriaPreco.antiOdor });
        }

        if(form.impermeabilizacao) {
            total += valorImpermeabilizacao;
            detalhes.push({ detalhe: 'Impermeabilização', valor: categoriaPreco.impermeabilizacao });
        }

        if(form.antiFogo) {
            total += categoriaPreco.antiFogo;
            detalhes.push({ detalhe: 'Anti Fogo', valor: categoriaPreco.antiFogo })
        }

        return {
            limpeza: form.limpeza,
            valorLimpeza,
            descontoLimpeza: 0,
            antiOdor: form.antiOdor,
            valorAntiOdor,
            antiFogo: form.antiFogo,
            valorAntiFogo,
            antiAcaro: form.antiAcaro,
            valorAntiAcaro,
            impermeabilizacao: form.impermeabilizacao,
            valorImpermeabilizacao,
            total,
            detalhes
        };
    }
}