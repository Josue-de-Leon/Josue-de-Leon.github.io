"use client"

import { useAuth } from '@/context/AuthContext'
import styles from './Sidebar.module.css'

export default function Sidebar({ setCurrentPage }) {
  const { user } = useAuth()

  const menuItems = [
    { icon: '👤', label: `${user?.firstName} ${user?.lastName}`, action: 'profile' },
    { icon: '👥', label: 'Amigos', action: 'friends' },
    { icon: '🕐', label: 'Recuerdos', action: null },
    { icon: '💾', label: 'Guardado', action: null },
    { icon: '👥', label: 'Grupos', action: null },
    { icon: '📹', label: 'Video', action: null },
    { icon: '🛒', label: 'Marketplace', action: null },
    { icon: '📰', label: 'Feeds', action: null },
    { icon: '📅', label: 'Eventos', action: null },
  ]

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={styles.navItem}
            onClick={() => item.action && setCurrentPage(item.action)}
            disabled={!item.action}
          >
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.label}>{item.label}</span>
          </button>
        ))}
      </nav>
      
      <div className={styles.footer}>
        <p>Privacidad · Condiciones · Publicidad · Opciones de anuncios · Cookies · Mas · Meta 2025</p>
      </div>
    </aside>
  )
}
