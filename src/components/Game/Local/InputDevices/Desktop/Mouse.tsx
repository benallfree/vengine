import { PointerLockControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'

export const Mouse = () => {
  console.log(`Mouse rendered`)
  const { camera } = useThree()

  // Ensure camera uses YXZ order for FPS-style rotations (yaw, pitch, roll)
  useEffect(() => {
    camera.rotation.order = 'YXZ'
  }, [camera])

  return <PointerLockControls />
}
