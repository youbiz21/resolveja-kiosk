import type { ReactNode } from 'react'

type SectionProps = {
  titulo: string
  descricao: string
  icon: string
  children: ReactNode
  tagIcon?: string
  badgeClass?: string
}

export default function Section({
  titulo,
  descricao,
  icon,
  children,
  tagIcon,
  badgeClass
}: SectionProps): React.JSX.Element {
  const src = new URL(`../assets/icons/${icon}.svg`, import.meta.url).href

  return (
    <div className="mb-3">
      <img src={`${src}#svgView(viewBox(40,50,100,75))`} width={120} height={60} alt={titulo} />
      <div className="flex gap-2 align-items-center">
        <span className="font-bold text-lg">{titulo}</span>
        <i className="pi pi-chevron-right"></i>
        <hr className="flex-1" />
      </div>
      {badgeClass ? (
        <span className={`checkout-badge ${badgeClass}`}>
          {tagIcon && <i className={`pi ${tagIcon}`} style={{ marginRight: '0.3rem' }}></i>}
          {descricao}
        </span>
      ) : (
        <small>
          <span>{descricao}</span>
        </small>
      )}
      <div className="flex gap-3 justify-content-center py-4">{children}</div>
    </div>
  )
}
