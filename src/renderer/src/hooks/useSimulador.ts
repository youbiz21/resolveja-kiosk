import { useMemo, useState, useCallback } from 'react'
import type { IAbstractFormValue } from '../types/models'
import type { ResultadoItem } from '../types/pricing'
import { CalculadorDeServico } from '../services/CalculadorDeServico'
import { GeradorDeNomeProduto } from '../services/GeradorDeNomeProduto'
import { TabelaDePrecos } from '../constants/precos'
import { Formularios } from '../constants/formularios'

type SimuladorReturn = {
  items: ResultadoItem[]
  setItems: React.Dispatch<React.SetStateAction<ResultadoItem[]>>
  calcular: (formValues: IAbstractFormValue[]) => void
  deleteItem: (item: ResultadoItem) => void
  totalLavanderia: number
  descontosLavanderia: number
  totalDomicilio: number
  descontosDomicilio: number
  totalComDesconto: number
  total: number
  finalTotal: number
  adicional: number
  setAdicional: React.Dispatch<React.SetStateAction<number>>
  possuiOferta: null
}

export function useSimulador(): SimuladorReturn {
  const [items, setItems] = useState<ResultadoItem[]>([])
  const [adicional, setAdicional] = useState(0)

  const calcular = useCallback((formValues: IAbstractFormValue[]) => {
    const servico = new CalculadorDeServico(TabelaDePrecos)
    const gerador = new GeradorDeNomeProduto()

    const resultados = formValues.map((v) => {
      const resumo = servico.calcularItem(v)
      return {
        descricao: gerador.gerarNome(v) || '',
        icone: Formularios[v.$type].icone,
        resumo,
        tipo: v.$service
      } as ResultadoItem
    })

    const total = resultados.reduce((acc, curr) => acc + curr.resumo.total, 0)
    if (total < 70) {
      const quota = 70 - total
      resultados.push({
        descricao: 'Quota mínima',
        icone: '',
        resumo: {
          antiAcaro: false,
          antiFogo: false,
          antiOdor: false,
          descontoLimpeza: 0,
          detalhes: [{ detalhe: 'Valor mínimo', valor: quota }],
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

    setItems(resultados)
    setAdicional(0)
  }, [])

  const deleteItem = useCallback((item: ResultadoItem) => {
    setItems((prev) => prev.filter((v) => v !== item))
  }, [])

  const totalLavanderia = useMemo(
    () =>
      items
        .filter((e) => e.tipo === 'lavanderia')
        .reduce((acc, curr) => acc + curr.resumo.total, 0),
    [items]
  )

  const descontosLavanderia = useMemo(
    () =>
      items
        .filter((e) => e.tipo === 'lavanderia')
        .reduce((acc, curr) => acc + curr.resumo.descontoLimpeza, 0),
    [items]
  )

  const totalDomicilio = useMemo(
    () =>
      items.filter((e) => e.tipo === 'domicilio').reduce((acc, curr) => acc + curr.resumo.total, 0),
    [items]
  )

  const descontosDomicilio = useMemo(() => {
    const total = totalDomicilio
    const tabelaDesconto = [
      { desconto: 200, value: 0 },
      { desconto: 350, value: 10 },
      { desconto: 700, value: 15 },
      { desconto: Number.MAX_VALUE, value: 20 }
    ]
    const categoriaDesconto =
      tabelaDesconto.sort((a, b) => a.desconto - b.desconto).find((e) => e.desconto >= total)
        ?.value || 0
    return (total * categoriaDesconto) / 100
  }, [totalDomicilio])

  const totalComDesconto = useMemo(
    () => totalDomicilio + totalLavanderia - descontosLavanderia - descontosDomicilio,
    [totalDomicilio, totalLavanderia, descontosLavanderia, descontosDomicilio]
  )

  const total = useMemo(() => items.reduce((acc, curr) => acc + curr.resumo.total, 0), [items])

  const finalTotal = useMemo(() => total + adicional, [total, adicional])

  const possuiOferta = useMemo(() => {
    if (items.length !== 1) return null
    return null
  }, [items])

  return {
    items,
    setItems,
    calcular,
    deleteItem,
    totalLavanderia,
    descontosLavanderia,
    totalDomicilio,
    descontosDomicilio,
    totalComDesconto,
    total,
    finalTotal,
    adicional,
    setAdicional,
    possuiOferta
  }
}
