"use client"

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { useData } from '@/context/DataContext'
import styles from './Header.module.css'

export default function Header({ currentPage, setCurrentPage }) {
  const { user, logout } = useAuth()
  const { notifications } = useData()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const notifRef = useRef(null)
  const menuRef = useRef(null)

  const unreadCount = notifications.filter(n => !n.read).length

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false)
      }
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowUserMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button className={styles.logo} onClick={() => setCurrentPage('home')}>
          facebook
        </button>
        <div className={styles.searchContainer}>
          <svg className={styles.searchIcon} viewBox="0 0 24 24" width="16" height="16">
            <path fill="currentColor" d="M10 2a8 8 0 105.3 14.7l4 4a1 1 0 001.4-1.4l-4-4A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z"/>
          </svg>
          <input
            type="text"
            placeholder="Buscar en Facebook"
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <nav className={styles.nav}>
        <button
          className={`${styles.navItem} ${currentPage === 'home' ? styles.active : ''}`}
          onClick={() => setCurrentPage('home')}
        >
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M9.464 3.29a3 3 0 015.072 0l6.5 10.4A3 3 0 0118.5 18H5.5a3 3 0 01-2.536-4.31l6.5-10.4zM12 4.5L5.5 14.9a1 1 0 00.845 1.53h13.31a1 1 0 00.845-1.53L14 4.5a1 1 0 00-1.69 0L12 4.5z"/>
            <path fill="currentColor" d="M12 2l10 8.5V21a1 1 0 01-1 1H3a1 1 0 01-1-1V10.5L12 2zm0 2.5L4 11v9h16v-9l-8-6.5z"/>
          </svg>
          <span className={styles.navLabel}>Inicio</span>
        </button>
        <button
          className={`${styles.navItem} ${currentPage === 'friends' ? styles.active : ''}`}
          onClick={() => setCurrentPage('friends')}
        >
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M12 6a4 4 0 110 8 4 4 0 010-8zm0 2a2 2 0 100 4 2 2 0 000-4zm6 0a3 3 0 110 6 3 3 0 010-6zm0 2a1 1 0 100 2 1 1 0 000-2zM6 8a3 3 0 110 6 3 3 0 010-6zm0 2a1 1 0 100 2 1 1 0 000-2zm6 6c3.315 0 6 1.79 6 4v2H6v-2c0-2.21 2.685-4 6-4zm0 2c-2.21 0-4 1.119-4 2h8c0-.881-1.79-2-4-2zm8-2c2.21 0 4 1.343 4 3v1h-4v-2c0-.728-.195-1.41-.535-2H20zM4 16c.21 0 .41.012.605.035A5.77 5.77 0 004 18v2H0v-1c0-1.657 1.79-3 4-3z"/>
          </svg>
          <span className={styles.navLabel}>Amigos</span>
        </button>
      </nav>

      <div className={styles.right}>
        <div className={styles.iconButton} ref={notifRef}>
          <button
            className={styles.circleButton}
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path fill="currentColor" d="M12 2a7 7 0 017 7v4l2.7 3.6a1 1 0 01-.8 1.6H3.1a1 1 0 01-.8-1.6L5 13V9a7 7 0 017-7zm0 2a5 5 0 00-5 5v4.7L5.2 16h13.6L17 13.7V9a5 5 0 00-5-5zm-2 16h4a2 2 0 01-4 0z"/>
            </svg>
            {unreadCount > 0 && (
              <span className={styles.badge}>{unreadCount}</span>
            )}
          </button>
          {showNotifications && (
            <NotificationDropdown
              notifications={notifications}
              onClose={() => setShowNotifications(false)}
            />
          )}
        </div>

        <div className={styles.iconButton} ref={menuRef}>
          <button
            className={styles.avatarButton}
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <img src={user?.avatar || "/placeholder.svg"} alt={user?.firstName} className={styles.avatar} />
          </button>
          {showUserMenu && (
            <div className={styles.dropdown}>
              <button
                className={styles.dropdownItem}
                onClick={() => {
                  setCurrentPage('profile')
                  setShowUserMenu(false)
                }}
              >
                <img src={user?.avatar || "/placeholder.svg"} alt="" className={styles.dropdownAvatar} />
                <span>{user?.firstName} {user?.lastName}</span>
              </button>
              <div className={styles.dropdownDivider} />
              <button className={styles.dropdownItem} onClick={logout}>
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="currentColor" d="M16 13v-2H7V8l-5 4 5 4v-3h9zm-3-10H5a2 2 0 00-2 2v4h2V5h8V3zm0 18H5v-4H3v4a2 2 0 002 2h8v-2z"/>
                </svg>
                <span>Cerrar sesion</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

function NotificationDropdown({ notifications, onClose }) {
  const { markNotificationAsRead, markAllNotificationsAsRead } = useData()

  const formatTime = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now - date
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 60) return `hace ${minutes}m`
    if (hours < 24) return `hace ${hours}h`
    return `hace ${days}d`
  }

  return (
    <div className={styles.notificationDropdown}>
      <div className={styles.notificationHeader}>
        <h3>Notificaciones</h3>
        <button onClick={markAllNotificationsAsRead}>Marcar todas como leidas</button>
      </div>
      <div className={styles.notificationList}>
        {notifications.length === 0 ? (
          <p className={styles.emptyNotifications}>No tienes notificaciones</p>
        ) : (
          notifications.slice(0, 10).map(notif => (
            <button
              key={notif.id}
              className={`${styles.notificationItem} ${!notif.read ? styles.unread : ''}`}
              onClick={() => markNotificationAsRead(notif.id)}
            >
              <div className={styles.notificationIcon}>
                {notif.type === 'like' && '❤️'}
                {notif.type === 'comment' && '💬'}
                {notif.type === 'friend_request' && '👤'}
              </div>
              <div className={styles.notificationContent}>
                <p>{notif.message}</p>
                <span className={styles.notificationTime}>{formatTime(notif.createdAt)}</span>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  )
}
