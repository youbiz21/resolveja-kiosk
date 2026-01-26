import { Button } from 'primereact/button'
import Section from '../components/Section'
import IconCard from '../components/IconCard'
import Counter from '../components/Counter'
import { useCart } from '../contexts/CartContext'
import { useStepper } from '../contexts/StepperContext'
import { Icones } from '../constants/formularios'
import type { SimuladorFormKeys } from '../types/models'

export default function CartView(): React.JSX.Element {
  const cart = useCart()
  const stepper = useStepper()

  const next = (): void => {
    if (cart.items.length > 0) stepper.next()
  }

  const renderCard = (key: SimuladorFormKeys, label: string, icon?: string): React.JSX.Element => (
    <IconCard className="shadow-3 w-12rem" label={label} icon={icon || Icones[key]}>
      <Counter
        value={cart.countByType(key)}
        onIncrement={() => cart.addItem(key)}
        onDecrement={() => cart.removeItem(key)}
      />
    </IconCard>
  )

  return (
    <div>
      <Section titulo="Lavandaria" descricao="Recolha e entrega ao domicílio" icon="lavandaria">
        {renderCard('tapete', 'Tapete / Carpete')}
      </Section>

      <Section
        titulo="Serviço ao Domicílio"
        descricao="Deslocação gratuita"
        icon="servico-ao-domicilio"
      >
        <div className="flex flex-wrap gap-2 justify-content-around">
          {renderCard('sofa', 'Sofá')}
          {renderCard('colchao', 'Colchão')}
          {renderCard('estruturaCabeceira', 'Estrutura/Cabeceira')}
          {renderCard('cortinados', 'Cortinados')}
          {renderCard('cadeiras', 'Cadeiras')}
          {renderCard('pousaPes', 'Pousa-pés')}
          {renderCard('puff', 'Puff')}
          {renderCard('carpete', 'Tapete / Carpete')}
        </div>
      </Section>

      <div className="text-center mt-4">
        <Button
          label="Avançar"
          icon="pi pi-arrow-right"
          iconPos="right"
          className="w-full sm:w-20rem"
          onClick={next}
          disabled={cart.items.length === 0}
        />
      </div>
    </div>
  )
}
