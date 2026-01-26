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
      <div>
        <div className="label" style={{ marginBottom: 0 }}>
          1. Tipo de acabamento
        </div>
        <span className="block mb-2 text-500">
          <small>Material do seu puff</small>
        </span>
      </div>
      <div className="flex flex-wrap gap-3 justify-content-center">
        <ToggleButton
          className="w-full sm:w-12rem"
          checked={true}
          disabled
          onLabel="Tecido"
          offLabel="Tecido"
        />
      </div>

      <div>
        <div className="label" style={{ marginBottom: 0 }}>
          2. Serviço desejado
        </div>
        <span className="block mb-2 text-500">
          <small>Escolha o serviço que pretende para o seu puff</small>
        </span>
      </div>
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

      <div>
        <div className="label" style={{ marginBottom: 0 }}>
          3. Tratamento adicional
        </div>
        <span className="block mb-2 text-500">
          <small>Pretende algum tratamento extra?</small>
        </span>
      </div>
      <div className="flex flex-wrap gap-3 justify-content-center">
        <Controller
          name="impermeabilizacao"
          control={control}
          render={({ field }) => (
            <ToggleButton
              className="w-full sm:w-auto"
              checked={field.value}
              onChange={(e) => field.onChange(e.value)}
              onLabel="Impermeabilização"
              offLabel="Impermeabilização"
            />
          )}
        />
      </div>
    </form>
  )
}
