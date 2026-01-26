import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { ToggleButton } from 'primereact/togglebutton'
import Icon from '../../components/Icon'
import NumericKeypad from '../../components/NumericKeypad'
import type { IAbstractFormValue, CortinadoFormValue } from '../../types/models'

const PRESETS_LARGURA = [
  { key: '1.4', label: '1.40 m', x: 1.4 },
  { key: '2.0', label: '2.00 m', x: 2.0 },
  { key: '2.6', label: '2.60 m', x: 2.6 },
  { key: '3.0', label: '3.00 m', x: 3.0 }
]

type Props = {
  values: IAbstractFormValue
  onChange: (values: IAbstractFormValue) => void
}

export default function CortinadosForm({ values, onChange }: Props): React.JSX.Element {
  const form = values as CortinadoFormValue
  const { control, watch, setValue, getValues } = useForm<CortinadoFormValue>({
    defaultValues: form
  })

  const x = watch('x')
  const limpeza = watch('limpeza')
  const impermeabilizacao = watch('impermeabilizacao')
  const formato = watch('formato')

  const [sizePreset, setSizePreset] = useState<string>('')
  const [keypadOpen, setKeypadOpen] = useState(false)

  useEffect(() => {
    setValue('formato', x || 0)
  }, [x, setValue])

  useEffect(() => {
    onChange(getValues())
  }, [x, limpeza, impermeabilizacao, formato, onChange, getValues])

  const selectPreset = (preset: (typeof PRESETS_LARGURA)[number]): void => {
    setSizePreset(preset.key)
    setValue('x', preset.x)
  }

  return (
    <form>
      <div>
        <div className="label" style={{ marginBottom: 0 }}>
          1. Largura do cortinado
        </div>
        <span className="block mb-2 text-500">
          <small>Selecione ou insira a largura do seu cortinado</small>
        </span>
      </div>
      <div className="flex flex-column flex-wrap gap-3 align-items-center">
        <Icon icon="cortinado-medida" viewbox="" width={90} height={140} />
        <div className="measure-options">
          {PRESETS_LARGURA.map((p) => (
            <div
              key={p.key}
              className={`measure-option${sizePreset === p.key ? ' active' : ''}`}
              onClick={() => selectPreset(p)}
            >
              <span className="measure-option-label">{p.label}</span>
            </div>
          ))}
          <div
            className={`measure-option${sizePreset === 'custom' ? ' active' : ''}`}
            onClick={() => {
              setSizePreset('custom')
              setValue('x', 0)
            }}
          >
            <span className="measure-option-label">Personalizado</span>
            <span className="measure-option-detail">Inserir medida</span>
          </div>
        </div>
        {sizePreset === 'custom' && (
          <div className="flex flex-wrap align-items-center gap-3 justify-content-center">
            <span className="flex align-items-center gap-2">
              <label>X</label>
              <div className="measure-input" onClick={() => setKeypadOpen(true)}>
                {(x || 0).toFixed(2)}
                <span className="measure-input-unit">m</span>
              </div>
            </span>
          </div>
        )}
        <span>{(formato || 0).toFixed(2)} m</span>
      </div>

      <div>
        <div className="label" style={{ marginBottom: 0 }}>
          2. Serviço desejado
        </div>
        <span className="block mb-2 text-500">
          <small>Escolha o serviço que pretende para o seu cortinado</small>
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

      {keypadOpen && (
        <NumericKeypad
          value={x || 0}
          label="Largura (metros)"
          onConfirm={(v) => {
            setValue('x', v)
            setKeypadOpen(false)
          }}
          onCancel={() => setKeypadOpen(false)}
        />
      )}
    </form>
  )
}
