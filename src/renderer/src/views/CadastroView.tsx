import { useState, useRef, useCallback } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Calendar } from 'primereact/calendar'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/high-res.css'
import { useStepper } from '../contexts/StepperContext'
import VirtualKeyboard from '../components/VirtualKeyboard'

type CadastroFormData = {
  primeiroNome: string
  ultimoNome: string
  telefone: string
  email: string
  morada: string
  codigoPostal: string
  localidade: string
  dataAgendamento: Date | null
  horaAgendamento: string
}

const TIME_SLOTS = ['9:30', '11:00', '14:00', '17:00']

const FIELD_ORDER = [
  'primeiroNome',
  'ultimoNome',
  'telefone',
  'email',
  'morada',
  'codigoPostal',
  'localidade'
]

const NUMERIC_FIELDS = new Set(['telefone', 'codigoPostal'])

/** Simulates typing/backspace on a native input so React-based libs pick up the change */
function simulateNativeInput(input: HTMLInputElement, newValue: string): void {
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set
  if (!setter) return
  setter.call(input, newValue)
  input.dispatchEvent(new Event('input', { bubbles: true }))
}

function getMinDate(): Date {
  const date = new Date()
  date.setDate(date.getDate() + 3)
  if (date.getDay() === 0) date.setDate(date.getDate() + 1) // Domingo → Segunda
  return date
}

function getCadastroCache(): Partial<CadastroFormData> | null {
  const storageData = localStorage.getItem('_cadastro')
  if (storageData) {
    const parsed = JSON.parse(storageData)
    if (parsed.dataAgendamento) {
      parsed.dataAgendamento = new Date(parsed.dataAgendamento)
    }
    return parsed
  }
  return null
}

export default function CadastroView(): React.JSX.Element {
  const stepper = useStepper()
  const [loading, setLoading] = useState(false)
  const [activeInput, setActiveInput] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const cached = getCadastroCache()

  const { control, handleSubmit, watch, setValue, getValues } = useForm<CadastroFormData>({
    defaultValues: {
      primeiroNome: cached?.primeiroNome || '',
      ultimoNome: cached?.ultimoNome || '',
      telefone: cached?.telefone || '',
      email: cached?.email || '',
      morada: cached?.morada || '',
      codigoPostal: cached?.codigoPostal || '',
      localidade: cached?.localidade || '',
      dataAgendamento: cached?.dataAgendamento || null,
      horaAgendamento: cached?.horaAgendamento || ''
    }
  })

  const dataAgendamento = watch('dataAgendamento')
  const horaAgendamento = watch('horaAgendamento')

  const onSubmit = (data: CadastroFormData): void => {
    if (!data.dataAgendamento || !data.horaAgendamento) return
    localStorage.setItem('_cadastro', JSON.stringify(data))
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      stepper.next()
    }, 300)
  }

  const handleKeyboardChange = useCallback(
    (value: string) => {
      if (activeInput && !NUMERIC_FIELDS.has(activeInput)) {
        setValue(activeInput as keyof CadastroFormData, value)
      }
    },
    [activeInput, setValue]
  )

  const handleButtonPress = useCallback(
    (button: string) => {
      if (!activeInput || !NUMERIC_FIELDS.has(activeInput)) return

      if (activeInput === 'telefone') {
        const input = document.getElementById('telefone') as HTMLInputElement | null
        if (!input) return
        if (/^\d$/.test(button)) {
          simulateNativeInput(input, input.value + button)
        } else if (button === '{bksp}') {
          // Remove the last actual digit, not trailing spaces/formatting
          const val = input.value
          let i = val.length - 1
          while (i >= 0 && !/\d/.test(val[i])) i--
          if (i >= 0) {
            simulateNativeInput(input, val.slice(0, i) + val.slice(i + 1))
          }
        }
      } else if (activeInput === 'codigoPostal') {
        const current = getValues('codigoPostal') || ''
        const digits = current.replace(/\D/g, '')
        if (/^\d$/.test(button) && digits.length < 7) {
          const newDigits = digits + button
          setValue('codigoPostal', formatPostalCode(newDigits))
        } else if (button === '{bksp}' && digits.length > 0) {
          const newDigits = digits.slice(0, -1)
          setValue('codigoPostal', formatPostalCode(newDigits))
        }
      }
    },
    [activeInput, getValues, setValue]
  )

  const handleKeyboardClose = useCallback(() => {
    if (!activeInput) return
    const idx = FIELD_ORDER.indexOf(activeInput)
    if (idx >= 0 && idx < FIELD_ORDER.length - 1) {
      const nextField = FIELD_ORDER[idx + 1]
      setActiveInput(nextField)
      const el = formRef.current?.querySelector<HTMLInputElement>(`#${nextField}`)
      if (el) {
        el.focus()
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    } else {
      setActiveInput(null)
    }
  }, [activeInput])

  const handleKeyboardHide = useCallback(() => {
    setActiveInput(null)
  }, [])

  const handleInputFocus = useCallback((fieldName: string) => {
    setActiveInput(fieldName)
    const el = document.getElementById(fieldName)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [])

  const isNumericInput = activeInput ? NUMERIC_FIELDS.has(activeInput) : false

  if (loading) {
    return (
      <div className="text-center">
        <i className="pi pi-spin pi-spinner" style={{ fontSize: '3rem' }}></i>
      </div>
    )
  }

  const isFormIncomplete = !dataAgendamento || !horaAgendamento

  return (
    <div className={`page-fill${activeInput ? ' keyboard-open' : ''}`}>
      <hr />

      <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        {/* Dados Pessoais */}
        <div className="cadastro-section-header mt-3">
          <i className="pi pi-user"></i>
          <span>Dados Pessoais</span>
        </div>
        <div className="cadastro-section-hint">Campos assinalados com * são obrigatórios</div>

        <div className="grid">
          <div className="col-12 md:col-6">
            <label className="block mb-1" htmlFor="primeiroNome">
              Primeiro nome *
            </label>
            <Controller
              name="primeiroNome"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <InputText
                  id="primeiroNome"
                  className="w-full"
                  placeholder="Ex.: Maria"
                  {...field}
                  onFocus={() => handleInputFocus('primeiroNome')}
                />
              )}
            />
          </div>
          <div className="col-12 md:col-6">
            <label className="block mb-1" htmlFor="ultimoNome">
              Apelido *
            </label>
            <Controller
              name="ultimoNome"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <InputText
                  id="ultimoNome"
                  className="w-full"
                  placeholder="Ex.: Silva"
                  {...field}
                  onFocus={() => handleInputFocus('ultimoNome')}
                />
              )}
            />
          </div>
        </div>

        {/* Contacto */}
        <div className="cadastro-section-header mt-3">
          <i className="pi pi-phone"></i>
          <span>Contacto</span>
        </div>

        <div className="grid">
          <div className="col-12 md:col-6">
            <label className="block mb-1">Telemóvel *</label>
            <Controller
              name="telefone"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <PhoneInput
                  country="pt"
                  preferredCountries={['pt', 'br', 'fr', 'it', 'ma', 'de', 'es', 'dz']}
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  inputProps={{
                    id: 'telefone',
                    onFocus: () => handleInputFocus('telefone')
                  }}
                  containerClass="phone-input-container"
                  inputClass="phone-input-field"
                  buttonClass="phone-input-button"
                  enableSearch
                  searchPlaceholder="Procurar país..."
                />
              )}
            />
          </div>
          <div className="col-12 md:col-6">
            <label className="block mb-1" htmlFor="email">
              Correio electrónico *
            </label>
            <Controller
              name="email"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <InputText
                  id="email"
                  className="w-full"
                  placeholder="Ex.: nome@exemplo.pt"
                  {...field}
                  onFocus={() => handleInputFocus('email')}
                />
              )}
            />
            <small className="cadastro-field-hint">Para envio da confirmação do agendamento</small>
          </div>
        </div>

        {/* Morada */}
        <div className="cadastro-section-header mt-3">
          <i className="pi pi-map-marker"></i>
          <span>Morada do serviço</span>
        </div>
        <div className="cadastro-section-hint">Local onde será efectuado o serviço ou recolha</div>

        <div className="grid">
          <div className="col-12">
            <label className="block mb-1" htmlFor="morada">
              Morada
            </label>
            <Controller
              name="morada"
              control={control}
              render={({ field }) => (
                <InputText
                  id="morada"
                  className="w-full"
                  placeholder="Ex.: Rua Augusta, 100, 2.º Esq."
                  {...field}
                  onFocus={() => handleInputFocus('morada')}
                />
              )}
            />
          </div>
          <div className="col-12 md:col-6">
            <label className="block mb-1" htmlFor="codigoPostal">
              Código postal
            </label>
            <Controller
              name="codigoPostal"
              control={control}
              render={({ field }) => (
                <InputText
                  id="codigoPostal"
                  className="w-full"
                  placeholder="0000-000"
                  maxLength={8}
                  value={field.value}
                  onChange={(e) => {
                    const digits = e.target.value.replace(/\D/g, '').slice(0, 7)
                    field.onChange(formatPostalCode(digits))
                  }}
                  onFocus={() => handleInputFocus('codigoPostal')}
                />
              )}
            />
          </div>
          <div className="col-12 md:col-6">
            <label className="block mb-1" htmlFor="localidade">
              Localidade
            </label>
            <Controller
              name="localidade"
              control={control}
              render={({ field }) => (
                <InputText
                  id="localidade"
                  className="w-full"
                  placeholder="Ex.: Lisboa"
                  {...field}
                  onFocus={() => handleInputFocus('localidade')}
                />
              )}
            />
          </div>
        </div>

        {/* Agendamento */}
        <div className="cadastro-section">
          <div className="cadastro-section-header">
            <i className="pi pi-calendar"></i>
            <span>Agendamento</span>
          </div>
          <div className="cadastro-section-hint mb-3">
            Escolha a data e o horário que melhor lhe convierem
          </div>

          <div className="flex justify-content-center">
            <Controller
              name="dataAgendamento"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Calendar
                  inline
                  locale="pt"
                  dateFormat="dd/mm/yy"
                  minDate={getMinDate()}
                  disabledDays={[0]}
                  showIcon={false}
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e.value)
                    setValue('horaAgendamento', '')
                  }}
                  onFocus={() => setActiveInput(null)}
                />
              )}
            />
          </div>

          {dataAgendamento && (
            <>
              <div className="cadastro-timeslot-label">
                <i className="pi pi-clock"></i>
                <span>Horário pretendido</span>
              </div>
              <div className="timeslot-options">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    className={`timeslot-option${horaAgendamento === slot ? ' active' : ''}`}
                    onClick={() => setValue('horaAgendamento', slot)}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="mt-4" style={{ paddingBottom: activeInput ? '450px' : '0' }}>
          <div className="flex justify-content-center align-items-center gap-3">
            <Button
              type="button"
              label="Voltar"
              icon="pi pi-arrow-left"
              severity="secondary"
              outlined
              onClick={() => stepper.prev()}
            />
            <Button
              type="submit"
              className={`w-full sm:w-20rem${isFormIncomplete ? ' btn-disabled-look' : ''}`}
              label="Confirmar agendamento"
              icon="pi pi-calendar-plus"
              iconPos="right"
            />
          </div>
          {isFormIncomplete && (
            <div className="btn-requirement-hint">
              <i className="pi pi-info-circle"></i>
              <span>Selecione uma data e um horário para continuar</span>
            </div>
          )}
        </div>
      </form>

      <VirtualKeyboard
        visible={!!activeInput}
        onChange={handleKeyboardChange}
        onButtonPress={handleButtonPress}
        inputName={activeInput || undefined}
        initialValue={
          activeInput && !NUMERIC_FIELDS.has(activeInput)
            ? String(getValues(activeInput as keyof CadastroFormData) || '')
            : ''
        }
        numericMode={isNumericInput}
        onClose={handleKeyboardClose}
        onHide={handleKeyboardHide}
      />
    </div>
  )
}

function formatPostalCode(digits: string): string {
  if (digits.length <= 4) return digits
  return digits.slice(0, 4) + '-' + digits.slice(4, 7)
}
