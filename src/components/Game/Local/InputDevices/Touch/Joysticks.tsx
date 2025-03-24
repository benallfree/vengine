import { LookStick } from './LookStick'
import { MoveStick } from './MoveStick'
import * as styles from './style.css'

export const Joysticks = () => {
  return (
    <div className={styles.overlay}>
      <MoveStick />
      <LookStick />
    </div>
  )
}
