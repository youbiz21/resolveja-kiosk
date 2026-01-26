import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

type StepperContextType = {
  index: number
  to: (index: number) => void
  next: () => void
  prev: () => void
}

const StepperContext = createContext<StepperContextType | null>(null)

export function StepperProvider({ children }: { children: ReactNode }): React.JSX.Element {
  const [index, setIndex] = useState(0)

  const to = useCallback((i: number) => setIndex(i), [])
  const next = useCallback(() => setIndex((i) => i + 1), [])
  const prev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), [])

  return (
    <StepperContext.Provider value={{ index, to, next, prev }}>{children}</StepperContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useStepper(): StepperContextType {
  const ctx = useContext(StepperContext)
  if (!ctx) throw new Error('useStepper must be used within StepperProvider')
  return ctx
}
