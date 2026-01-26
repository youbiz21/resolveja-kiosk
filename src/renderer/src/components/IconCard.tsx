import type { ReactNode } from 'react'
import Icon from './Icon'

type IconCardProps = {
  icon: string
  label?: string
  labelContent?: ReactNode
  children?: ReactNode
  className?: string
  selected?: boolean
  onClick?: () => void
}

export default function IconCard({
  icon,
  label,
  labelContent,
  children,
  className = '',
  selected,
  onClick
}: IconCardProps): React.JSX.Element {
  const selectable = selected !== undefined
  const cardClass = selectable ? `icon-card-selectable ${selected ? 'selected' : ''}` : ''

  return (
    <div
      className={`${className} ${cardClass}`}
      onClick={onClick}
      style={onClick ? { cursor: 'pointer' } : undefined}
    >
      <div className="flex flex-column p-3 align-items-center h-full">
        <Icon icon={icon} />
        {labelContent ? (
          <div className="py-1">{labelContent}</div>
        ) : label ? (
          <span>{label}</span>
        ) : null}
        <div className="mt-auto">{children}</div>
      </div>
    </div>
  )
}
