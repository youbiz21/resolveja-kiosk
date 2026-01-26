import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { RadioButton } from 'primereact/radiobutton'
import { ToggleButton } from 'primereact/togglebutton'
import IconCard from '../../components/IconCard'
import type { IAbstractFormValue, EstruturaCabeceiraFormValue } from '../../types/models'

type Props = {
  values: IAbstractFormValue
  onChange: (values: IAbstractFormValue) => void
}

export default function EstruturaCabeceiraForm({ values, onChange }: Props): React.JSX.Element {
  const form = values as EstruturaCabeceiraFormValue
  const { control, watch, getValues } = useForm<EstruturaCabeceiraFormValue>({
    defaultValues: form
  })

  const caracteristica = watch('caracteristica')
  const formato = watch('formato')
  const limpeza = watch('limpeza')
  const impermeabilizacao = watch('impermeabilizacao')

  useEffect(() => {
    onChange(getValues())
  }, [caracteristica, formato, limpeza, impermeabilizacao, onChange, getValues])

  return (
    <form>
      <div className="label">1. Caracteristicas</div>
      <div className="flex flex-column align-content-center justify-content-center flex-wrap gap-3 sm:flex-row">
        <Controller
          name="caracteristica"
          control={control}
          render={({ field }) => (
            <>
              <IconCard
                className="flex-initial border-round-lg surface-300 w-8rem"
                icon="cabeceira-da-cama"
                labelContent={<span className="block">Cabeceira</span>}
              >
                <RadioButton
                  value="cabeceira"
                  onChange={(e) => field.onChange(e.value)}
                  checked={field.value === 'cabeceira'}
                />
              </IconCard>
              <IconCard
                className="flex-initial border-round-lg surface-300 w-8rem"
                icon="estrutura-da-cama"
                labelContent={<span className="block text-center">Estrutura</span>}
              >
                <RadioButton
                  value="estrutura"
                  onChange={(e) => field.onChange(e.value)}
                  checked={field.value === 'estrutura'}
                />
              </IconCard>
              <IconCard
                className="flex-initial border-round-lg surface-300 w-8rem"
                icon="cabeiceira-e-estrutura"
                labelContent={<span className="block text-center">Estrutura e Cabeceira</span>}
              >
                <RadioButton
                  value="ambos"
                  onChange={(e) => field.onChange(e.value)}
                  checked={field.value === 'ambos'}
                />
              </IconCard>
            </>
          )}
        />
      </div>

      <div className="label">2. Formato</div>
      <div className="flex flex-wrap gap-3 justify-content-center">
        <Controller
          name="formato"
          control={control}
          render={({ field }) => (
            <>
              <div className="p-2 text-center">
                <label className="block" htmlFor="ec-individual">
                  Individual
                </label>
                <RadioButton
                  inputId="ec-individual"
                  value="individual"
                  onChange={(e) => field.onChange(e.value)}
                  checked={field.value === 'individual'}
                />
              </div>
              <div className="p-2 text-center">
                <label className="block" htmlFor="ec-casal">
                  Casal
                </label>
                <RadioButton
                  inputId="ec-casal"
                  value="casal"
                  onChange={(e) => field.onChange(e.value)}
                  checked={field.value === 'casal'}
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
