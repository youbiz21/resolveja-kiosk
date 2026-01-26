import { Injectable, computed, effect, signal } from '@angular/core';
import { CaluladorDePrecos } from './CalculadorDePrecos';
import { Observable, delay, of, tap } from 'rxjs';
import { TabelaDePreços } from '../constants/TabelaDePrecos';
import { GeradorDeNomeProduto } from './GeradorDeNomeProduto';
import { IAbstractFormValue } from '../constants/Formularios';
import { SofaFormValue } from '../models/SofaModels';
import { Detalhador, DetalhamentoItem } from './Detalhador';
import { CaluladorDeServico, ResumoServico } from './CalculadorDeServico';

const PORCENTAGEM_IVA = 0.23;

export type Resultado = {
  items: ResultadoItem[];
  total: number;
}

export type ResultadoItem = {
  descricao: string;
  resumo: ResumoServico;
  tipo: 'domicilio' | 'lavanderia';
}

export type Loading<T> = {
  value: T,
  loading?: never
} | {
  loading: true;
  value?: never;
}

@Injectable({
  providedIn: 'root'
})
export class SimuladorService {
  total = computed<Loading<number>>(() => {
    const items = this.items()
    if(items.loading) return { loading: true };
    const total = items.value.reduce((prev, curr) => prev + curr.resumo.total, 0);
    return { value: total };
  });

  desconto = computed<Loading<number>>(() => {
    const total = this.total();
    if(total.loading) return { loading: true };

    const tabelaDesconto = [
      { valor: 200, desconto: 10 },
      { valor: 350, desconto: 15 },
      { valor: 700, desconto: 20 },
    ];

    return { value: tabelaDesconto.sort(e => e.desconto).find(e => total.value > e.desconto)!.desconto / 100 };
  });

  valorComDesconto = computed(() => {
    const desconto = this.desconto();
    const total = this.total();
    if(desconto.loading || total.loading) return { loading: true };
  
    return total.value * (1 - desconto.value);
  });

  final = computed<Loading<number>>(() => {
    const total = this.total();
    if(total.loading) return { loading: true };
    return { value: total.value + this.adicional() }
  });

  adicional = signal(0);

  items = signal<Loading<ResultadoItem[]>>({ loading: true })

  calcular(formValue: IAbstractFormValue[]) : Observable<ResultadoItem[]> {
    // Calcula o preço a partir de uma tabela de preços
    const servico = new CaluladorDeServico(TabelaDePreços);
    const gerador = new GeradorDeNomeProduto();

    this.items.set({ loading: true });

    const resultados = formValue.map(v => {
      const resumo = servico.calcularItem(v);
      return {
        descricao: gerador.gerarNome(v),
        resumo: resumo,
        tipo: v.$service
      } as ResultadoItem
    });

    const total = resultados.map(e => e.resumo.total).reduce((acc, curr) => acc + curr,0);
    if(total < 70) {
      const quota = 70 - total;
      resultados.push({
        descricao: 'Quota minima',
        resumo: {
          antiAcaro: false,
          antiFogo: false,
          antiOdor: false,
          descontoLimpeza: 0,
          detalhes: [{ detalhe: 'Valor minimo', valor: quota }],
          impermeabilizacao: false,
          valorLimpeza: 0,
          valorImpermeabilizacao: 0,
          valorAntiOdor: 0,
          valorAntiFogo: 0,
          valorAntiAcaro: 0,
          limpeza: true,
          total: quota
        },
        tipo: 'lavanderia'
      })
    }

    return of<ResultadoItem[]>(resultados).pipe(delay(300),tap(v =>  this.items.set({ value: v })))
  }
}
