import { useState, useCallback } from 'react'
import { StepperProvider, useStepper } from './contexts/StepperContext'
import { CartProvider, useCart } from './contexts/CartContext'
import { useIdleTimer } from './hooks/useIdleTimer'
import ScreenSaver from './components/ScreenSaver'
import CartView from './views/CartView'
import FormView from './views/FormView'
import CheckoutView from './views/CheckoutView'
import CadastroView from './views/CadastroView'
import ConfirmacaoView from './views/ConfirmacaoView'

const IDLE_TIMEOUT_MS = 60 * 1000

function AppContent(): React.JSX.Element {
  const stepper = useStepper()
  const cart = useCart()
  const [showScreenSaver, setShowScreenSaver] = useState(false)

  const onIdle = useCallback(() => {
    cart.clear()
    stepper.to(0)
    setShowScreenSaver(true)
  }, [cart, stepper])

  const onDismiss = useCallback(() => {
    setShowScreenSaver(false)
  }, [])

  useIdleTimer(onIdle, IDLE_TIMEOUT_MS)

  let content: React.JSX.Element
  switch (stepper.index) {
    case 0:
      content = <CartView />
      break
    case 1:
      content = <FormView />
      break
    case 2:
      content = <CheckoutView />
      break
    case 3:
      content = <CadastroView />
      break
    case 4:
      content = <ConfirmacaoView />
      break
    default:
      content = <CartView />
  }

  return (
    <>
      {content}
      {showScreenSaver && <ScreenSaver onDismiss={onDismiss} />}
    </>
  )
}

function App(): React.JSX.Element {
  return (
    <StepperProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </StepperProvider>
  )
}

export default App
