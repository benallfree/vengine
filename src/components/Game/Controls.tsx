import { useEffect, useRef } from 'react'
import nipplejs from 'nipplejs'
import { socket } from '../../App'
import * as styles from './styles.css'

const MOVEMENT_THRESHOLD = 0.1
const LOOK_THRESHOLD = 0.1

export const Controls = () => {
  const leftJoystickRef = useRef<HTMLDivElement>(null)
  const rightJoystickRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!leftJoystickRef.current || !rightJoystickRef.current) return

    const leftJoystick = nipplejs.create({
      zone: leftJoystickRef.current,
      mode: 'static',
      position: { left: '25%', bottom: '25%' },
      color: 'white',
      size: 120,
    })

    const rightJoystick = nipplejs.create({
      zone: rightJoystickRef.current,
      mode: 'static',
      position: { right: '25%', bottom: '25%' },
      color: 'white',
      size: 120,
    })

    const handleMove = (data: any) => {
      const force = data.force < 1 ? data.force : 1
      const angle = (data.angle.radian + Math.PI) % (2 * Math.PI)

      if (force > MOVEMENT_THRESHOLD) {
        socket.emit('player:move', {
          x: Math.cos(angle) * force,
          z: Math.sin(angle) * force,
        })
      }
    }

    const handleLook = (data: any) => {
      const force = data.force < 1 ? data.force : 1
      const angle = (data.angle.radian + Math.PI) % (2 * Math.PI)

      if (force > LOOK_THRESHOLD) {
        socket.emit('player:look', {
          x: Math.cos(angle) * force,
          y: Math.sin(angle) * force,
        })
      }
    }

    leftJoystick.on('move', handleMove)
    rightJoystick.on('move', handleLook)

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW':
          socket.emit('player:move', { x: 0, z: 1 })
          break
        case 'KeyS':
          socket.emit('player:move', { x: 0, z: -1 })
          break
        case 'KeyA':
          socket.emit('player:move', { x: -1, z: 0 })
          break
        case 'KeyD':
          socket.emit('player:move', { x: 1, z: 0 })
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      leftJoystick.destroy()
      rightJoystick.destroy()
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <>
      <div ref={leftJoystickRef} className={styles.joystick} />
      <div ref={rightJoystickRef} className={styles.joystick} />
    </>
  )
}
