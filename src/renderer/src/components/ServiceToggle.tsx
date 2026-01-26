import { useState } from 'react'
import { ToggleButton } from 'primereact/togglebutton'
import ServiceHelpModal from './ServiceHelpModal'
import { ServicosHelp, type ServiceKey } from '../constants/servicos'

type Props = {
  serviceKey: ServiceKey
  checked: boolean
  onChange: (value: boolean) => void
  className?: string
}

export default function ServiceToggle({
  serviceKey,
  checked,
  onChange,
  className
}: Props): React.JSX.Element {
  const [helpOpen, setHelpOpen] = useState(false)
  const service = ServicosHelp[serviceKey]

  return (
    <div className="service-toggle-wrapper">
      <ToggleButton
        className={className}
        checked={checked}
        onChange={(e) => onChange(e.value)}
        onLabel={service.nome}
        offLabel={service.nome}
      />
      <button type="button" className="service-help-trigger" onClick={() => setHelpOpen(true)}>
        ?
      </button>
      {helpOpen && (
        <ServiceHelpModal
          visible
          onClose={() => setHelpOpen(false)}
          title={service.nome}
          description={service.descricao}
          video={service.video}
        />
      )}
    </div>
  )
}
