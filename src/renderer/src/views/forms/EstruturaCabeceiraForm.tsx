import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { RadioButton } from 'primereact/radiobutton'
import IconCard from '../../components/IconCard'
import ServiceToggle from '../../components/ServiceToggle'
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
      <div>
        <div className="label" style={{ marginBottom: 0 }}>
          1. Tipo de peça
        </div>
        <span className="block mb-2 text-500">
          <small>Selecione o que pretende limpar</small>
        </span>
      </div>
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
                selected={field.value === 'cabeceira'}
                onClick={() => field.onChange('cabeceira')}
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
                selected={field.value === 'estrutura'}
                onClick={() => field.onChange('estrutura')}
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
                selected={field.value === 'ambos'}
                onClick={() => field.onChange('ambos')}
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

      <div>
        <div className="label" style={{ marginBottom: 0 }}>
          2. Tamanho da cama
        </div>
        <span className="block mb-2 text-500">
          <small>Selecione o tamanho da sua cama</small>
        </span>
      </div>
      <div className="flex flex-wrap gap-3 justify-content-center">
        <Controller
          name="formato"
          control={control}
          render={({ field }) => (
            <>
              <label className="radio-option" htmlFor="ec-individual">
                <span>Individual</span>
                <RadioButton
                  inputId="ec-individual"
                  value="individual"
                  onChange={(e) => field.onChange(e.value)}
                  checked={field.value === 'individual'}
                />
              </label>
              <label className="radio-option" htmlFor="ec-casal">
                <span>Casal</span>
                <RadioButton
                  inputId="ec-casal"
                  value="casal"
                  onChange={(e) => field.onChange(e.value)}
                  checked={field.value === 'casal'}
                />
              </label>
            </>
          )}
        />
      </div>

      <div>
        <div className="label" style={{ marginBottom: 0 }}>
          3. Serviço desejado
        </div>
        <span className="block mb-2 text-500">
          <small>Escolha o serviço que pretende</small>
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
          4. Tratamento adicional
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
