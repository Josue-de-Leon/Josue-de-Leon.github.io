"use client"

import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

const DataContext = createContext(null)

const initialPosts = [
  {
    id: '1',
    userId: 'demo1',
    userName: 'Maria Garcia',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    content: 'Hoy es un dia increible para compartir con amigos y familia. La vida es hermosa cuando la disfrutamos con las personas que amamos.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600',
    likes: ['demo2', 'demo3'],
    comments: [
      { id: 'c1', userId: 'demo2', userName: 'Carlos Lopez', content: 'Totalmente de acuerdo!', createdAt: new Date(Date.now() - 3600000).toISOString() }
    ],
    createdAt: new Date(Date.now() - 7200000).toISOString()
  },
  {
    id: '2',
    userId: 'demo2',
    userName: 'Carlos Lopez',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
    content: 'Acabo de terminar mi nuevo proyecto de programacion. Meses de trabajo duro pero valio la pena!',
    image: null,
    likes: ['demo1'],
    comments: [],
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: '3',
    userId: 'demo3',
    userName: 'Ana Martinez',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
    content: 'Las mejores vistas desde la montana. Nada como desconectarse de la rutina.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600',
    likes: ['demo1', 'demo2'],
    comments: [
      { id: 'c2', userId: 'demo1', userName: 'Maria Garcia', content: 'Que hermoso lugar!', createdAt: new Date(Date.now() - 1800000).toISOString() }
    ],
    createdAt: new Date(Date.now() - 172800000).toISOString()
  }
]

const demoUsers = [
  { id: 'demo1', firstName: 'Maria', lastName: 'Garcia', email: 'maria@demo.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria', bio: 'Amante de la vida y la naturaleza', friends: ['demo2', 'demo3'] },
  { id: 'demo2', firstName: 'Carlos', lastName: 'Lopez', email: 'carlos@demo.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos', bio: 'Desarrollador web apasionado', friends: ['demo1'] },
  { id: 'demo3', firstName: 'Ana', lastName: 'Martinez', email: 'ana@demo.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana', bio: 'Fotografa y viajera', friends: ['demo1'] }
]

export function DataProvider({ children }) {
  const { user } = useAuth()
  const [posts, setPosts] = useState([])
  const [notifications, setNotifications] = useState([])
  const [allUsers, setAllUsers] = useState([])

  useEffect(() => {
    const storedPosts = localStorage.getItem('fb_posts')
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts))
    } else {
      setPosts(initialPosts)
      localStorage.setItem('fb_posts', JSON.stringify(initialPosts))
    }

    const storedNotifications = localStorage.getItem('fb_notifications')
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications))
    }

    const storedUsers = JSON.parse(localStorage.getItem('fb_users') || '[]')
    const allUsersData = [...demoUsers, ...storedUsers.map(u => ({ ...u, password: undefined }))]
    setAllUsers(allUsersData)
  }, [user])

  const createPost = (content, image = null) => {
    if (!user) return

    const newPost = {
      id: Date.now().toString(),
      userId: user.id,
      userName: `${user.firstName} ${user.lastName}`,
      userAvatar: user.avatar,
      content,
      image,
      likes: [],
      comments: [],
      createdAt: new Date().toISOString()
    }

    const updatedPosts = [newPost, ...posts]
    setPosts(updatedPosts)
    localStorage.setItem('fb_posts', JSON.stringify(updatedPosts))
  }

  const likePost = (postId) => {
    if (!user) return

    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const hasLiked = post.likes.includes(user.id)
        return {
          ...post,
          likes: hasLiked 
            ? post.likes.filter(id => id !== user.id)
            : [...post.likes, user.id]
        }
      }
      return post
    })

    setPosts(updatedPosts)
    localStorage.setItem('fb_posts', JSON.stringify(updatedPosts))

    const post = posts.find(p => p.id === postId)
    if (post && post.userId !== user.id && !post.likes.includes(user.id)) {
      addNotification(post.userId, 'like', `${user.firstName} ${user.lastName} le dio me gusta a tu publicacion`)
    }
  }

  const addComment = (postId, content) => {
    if (!user) return

    const newComment = {
      id: Date.now().toString(),
      userId: user.id,
      userName: `${user.firstName} ${user.lastName}`,
      content,
      createdAt: new Date().toISOString()
    }

    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return { ...post, comments: [...post.comments, newComment] }
      }
      return post
    })

    setPosts(updatedPosts)
    localStorage.setItem('fb_posts', JSON.stringify(updatedPosts))

    const post = posts.find(p => p.id === postId)
    if (post && post.userId !== user.id) {
      addNotification(post.userId, 'comment', `${user.firstName} ${user.lastName} comento en tu publicacion`)
    }
  }

  const addNotification = (toUserId, type, message) => {
    const newNotification = {
      id: Date.now().toString(),
      toUserId,
      type,
      message,
      read: false,
      createdAt: new Date().toISOString()
    }

    const updatedNotifications = [newNotification, ...notifications]
    setNotifications(updatedNotifications)
    localStorage.setItem('fb_notifications', JSON.stringify(updatedNotifications))
  }

  const markNotificationAsRead = (notificationId) => {
    const updatedNotifications = notifications.map(n =>
      n.id === notificationId ? { ...n, read: true } : n
    )
    setNotifications(updatedNotifications)
    localStorage.setItem('fb_notifications', JSON.stringify(updatedNotifications))
  }

  const markAllNotificationsAsRead = () => {
    const updatedNotifications = notifications.map(n => ({ ...n, read: true }))
    setNotifications(updatedNotifications)
    localStorage.setItem('fb_notifications', JSON.stringify(updatedNotifications))
  }

  const getUserNotifications = () => {
    if (!user) return []
    return notifications.filter(n => n.toUserId === user.id)
  }

  const sendFriendRequest = (toUserId) => {
    if (!user) return

    addNotification(toUserId, 'friend_request', `${user.firstName} ${user.lastName} te envio una solicitud de amistad`)
  }

  const getUserById = (userId) => {
    return allUsers.find(u => u.id === userId)
  }

  const deletePost = (postId) => {
    const updatedPosts = posts.filter(p => p.id !== postId)
    setPosts(updatedPosts)
    localStorage.setItem('fb_posts', JSON.stringify(updatedPosts))
  }

  return (
    <DataContext.Provider value={{
      posts,
      notifications: getUserNotifications(),
      allUsers,
      createPost,
      likePost,
      addComment,
      deletePost,
      markNotificationAsRead,
      markAllNotificationsAsRead,
      sendFriendRequest,
      getUserById
    }}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}
