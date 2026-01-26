import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { RadioButton } from 'primereact/radiobutton'
import IconCard from '../../components/IconCard'
import ServiceToggle from '../../components/ServiceToggle'
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
      <div>
        <div className="label" style={{ marginBottom: 0 }}>
          1. Área a limpar
        </div>
        <span className="block mb-2 text-500">
          <small>Selecione a área da cadeira que pretende limpar</small>
        </span>
      </div>
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
                selected={field.value === 'assento'}
                onClick={() => field.onChange('assento')}
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
                selected={field.value === 'assentoCostas'}
                onClick={() => field.onChange('assentoCostas')}
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
                labelContent={<span className="block text-center">Assento, Costas e Braços</span>}
                selected={field.value === 'assentoCostasBraco'}
                onClick={() => field.onChange('assentoCostasBraco')}
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

      <div>
        <div className="label" style={{ marginBottom: 0 }}>
          2. Tipo de material
        </div>
        <span className="block mb-2 text-500">
          <small>Qual o material da sua cadeira?</small>
        </span>
      </div>
      <div className="flex flex-wrap gap-3 justify-content-center">
        <Controller
          name="caracteristica"
          control={control}
          render={({ field }) => (
            <>
              <label className="radio-option" htmlFor="cadeira-tecido">
                <span>Tecido</span>
                <RadioButton
                  inputId="cadeira-tecido"
                  value="tecido"
                  onChange={(e) => field.onChange(e.value)}
                  checked={field.value === 'tecido'}
                />
              </label>
              <label className="radio-option" htmlFor="cadeira-pele">
                <span>Pele</span>
                <RadioButton
                  inputId="cadeira-pele"
                  value="pele"
                  onChange={(e) => field.onChange(e.value)}
                  checked={field.value === 'pele'}
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
          <small>Escolha o serviço que pretende para a sua cadeira</small>
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
