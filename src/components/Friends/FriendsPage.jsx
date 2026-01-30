"use client"

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useData } from '@/context/DataContext'
import styles from './FriendsPage.module.css'

export default function FriendsPage() {
  const { user } = useAuth()
  const { allUsers, sendFriendRequest } = useData()
  const [activeTab, setActiveTab] = useState('suggestions')
  const [sentRequests, setSentRequests] = useState([])

  const suggestions = allUsers.filter(u => 
    u.id !== user?.id && 
    !user?.friends?.includes(u.id) &&
    !sentRequests.includes(u.id)
  )

  const friends = allUsers.filter(u => user?.friends?.includes(u.id))

  const handleSendRequest = (userId) => {
    sendFriendRequest(userId)
    setSentRequests([...sentRequests, userId])
  }

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <h1>Amigos</h1>
        <nav className={styles.nav}>
          <button
            className={`${styles.navItem} ${activeTab === 'suggestions' ? styles.active : ''}`}
            onClick={() => setActiveTab('suggestions')}
          >
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            <span>Sugerencias</span>
          </button>
          <button
            className={`${styles.navItem} ${activeTab === 'friends' ? styles.active : ''}`}
            onClick={() => setActiveTab('friends')}
          >
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M12 6a4 4 0 110 8 4 4 0 010-8zm6 0a3 3 0 110 6 3 3 0 010-6zM6 8a3 3 0 110 6 3 3 0 010-6zm6 8c3.315 0 6 1.79 6 4v2H6v-2c0-2.21 2.685-4 6-4z"/>
            </svg>
            <span>Todos los amigos</span>
          </button>
        </nav>
      </aside>

      <main className={styles.main}>
        {activeTab === 'suggestions' && (
          <>
            <h2>Personas que quizas conozcas</h2>
            <div className={styles.grid}>
              {suggestions.length === 0 ? (
                <p className={styles.empty}>No hay sugerencias disponibles</p>
              ) : (
                suggestions.map(person => (
                  <div key={person.id} className={styles.card}>
                    <img
                      src={person.avatar || "/placeholder.svg"}
                      alt={person.firstName}
                      className={styles.cardImage}
                    />
                    <div className={styles.cardContent}>
                      <h3>{person.firstName} {person.lastName}</h3>
                      <p className={styles.mutualFriends}>
                        {Math.floor(Math.random() * 5)} amigos en comun
                      </p>
                      <button
                        className={styles.addButton}
                        onClick={() => handleSendRequest(person.id)}
                      >
                        Agregar
                      </button>
                      <button className={styles.removeButton}>
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {activeTab === 'friends' && (
          <>
            <h2>Todos los amigos ({friends.length})</h2>
            <div className={styles.friendsList}>
              {friends.length === 0 ? (
                <p className={styles.empty}>Todavia no tienes amigos</p>
              ) : (
                friends.map(friend => (
                  <div key={friend.id} className={styles.friendItem}>
                    <img src={friend.avatar || "/placeholder.svg"} alt={friend.firstName} />
                    <div className={styles.friendInfo}>
                      <h3>{friend.firstName} {friend.lastName}</h3>
                      <p>{friend.bio || 'Sin biografia'}</p>
                    </div>
                    <button className={styles.messageButton}>
                      <svg viewBox="0 0 24 24" width="20" height="20">
                        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 2.98.97 4.29L2 22l5.71-.97C9.02 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.29 0-2.52-.3-3.61-.84l-.25-.14-3.57.61.6-3.57-.14-.25A7.926 7.926 0 014 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z"/>
                      </svg>
                      Mensaje
                    </button>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </main>
    </div>
  )
}
