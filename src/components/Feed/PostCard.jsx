"use client"

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useData } from '@/context/DataContext'
import styles from './PostCard.module.css'

export default function PostCard({ post }) {
  const { user } = useAuth()
  const { likePost, addComment, deletePost } = useData()
  const [showComments, setShowComments] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [showMenu, setShowMenu] = useState(false)

  const hasLiked = post.likes.includes(user?.id)
  const isOwner = post.userId === user?.id

  const handleLike = () => {
    likePost(post.id)
  }

  const handleComment = (e) => {
    e.preventDefault()
    if (!commentText.trim()) return
    addComment(post.id, commentText)
    setCommentText('')
  }

  const handleDelete = () => {
    if (confirm('Estas seguro de que quieres eliminar esta publicacion?')) {
      deletePost(post.id)
    }
    setShowMenu(false)
  }

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
    <article className={styles.card}>
      <header className={styles.header}>
        <img src={post.userAvatar || "/placeholder.svg"} alt="" className={styles.avatar} />
        <div className={styles.headerInfo}>
          <h3 className={styles.userName}>{post.userName}</h3>
          <span className={styles.time}>{formatTime(post.createdAt)}</span>
        </div>
        {isOwner && (
          <div className={styles.menuContainer}>
            <button
              className={styles.menuButton}
              onClick={() => setShowMenu(!showMenu)}
            >
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
              </svg>
            </button>
            {showMenu && (
              <div className={styles.menu}>
                <button onClick={handleDelete}>Eliminar publicacion</button>
              </div>
            )}
          </div>
        )}
      </header>

      <div className={styles.content}>
        <p className={styles.text}>{post.content}</p>
        {post.image && (
          <img src={post.image || "/placeholder.svg"} alt="" className={styles.image} />
        )}
      </div>

      <div className={styles.stats}>
        {post.likes.length > 0 && (
          <span className={styles.likesCount}>
            <span className={styles.likeIcon}>👍</span>
            {post.likes.length}
          </span>
        )}
        {post.comments.length > 0 && (
          <button
            className={styles.commentsCount}
            onClick={() => setShowComments(!showComments)}
          >
            {post.comments.length} comentarios
          </button>
        )}
      </div>

      <div className={styles.divider} />

      <div className={styles.actions}>
        <button
          className={`${styles.actionButton} ${hasLiked ? styles.liked : ''}`}
          onClick={handleLike}
        >
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path fill="currentColor" d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/>
          </svg>
          <span>Me gusta</span>
        </button>
        <button
          className={styles.actionButton}
          onClick={() => setShowComments(!showComments)}
        >
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path fill="currentColor" d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z"/>
          </svg>
          <span>Comentar</span>
        </button>
        <button className={styles.actionButton}>
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path fill="currentColor" d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
          </svg>
          <span>Compartir</span>
        </button>
      </div>

      {showComments && (
        <div className={styles.commentsSection}>
          <div className={styles.divider} />
          
          <form onSubmit={handleComment} className={styles.commentForm}>
            <img src={user?.avatar || "/placeholder.svg"} alt="" className={styles.commentAvatar} />
            <input
              type="text"
              placeholder="Escribe un comentario..."
              className={styles.commentInput}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
          </form>

          <div className={styles.commentsList}>
            {post.comments.map(comment => (
              <div key={comment.id} className={styles.comment}>
                <div className={styles.commentBubble}>
                  <span className={styles.commentAuthor}>{comment.userName}</span>
                  <p className={styles.commentText}>{comment.content}</p>
                </div>
                <span className={styles.commentTime}>{formatTime(comment.createdAt)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}
