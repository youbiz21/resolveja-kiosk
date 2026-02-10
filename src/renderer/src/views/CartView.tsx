import { useMemo, useState } from 'react'
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
  const [showOutros, setShowOutros] = useState(false)

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
      <div className="relative h-full" key={key}>
        {count > 0 && <span className="cart-card-badge">{count}</span>}
        <IconCard
          className={`shadow-3 h-full ${count > 0 ? 'cart-card-active' : 'cart-card-inactive'}`}
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
    <div className="cart-page">
      <div className="text-center mb-3">
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
        stretch
      >
        {!showOutros ? (
          <div className="cart-grid">
            {renderCard('sofa', 'Sofá')}
            {renderCard('colchao', 'Colchão')}
            {renderCard('carpete', 'Tapete / Carpete')}
            <div
              className="shadow-3 cart-card-inactive"
              style={{ cursor: 'pointer' }}
              onClick={() => setShowOutros(true)}
            >
              <div className="flex flex-column p-3 align-items-center justify-content-center h-full">
                <i
                  className="pi pi-th-large text-primary"
                  style={{ fontSize: '5rem', marginBottom: '0.5rem' }}
                ></i>
                <span>Outros</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="cart-page-body">
            <button
              type="button"
              className="btn-back mb-2"
              onClick={() => setShowOutros(false)}
            >
              <i className="pi pi-arrow-left"></i>
              <span>Voltar</span>
            </button>
            <div className="cart-grid">
              {renderCard('estruturaCabeceira', 'Estrutura/Cabeceira')}
              {renderCard('cortinados', 'Cortinados')}
              {renderCard('cadeiras', 'Cadeiras')}
              {renderCard('pousaPes', 'Pousa-pés')}
              {renderCard('puff', 'Puff')}
            </div>
          </div>
        )}
      </Section>

      {hasItems && (
        <div className="cart-summary mb-2">
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
        <div className="btn-requirement-hint mt-2 mb-2">
          <i className="pi pi-info-circle"></i>
          <span>Selecione pelo menos um item para continuar</span>
        </div>
      )}

      <div className="text-center mt-3">
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
