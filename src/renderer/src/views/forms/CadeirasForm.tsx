import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { RadioButton } from 'primereact/radiobutton'
import { ToggleButton } from 'primereact/togglebutton'
import IconCard from '../../components/IconCard'
import type { IAbstractFormValue, CadeiraFormValue } from '../../types/models'

type Props = {
  values: IAbstractFormValue
  onChange: (values: IAbstractFormValue) => void
}

export default function CadeirasForm({ values, onChange }: Props): React.JSX.Element {
  const form = values as CadeiraFormValue
  const { control, watch, getValues } = useForm<CadeiraFormValue>({
    defaultValues: form
  })

  const areaALimpar = watch('areaALimpar')
  const caracteristica = watch('caracteristica')
  const limpeza = watch('limpeza')
  const impermeabilizacao = watch('impermeabilizacao')

  useEffect(() => {
    onChange(getValues())
  }, [areaALimpar, caracteristica, limpeza, impermeabilizacao, onChange, getValues])

  return (
    <form>
      <div className="label">1. Formato</div>
      <div className="flex flex-column align-content-center justify-content-center flex-wrap gap-3 sm:flex-row">
        <Controller
          name="areaALimpar"
          control={control}
          render={({ field }) => (
            <>
              <IconCard
                className="flex-initial border-round-lg surface-300 w-8rem"
                icon="cadeira"
                labelContent={<span className="block">Assento</span>}
              >
                <RadioButton
                  value="assento"
                  onChange={(e) => field.onChange(e.value)}
                  checked={field.value === 'assento'}
                />
              </IconCard>
              <IconCard
                className="flex-initial border-round-lg surface-300 w-8rem"
                icon="cadeira"
                labelContent={<span className="block text-center">Assento e Costas</span>}
              >
                <RadioButton
                  value="assentoCostas"
                  onChange={(e) => field.onChange(e.value)}
                  checked={field.value === 'assentoCostas'}
                />
              </IconCard>
              <IconCard
                className="flex-initial border-round-lg surface-300 w-8rem"
                icon="cadeira"
                labelContent={<span className="block text-center">Assento, Costas e Bracos</span>}
              >
                <RadioButton
                  value="assentoCostasBraco"
                  onChange={(e) => field.onChange(e.value)}
                  checked={field.value === 'assentoCostasBraco'}
                />
              </IconCard>
            </>
          )}
        />
      </div>

      <div className="label">2. Caracteristicas</div>
      <div className="flex flex-wrap gap-3 justify-content-center">
        <Controller
          name="caracteristica"
          control={control}
          render={({ field }) => (
            <>
              <div className="w-4rem">
                <label className="block" htmlFor="cadeira-tecido">
                  Tecido
                </label>
                <RadioButton
                  inputId="cadeira-tecido"
                  value="tecido"
                  onChange={(e) => field.onChange(e.value)}
                  checked={field.value === 'tecido'}
                />
              </div>
              <div className="w-4rem">
                <label className="block" htmlFor="cadeira-pele">
                  Pele
                </label>
                <RadioButton
                  inputId="cadeira-pele"
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
