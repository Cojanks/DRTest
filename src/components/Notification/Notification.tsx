import { PropsWithChildren } from 'react';
import styles from './Notification.module.css';

type NotificationProp = {
  type: 'error' | 'success';
  canDismiss?: boolean;
} & PropsWithChildren;

function Notification({
  type,
  children,
  canDismiss = false,
}: NotificationProp) {
  return (
    <div className={`${styles.notification} ${styles[type]}`}>
      <div className={styles.dismiss}>
        {/* Close button logic here (if canDismiss is true) which would dispatch to the global error state, changing it */}
        {canDismiss && <></>}
      </div>
      {children ? children : 'Oh oh, something happened!'}
    </div>
  );
}

export default Notification;
