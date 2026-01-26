import { useMemo } from 'react'
import { Button } from 'primereact/button'
import Section from '../components/Section'
import IconCard from '../components/IconCard'
import Counter from '../components/Counter'
import { useCart } from '../contexts/CartContext'
import { useStepper } from '../contexts/StepperContext'
import { Icones } from '../constants/formularios'
import type { SimuladorFormKeys } from '../types/models'

const Labels: Record<SimuladorFormKeys, string> = {
  tapete: 'Tapete / Carpete',
  sofa: 'Sofá',
  colchao: 'Colchão',
  estruturaCabeceira: 'Estrutura/Cabeceira',
  cortinados: 'Cortinados',
  cadeiras: 'Cadeiras',
  pousaPes: 'Pousa-pés',
  puff: 'Puff',
  carpete: 'Tapete / Carpete'
}

export default function CartView(): React.JSX.Element {
  const cart = useCart()
  const stepper = useStepper()

  const totalItems = cart.items.length
  const hasItems = totalItems > 0

  const summary = useMemo(() => {
    const counts: Partial<Record<SimuladorFormKeys, number>> = {}
    for (const item of cart.items) {
      counts[item.$type] = (counts[item.$type] || 0) + 1
    }
    return Object.entries(counts).map(([type, count]) => ({
      type: type as SimuladorFormKeys,
      count: count!,
      label: Labels[type as SimuladorFormKeys]
    }))
  }, [cart.items])

  const next = (): void => {
    if (hasItems) stepper.next()
  }

  const renderCard = (key: SimuladorFormKeys, label: string, icon?: string): React.JSX.Element => {
    const count = cart.countByType(key)
    return (
      <div className="relative" key={key}>
        {count > 0 && <span className="cart-card-badge">{count}</span>}
        <IconCard
          className={`shadow-3 w-12rem ${count > 0 ? 'cart-card-active' : 'cart-card-inactive'}`}
          label={label}
          icon={icon || Icones[key]}
        >
          <Counter
            value={count}
            onIncrement={() => cart.addItem(key)}
            onDecrement={() => cart.removeItem(key)}
          />
        </IconCard>
      </div>
    )
  }

  return (
    <div>
      <div className="text-center mb-4">
        <h2 className="text-primary mt-0 mb-1">Selecione os seus serviços</h2>
        <p className="text-color-secondary mt-0">
          Escolha os itens que pretende limpar e indique a quantidade
        </p>
      </div>

      <Section
        titulo="Serviço ao Domicílio"
        descricao="Deslocação gratuita"
        icon="servico-ao-domicilio"
        tagIcon="pi-check-circle"
        badgeClass="checkout-badge-domicilio"
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

      <Section
        titulo="Lavandaria"
        descricao="Recolha e entrega ao domicílio"
        icon="lavandaria"
        tagIcon="pi-truck"
        badgeClass="checkout-badge-lavandaria"
      >
        {renderCard('tapete', 'Tapete / Carpete')}
      </Section>

      {hasItems && (
        <div className="cart-summary mb-3">
          <i className="pi pi-shopping-cart text-primary" style={{ fontSize: '1.2rem' }}></i>
          <span className="font-bold">
            {totalItems} {totalItems === 1 ? 'item selecionado' : 'itens selecionados'}
          </span>
          <div className="flex flex-wrap gap-2">
            {summary.map((s) => (
              <span key={s.type} className="cart-summary-chip">
                {s.count}x {s.label}
              </span>
            ))}
          </div>
        </div>
      )}

      {!hasItems && (
        <p className="text-center text-color-secondary mt-2 mb-3">
          <i className="pi pi-info-circle" style={{ marginRight: '0.4rem' }}></i>
          Selecione pelo menos um item para continuar
        </p>
      )}

      <div className="text-center mt-4">
        <Button
          label={hasItems ? `Avançar (${totalItems})` : 'Avançar'}
          icon="pi pi-arrow-right"
          iconPos="right"
          className="w-full sm:w-20rem"
          onClick={next}
          disabled={!hasItems}
        />
      </div>
    </div>
  )
}
