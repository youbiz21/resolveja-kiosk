import { StepperProvider, useStepper } from './contexts/StepperContext'
import { CartProvider } from './contexts/CartContext'
import CartView from './views/CartView'
import FormView from './views/FormView'
import CheckoutView from './views/CheckoutView'
import CadastroView from './views/CadastroView'
import ConfirmacaoView from './views/ConfirmacaoView'

function AppContent(): React.JSX.Element {
  const stepper = useStepper()

  switch (stepper.index) {
    case 0:
      return <CartView />
    case 1:
      return <FormView />
    case 2:
      return <CheckoutView />
    case 3:
      return <CadastroView />
    case 4:
      return <ConfirmacaoView />
    default:
      return <CartView />
  }
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
