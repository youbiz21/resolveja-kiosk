import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { IAbstractFormValue, SimuladorFormKeys } from '../types/models'
import { Formularios } from '../constants/formularios'

type CartContextType = {
  items: IAbstractFormValue[]
  addItem: (type: SimuladorFormKeys) => void
  removeItem: (type: SimuladorFormKeys) => void
  updateItem: (index: number, values: IAbstractFormValue) => void
  clear: () => void
  countByType: (type: SimuladorFormKeys) => number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }): React.JSX.Element {
  const [items, setItems] = useState<IAbstractFormValue[]>([])

  const addItem = useCallback((type: SimuladorFormKeys) => {
    setItems((prev) => [...prev, Formularios[type].defaultValues()])
  }, [])

  const removeItem = useCallback((type: SimuladorFormKeys) => {
    setItems((prev) => {
      const removeIndex = prev.findIndex((item) => item.$type === type)
      if (removeIndex === -1) return prev
      return [...prev.slice(0, removeIndex), ...prev.slice(removeIndex + 1)]
    })
  }, [])

  const updateItem = useCallback((index: number, values: IAbstractFormValue) => {
    setItems((prev) => {
      const next = [...prev]
      next[index] = values
      return next
    })
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const countByType = useCallback(
    (type: SimuladorFormKeys) => {
      return items.filter((item) => item.$type === type).length
    },
    [items]
  )

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateItem, clear, countByType }}>
      {children}
    </CartContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart(): CartContextType {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
