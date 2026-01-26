import { useState } from 'react'

type NumericKeypadProps = {
  value: number
  label: string
  unit?: string
  onConfirm: (value: number) => void
  onCancel: () => void
}

export default function NumericKeypad({
  value,
  label,
  unit = 'm',
  onConfirm,
  onCancel
}: NumericKeypadProps): React.JSX.Element {
  const [inputStr, setInputStr] = useState(value ? value.toString() : '')

  const handleDigit = (digit: string): void => {
    setInputStr((prev) => prev + digit)
  }

  const handleDot = (): void => {
    if (!inputStr.includes('.')) {
      setInputStr((prev) => (prev === '' ? '0.' : prev + '.'))
    }
  }

  const handleBackspace = (): void => {
    setInputStr((prev) => prev.slice(0, -1))
  }

  const handleConfirm = (): void => {
    onConfirm(parseFloat(inputStr) || 0)
  }

  return (
    <div className="numpad-overlay" onClick={onCancel}>
      <div className="numpad" onClick={(e) => e.stopPropagation()}>
        <div className="numpad-label">{label}</div>
        <div className="numpad-display">
          {inputStr || '0'}
          <span className="numpad-unit">{unit}</span>
        </div>
        <div className="numpad-grid">
          <button type="button" className="numpad-btn" onClick={() => handleDigit('1')}>
            1
          </button>
          <button type="button" className="numpad-btn" onClick={() => handleDigit('2')}>
            2
          </button>
          <button type="button" className="numpad-btn" onClick={() => handleDigit('3')}>
            3
          </button>
          <button type="button" className="numpad-btn" onClick={() => handleDigit('4')}>
            4
          </button>
          <button type="button" className="numpad-btn" onClick={() => handleDigit('5')}>
            5
          </button>
          <button type="button" className="numpad-btn" onClick={() => handleDigit('6')}>
            6
          </button>
          <button type="button" className="numpad-btn" onClick={() => handleDigit('7')}>
            7
          </button>
          <button type="button" className="numpad-btn" onClick={() => handleDigit('8')}>
            8
          </button>
          <button type="button" className="numpad-btn" onClick={() => handleDigit('9')}>
            9
          </button>
          <button type="button" className="numpad-btn" onClick={handleDot}>
            .
          </button>
          <button type="button" className="numpad-btn" onClick={() => handleDigit('0')}>
            0
          </button>
          <button type="button" className="numpad-btn numpad-backspace" onClick={handleBackspace}>
            &#9003;
          </button>
        </div>
        <div className="numpad-actions">
          <button type="button" className="numpad-cancel" onClick={onCancel}>
            Cancelar
          </button>
          <button type="button" className="numpad-confirm" onClick={handleConfirm}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  )
}
