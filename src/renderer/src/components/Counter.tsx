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

  return (
    <div className="flex align-items-center gap-2 border-round-md surface-300 py-1 px-2 my-1">
      <span className="cursor-pointer" onClick={decrement}>
        -
      </span>
      <span>{value}</span>
      <span className="cursor-pointer" onClick={increment}>
        +
      </span>
    </div>
  )
}
