import { useEffect, useState } from 'react'
import { Desktop } from './Desktop'
import { Touch } from './Touch'

const isMobile = () => window.matchMedia('(max-width: 768px)').matches

export const InputDevices = () => {
  const [isOnMobile, setIsOnMobile] = useState(isMobile())

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    const handleChange = (e: MediaQueryListEvent) => setIsOnMobile(e.matches)

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return isOnMobile ? <Touch /> : <Desktop />
}
