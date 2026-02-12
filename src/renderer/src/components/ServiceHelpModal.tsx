interface ServiceHelpModalProps {
  visible: boolean
  onClose: () => void
  title: string
  description: string
  video?: string
}

export default function ServiceHelpModal({
  visible,
  onClose,
  title,
  description,
  video
}: ServiceHelpModalProps): React.JSX.Element | null {
  if (!visible) return null

  return (
    <div className="service-help-overlay" onClick={onClose}>
      <div className="service-help-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="service-help-close" onClick={onClose}>
          <i className="pi pi-times"></i>
        </button>
        <h2 style={{ margin: '0 0 1rem', fontSize: '1.4rem' }}>{title}</h2>
        <div className="service-help-video">
          {video ? (
            <video src={video} autoPlay loop muted style={{ width: '100%', borderRadius: '12px' }} />
          ) : (
            <div className="service-help-placeholder">
              <i className="pi pi-play" style={{ fontSize: '2.5rem' }}></i>
              <span>Video disponivel em breve</span>
            </div>
          )}
        </div>
        <p style={{ marginTop: '1rem', lineHeight: 1.6, color: 'var(--text-color-secondary)' }}>
          {description}
        </p>
      </div>
    </div>
  )
}
