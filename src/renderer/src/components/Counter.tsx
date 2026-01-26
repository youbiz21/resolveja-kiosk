type CounterProps = {
  value: number
  min?: number
  max?: number
  onIncrement?: () => void
  onDecrement?: () => void
}

export default function Counter({
  value,
  min = 0,
  max = Number.MAX_VALUE,
  onIncrement,
  onDecrement
}: CounterProps): React.JSX.Element {
  const increment = (): void => {
    if (value >= max) return
    onIncrement?.()
  }

  const decrement = (): void => {
    if (value <= min) return
    onDecrement?.()
  }

  const btnStyle: React.CSSProperties = {
    width: 44,
    height: 44,
    borderRadius: '50%',
    border: 'none',
    fontSize: '1.4rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.15s'
  }

  return (
    <div className="flex align-items-center gap-3 my-1">
      <button
        type="button"
        onClick={decrement}
        className="surface-300"
        style={{
          ...btnStyle,
          opacity: value <= min ? 0.4 : 1
        }}
      >
        -
      </button>
      <span style={{ fontSize: '1.3rem', minWidth: 28, textAlign: 'center', fontWeight: 'bold' }}>
        {value}
      </span>
      <button
        type="button"
        onClick={increment}
        className="bg-primary text-white"
        style={{
          ...btnStyle,
          opacity: value >= max ? 0.4 : 1
        }}
      >
        +
      </button>
    </div>
  )
}
