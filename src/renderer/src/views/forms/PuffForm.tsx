import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { ToggleButton } from 'primereact/togglebutton'
import type { IAbstractFormValue, PuffFormValue } from '../../types/models'

type Props = {
  values: IAbstractFormValue
  onChange: (values: IAbstractFormValue) => void
}

export default function PuffForm({ values, onChange }: Props): React.JSX.Element {
  const form = values as PuffFormValue
  const { control, watch, getValues } = useForm<PuffFormValue>({
    defaultValues: form
  })

  const limpeza = watch('limpeza')
  const impermeabilizacao = watch('impermeabilizacao')

  useEffect(() => {
    onChange(getValues())
  }, [limpeza, impermeabilizacao, onChange, getValues])

  return (
    <form>
      <div className="label">1. Acabamento</div>
      <div className="flex flex-wrap gap-3 justify-content-center">
        <ToggleButton
          className="w-full sm:w-12rem"
          checked={true}
          disabled
          onLabel="Tecido"
          offLabel="Tecido"
        />
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
