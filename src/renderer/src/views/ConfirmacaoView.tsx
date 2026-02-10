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
    <div className="page-fill">
      <hr />
      <div className="page-fill-content">
      <div className="py-5 flex justify-content-center flex-column align-items-center">
        <i className="pi pi-thumbs-up block text-primary mb-3" style={{ fontSize: '5rem' }}></i>
        <span className="block font-bold" style={{ fontSize: '1.8rem' }}>PEDIDO CONFIRMADO</span>
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
        <div className="text-center" style={{ fontSize: '1.3rem', lineHeight: '1.6', maxWidth: '30rem' }}>
          Iremos entrar em contacto nas próximas 24 horas úteis para agendar o dia e a hora. Muito
          obrigado!
        </div>
        <div className="text-center mt-5">
          <Button
            label="Voltar ao Início"
            icon="pi pi-home"
            className="w-full sm:w-20rem"
            onClick={voltar}
          />
        </div>
      </div>
      </div>
    </div>
  )
}
