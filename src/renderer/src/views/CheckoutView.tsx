import { useEffect, useMemo, useState } from 'react'
import { Button } from 'primereact/button'
import { RadioButton } from 'primereact/radiobutton'
import { useCart } from '../contexts/CartContext'
import { useStepper } from '../contexts/StepperContext'
import { useSimulador } from '../hooks/useSimulador'
import { OFERTAS } from '../constants/ofertas'
import type { SimuladorFormKeys } from '../types/models'

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(value)
}

export default function CheckoutView(): React.JSX.Element {
  const cart = useCart()
  const stepper = useStepper()
  const simulador = useSimulador()
  const [adicionalSelected, setAdicionalSelected] = useState<boolean>(false)

  useEffect(() => {
    simulador.calcular(cart.items)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const possuiOferta = useMemo(() => {
    if (cart.items.length !== 1) return null
    const type = cart.items[0].$type as SimuladorFormKeys
    return OFERTAS[type] || null
  }, [cart.items])

  useEffect(() => {
    if (possuiOferta && adicionalSelected) {
      simulador.setAdicional(possuiOferta.valor)
    } else {
      simulador.setAdicional(0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adicionalSelected, possuiOferta])

  return (
    <div>
      <div>
        <i className="pi pi-arrow-left cursor-pointer" onClick={() => stepper.prev()}></i>
      </div>
      <hr />
      <div className="flex flex-column gap-2">
        <div>
          {simulador.items.map((item, index) => (
            <div key={index}>
              <div className="flex justify-content-between mb-1">
                <span>{item.descricao}</span>
                <div>
                  <span className="cursor-pointer" onClick={() => simulador.deleteItem(item)}>
                    <i className="pi pi-trash mx-2 text-red-400"></i>
                  </span>
                </div>
              </div>
              <div className="text-sm ml-4 text-700 mb-2">
                {item.resumo.detalhes.map((detalhe, di) => (
                  <div key={di} className="flex justify-content-between">
                    <span>{detalhe.detalhe}</span>
                    <span>{formatCurrency(detalhe.valor)}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-content-end">
                <span>{formatCurrency(item.resumo.total)}</span>
              </div>
              <hr />
            </div>
          ))}
        </div>

        <div className="flex flex-column align-items-center justify-content-center">
          {simulador.items.length > 0 ? (
            <>
              <div className="mb-4 mt-2 text-center">
                Valor Total (Servicos a Domicilio): {formatCurrency(simulador.totalDomicilio)}
                <br />
                {simulador.descontosDomicilio > 0 && (
                  <>
                    Descontos (Servico a Domicilio): {formatCurrency(simulador.descontosDomicilio)}
                    <br />
                  </>
                )}
                <br />
                Valor Total (Servicos Lavanderia): {formatCurrency(simulador.totalLavanderia)}
                <br />
                {simulador.descontosLavanderia > 0 && (
                  <>
                    Descontos: {formatCurrency(simulador.descontosLavanderia)}
                    <br />
                  </>
                )}
                <br />
                Valor final c/ IVA: {formatCurrency(simulador.totalComDesconto)}
                <br />
                <br />
                *Valores c/ IVA incluso
                <br />
              </div>

              {possuiOferta && (
                <div>
                  <div className="text-center w-20rem mb-4">
                    98% dos nossos clientes compra o tratamento Anti-acaros, por apenas{' '}
                    <span>{formatCurrency(possuiOferta.valor)}</span>
                  </div>
                  <div className="flex gap-2 mb-4 justify-content-center">
                    <span>
                      Sim, quero
                      <RadioButton
                        value={true}
                        onChange={() => setAdicionalSelected(true)}
                        checked={adicionalSelected === true}
                      />
                    </span>
                    <span>
                      Nao, obrigado
                      <RadioButton
                        value={false}
                        onChange={() => setAdicionalSelected(false)}
                        checked={adicionalSelected === false}
                      />
                    </span>
                  </div>
                  <div className="mb-6 font-bold text-lg text-center">
                    Valor Total: {formatCurrency(simulador.finalTotal)}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div>Carrinho Vazio.</div>
          )}
        </div>

        <div className="flex justify-content-center gap-2">
          {simulador.items.length > 0 ? (
            <>
              <Button
                label="Adicionar Servico"
                severity="secondary"
                onClick={() => stepper.to(0)}
              />
              <Button label="Finalizar" onClick={() => stepper.next()} />
            </>
          ) : (
            <Button label="Ir para Homepage" onClick={() => stepper.to(0)} />
          )}
        </div>
      </div>
    </div>
  )
}
