import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { ToggleButton } from 'primereact/togglebutton'
import { InputNumber } from 'primereact/inputnumber'
import Icon from '../../components/Icon'
import type { IAbstractFormValue, CortinadoFormValue } from '../../types/models'

type Props = {
  values: IAbstractFormValue
  onChange: (values: IAbstractFormValue) => void
}

export default function CortinadosForm({ values, onChange }: Props): React.JSX.Element {
  const form = values as CortinadoFormValue
  const { control, watch, setValue, getValues } = useForm<CortinadoFormValue>({
    defaultValues: form
  })

  const x = watch('x')
  const limpeza = watch('limpeza')
  const impermeabilizacao = watch('impermeabilizacao')
  const formato = watch('formato')

  useEffect(() => {
    setValue('formato', x || 0)
  }, [x, setValue])

  useEffect(() => {
    onChange(getValues())
  }, [x, limpeza, impermeabilizacao, formato, onChange, getValues])

  return (
    <form>
      <div>
        <div className="label" style={{ marginBottom: 0 }}>
          1. Formato
        </div>
        <span className="block mb-2">
          <small>Introduza as medidas em metros</small>
        </span>
      </div>
      <div className="flex flex-column flex-wrap gap-3 align-items-center">
        <span className="flex flex-wrap align-items-center gap-2">
          <Icon icon="cortinado-medida" viewbox="" width={90} height={140} />
          <label htmlFor="cortinado-x">X</label>
          <span className="relative">
            <Controller
              name="x"
              control={control}
              render={({ field }) => (
                <InputNumber
                  inputId="cortinado-x"
                  value={field.value}
                  onValueChange={(e) => field.onChange(e.value || 0)}
                  mode="decimal"
                  minFractionDigits={2}
                  min={0}
                  inputClassName="w-6rem"
                />
              )}
            />
            <small className="cm-label">m</small>
          </span>
        </span>
        <span>{(formato || 0).toFixed(2)} m</span>
      </div>

      <div className="label">2. Servico</div>
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

      <div className="label">3. Tratamento</div>
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
