import { useStepper } from '../contexts/StepperContext'

const STEPS = [
  { label: 'Serviços', icon: 'pi-shopping-cart' },
  { label: 'Detalhes', icon: 'pi-list' },
  { label: 'Resumo', icon: 'pi-file' },
  { label: 'Agendamento', icon: 'pi-calendar' },
  { label: 'Confirmação', icon: 'pi-check' }
]

export default function StepIndicator(): React.JSX.Element | null {
  const { index } = useStepper()

  if (index === 0) return null

  return (
    <div className="step-indicator">
      {STEPS.map((step, i) => {
        const isCompleted = i < index
        const isCurrent = i === index
        return (
          <div key={i} className="step-indicator-item">
            {i > 0 && <div className={`step-indicator-line${isCompleted ? ' completed' : ''}`} />}
            <div
              className={`step-indicator-circle${isCurrent ? ' current' : ''}${isCompleted ? ' completed' : ''}`}
            >
              {isCompleted ? <i className="pi pi-check" /> : <span>{i + 1}</span>}
            </div>
            <span
              className={`step-indicator-label${isCurrent ? ' current' : ''}${isCompleted ? ' completed' : ''}`}
            >
              {step.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
