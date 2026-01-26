import type { ReactNode } from 'react'
import Icon from './Icon'

type IconCardProps = {
  icon: string
  label?: string
  labelContent?: ReactNode
  children?: ReactNode
  className?: string
}

export default function IconCard({
  icon,
  label,
  labelContent,
  children,
  className = ''
}: IconCardProps): React.JSX.Element {
  return (
    <div className={className}>
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
