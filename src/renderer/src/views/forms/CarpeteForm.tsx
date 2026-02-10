import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { RadioButton } from 'primereact/radiobutton'
import IconCard from '../../components/IconCard'
import ServiceToggle from '../../components/ServiceToggle'
import Icon from '../../components/Icon'
import NumericKeypad from '../../components/NumericKeypad'
import type { IAbstractFormValue, CarpeteFormValue } from '../../types/models'

const PRESETS_RETANGULO = [
  { key: 'pequeno', label: 'Pequeno', y: 0.6, x: 0.9 },
  { key: 'medio', label: 'Médio', y: 1.0, x: 1.5 },
  { key: 'grande', label: 'Grande', y: 1.4, x: 2.0 },
  { key: 'extragrande', label: 'Extra Grande', y: 2.0, x: 3.0 }
]

const PRESETS_QUADRADO = [
  { key: '1x1', label: '1.00 \u00d7 1.00', a: 1.0 },
  { key: '1.5x1.5', label: '1.50 \u00d7 1.50', a: 1.5 },
  { key: '2x2', label: '2.00 \u00d7 2.00', a: 2.0 }
]

const PRESETS_REDONDO = [
  { key: 'd1', label: 'd = 1.00', d: 1.0 },
  { key: 'd1.5', label: 'd = 1.50', d: 1.5 },
  { key: 'd2', label: 'd = 2.00', d: 2.0 }
]

type Props = {
  values: IAbstractFormValue
  onChange: (values: IAbstractFormValue) => void
}

export default function CarpeteForm({ values, onChange }: Props): React.JSX.Element {
  const form = values as CarpeteFormValue
  const { control, watch, setValue, getValues } = useForm<CarpeteFormValue>({
    defaultValues: form
  })

  const formato = watch('formato')
  const x = watch('x')
  const y = watch('y')
  const a = watch('a')
  const d = watch('d')
  const medida = watch('medida')
  const limpeza = watch('limpeza')

  const [sizePreset, setSizePreset] = useState<string>('')
  const [keypadField, setKeypadField] = useState<string | null>(null)

  useEffect(() => {
    setSizePreset('')
  }, [formato])

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

  const selectRetânguloPreset = (preset: (typeof PRESETS_RETANGULO)[number]): void => {
    setSizePreset(preset.key)
    setValue('y', preset.y)
    setValue('x', preset.x)
  }

  const selectQuadradoPreset = (preset: (typeof PRESETS_QUADRADO)[number]): void => {
    setSizePreset(preset.key)
    setValue('a', preset.a)
  }

  const selectRedondoPreset = (preset: (typeof PRESETS_REDONDO)[number]): void => {
    setSizePreset(preset.key)
    setValue('d', preset.d)
  }

  const handleKeypadConfirm = (value: number): void => {
    if (keypadField === 'y') setValue('y', value)
    else if (keypadField === 'x') setValue('x', value)
    else if (keypadField === 'a') setValue('a', value)
    else if (keypadField === 'd') setValue('d', value)
    setKeypadField(null)
  }

  const getKeypadValue = (): number => {
    if (keypadField === 'y') return y || 0
    if (keypadField === 'x') return x || 0
    if (keypadField === 'a') return a || 0
    if (keypadField === 'd') return d || 0
    return 0
  }

  const getKeypadLabel = (): string => {
    if (keypadField === 'y') return 'Altura (metros)'
    if (keypadField === 'x') return 'Largura (metros)'
    if (keypadField === 'a') return 'Lado (metros)'
    if (keypadField === 'd') return 'Diâmetro (metros)'
    return ''
  }

  return (
    <form>
      <div>
        <div className="label" style={{ marginBottom: 0 }}>
          1. Formato da carpete
        </div>
        <span className="block mb-2 text-500">
          <small>Selecione o formato da sua carpete</small>
        </span>
      </div>
      <div className="flex flex-column align-content-center justify-content-center flex-wrap gap-3 sm:flex-row">
        <Controller
          name="formato"
          control={control}
          render={({ field }) => (
            <>
              <IconCard
                className="flex-initial border-round-lg surface-300 w-12rem"
                icon="tapete-retangulo"
                labelContent={<span className="block">Retângulo</span>}
                selected={field.value === 'retangulo'}
                onClick={() => field.onChange('retangulo')}
              >
                <RadioButton
                  value="retangulo"
                  onChange={(e) => field.onChange(e.value)}
                  checked={field.value === 'retangulo'}
                />
              </IconCard>
              <IconCard
                className="flex-initial border-round-lg surface-300 w-12rem"
                icon="tapete-quadrado"
                labelContent={<span className="block">Quadrado</span>}
                selected={field.value === 'quadrado'}
                onClick={() => field.onChange('quadrado')}
              >
                <RadioButton
                  value="quadrado"
                  onChange={(e) => field.onChange(e.value)}
                  checked={field.value === 'quadrado'}
                />
              </IconCard>
              <IconCard
                className="flex-initial border-round-lg surface-300 w-12rem"
                icon="tapete-redondo"
                labelContent={<span className="block">Redondo</span>}
                selected={field.value === 'redondo'}
                onClick={() => field.onChange('redondo')}
              >
                <RadioButton
                  value="redondo"
                  onChange={(e) => field.onChange(e.value)}
                  checked={field.value === 'redondo'}
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
          <small>Escolha o serviço que pretende para a sua carpete</small>
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
          3. Medidas da carpete
        </div>
        <span className="block mb-2 text-500">
          <small>Indique as dimensões da sua carpete</small>
        </span>
      </div>
      <div className="flex flex-column justify-content-center flex-wrap gap-3 align-items-center">
        {formato === 'retangulo' && (
          <>
            <Icon icon="tapete-metro-retangulo" viewbox="" width={140} height={140} />
            <div className="measure-options">
              {PRESETS_RETANGULO.map((p) => (
                <div
                  key={p.key}
                  className={`measure-option${sizePreset === p.key ? ' active' : ''}`}
                  onClick={() => selectRetânguloPreset(p)}
                >
                  <span className="measure-option-label">{p.label}</span>
                  <span className="measure-option-detail">
                    {p.y.toFixed(2)} × {p.x.toFixed(2)} m
                  </span>
                  <span className="measure-option-detail">{(p.y * p.x).toFixed(2)} m²</span>
                </div>
              ))}
              <div
                className={`measure-option${sizePreset === 'custom' ? ' active' : ''}`}
                onClick={() => {
                  setSizePreset('custom')
                  setValue('y', 0)
                  setValue('x', 0)
                }}
              >
                <span className="measure-option-label">Personalizado</span>
                <span className="measure-option-detail">Inserir medidas</span>
              </div>
            </div>
            {sizePreset === 'custom' && (
              <div className="flex flex-wrap align-items-center gap-3 justify-content-center">
                <span className="flex align-items-center gap-2">
                  <label>Y</label>
                  <div className="measure-input" onClick={() => setKeypadField('y')}>
                    {(y || 0).toFixed(2)}
                    <span className="measure-input-unit">m</span>
                  </div>
                </span>
                <span className="flex align-items-center gap-2">
                  <label>X</label>
                  <div className="measure-input" onClick={() => setKeypadField('x')}>
                    {(x || 0).toFixed(2)}
                    <span className="measure-input-unit">m</span>
                  </div>
                </span>
              </div>
            )}
          </>
        )}
        {formato === 'quadrado' && (
          <>
            <Icon icon="tapete-metro-quadrado" viewbox="" width={110} height={110} />
            <div className="measure-options">
              {PRESETS_QUADRADO.map((p) => (
                <div
                  key={p.key}
                  className={`measure-option${sizePreset === p.key ? ' active' : ''}`}
                  onClick={() => selectQuadradoPreset(p)}
                >
                  <span className="measure-option-label">{p.label}</span>
                  <span className="measure-option-detail">{(p.a * p.a).toFixed(2)} m²</span>
                </div>
              ))}
              <div
                className={`measure-option${sizePreset === 'custom' ? ' active' : ''}`}
                onClick={() => {
                  setSizePreset('custom')
                  setValue('a', 0)
                }}
              >
                <span className="measure-option-label">Personalizado</span>
                <span className="measure-option-detail">Inserir medida</span>
              </div>
            </div>
            {sizePreset === 'custom' && (
              <div className="flex flex-wrap align-items-center gap-3 justify-content-center">
                <span className="flex align-items-center gap-2">
                  <label>Lado</label>
                  <div className="measure-input" onClick={() => setKeypadField('a')}>
                    {(a || 0).toFixed(2)}
                    <span className="measure-input-unit">m</span>
                  </div>
                </span>
              </div>
            )}
          </>
        )}
        {formato === 'redondo' && (
          <>
            <Icon icon="tapete-metro-redondo" viewbox="" width={110} height={110} />
            <div className="measure-options">
              {PRESETS_REDONDO.map((p) => (
                <div
                  key={p.key}
                  className={`measure-option${sizePreset === p.key ? ' active' : ''}`}
                  onClick={() => selectRedondoPreset(p)}
                >
                  <span className="measure-option-label">{p.label}</span>
                  <span className="measure-option-detail">
                    {((Math.PI * Math.pow(p.d, 2)) / 4).toFixed(2)} m²
                  </span>
                </div>
              ))}
              <div
                className={`measure-option${sizePreset === 'custom' ? ' active' : ''}`}
                onClick={() => {
                  setSizePreset('custom')
                  setValue('d', 0)
                }}
              >
                <span className="measure-option-label">Personalizado</span>
                <span className="measure-option-detail">Inserir medida</span>
              </div>
            </div>
            {sizePreset === 'custom' && (
              <div className="flex flex-wrap align-items-center gap-3 justify-content-center">
                <span className="flex align-items-center gap-2">
                  <label>Diâmetro</label>
                  <div className="measure-input" onClick={() => setKeypadField('d')}>
                    {(d || 0).toFixed(2)}
                    <span className="measure-input-unit">m</span>
                  </div>
                </span>
              </div>
            )}
          </>
        )}
        <span>{(medida || 0).toFixed(2)} m²</span>
      </div>

      {keypadField && (
        <NumericKeypad
          value={getKeypadValue()}
          label={getKeypadLabel()}
          onConfirm={handleKeypadConfirm}
          onCancel={() => setKeypadField(null)}
        />
      )}
    </form>
  )
}
