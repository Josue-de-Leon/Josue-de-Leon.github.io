"use client"

import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Crear usuario demo si no existe
    const users = JSON.parse(localStorage.getItem('fb_users') || '[]')
    const demoExists = users.find(u => u.email === 'demo@facebook.com')
    
    if (!demoExists) {
      const demoUser = {
        id: 'demo-user-1',
        email: 'demo@facebook.com',
        password: '123456',
        firstName: 'Usuario',
        lastName: 'Demo',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Demo',
        coverPhoto: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800',
        bio: 'Bienvenido a Facebook Clone!',
        friends: ['user-2', 'user-3'],
        friendRequests: [],
        createdAt: new Date().toISOString()
      }
      users.push(demoUser)
      localStorage.setItem('fb_users', JSON.stringify(users))
    }

    const storedUser = localStorage.getItem('fb_user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('fb_users') || '[]')
    let foundUser = users.find(u => u.email === email)
    
    // Si el usuario no existe, crearlo automaticamente
    if (!foundUser) {
      const namePart = email.split('@')[0]
      const firstName = namePart.charAt(0).toUpperCase() + namePart.slice(1)
      
      foundUser = {
        id: Date.now().toString(),
        email: email,
        password: password,
        firstName: firstName,
        lastName: 'Usuario',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${firstName}`,
        coverPhoto: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800',
        bio: '',
        friends: [],
        friendRequests: [],
        createdAt: new Date().toISOString()
      }
      users.push(foundUser)
      localStorage.setItem('fb_users', JSON.stringify(users))
    }
    
    const { password: _, ...userWithoutPassword } = foundUser
    setUser(userWithoutPassword)
    localStorage.setItem('fb_user', JSON.stringify(userWithoutPassword))
    return { success: true }
  }

  const register = (userData) => {
    const users = JSON.parse(localStorage.getItem('fb_users') || '[]')
    
    if (users.find(u => u.email === userData.email)) {
      return { success: false, error: 'El email ya esta registrado' }
    }

    const newUser = {
      id: Date.now().toString(),
      ...userData,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.firstName}`,
      coverPhoto: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800',
      bio: '',
      friends: [],
      friendRequests: [],
      createdAt: new Date().toISOString()
    }

    users.push(newUser)
    localStorage.setItem('fb_users', JSON.stringify(users))
    
    const { password: _, ...userWithoutPassword } = newUser
    setUser(userWithoutPassword)
    localStorage.setItem('fb_user', JSON.stringify(userWithoutPassword))
    
    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('fb_user')
  }

  const updateUser = (updatedData) => {
    const users = JSON.parse(localStorage.getItem('fb_users') || '[]')
    const userIndex = users.findIndex(u => u.id === user.id)
    
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updatedData }
      localStorage.setItem('fb_users', JSON.stringify(users))
      
      const { password: _, ...userWithoutPassword } = users[userIndex]
      setUser(userWithoutPassword)
      localStorage.setItem('fb_user', JSON.stringify(userWithoutPassword))
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
