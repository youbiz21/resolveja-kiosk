import { useRef, useEffect, useCallback } from 'react'
import Keyboard from 'react-simple-keyboard'
import 'react-simple-keyboard/build/css/index.css'

interface VirtualKeyboardProps {
  visible: boolean
  onChange: (value: string) => void
  onButtonPress?: (button: string) => void
  inputName?: string
  initialValue?: string
  numericMode?: boolean
  onClose?: () => void
  onHide?: () => void
}

const layouts = {
  default: [
    '1 2 3 4 5 6 7 8 9 0',
    'q w e r t y u i o p',
    'a s d f g h j k l \u00e7',
    '{shift} z x c v b n m {bksp}',
    '{symbols} {space} . @ {enter}'
  ],
  shift: [
    '1 2 3 4 5 6 7 8 9 0',
    'Q W E R T Y U I O P',
    'A S D F G H J K L \u00c7',
    '{shift} Z X C V B N M {bksp}',
    '{symbols} {space} . @ {enter}'
  ],
  symbols: [
    '\u00e1 \u00e0 \u00e2 \u00e3 \u00e9 \u00ea \u00ed \u00f3 \u00f4 \u00f5',
    '\u00fa \u00fc \u00c1 \u00c0 \u00c2 \u00c3 \u00c9 \u00ca \u00cd \u00d3',
    '\u00d4 \u00d5 \u00da \u00dc - _ / ( ) &',
    '{default} ! ? , ; : \' " {bksp}',
    '{space} {enter}'
  ],
  numeric: ['1 2 3', '4 5 6', '7 8 9', '{bksp} 0 {enter}']
}

const display = {
  '{bksp}': '\u232b',
  '{enter}': '\u21b5',
  '{space}': 'espa\u00e7o',
  '{shift}': '\u21e7',
  '{symbols}': '\u00e1\u00e9\u00ed',
  '{default}': 'ABC'
}

export default function VirtualKeyboard({
  visible,
  onChange,
  onButtonPress,
  inputName,
  initialValue,
  numericMode,
  onClose,
  onHide
}: VirtualKeyboardProps): React.JSX.Element | null {
  const keyboardRef = useRef<typeof Keyboard.prototype>(null)

  useEffect(() => {
    if (keyboardRef.current && initialValue !== undefined) {
      keyboardRef.current.setInput(initialValue)
    }
  }, [initialValue, inputName])

  const handleKeyPress = useCallback(
    (button: string) => {
      onButtonPress?.(button)

      if (button === '{shift}') {
        const kb = keyboardRef.current
        if (!kb) return
        const current = kb.options.layoutName
        kb.setOptions({ layoutName: current === 'shift' ? 'default' : 'shift' })
      } else if (button === '{symbols}') {
        keyboardRef.current?.setOptions({ layoutName: 'symbols' })
      } else if (button === '{default}') {
        keyboardRef.current?.setOptions({ layoutName: 'default' })
      } else if (button === '{enter}') {
        onClose?.()
      }
    },
    [onClose, onButtonPress]
  )

  const handleChange = useCallback(
    (input: string) => {
      onChange(input)
    },
    [onChange]
  )

  const preventBlur = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
  }, [])

  if (!visible) return null

  return (
    <div
      className="virtual-keyboard-container"
      onMouseDown={preventBlur}
      onTouchStart={preventBlur}
    >
      <div className="virtual-keyboard-toolbar">
        <button
          type="button"
          className="virtual-keyboard-hide"
          onMouseDown={(e) => {
            e.preventDefault()
            onHide?.()
          }}
          onTouchStart={(e) => {
            e.preventDefault()
            onHide?.()
          }}
        >
          <i className="pi pi-chevron-down"></i>
          <span>Esconder teclado</span>
        </button>
      </div>
      <Keyboard
        keyboardRef={(r: typeof Keyboard.prototype) => (keyboardRef.current = r)}
        layoutName={numericMode ? 'numeric' : 'default'}
        layout={layouts}
        display={display}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        inputName={inputName}
        theme="hg-theme-default hg-layout-default virtual-keyboard-theme"
      />
    </div>
  )
}
