import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { InputMask } from 'primereact/inputmask'
import { Dropdown } from 'primereact/dropdown'
import { useStepper } from '../contexts/StepperContext'

type PaisType = {
  nome: string
  codigo: string
  prefix: string
}

type CadastroFormData = {
  primeiroNome: string
  ultimoNome: string
  telefone: string
  email: string
  morada: string
  pais: string
  codigoPostal: string
  localidade: string
}

const countries: PaisType[] = [
  { nome: 'Portugal', prefix: '+351', codigo: 'PT' },
  { nome: 'Brasil', prefix: '+55', codigo: 'BR' },
  { nome: 'França', prefix: '+33', codigo: 'FR' },
  { nome: 'Itália', prefix: '+39', codigo: 'IT' },
  { nome: 'Marrocos', prefix: '+212', codigo: 'MA' },
  { nome: 'Alemanha', prefix: '+49', codigo: 'DE' },
  { nome: 'Espanha', prefix: '+34', codigo: 'ES' },
  { nome: 'Argélia', prefix: '+213', codigo: 'DZ' }
]

function getCadastroCache(): Partial<CadastroFormData> | null {
  const storageData = localStorage.getItem('_cadastro')
  if (storageData) return JSON.parse(storageData)
  return null
}

export default function CadastroView(): React.JSX.Element {
  const stepper = useStepper()
  const [loading, setLoading] = useState(false)

  const cached = getCadastroCache()

  const { control, handleSubmit } = useForm<CadastroFormData>({
    defaultValues: {
      primeiroNome: cached?.primeiroNome || '',
      ultimoNome: cached?.ultimoNome || '',
      telefone: cached?.telefone || '',
      email: cached?.email || '',
      morada: cached?.morada || '',
      pais: cached?.pais || '+351',
      codigoPostal: cached?.codigoPostal || '',
      localidade: cached?.localidade || ''
    }
  })

  const onSubmit = (data: CadastroFormData): void => {
    localStorage.setItem('_cadastro', JSON.stringify(data))
    setLoading(true)
    // Skip Bitrix24 submission - just advance to confirmation
    setTimeout(() => {
      setLoading(false)
      stepper.next()
    }, 300)
  }

  if (loading) {
    return (
      <div className="text-center">
        <i className="pi pi-spin pi-spinner" style={{ fontSize: '3rem' }}></i>
      </div>
    )
  }

  return (
    <div>
      <div>
        <button type="button" className="btn-back" onClick={() => stepper.prev()}>
          <i className="pi pi-arrow-left"></i>
          <span>Voltar</span>
        </button>
      </div>
      <hr />
      <div className="py-4 flex justify-content-center align-items-center">
        <span className="text-xl font-bold">Preencha os seus dados</span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid">
          <div className="col-12 md:col-6">
            <label className="block mb-1" htmlFor="primeiroNome">
              Primeiro Nome *
            </label>
            <Controller
              name="primeiroNome"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <InputText
                  id="primeiroNome"
                  className="w-full"
                  placeholder="Introduza o primeiro nome"
                  {...field}
                />
              )}
            />
          </div>
          <div className="col-12 md:col-6">
            <label className="block mb-1" htmlFor="ultimoNome">
              Último Nome *
            </label>
            <Controller
              name="ultimoNome"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <InputText
                  id="ultimoNome"
                  className="w-full"
                  placeholder="Introduza o último nome"
                  {...field}
                />
              )}
            />
          </div>
          <div className="col-12 md:col-6">
            <div className="flex gap-2">
              <div>
                <label className="block mb-1" htmlFor="pais">
                  País *
                </label>
                <Controller
                  name="pais"
                  control={control}
                  render={({ field }) => (
                    <Dropdown
                      id="pais"
                      options={countries}
                      optionLabel="nome"
                      optionValue="prefix"
                      className="w-8rem"
                      value={field.value}
                      onChange={(e) => field.onChange(e.value)}
                      placeholder=" "
                      itemTemplate={(option) => (
                        <div className="flex align-items-center gap-2">
                          <span>{option.prefix}</span>
                        </div>
                      )}
                      valueTemplate={(option) =>
                        option ? (
                          <div className="flex align-items-center gap-2">
                            <span>{option.prefix}</span>
                          </div>
                        ) : (
                          <span>&nbsp;</span>
                        )
                      }
                    />
                  )}
                />
              </div>
              <div className="flex-1">
                <label className="block mb-1" htmlFor="telefone">
                  Telefone *
                </label>
                <Controller
                  name="telefone"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <InputMask
                      id="telefone"
                      className="w-full"
                      mask="999 999 999"
                      placeholder="Introduza o telefone"
                      value={field.value}
                      onChange={(e) => field.onChange(e.value)}
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <div className="col-12 md:col-6">
            <label className="block mb-1" htmlFor="email">
              E-mail *
            </label>
            <Controller
              name="email"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <InputText id="email" className="w-full" placeholder="Introduza o e-mail" {...field} />
              )}
            />
          </div>
          <div className="col-12">
            <label className="block mb-1" htmlFor="morada">
              Morada
            </label>
            <Controller
              name="morada"
              control={control}
              render={({ field }) => (
                <InputText
                  id="morada"
                  className="w-full"
                  placeholder="Introduza a morada"
                  {...field}
                />
              )}
            />
          </div>
          <div className="col-12 md:col-6">
            <label className="block mb-1" htmlFor="codigoPostal">
              Código Postal
            </label>
            <Controller
              name="codigoPostal"
              control={control}
              render={({ field }) => (
                <InputMask
                  id="codigoPostal"
                  className="w-full"
                  mask="9999-999"
                  placeholder="0000-000"
                  value={field.value}
                  onChange={(e) => field.onChange(e.value)}
                />
              )}
            />
          </div>
          <div className="col-12 md:col-6">
            <label className="block mb-1" htmlFor="localidade">
              Localidade
            </label>
            <Controller
              name="localidade"
              control={control}
              render={({ field }) => (
                <InputText
                  id="localidade"
                  className="w-full"
                  placeholder="Introduza a localidade"
                  {...field}
                />
              )}
            />
          </div>
        </div>
        <div className="text-center mt-3">
          <Button
            type="submit"
            className="w-full sm:w-20rem"
            label="Enviar"
            icon="pi pi-send"
            iconPos="right"
          />
        </div>
      </form>
    </div>
  )
}
