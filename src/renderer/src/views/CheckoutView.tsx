import { useEffect, useMemo, useState } from 'react'
import { Button } from 'primereact/button'
import { RadioButton } from 'primereact/radiobutton'
import { useCart } from '../contexts/CartContext'
import { useStepper } from '../contexts/StepperContext'
import { useSimulador } from '../hooks/useSimulador'
import { OFERTAS } from '../constants/ofertas'
import Icon from '../components/Icon'
import type { SimuladorFormKeys } from '../types/models'
import type { ResultadoItem } from '../types/pricing'

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(value)
}

function parseDescricao(descricao: string): { nomeProduto: string; tipoServico: string | null } {
  const idx = descricao.indexOf('/ ')
  if (idx === -1) return { nomeProduto: descricao, tipoServico: null }
  return {
    nomeProduto: descricao.slice(0, idx),
    tipoServico: descricao.slice(idx + 2)
  }
}

function ItemCard({
  item,
  onDelete
}: {
  item: ResultadoItem
  onDelete: () => void
}): React.JSX.Element {
  const { nomeProduto, tipoServico } = parseDescricao(item.descricao)
  const badgeClass =
    item.tipo === 'domicilio' ? 'checkout-badge-domicilio' : 'checkout-badge-lavandaria'
  const isQuota = !item.icone

  return (
    <div className="checkout-card surface-card shadow-1 border-round-xl p-3 mb-3">
      <div className="flex align-items-start gap-3">
        {item.icone ? (
          <div className="flex-shrink-0">
            <Icon icon={item.icone} width={68} height={68} />
          </div>
        ) : (
          <div
            className="flex-shrink-0 flex align-items-center justify-content-center"
            style={{ width: 68, height: 68 }}
          >
            <i className="pi pi-info-circle text-500" style={{ fontSize: '1.5rem' }}></i>
          </div>
        )}

        <div className="flex-grow-1">
          <div className="flex justify-content-between align-items-start">
            <div>
              <div className="font-bold" style={{ fontSize: '1.4rem' }}>{nomeProduto}</div>
              {tipoServico && <span className={`checkout-badge ${badgeClass}`}>{tipoServico}</span>}
            </div>
            {!isQuota && (
              <button type="button" className="checkout-delete-btn" onClick={onDelete}>
                <i className="pi pi-trash"></i>
              </button>
            )}
          </div>

          {isQuota && (
            <div className="text-500 text-base mt-1">
              <i className="pi pi-info-circle mr-1" style={{ fontSize: '1rem' }}></i>O valor
              mínimo de encomenda é 70,00 €. Este valor complementa o total dos serviços.
            </div>
          )}

          <div className="checkout-section-label mt-3 mb-2">
            <i className="pi pi-check-circle" style={{ fontSize: '1rem' }}></i>
            <span>Serviços selecionados</span>
          </div>

          <div>
            {item.resumo.detalhes.map((detalhe, di) => (
              <div key={di} className="checkout-detail-row" style={{ fontSize: '1.1rem' }}>
                <span className="text-700">{detalhe.detalhe}</span>
                <span className="checkout-detail-dots"></span>
                <span className="font-bold" style={{ fontSize: '1.2rem' }}>{formatCurrency(detalhe.valor)}</span>
              </div>
            ))}
            {item.resumo.detalhes.length > 1 && (
              <>
                <div className="checkout-detail-separator"></div>
                <div className="checkout-detail-row">
                  <span></span>
                  <span></span>
                  <span className="font-bold" style={{ fontSize: '1.3rem' }}>Subtotal {formatCurrency(item.resumo.total)}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutView(): React.JSX.Element {
  const cart = useCart()
  const stepper = useStepper()
  const simulador = useSimulador()
  const [adicionalSelected, setAdicionalSelected] = useState<boolean>(false)

  useEffect(() => {
    simulador.calcular(cart.items)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const possuiOferta = useMemo(() => {
    if (cart.items.length !== 1) return null
    const type = cart.items[0].$type as SimuladorFormKeys
    return OFERTAS[type] || null
  }, [cart.items])

  useEffect(() => {
    if (possuiOferta && adicionalSelected) {
      simulador.setAdicional(possuiOferta.valor)
    } else {
      simulador.setAdicional(0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adicionalSelected, possuiOferta])

  const quotaItem = simulador.items.find((i) => !i.icone)
  const quotaValue = quotaItem ? quotaItem.resumo.total : 0
  const hasDomicilio = simulador.items.some((i) => i.tipo === 'domicilio')
  const hasLavanderia = simulador.items.some((i) => i.tipo === 'lavanderia' && i.icone)
  const totalLavanderiaReal = simulador.totalLavanderia - quotaValue

  return (
    <div className="page-fill">
      <div>
        <button type="button" className="btn-back" onClick={() => stepper.prev()}>
          <i className="pi pi-arrow-left"></i>
          <span>Voltar</span>
        </button>
      </div>
      <hr className="mb-3" />

      {simulador.items.length > 0 ? (
        <div className="flex flex-column gap-2" style={{ flex: 1 }}>
          <div>
            {simulador.items.map((item, index) => (
              <ItemCard key={index} item={item} onDelete={() => simulador.deleteItem(item)} />
            ))}
          </div>

          <div className="checkout-summary surface-100 border-round-xl p-3 mb-3">
            {hasDomicilio && (
              <div className="checkout-detail-row mb-2" style={{ fontSize: '1.1rem' }}>
                <span className="text-700">Serviços ao Domicílio</span>
                <span className="checkout-detail-dots"></span>
                <span className="font-bold" style={{ fontSize: '1.2rem' }}>{formatCurrency(simulador.totalDomicilio)}</span>
              </div>
            )}
            {simulador.descontosDomicilio > 0 && (
              <div className="checkout-detail-row mb-2" style={{ fontSize: '1.1rem' }}>
                <span className="text-700">Desconto Domicílio</span>
                <span className="checkout-detail-dots"></span>
                <span className="font-bold text-green-600" style={{ fontSize: '1.2rem' }}>
                  -{formatCurrency(simulador.descontosDomicilio)}
                </span>
              </div>
            )}
            {hasLavanderia && (
              <div className="checkout-detail-row mb-2" style={{ fontSize: '1.1rem' }}>
                <span className="text-700">Serviços de Lavandaria</span>
                <span className="checkout-detail-dots"></span>
                <span className="font-bold" style={{ fontSize: '1.2rem' }}>{formatCurrency(totalLavanderiaReal)}</span>
              </div>
            )}
            {quotaItem && (
              <div className="checkout-detail-row mb-2" style={{ fontSize: '1.1rem' }}>
                <span className="text-700">Quota mínima</span>
                <span className="checkout-detail-dots"></span>
                <span className="font-bold" style={{ fontSize: '1.2rem' }}>{formatCurrency(quotaValue)}</span>
              </div>
            )}
            {simulador.descontosLavanderia > 0 && (
              <div className="checkout-detail-row mb-2" style={{ fontSize: '1.1rem' }}>
                <span className="text-700">Desconto Lavandaria</span>
                <span className="checkout-detail-dots"></span>
                <span className="font-bold text-green-600" style={{ fontSize: '1.2rem' }}>
                  -{formatCurrency(simulador.descontosLavanderia)}
                </span>
              </div>
            )}

            <div className="checkout-detail-separator"></div>

            <div className="checkout-detail-row mt-2">
              <span className="font-bold" style={{ fontSize: '2rem' }}>Total</span>
              <span></span>
              <span className="font-bold text-primary" style={{ fontSize: '2rem' }}>
                {formatCurrency(simulador.totalComDesconto)}
              </span>
            </div>

            <div className="text-500 mt-2">*Valores com IVA incluído</div>
          </div>

          {possuiOferta && (
            <div className="surface-card shadow-1 border-round-xl p-3 mb-3">
              <div className="text-center mb-3">
                98% dos nossos clientes escolhe o tratamento Anti-ácaros por apenas{' '}
                <span className="font-bold">{formatCurrency(possuiOferta.valor)}</span>
              </div>
              <div className="flex gap-3 mb-3 justify-content-center">
                <label
                  className={`flex align-items-center gap-3 cursor-pointer border-round-lg px-4 py-3 font-bold text-lg ${adicionalSelected === true ? 'border-primary bg-primary-50' : 'surface-100'}`}
                  style={{ minWidth: 260, border: '3px solid', borderColor: adicionalSelected === true ? 'var(--primary-color)' : 'transparent' }}
                >
                  <RadioButton
                    value={true}
                    onChange={() => setAdicionalSelected(true)}
                    checked={adicionalSelected === true}
                  />
                  <span>Sim, quero</span>
                </label>
                <label
                  className={`flex align-items-center gap-3 cursor-pointer border-round-lg px-4 py-3 font-bold text-lg ${adicionalSelected === false ? 'border-primary bg-primary-50' : 'surface-100'}`}
                  style={{ minWidth: 260, border: '3px solid', borderColor: adicionalSelected === false ? 'var(--primary-color)' : 'transparent' }}
                >
                  <RadioButton
                    value={false}
                    onChange={() => setAdicionalSelected(false)}
                    checked={adicionalSelected === false}
                  />
                  <span>Não, obrigado</span>
                </label>
              </div>
              {adicionalSelected && (
                <div className="font-bold text-center" style={{ fontSize: '1.5rem' }}>
                  Valor Total: {formatCurrency(simulador.finalTotal)}
                </div>
              )}
            </div>
          )}

          <div className="flex justify-content-center gap-3 mt-auto pt-3">
            <Button
              label="Adicionar Serviço"
              icon="pi pi-plus"
              severity="secondary"
              className="checkout-action-btn"
              onClick={() => stepper.to(0)}
            />
            <Button
              label="Finalizar"
              icon="pi pi-check"
              iconPos="right"
              className="checkout-action-btn checkout-btn-bounce"
              onClick={() => stepper.next()}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-column align-items-center justify-content-center gap-4" style={{ flex: 1 }}>
          <i className="pi pi-shopping-cart text-400" style={{ fontSize: '5rem' }}></i>
          <div className="text-500 text-lg">O seu carrinho está vazio.</div>
          <Button
            label="Voltar ao Início"
            icon="pi pi-home"
            className="w-full sm:w-20rem"
            onClick={() => stepper.to(0)}
          />
        </div>
      )}
    </div>
  )
}
