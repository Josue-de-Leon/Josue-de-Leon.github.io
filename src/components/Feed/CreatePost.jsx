"use client"

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useData } from '@/context/DataContext'
import styles from './CreatePost.module.css'

export default function CreatePost() {
  const { user } = useAuth()
  const { createPost } = useData()
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [showImageInput, setShowImageInput] = useState(false)
  const [isPosting, setIsPosting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!content.trim()) return

    setIsPosting(true)
    createPost(content, imageUrl || null)
    setContent('')
    setImageUrl('')
    setShowImageInput(false)
    setIsPosting(false)
  }

  return (
    <div className={styles.container}>
      <div className={styles.inputSection}>
        <img src={user?.avatar || "/placeholder.svg"} alt="" className={styles.avatar} />
        <button
          className={styles.inputButton}
          onClick={() => document.getElementById('postInput').focus()}
        >
          Que estas pensando, {user?.firstName}?
        </button>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <textarea
          id="postInput"
          className={styles.textarea}
          placeholder={`Que estas pensando, ${user?.firstName}?`}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={content ? 3 : 1}
        />

        {showImageInput && (
          <div className={styles.imageInputContainer}>
            <input
              type="url"
              placeholder="URL de la imagen"
              className={styles.imageInput}
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            {imageUrl && (
              <img src={imageUrl || "/placeholder.svg"} alt="Preview" className={styles.imagePreview} />
            )}
          </div>
        )}

        <div className={styles.divider} />

        <div className={styles.actions}>
          <div className={styles.mediaButtons}>
            <button type="button" className={styles.mediaButton}>
              <svg viewBox="0 0 24 24" width="24" height="24" fill="#f02849">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <span>Video en vivo</span>
            </button>
            <button
              type="button"
              className={styles.mediaButton}
              onClick={() => setShowImageInput(!showImageInput)}
            >
              <svg viewBox="0 0 24 24" width="24" height="24" fill="#45bd62">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
              </svg>
              <span>Foto/video</span>
            </button>
            <button type="button" className={styles.mediaButton}>
              <svg viewBox="0 0 24 24" width="24" height="24" fill="#f7b928">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <span>Sentimiento</span>
            </button>
          </div>

          {content.trim() && (
            <button type="submit" className={styles.postButton} disabled={isPosting}>
              {isPosting ? 'Publicando...' : 'Publicar'}
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
