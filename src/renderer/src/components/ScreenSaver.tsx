import { useRef, useState, useCallback } from 'react'

const VIDEOS = ['/1.mp4', '/2.mp4', '/3.mp4']

type ScreenSaverProps = {
  onDismiss: () => void
}

export default function ScreenSaver({ onDismiss }: ScreenSaverProps): React.JSX.Element {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleEnded = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % VIDEOS.length)
  }, [])

  return (
    <div
      onClick={onDismiss}
      onTouchStart={onDismiss}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#000',
        cursor: 'pointer'
      }}
    >
      <video
        ref={videoRef}
        key={currentIndex}
        src={VIDEOS[currentIndex]}
        autoPlay
        muted
        onEnded={handleEnded}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />
      <span
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          color: '#fff',
          fontSize: '1.5rem',
          opacity: 0.8,
          pointerEvents: 'none',
          textShadow: '0 2px 8px rgba(0,0,0,0.6)'
        }}
      >
        Toque para iniciar
      </span>
    </div>
  )
}
