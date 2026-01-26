import { useState } from 'react'
import { TabView, TabPanel } from 'primereact/tabview'
import { Button } from 'primereact/button'
import { useCart } from '../contexts/CartContext'
import { useStepper } from '../contexts/StepperContext'
import { Formularios } from '../constants/formularios'
import Icon from '../components/Icon'
import type { IAbstractFormValue, SimuladorFormKeys } from '../types/models'
import TapeteForm from './forms/TapeteForm'
import SofaForm from './forms/SofaForm'
import ColchaoForm from './forms/ColchaoForm'
import EstruturaCabeceiraForm from './forms/EstruturaCabeceiraForm'
import CortinadosForm from './forms/CortinadosForm'
import CadeirasForm from './forms/CadeirasForm'
import PousaPesForm from './forms/PousaPesForm'
import PuffForm from './forms/PuffForm'
import CarpeteForm from './forms/CarpeteForm'

function renderForm(
  type: SimuladorFormKeys,
  values: IAbstractFormValue,
  onChange: (values: IAbstractFormValue) => void
): React.JSX.Element {
  switch (type) {
    case 'tapete':
      return <TapeteForm values={values} onChange={onChange} />
    case 'sofa':
      return <SofaForm values={values} onChange={onChange} />
    case 'colchao':
      return <ColchaoForm values={values} onChange={onChange} />
    case 'estruturaCabeceira':
      return <EstruturaCabeceiraForm values={values} onChange={onChange} />
    case 'cortinados':
      return <CortinadosForm values={values} onChange={onChange} />
    case 'cadeiras':
      return <CadeirasForm values={values} onChange={onChange} />
    case 'pousaPes':
      return <PousaPesForm values={values} onChange={onChange} />
    case 'puff':
      return <PuffForm values={values} onChange={onChange} />
    case 'carpete':
      return <CarpeteForm values={values} onChange={onChange} />
  }
}

export default function FormView(): React.JSX.Element {
  const cart = useCart()
  const stepper = useStepper()
  const [tabIndex, setTabIndex] = useState(0)

  const isFormValid = (item: IAbstractFormValue): boolean => {
    return item.limpeza || item.impermeabilizacao || item.antiAcaro
  }

  const avancar = (): void => {
    const currentItem = cart.items[tabIndex]
    if (!isFormValid(currentItem)) return

    if (tabIndex === cart.items.length - 1) {
      stepper.next()
    } else {
      setTabIndex(tabIndex + 1)
    }
  }

  return (
    <div>
      <span className="cursor-pointer" onClick={() => stepper.prev()}>
        <i className="pi pi-arrow-left"></i>
      </span>
      <TabView
        activeIndex={tabIndex}
        onTabChange={(e) => setTabIndex(e.index)}
        scrollable
        className="tabview-custom"
      >
        {cart.items.map((item, index) => {
          const type = item.$type
          const formulario = Formularios[type]
          return (
            <TabPanel
              key={index}
              header={
                <span className="flex align-items-center gap-2">
                  <Icon icon={formulario.icone} width={24} height={24} />
                  <span>{formulario.nome}</span>
                </span>
              }
            >
              {renderForm(type, item, (updated) => cart.updateItem(index, updated))}
              <div className="text-center mt-4">
                <Button
                  label="Avancar"
                  onClick={avancar}
                  disabled={!isFormValid(cart.items[tabIndex])}
                />
              </div>
            </TabPanel>
          )
        })}
      </TabView>
    </div>
  )
}
