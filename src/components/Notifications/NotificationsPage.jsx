"use client"

import { useData } from '@/context/DataContext'
import styles from './NotificationsPage.module.css'

export default function NotificationsPage() {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } = useData()

  const formatTime = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now - date
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 60) return `hace ${minutes} minutos`
    if (hours < 24) return `hace ${hours} horas`
    return `hace ${days} dias`
  }

  const getIcon = (type) => {
    switch (type) {
      case 'like':
        return (
          <div className={`${styles.icon} ${styles.iconLike}`}>
            <svg viewBox="0 0 24 24" width="16" height="16">
              <path fill="white" d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/>
            </svg>
          </div>
        )
      case 'comment':
        return (
          <div className={`${styles.icon} ${styles.iconComment}`}>
            <svg viewBox="0 0 24 24" width="16" height="16">
              <path fill="white" d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z"/>
            </svg>
          </div>
        )
      case 'friend_request':
        return (
          <div className={`${styles.icon} ${styles.iconFriend}`}>
            <svg viewBox="0 0 24 24" width="16" height="16">
              <path fill="white" d="M12 6a4 4 0 110 8 4 4 0 010-8zm0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4z"/>
            </svg>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <header className={styles.header}>
          <h1>Notificaciones</h1>
          {notifications.some(n => !n.read) && (
            <button
              className={styles.markAllButton}
              onClick={markAllNotificationsAsRead}
            >
              Marcar todas como leidas
            </button>
          )}
        </header>

        <div className={styles.filters}>
          <button className={`${styles.filterButton} ${styles.active}`}>
            Todas
          </button>
          <button className={styles.filterButton}>
            No leidas
          </button>
        </div>

        <div className={styles.list}>
          {notifications.length === 0 ? (
            <div className={styles.empty}>
              <svg viewBox="0 0 24 24" width="48" height="48">
                <path fill="#bcc0c4" d="M12 2a7 7 0 017 7v4l2.7 3.6a1 1 0 01-.8 1.6H3.1a1 1 0 01-.8-1.6L5 13V9a7 7 0 017-7zm0 2a5 5 0 00-5 5v4.7L5.2 16h13.6L17 13.7V9a5 5 0 00-5-5zm-2 16h4a2 2 0 01-4 0z"/>
              </svg>
              <p>No tienes notificaciones</p>
            </div>
          ) : (
            notifications.map(notification => (
              <button
                key={notification.id}
                className={`${styles.notificationItem} ${!notification.read ? styles.unread : ''}`}
                onClick={() => markNotificationAsRead(notification.id)}
              >
                {getIcon(notification.type)}
                <div className={styles.content}>
                  <p className={styles.message}>{notification.message}</p>
                  <span className={styles.time}>{formatTime(notification.createdAt)}</span>
                </div>
                {!notification.read && <span className={styles.unreadDot} />}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
