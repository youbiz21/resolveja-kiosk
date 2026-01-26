import { inject, Injectable } from '@angular/core';
import { Observable, Subject, filter, forkJoin, map, of, switchMap, tap } from 'rxjs';
import { ResultadoItem, SimuladorService } from './simulador.service';
import { HttpClient } from '@angular/common/http';

export type BitrixResponse<T> = {
  result: T
}

type CadastroServico = {
  cadastroId: string;
  primeiroNome: string;
  ultimoNome: string;
  telefone: string;
  pais: string;
  email: string;
  morada: string;
  codigoPostal: string;
  localidade: string;
  total: number;
  items: ResultadoItem[];
}

@Injectable({
  providedIn: 'root'
})
export class CadastroService {
  private _http = inject(HttpClient);
  private _simulador = inject(SimuladorService);
  constructor() { }

  enviar(cadastro: Partial<CadastroServico>): Observable<void> {
    let cadastroLavanderia = {
      ...cadastro,
      items: cadastro.items
    }

    // let cadastroDomicilio = {
    //   ...cadastro,
    //   items: cadastro.items?.filter(e => e.tipo == 'domicilio')
    // }

    let service1 = 'https://carpetclean.bitrix24.eu/rest/5/dbo2o7oioi4ovtpf';
    // let service2 = 'https://resolveja.bitrix24.eu/rest/9/fyz2t3f704zz06kv/';

    return forkJoin([
      this.getCadastro(cadastroLavanderia, service1).pipe(
        switchMap(v => v != null ? of(v) : this.criaCadastro(cadastroLavanderia, service1)),
        switchMap(v => this.criaDeal(v, service1)),
        map(() => {})
      )
    ]).pipe(
      map(() => {})
    );
  }

  private getCadastro(cadastro: Partial<CadastroServico>, url: string) {
    const getPayload = {
      filter: {
        PHONE: `${cadastro.pais}${cadastro.telefone}`
      }
    }
    return this._http.post<BitrixResponse<{ID: string}[]>>(`${url}/crm.contact.list`, getPayload)
    .pipe(
      map(v =>  {
        if(v.result.length) {
          cadastro.cadastroId = v.result.at(0)?.ID;
          return cadastro;
        }
        return null;
      })
    )
  }

  private criaCadastro(cadastro: Partial<CadastroServico>, url: string) {
    const payload = {
      fields: {
        NAME: cadastro.primeiroNome,
        LAST_NAME: cadastro.ultimoNome,
        EMAIL: [
          {
            "VALUE_TYPE": "WORK",
            "VALUE":  cadastro.email,
            "TYPE_ID": "EMAIL"
          }
        ],
        PHONE: [
          {
            "VALUE_TYPE": "WORK",
            "VALUE": `${cadastro.pais}${cadastro.telefone}`,
            "TYPE_ID": "PHONE"
          }
        ],
        SOURCE_ID: "UC_ZIO4M9"
      }
    };

    return this._http.post<BitrixResponse<string>>(`${url}/crm.contact.add`, payload)
    .pipe(
      map(v => ({...cadastro, cadastroId: v.result} as Partial<CadastroServico>))
    )
  }

  private criaDeal(cad: Partial<CadastroServico>, url: string) {
    const total = cad.items?.reduce((acc, current) => current.resumo.total - current.resumo.descontoLimpeza + acc, 0) || 0;

    const tabelaDesconto = [
      { desconto: 200, value: 0 },
      { desconto: 350, value: 10 },
      { desconto: 700, value: 15 },
      { desconto: Number.MAX_VALUE, value: 20 },
    ]

    const categoriaDesconto = tabelaDesconto.sort(e => e.desconto).find(e => e.desconto >= total )?.value || 0;
    const totalComDesconto =  total * categoriaDesconto / 100;
    const descricao = `${cad.items!.map(v => `${v.descricao}\n${v.resumo.detalhes.map(v => `${v.detalhe} - €${v.valor.toFixed(2)}`).join('\n')}\n[b]Total: €${(v.resumo.total).toFixed(2)}[/b]`).join('\n\n')}\n\n${'-'.repeat(16)}\n[b]Valor total bruto: €${total.toFixed(2)}\nValor total com IVA: €${totalComDesconto.toFixed(2)}[/b]`

    const payload = {
      fields: {
        OPPORTUNITY: total,
        CONTACT_ID: cad.cadastroId,
        COMMENTS: descricao,
        UF_CRM_1722439328830: cad.morada,
        SOURCE_ID: "UC_ZIO4M9",
        UF_CRM_1722948281101: cad.codigoPostal,
        UF_CRM_1722948298893: cad.localidade
      }
    }
    return this._http.post(`${url}/crm.deal.add`, payload)
    .pipe(
      map(()=>{})
    )
  }
}
