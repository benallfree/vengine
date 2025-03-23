import { useEffect, useState } from 'react'
import { MobileControls } from './MobileControls'
import { MouseControls } from './MouseControls'

const isMobile = () => window.matchMedia('(max-width: 768px)').matches

export const Controls = () => {
  const [isOnMobile, setIsOnMobile] = useState(isMobile())

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    const handleChange = (e: MediaQueryListEvent) => setIsOnMobile(e.matches)

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return isOnMobile ? <MobileControls /> : <MouseControls />
}
