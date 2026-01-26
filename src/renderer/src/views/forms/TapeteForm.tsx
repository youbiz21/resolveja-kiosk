import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { RadioButton } from 'primereact/radiobutton'
import { ToggleButton } from 'primereact/togglebutton'
import { InputNumber } from 'primereact/inputnumber'
import IconCard from '../../components/IconCard'
import Icon from '../../components/Icon'
import type { IAbstractFormValue, TapeteFormValue } from '../../types/models'

type Props = {
  values: IAbstractFormValue
  onChange: (values: IAbstractFormValue) => void
}

export default function TapeteForm({ values, onChange }: Props): React.JSX.Element {
  const form = values as TapeteFormValue
  const { control, watch, setValue, getValues } = useForm<TapeteFormValue>({
    defaultValues: form
  })

  const formato = watch('formato')
  const x = watch('x')
  const y = watch('y')
  const a = watch('a')
  const d = watch('d')
  const medida = watch('medida')
  const limpeza = watch('limpeza')

  useEffect(() => {
    if (formato === 'retangulo') {
      setValue('medida', (x || 0) * (y || 0))
    } else if (formato === 'quadrado') {
      setValue('medida', (a || 0) * (a || 0))
    } else if (formato === 'redondo') {
      setValue('medida', (Math.PI * Math.pow(d || 0, 2)) / 4)
    }
  }, [x, y, a, d, formato, setValue])

  useEffect(() => {
    onChange(getValues())
  }, [formato, x, y, a, d, medida, limpeza, onChange, getValues])

  return (
    <form>
      <div className="label">1. Formato</div>
      <div className="flex flex-column align-content-center justify-content-center flex-wrap gap-3 sm:flex-row">
        <Controller
          name="formato"
          control={control}
          render={({ field }) => (
            <>
              <IconCard
                className="flex-initial border-round-lg surface-300 w-8rem"
                icon="tapete-retangulo"
                labelContent={<span className="block">Retangulo</span>}
              >
                <RadioButton
                  inputId="retangulo"
                  value="retangulo"
                  onChange={(e) => field.onChange(e.value)}
                  checked={field.value === 'retangulo'}
                />
              </IconCard>
              <IconCard
                className="flex-initial border-round-lg surface-300 w-8rem"
                icon="tapete-quadrado"
                labelContent={<span className="block">Quadrado</span>}
              >
                <RadioButton
                  inputId="quadrado"
                  value="quadrado"
                  onChange={(e) => field.onChange(e.value)}
                  checked={field.value === 'quadrado'}
                />
              </IconCard>
              <IconCard
                className="flex-initial border-round-lg surface-300 w-8rem"
                icon="tapete-redondo"
                labelContent={<span className="block">Redondo</span>}
              >
                <RadioButton
                  inputId="redondo"
                  value="redondo"
                  onChange={(e) => field.onChange(e.value)}
                  checked={field.value === 'redondo'}
                />
              </IconCard>
            </>
          )}
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

      <div className="label">4. Medida</div>
      <div>
        <span className="block mb-2">
          <small>Introduza as medidas em metros</small>
        </span>
      </div>
      <div className="flex flex-column justify-content-center sm:flex-row flex-wrap gap-3 align-items-center">
        {formato === 'retangulo' && (
          <>
            <Icon icon="tapete-metro-retangulo" viewbox="" width={140} height={140} />
            <span className="flex flex-wrap align-items-center gap-2">
              <label htmlFor="y">Y</label>
              <span className="relative">
                <Controller
                  name="y"
                  control={control}
                  render={({ field }) => (
                    <InputNumber
                      inputId="y"
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
              <label htmlFor="x">X</label>
              <span className="relative">
                <Controller
                  name="x"
                  control={control}
                  render={({ field }) => (
                    <InputNumber
                      inputId="x"
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
          </>
        )}
        {formato === 'quadrado' && (
          <>
            <Icon icon="tapete-metro-quadrado" viewbox="" width={110} height={110} />
            <span className="flex flex-wrap align-items-center gap-2">
              <label htmlFor="a">Altura</label>
              <span className="relative">
                <Controller
                  name="a"
                  control={control}
                  render={({ field }) => (
                    <InputNumber
                      inputId="a"
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
          </>
        )}
        {formato === 'redondo' && (
          <>
            <Icon icon="tapete-metro-redondo" viewbox="" width={110} height={110} />
            <span className="flex flex-wrap align-items-center gap-2">
              <label htmlFor="d">Diametro</label>
              <span className="relative">
                <Controller
                  name="d"
                  control={control}
                  render={({ field }) => (
                    <InputNumber
                      inputId="d"
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
          </>
        )}
        <span>{(medida || 0).toFixed(2)} m2</span>
      </div>
    </form>
  )
}
