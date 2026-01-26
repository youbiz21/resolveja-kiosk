import { useEffect, useRef } from 'react'

const IDLE_EVENTS: (keyof DocumentEventMap)[] = [
  'mousemove',
  'mousedown',
  'keydown',
  'touchstart',
  'scroll'
]

export function useIdleTimer(onIdle: () => void, timeoutMs: number): void {
  const onIdleRef = useRef(onIdle)

  useEffect(() => {
    onIdleRef.current = onIdle
  }, [onIdle])

  useEffect(() => {
    let timer = setTimeout(() => onIdleRef.current(), timeoutMs)

    const reset = (): void => {
      clearTimeout(timer)
      timer = setTimeout(() => onIdleRef.current(), timeoutMs)
    }

    for (const event of IDLE_EVENTS) {
      document.addEventListener(event, reset, true)
    }

    return () => {
      clearTimeout(timer)
      for (const event of IDLE_EVENTS) {
        document.removeEventListener(event, reset, true)
      }
    }
  }, [timeoutMs])
}
