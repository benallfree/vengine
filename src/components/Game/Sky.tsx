import { Sky as DreiSky } from '@react-three/drei'
import { useRef } from 'react'
import { Group } from 'three'

export const Sky = () => {
  const cloudsRef = useRef<Group>(null!)

  return (
    <>
      <DreiSky
        distance={450000}
        sunPosition={[300, 0.35, 300]}
        inclination={0.6}
        azimuth={0.1}
      />

      {/* Add some scattered clouds */}
      {/* <group ref={cloudsRef} position={[0, 50, 0]}>
        <Cloud position={[-10, 0, -15]} opacity={0.7} speed={0.4} scale={10} />
        <Cloud position={[10, 2, -10]} opacity={0.6} speed={0.25} scale={8} />
        <Cloud position={[0, 1, -20]} opacity={0.75} speed={0.3} scale={12} />
      </group> */}
    </>
  )
}
