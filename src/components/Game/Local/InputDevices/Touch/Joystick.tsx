import nipplejs, { EventData, JoystickOutputData } from 'nipplejs'
import { useCallback } from 'react'
import * as styles from './style.css'

type JoystickProps = {
  position: 'left' | 'right'
  /**
   * Called when the joystick force/position changes.
   * Note: This is NOT called continuously while holding - only when the force/position changes.
   * For continuous updates while holding, use a frame loop to read the latest data.
   */
  onMove: (event: EventData, data: JoystickOutputData) => void
  /**
   * Called when the joystick is released
   */
  onEnd: () => void
}

export const Joystick = ({ position, onMove, onEnd }: JoystickProps) => {
  const joystickRef = useCallback(
    (node: HTMLDivElement) => {
      if (!node) return

      const joystick = nipplejs.create({
        zone: node,
        mode: 'static',
        position: {
          [position]: '50%',
          bottom: '50%',
        },
        color: 'white',
        size: 120,
      })

      joystick.on('move', onMove)
      joystick.on('end', onEnd)
    },
    [position, onMove, onEnd]
  )

  return <div ref={joystickRef} className={styles.joystick} />
}
