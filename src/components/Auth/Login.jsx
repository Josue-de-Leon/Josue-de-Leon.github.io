"use client"

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import styles from './Login.module.css'

export default function Login({ onSwitchToRegister }) {
  const { login } = useAuth()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = login(formData.email, formData.password)
    
    if (!result.success) {
      setError(result.error)
    }
    setLoading(false)
  }

  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <h1 className={styles.logo}>facebook</h1>
        <p className={styles.tagline}>
          Facebook te ayuda a comunicarte y compartir con las personas que forman parte de tu vida.
        </p>
      </div>

      <div className={styles.rightSection}>
        <form className={styles.form} onSubmit={handleSubmit}>
          {error && <div className={styles.error}>{error}</div>}
          
          {/* <div className={styles.demoHint}>
            <strong>Cuenta Demo:</strong><br />
            Email: demo@facebook.com<br />
            Password: 123456
          </div> */}
          
          <input
            type="email"
            placeholder="Correo electronico"
            className={styles.input}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          
          <input
            type="password"
            placeholder="Contrasena"
            className={styles.input}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          
          <button type="submit" className={styles.loginButton} disabled={loading}>
            {loading ? 'Iniciando...' : 'Iniciar sesion'}
          </button>

          <a href="#" className={styles.forgotPassword}>
            Olvidaste tu contrasena?
          </a>

          <div className={styles.divider} />

          <button
            type="button"
            className={styles.createButton}
            onClick={onSwitchToRegister}
          >
            Crear cuenta nueva
          </button>
        </form>
      </div>
    </div>
  )
}
