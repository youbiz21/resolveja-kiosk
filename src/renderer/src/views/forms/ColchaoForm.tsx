import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { RadioButton } from 'primereact/radiobutton'
import IconCard from '../../components/IconCard'
import ServiceToggle from '../../components/ServiceToggle'
import type { IAbstractFormValue, ColchaoFormValue } from '../../types/models'

type Props = {
  values: IAbstractFormValue
  onChange: (values: IAbstractFormValue) => void
}

export default function ColchaoForm({ values, onChange }: Props): React.JSX.Element {
  const form = values as ColchaoFormValue
  const { control, watch, getValues } = useForm<ColchaoFormValue>({
    defaultValues: form
  })

  const formato = watch('formato')
  const limpeza = watch('limpeza')
  const antiAcaro = watch('antiAcaro')

  useEffect(() => {
    onChange(getValues())
  }, [formato, limpeza, antiAcaro, onChange, getValues])

  return (
    <form>
      <div>
        <div className="label" style={{ marginBottom: 0 }}>
          1. Tamanho do colchão
        </div>
        <span className="block mb-2 text-500">
          <small>Selecione o tamanho do seu colchão</small>
        </span>
      </div>
      <div className="flex flex-column align-content-center justify-content-center flex-wrap gap-3 sm:flex-row">
        <Controller
          name="formato"
          control={control}
          render={({ field }) => (
            <>
              <IconCard
                className="flex-initial border-round-lg surface-300 w-8rem"
                icon="colchao-casal"
                selected={field.value === 'casal'}
                onClick={() => field.onChange('casal')}
                labelContent={
                  <div className="flex flex-column align-items-center">
                    <span className="block">Casal</span>
                    <span className="block">
                      <small>140/160</small>
                    </span>
                  </div>
                }
              >
                <RadioButton
                  value="casal"
                  onChange={(e) => field.onChange(e.value)}
                  checked={field.value === 'casal'}
                />
              </IconCard>
              <IconCard
                className="flex-initial border-round-lg surface-300 w-8rem"
                icon="colchao-king-size"
                selected={field.value === 'king'}
                onClick={() => field.onChange('king')}
                labelContent={
                  <div className="flex flex-column align-items-center">
                    <span className="block">King Size</span>
                    <span className="block">
                      <small>180/200</small>
                    </span>
                  </div>
                }
              >
                <RadioButton
                  value="king"
                  onChange={(e) => field.onChange(e.value)}
                  checked={field.value === 'king'}
                />
              </IconCard>
              <IconCard
                className="flex-initial border-round-lg surface-300 w-8rem"
                icon="colchao-individual"
                selected={field.value === 'individual'}
                onClick={() => field.onChange('individual')}
                labelContent={
                  <div className="flex flex-column align-items-center">
                    <span className="block">Individual</span>
                    <span className="block">
                      <small>70/100</small>
                    </span>
                  </div>
                }
              >
                <RadioButton
                  value="individual"
                  onChange={(e) => field.onChange(e.value)}
                  checked={field.value === 'individual'}
                />
              </IconCard>
              <IconCard
                className="flex-initial border-round-lg surface-300 w-8rem"
                icon="berco"
                selected={field.value === 'berco'}
                onClick={() => field.onChange('berco')}
                labelContent={
                  <div className="flex flex-column align-items-center">
                    <span className="block">Berço</span>
                  </div>
                }
              >
                <RadioButton
                  value="berco"
                  onChange={(e) => field.onChange(e.value)}
                  checked={field.value === 'berco'}
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
          <small>Escolha o serviço que pretende para o seu colchão</small>
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
          name="antiAcaro"
          control={control}
          render={({ field }) => (
            <ServiceToggle
              serviceKey="antiAcaro"
              checked={field.value}
              onChange={(v) => field.onChange(v)}
              className="w-full sm:w-12rem"
            />
          )}
        />
      </div>
    </form>
  )
}
