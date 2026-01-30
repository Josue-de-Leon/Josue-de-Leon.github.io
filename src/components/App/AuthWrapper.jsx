"use client"

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import Login from '@/components/Auth/Login'
import Register from '@/components/Auth/Register'
import MainApp from './MainApp'

export default function AuthWrapper() {
  const { user, loading } = useAuth()
  const [showRegister, setShowRegister] = useState(false)

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f0f2f5'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid #e4e6eb',
          borderTopColor: '#1877f2',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }

  if (!user) {
    return (
      <>
        <Login onSwitchToRegister={() => setShowRegister(true)} />
        {showRegister && (
          <Register onSwitchToLogin={() => setShowRegister(false)} />
        )}
      </>
    )
  }

  return <MainApp />
}
