import type {
  IAbstractFormValue,
  TapeteFormValue,
  CarpeteFormValue,
  CadeiraFormValue,
  ColchaoFormValue,
  CortinadoFormValue,
  EstruturaCabeceiraFormValue,
  PousaPesFormValue,
  PuffFormValue,
  SofaFormValue
} from '../types/models'

export class GeradorDeNomeProduto {
  readonly ServicoDomicilio = 'Servico ao domicilio'
  readonly Lavanderia = 'Lavandaria'

  public geraNomeItems(form: IAbstractFormValue[]): string[] {
    return form.reduce((prev, curr) => {
      const resultado = this.gerarNome(curr)
      if (resultado) prev.push(resultado)
      return prev
    }, [] as string[])
  }

  public gerarNome(formvalue: IAbstractFormValue): string | undefined {
    switch (formvalue.$type) {
      case 'tapete':
        return this.nomeTapete(formvalue as TapeteFormValue)
      case 'cadeiras':
        return this.nomeCadeira(formvalue as CadeiraFormValue)
      case 'carpete':
        return this.nomeCarpete(formvalue as CarpeteFormValue)
      case 'colchao':
        return this.nomeColchao(formvalue as ColchaoFormValue)
      case 'cortinados':
        return this.nomeCortinado(formvalue as CortinadoFormValue)
      case 'estruturaCabeceira':
        return this.nomeEstruturaCabeceira(formvalue as EstruturaCabeceiraFormValue)
      case 'pousaPes':
        return this.nomePousaPes(formvalue as PousaPesFormValue)
      case 'puff':
        return this.nomePuff(formvalue as PuffFormValue)
      case 'sofa':
        return this.nomeSofa(formvalue as SofaFormValue)
    }
    return undefined
  }

  public nomePuff(puff: PuffFormValue): string {
    const tokens: string[] = []
    tokens.push(`Puff ${puff.acabamento == 'tecido' ? 'Tecido' : ''}`)
    tokens.push(this.ServicoDomicilio)
    return tokens.join('/ ')
  }

  public nomeEstruturaCabeceira(estCab: EstruturaCabeceiraFormValue): string {
    const tokens: string[] = []
    const caracteristica = `${estCab.caracteristica == 'cabeceira' ? 'Cabeceira' : estCab.caracteristica == 'estrutura' ? 'Estrutura' : 'Estrutura e Cabeceira'}`
    const formato = estCab.formato == 'individual' ? 'Individual' : 'Casal'
    tokens.push(`${caracteristica} (${formato})`)
    tokens.push(this.ServicoDomicilio)
    return tokens.join('/ ')
  }

  public nomeTapete(tapete: TapeteFormValue): string {
    const tokens: string[] = []
    const formato =
      tapete.formato == 'quadrado'
        ? 'Quadrado'
        : tapete.formato == 'redondo'
          ? 'Redondo'
          : 'Retangulo'
    const medida =
      tapete.formato == 'quadrado'
        ? `${tapete.a.toFixed(2)} m`
        : tapete.formato == 'redondo'
          ? `${tapete.d.toFixed(2)} m`
          : `${tapete.x.toFixed(2)} m x ${tapete.y.toFixed(2)} m`
    tokens.push(`Tapete/Carpete ${formato} (${medida})`)
    tokens.push(this.Lavanderia)
    return tokens.join('/ ')
  }

  public nomeCarpete(carpete: CarpeteFormValue): string {
    const tokens: string[] = []
    const formato =
      carpete.formato == 'quadrado'
        ? 'Quadrado'
        : carpete.formato == 'redondo'
          ? 'Redondo'
          : 'Retangulo'
    const medida =
      carpete.formato == 'quadrado'
        ? `${carpete.a.toFixed(2)} m`
        : carpete.formato == 'redondo'
          ? `${carpete.d.toFixed(2)} m`
          : `${carpete.x.toFixed(2)} m x ${carpete.y.toFixed(2)} m`
    tokens.push(`Tapete/Carpete ${formato} (${medida})`)
    tokens.push(this.ServicoDomicilio)
    return tokens.join('/ ')
  }

  public nomeCadeira(cadeira: CadeiraFormValue): string {
    const tokens: string[] = []
    const areaLimpar =
      cadeira.areaALimpar == 'assento'
        ? 'Assento'
        : cadeira.areaALimpar == 'assentoCostas'
          ? 'Assento e Costas'
          : 'Assento, Costas e Banco'
    tokens.push(
      `Cadeira ${cadeira.caracteristica == 'pele' ? 'de Pele' : 'de Tecido'} (${areaLimpar})`
    )
    tokens.push(this.ServicoDomicilio)
    return tokens.join('/ ')
  }

  public nomeColchao(colchao: ColchaoFormValue): string {
    const tokens: string[] = []
    let formato: string
    switch (colchao.formato) {
      case 'berco':
        formato = 'Berco'
        break
      case 'casal':
        formato = 'Casal'
        break
      case 'individual':
        formato = 'Individual'
        break
      case 'king':
        formato = 'King'
        break
    }
    tokens.push(`Colchao ${formato}`)
    tokens.push(this.ServicoDomicilio)
    return tokens.join('/ ')
  }

  public nomeCortinado(cortinado: CortinadoFormValue): string {
    const tokens: string[] = []
    tokens.push(`Cortinado (${cortinado.x.toFixed(2)} m)`)
    tokens.push(this.ServicoDomicilio)
    return tokens.join('/ ')
  }

  public nomePousaPes(pousaPes: PousaPesFormValue): string {
    const tokens: string[] = []
    tokens.push(
      `Pousa Pes ${pousaPes.tamanho == 'pequeno' ? 'Pequeno' : pousaPes.tamanho == 'medio' ? 'Medio' : 'Grande'}`
    )
    tokens.push(this.ServicoDomicilio)
    return tokens.join('/ ')
  }

  public nomeSofa(sofa: SofaFormValue): string {
    const tokens: string[] = []
    tokens.push(
      `Sofa ${sofa.acabamento == 'pele' ? 'de Pele' : 'de Tecido'} (${sofa.lugares} lugares)`
    )
    tokens.push(this.ServicoDomicilio)
    return tokens.join('/ ')
  }
}
