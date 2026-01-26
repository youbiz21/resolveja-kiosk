const iconModules = import.meta.glob('../assets/icons/*.svg', {
  eager: true,
  query: '?url',
  import: 'default'
}) as Record<string, string>

const iconMap: Record<string, string> = {}
for (const [path, url] of Object.entries(iconModules)) {
  const name = path.split('/').pop()?.replace('.svg', '')
  if (name) iconMap[name] = url
}

type IconProps = {
  icon: string
  width?: number
  height?: number
  viewbox?: string
}

export default function Icon({
  icon,
  width = 60,
  height = 60,
  viewbox
}: IconProps): React.JSX.Element {
  const src = iconMap[icon]
  const finalSrc = src
    ? viewbox !== undefined
      ? `${src}${viewbox}`
      : `${src}#svgView(viewBox(42.81,42.81,85.62,85.62))`
    : ''
  return <img src={finalSrc} width={width} height={height} alt={icon} />
}
