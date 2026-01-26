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
        <button type="button" className="btn-back" onClick={() => stepper.prev()}>
          <i className="pi pi-arrow-left"></i>
          <span>Voltar</span>
        </button>
      </div>
      <hr />
      <div className="flex flex-column gap-2">
        <div>
          {simulador.items.map((item, index) => (
            <div key={index}>
              <div className="flex justify-content-between mb-1">
                <span>{item.descricao}</span>
                <button
                  type="button"
                  onClick={() => simulador.deleteItem(item)}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    padding: '0.5rem',
                    cursor: 'pointer',
                    borderRadius: 8
                  }}
                >
                  <i className="pi pi-trash text-red-400" style={{ fontSize: '1.2rem' }}></i>
                </button>
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
                Valor Total (Serviços ao Domicílio): {formatCurrency(simulador.totalDomicilio)}
                <br />
                {simulador.descontosDomicilio > 0 && (
                  <>
                    Descontos (Serviço ao Domicílio):{' '}
                    {formatCurrency(simulador.descontosDomicilio)}
                    <br />
                  </>
                )}
                <br />
                Valor Total (Serviços de Lavandaria): {formatCurrency(simulador.totalLavanderia)}
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
                *Valores com IVA incluído
                <br />
              </div>

              {possuiOferta && (
                <div>
                  <div className="text-center w-20rem mb-4">
                    98% dos nossos clientes escolhe o tratamento Anti-ácaros por apenas{' '}
                    <span>{formatCurrency(possuiOferta.valor)}</span>
                  </div>
                  <div className="flex gap-3 mb-4 justify-content-center">
                    <label
                      className="flex align-items-center gap-2 cursor-pointer surface-100 border-round-lg px-4 py-3"
                      style={{ minWidth: 160 }}
                    >
                      <RadioButton
                        value={true}
                        onChange={() => setAdicionalSelected(true)}
                        checked={adicionalSelected === true}
                      />
                      <span>Sim, quero</span>
                    </label>
                    <label
                      className="flex align-items-center gap-2 cursor-pointer surface-100 border-round-lg px-4 py-3"
                      style={{ minWidth: 160 }}
                    >
                      <RadioButton
                        value={false}
                        onChange={() => setAdicionalSelected(false)}
                        checked={adicionalSelected === false}
                      />
                      <span>Não, obrigado</span>
                    </label>
                  </div>
                  <div className="mb-6 font-bold text-lg text-center">
                    Valor Total: {formatCurrency(simulador.finalTotal)}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div>O seu carrinho está vazio.</div>
          )}
        </div>

        <div className="flex justify-content-center gap-3">
          {simulador.items.length > 0 ? (
            <>
              <Button
                label="Adicionar Serviço"
                icon="pi pi-plus"
                severity="secondary"
                className="w-full sm:w-auto"
                onClick={() => stepper.to(0)}
              />
              <Button
                label="Finalizar"
                icon="pi pi-check"
                iconPos="right"
                className="w-full sm:w-auto"
                onClick={() => stepper.next()}
              />
            </>
          ) : (
            <Button
              label="Voltar ao Início"
              icon="pi pi-home"
              className="w-full sm:w-20rem"
              onClick={() => stepper.to(0)}
            />
          )}
        </div>
      </div>
    </div>
  )
}
