import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { RadioButton } from 'primereact/radiobutton'
import { ToggleButton } from 'primereact/togglebutton'
import IconCard from '../../components/IconCard'
import type { IAbstractFormValue, PousaPesFormValue } from '../../types/models'

type Props = {
  values: IAbstractFormValue
  onChange: (values: IAbstractFormValue) => void
}

export default function PousaPesForm({ values, onChange }: Props): React.JSX.Element {
  const form = values as PousaPesFormValue
  const { control, watch, getValues } = useForm<PousaPesFormValue>({
    defaultValues: form
  })

  const tamanho = watch('tamanho')
  const limpeza = watch('limpeza')
  const impermeabilizacao = watch('impermeabilizacao')

  useEffect(() => {
    onChange(getValues())
  }, [tamanho, limpeza, impermeabilizacao, onChange, getValues])

  return (
    <form>
      <div className="label">1. Tamanho</div>
      <div className="flex flex-column align-content-center flex-wrap gap-3 justify-content-center sm:flex-row">
        <Controller
          name="tamanho"
          control={control}
          render={({ field }) => (
            <>
              <IconCard
                className="flex-initial border-round-lg surface-300 w-8rem"
                icon="pousa-pes"
                selected={field.value === 'pequeno'}
                onClick={() => field.onChange('pequeno')}
                labelContent={
                  <div className="flex flex-column align-items-center">
                    <span className="block">Pequeno</span>
                    <span className="block">
                      <small>Até 40 cm</small>
                    </span>
                  </div>
                }
              >
                <RadioButton
                  value="pequeno"
                  onChange={(e) => field.onChange(e.value)}
                  checked={field.value === 'pequeno'}
                />
              </IconCard>
              <IconCard
                className="flex-initial border-round-lg surface-300 w-8rem"
                icon="pousa-pes"
                selected={field.value === 'medio'}
                onClick={() => field.onChange('medio')}
                labelContent={
                  <div className="flex flex-column align-items-center">
                    <span className="block text-center">Médio</span>
                    <span className="block">
                      <small>De 41 cm</small>
                    </span>
                    <span className="block">
                      <small>até 60 cm</small>
                    </span>
                  </div>
                }
              >
                <RadioButton
                  value="medio"
                  onChange={(e) => field.onChange(e.value)}
                  checked={field.value === 'medio'}
                />
              </IconCard>
              <IconCard
                className="flex-initial border-round-lg surface-300 w-8rem"
                icon="pousa-pes"
                selected={field.value === 'grande'}
                onClick={() => field.onChange('grande')}
                labelContent={
                  <div className="flex flex-column align-items-center">
                    <span className="block text-center">Grande</span>
                    <span className="block">
                      <small>Maior que</small>
                    </span>
                    <span className="block">
                      <small>60 cm</small>
                    </span>
                  </div>
                }
              >
                <RadioButton
                  value="grande"
                  onChange={(e) => field.onChange(e.value)}
                  checked={field.value === 'grande'}
                />
              </IconCard>
            </>
          )}
        />
      </div>

      <div className="label">2. Serviço</div>
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
              onLabel="Impermeabilização"
              offLabel="Impermeabilização"
            />
          )}
        />
      </div>
    </form>
  )
}
