import { ReactNode, useEffect, useState } from 'react'

const createDeviceDetector = (matches: boolean) => {
  return ({ children }: { children: ReactNode }) => {
    const [isMatched, setIsMatched] = useState(
      window.matchMedia('(max-width: 768px)').matches === matches
    )

    useEffect(() => {
      const mediaQuery = window.matchMedia('(max-width: 768px)')
      const handleChange = (e: MediaQueryListEvent) =>
        setIsMatched(e.matches === matches)

      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }, [])

    if (!isMatched) {
      return null
    }

    return <>{children}</>
  }
}

export const IsTouch = createDeviceDetector(true)
export const IsDesktop = createDeviceDetector(false)
