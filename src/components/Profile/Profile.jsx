"use client"

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useData } from '@/context/DataContext'
import PostCard from '@/components/Feed/PostCard'
import styles from './Profile.module.css'

export default function Profile({ userId = null }) {
  const { user, updateUser } = useAuth()
  const { posts, allUsers } = useData()
  const [activeTab, setActiveTab] = useState('posts')
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    bio: user?.bio || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || ''
  })

  const profileUser = userId ? allUsers.find(u => u.id === userId) : user
  const isOwnProfile = !userId || userId === user?.id
  const userPosts = posts.filter(p => p.userId === (profileUser?.id || user?.id))

  const handleSave = () => {
    updateUser(editData)
    setIsEditing(false)
  }

  if (!profileUser) {
    return <div className={styles.notFound}>Usuario no encontrado</div>
  }

  return (
    <div className={styles.container}>
      <div className={styles.coverSection}>
        <img
          src={profileUser.coverPhoto || 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800'}
          alt="Cover"
          className={styles.coverPhoto}
        />
        <div className={styles.profileInfo}>
          <img
            src={profileUser.avatar || "/placeholder.svg"}
            alt={profileUser.firstName}
            className={styles.avatar}
          />
          <div className={styles.nameSection}>
            {isEditing ? (
              <div className={styles.editName}>
                <input
                  type="text"
                  value={editData.firstName}
                  onChange={(e) => setEditData({ ...editData, firstName: e.target.value })}
                  className={styles.editInput}
                  placeholder="Nombre"
                />
                <input
                  type="text"
                  value={editData.lastName}
                  onChange={(e) => setEditData({ ...editData, lastName: e.target.value })}
                  className={styles.editInput}
                  placeholder="Apellido"
                />
              </div>
            ) : (
              <h1 className={styles.name}>
                {profileUser.firstName} {profileUser.lastName}
              </h1>
            )}
            <p className={styles.friendCount}>
              {profileUser.friends?.length || 0} amigos
            </p>
          </div>
          {isOwnProfile && (
            <div className={styles.actions}>
              {isEditing ? (
                <>
                  <button className={styles.saveButton} onClick={handleSave}>
                    Guardar
                  </button>
                  <button
                    className={styles.cancelButton}
                    onClick={() => setIsEditing(false)}
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <button
                  className={styles.editButton}
                  onClick={() => setIsEditing(true)}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16">
                    <path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                  </svg>
                  Editar perfil
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'posts' ? styles.active : ''}`}
            onClick={() => setActiveTab('posts')}
          >
            Publicaciones
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'about' ? styles.active : ''}`}
            onClick={() => setActiveTab('about')}
          >
            Informacion
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'friends' ? styles.active : ''}`}
            onClick={() => setActiveTab('friends')}
          >
            Amigos
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'photos' ? styles.active : ''}`}
            onClick={() => setActiveTab('photos')}
          >
            Fotos
          </button>
        </div>

        <div className={styles.mainContent}>
          {activeTab === 'posts' && (
            <div className={styles.postsGrid}>
              <div className={styles.sidebar}>
                <div className={styles.infoCard}>
                  <h3>Presentacion</h3>
                  {isEditing ? (
                    <textarea
                      value={editData.bio}
                      onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                      className={styles.bioTextarea}
                      placeholder="Escribe algo sobre ti..."
                      rows={3}
                    />
                  ) : (
                    <p className={styles.bio}>
                      {profileUser.bio || 'Sin biografia'}
                    </p>
                  )}
                </div>
              </div>
              <div className={styles.postsColumn}>
                {userPosts.length === 0 ? (
                  <div className={styles.emptyPosts}>
                    <p>No hay publicaciones todavia</p>
                  </div>
                ) : (
                  userPosts.map(post => (
                    <PostCard key={post.id} post={post} />
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div className={styles.aboutSection}>
              <div className={styles.aboutCard}>
                <h3>Informacion general</h3>
                <div className={styles.infoItem}>
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path fill="#65676b" d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  <span>{profileUser.email}</span>
                </div>
                <div className={styles.infoItem}>
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path fill="#65676b" d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/>
                  </svg>
                  <span>Se unio en {new Date(profileUser.createdAt || Date.now()).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'friends' && (
            <div className={styles.friendsSection}>
              <div className={styles.friendsCard}>
                <h3>Amigos ({profileUser.friends?.length || 0})</h3>
                <div className={styles.friendsGrid}>
                  {(profileUser.friends || []).map(friendId => {
                    const friend = allUsers.find(u => u.id === friendId)
                    if (!friend) return null
                    return (
                      <div key={friendId} className={styles.friendItem}>
                        <img src={friend.avatar || "/placeholder.svg"} alt={friend.firstName} />
                        <span>{friend.firstName} {friend.lastName}</span>
                      </div>
                    )
                  })}
                  {(!profileUser.friends || profileUser.friends.length === 0) && (
                    <p className={styles.noFriends}>Sin amigos todavia</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'photos' && (
            <div className={styles.photosSection}>
              <div className={styles.photosCard}>
                <h3>Fotos</h3>
                <div className={styles.photosGrid}>
                  {userPosts
                    .filter(p => p.image)
                    .map(post => (
                      <img key={post.id} src={post.image || "/placeholder.svg"} alt="" className={styles.photo} />
                    ))}
                  {userPosts.filter(p => p.image).length === 0 && (
                    <p className={styles.noPhotos}>Sin fotos todavia</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
