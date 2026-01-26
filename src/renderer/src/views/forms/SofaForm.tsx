import { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { RadioButton } from 'primereact/radiobutton'
import { ToggleButton } from 'primereact/togglebutton'
import Icon from '../../components/Icon'
import Counter from '../../components/Counter'
import type { IAbstractFormValue, SofaFormValue } from '../../types/models'

type Props = {
  values: IAbstractFormValue
  onChange: (values: IAbstractFormValue) => void
}

export default function SofaForm({ values, onChange }: Props): React.JSX.Element {
  const form = values as SofaFormValue
  const { control, watch, setValue, getValues } = useForm<SofaFormValue>({
    defaultValues: form
  })

  const [sofaIcon, setSofaIcon] = useState(`sofa-${form.lugares}`)

  const lugares = watch('lugares')
  const acabamento = watch('acabamento')
  const limpeza = watch('limpeza')
  const impermeabilizacao = watch('impermeabilizacao')

  useEffect(() => {
    onChange(getValues())
  }, [lugares, acabamento, limpeza, impermeabilizacao, onChange, getValues])

  const increment = (): void => {
    const current = getValues('lugares') || 1
    if (current >= 8) return
    const next = current + 1
    setValue('lugares', next)
    setSofaIcon(`sofa-${next}`)
  }

  const decrement = (): void => {
    const current = getValues('lugares') || 1
    if (current <= 1) return
    const next = current - 1
    setValue('lugares', next)
    setSofaIcon(`sofa-${next}`)
  }

  return (
    <form>
      <div className="label">1. Formato</div>
      <div className="flex justify-content-center">
        <div className="flex flex-column align-content-center flex-wrap shadow-3 w-12rem">
          <div className="flex flex-column p-3 align-items-center h-full">
            <Icon icon={sofaIcon} viewbox="" width={140} height={50} />
            <div className="py-1">
              <span className="block">Lugares</span>
            </div>
            <div className="mt-auto">
              <Counter
                min={1}
                max={8}
                value={lugares}
                onIncrement={increment}
                onDecrement={decrement}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="label">2. Acabamento</div>
      <div className="flex flex-wrap gap-3 justify-content-center">
        <Controller
          name="acabamento"
          control={control}
          render={({ field }) => (
            <>
              <div className="w-4rem">
                <label className="block" htmlFor="tecido">
                  Tecido
                </label>
                <RadioButton
                  inputId="tecido"
                  value="tecido"
                  onChange={(e) => field.onChange(e.value)}
                  checked={field.value === 'tecido'}
                />
              </div>
              <div className="w-4rem">
                <label className="block" htmlFor="pele">
                  Pele
                </label>
                <RadioButton
                  inputId="pele"
                  value="pele"
                  onChange={(e) => field.onChange(e.value)}
                  checked={field.value === 'pele'}
                />
              </div>
            </>
          )}
        />
      </div>

      <div className="label">3. Servico</div>
      <div className="flex flex-wrap gap-3 justify-content-center">
        <Controller
          name="limpeza"
          control={control}
          render={({ field }) => (
            <ToggleButton
              className="w-full sm:w-12rem"
              checked={field.value}
              onChange={(e) => field.onChange(e.value)}
              onLabel="Limpeza"
              offLabel="Limpeza"
            />
          )}
        />
      </div>

      <div className="label">4. Tratamento</div>
      <div className="flex flex-wrap gap-3 justify-content-center">
        <Controller
          name="impermeabilizacao"
          control={control}
          render={({ field }) => (
            <ToggleButton
              className="w-full sm:w-12rem"
              checked={field.value}
              onChange={(e) => field.onChange(e.value)}
              onLabel="Impermeabilizacao"
              offLabel="Impermeabilizacao"
            />
          )}
        />
      </div>
    </form>
  )
}
