"use client"

import { useData } from '@/context/DataContext'
import CreatePost from './CreatePost'
import PostCard from './PostCard'
import styles from './Feed.module.css'

export default function Feed() {
  const { posts } = useData()

  return (
    <main className={styles.feed}>
      <CreatePost />
      
      <div className={styles.posts}>
        {posts.length === 0 ? (
          <div className={styles.empty}>
            <p>No hay publicaciones aun. Se el primero en compartir algo!</p>
          </div>
        ) : (
          posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))
        )}
      </div>
    </main>
  )
}
