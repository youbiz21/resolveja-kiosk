import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { RadioButton } from 'primereact/radiobutton'
import IconCard from '../../components/IconCard'
import ServiceToggle from '../../components/ServiceToggle'
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
      <div>
        <div className="label" style={{ marginBottom: 0 }}>
          1. Tamanho do pousa-pés
        </div>
        <span className="block mb-2 text-500">
          <small>Selecione o tamanho do seu pousa-pés</small>
        </span>
      </div>
      <div className="flex flex-column align-content-center flex-wrap gap-3 justify-content-center sm:flex-row">
        <Controller
          name="tamanho"
          control={control}
          render={({ field }) => (
            <>
              <IconCard
                className="flex-initial border-round-lg surface-300 w-12rem"
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
                className="flex-initial border-round-lg surface-300 w-12rem"
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
                className="flex-initial border-round-lg surface-300 w-12rem"
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

      <div>
        <div className="label" style={{ marginBottom: 0 }}>
          2. Serviço desejado
        </div>
        <span className="block mb-2 text-500">
          <small>Escolha o serviço que pretende para o seu pousa-pés</small>
        </span>
      </div>
      <div className="flex flex-wrap gap-3 justify-content-center">
        <Controller
          name="limpeza"
          control={control}
          render={({ field }) => (
            <ServiceToggle
              serviceKey="limpeza"
              checked={field.value}
              onChange={(v) => field.onChange(v)}
              className="w-full sm:w-12rem"
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
            <ServiceToggle
              serviceKey="impermeabilizacao"
              checked={field.value}
              onChange={(v) => field.onChange(v)}
              className="w-full sm:w-auto"
            />
          )}
        />
      </div>
    </form>
  )
}
