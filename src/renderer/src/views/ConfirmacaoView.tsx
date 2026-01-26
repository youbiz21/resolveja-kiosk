import { Button } from 'primereact/button'
import { useCart } from '../contexts/CartContext'
import { useStepper } from '../contexts/StepperContext'
import { useSimulador } from '../hooks/useSimulador'
import { useEffect } from 'react'

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(value)
}

export default function ConfirmacaoView(): React.JSX.Element {
  const stepper = useStepper()
  const cart = useCart()
  const simulador = useSimulador()

  useEffect(() => {
    simulador.calcular(cart.items)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const voltar = (): void => {
    cart.clear()
    stepper.to(0)
  }

  return (
    <div>
      <div className="flex justify-content-between">
        <i className="pi pi-arrow-left cursor-pointer" onClick={voltar}></i>
      </div>
      <hr />
      <div className="py-5 flex justify-content-center flex-column align-items-center">
        <i className="pi pi-thumbs-up block text-primary text-xl mb-3"></i>
        <span className="block font-bold">PEDIDO CONFIRMADO E RECEBIDO</span>
      </div>
      <div className="grid">
        <div className="col-9 pr-0">
          {simulador.items.map((item, index) => (
            <div key={index} className="py-2">
              <i className="pi pi-check-circle mr-2 text-primary"></i>
              <span>{item.descricao}</span>
            </div>
          ))}
        </div>
        <div className="col-3 flex justify-content-center align-items-center">
          <span className="block font-bold">Total {formatCurrency(simulador.finalTotal)}</span>
        </div>
      </div>
      <div className="py-3 flex flex-column justify-content-center align-items-center">
        <div className="text-center w-20rem">
          Iremos entrar em contato nas proximas 24 horas uteis para agendar dia e hora. Muito
          obrigado
        </div>
        <div className="text-center w-20rem mt-4">
          <Button label="Ir para a Homepage" onClick={voltar} />
        </div>
      </div>
    </div>
  )
}
