"use client"

import { useData } from '@/context/DataContext'
import { useAuth } from '@/context/AuthContext'
import styles from './RightSidebar.module.css'

export default function RightSidebar() {
  const { allUsers } = useData()
  const { user } = useAuth()

  const contacts = allUsers.filter(u => u.id !== user?.id).slice(0, 8)

  return (
    <aside className={styles.sidebar}>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Patrocinado</h3>
        <div className={styles.ad}>
          <img 
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200" 
            alt="Ad"
            className={styles.adImage}
          />
          <div className={styles.adContent}>
            <p className={styles.adTitle}>Ofertas increibles</p>
            <p className={styles.adLink}>tienda.com</p>
          </div>
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Contactos</h3>
        <div className={styles.contactsList}>
          {contacts.map(contact => (
            <button key={contact.id} className={styles.contact}>
              <div className={styles.contactAvatar}>
                <img src={contact.avatar || "/placeholder.svg"} alt={contact.firstName} />
                <span className={styles.onlineIndicator} />
              </div>
              <span className={styles.contactName}>
                {contact.firstName} {contact.lastName}
              </span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}
