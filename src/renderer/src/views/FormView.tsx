import { useRef, useState } from 'react'
import { TabView, TabPanel } from 'primereact/tabview'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import { useCart } from '../contexts/CartContext'
import { useStepper } from '../contexts/StepperContext'
import { Formularios } from '../constants/formularios'
import Icon from '../components/Icon'
import type {
  IAbstractFormValue,
  SimuladorFormKeys,
  TapeteFormValue,
  CarpeteFormValue,
  CortinadoFormValue
} from '../types/models'
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

function getValidationErrors(item: IAbstractFormValue): string[] {
  const errors: string[] = []
  const hasService = item.limpeza || item.impermeabilizacao || item.antiAcaro
  if (!hasService) {
    errors.push('Selecione pelo menos um serviço (ex.: Limpeza)')
  }
  if (item.$type === 'tapete' || item.$type === 'carpete') {
    if ((item as TapeteFormValue | CarpeteFormValue).medida <= 0) {
      errors.push('Selecione um tamanho ou introduza as medidas')
    }
  }
  if (item.$type === 'cortinados') {
    if ((item as CortinadoFormValue).formato <= 0) {
      errors.push('Selecione a largura do cortinado')
    }
  }
  return errors
}

export default function FormView(): React.JSX.Element {
  const cart = useCart()
  const stepper = useStepper()
  const [tabIndex, setTabIndex] = useState(0)
  const toast = useRef<Toast>(null)

  const isFormValid = (item: IAbstractFormValue): boolean => {
    const hasService = item.limpeza || item.impermeabilizacao || item.antiAcaro
    if (!hasService) return false

    if (item.$type === 'tapete' || item.$type === 'carpete') {
      return (item as TapeteFormValue | CarpeteFormValue).medida > 0
    }

    if (item.$type === 'cortinados') {
      return (item as CortinadoFormValue).formato > 0
    }

    return true
  }

  const avancar = (): void => {
    const currentItem = cart.items[tabIndex]
    if (!isFormValid(currentItem)) {
      const errors = getValidationErrors(currentItem)
      toast.current?.show({
        severity: 'warn',
        summary: 'Atenção',
        life: 5000,
        detail: (
          <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
            {errors.map((msg, i) => (
              <li key={i}>{msg}</li>
            ))}
          </ul>
        )
      })
      return
    }

    if (tabIndex === cart.items.length - 1) {
      stepper.next()
    } else {
      setTabIndex(tabIndex + 1)
    }
  }

  return (
    <div className="page-fill">
      <Toast ref={toast} position="top-right" />
      <button type="button" className="btn-back" onClick={() => stepper.prev()}>
        <i className="pi pi-arrow-left"></i>
        <span>Voltar</span>
      </button>
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
                  <Icon icon={formulario.icone} width={34} height={34} />
                  <span>{formulario.nome}</span>
                </span>
              }
            >
              {renderForm(type, item, (updated) => cart.updateItem(index, updated))}
              <div className="text-center mt-4">
                <Button
                  label="Avançar"
                  icon="pi pi-arrow-right"
                  iconPos="right"
                  className={`w-full sm:w-20rem${!isFormValid(cart.items[tabIndex]) ? ' btn-disabled-look' : ''}`}
                  onClick={avancar}
                />
              </div>
            </TabPanel>
          )
        })}
      </TabView>
    </div>
  )
}
