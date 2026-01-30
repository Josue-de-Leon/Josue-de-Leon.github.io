"use client"

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import styles from './Register.module.css'

export default function Register({ onSwitchToLogin }) {
  const { register } = useAuth()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    birthDay: '1',
    birthMonth: '1',
    birthYear: '2000',
    gender: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (formData.password.length < 6) {
      setError('La contrasena debe tener al menos 6 caracteres')
      setLoading(false)
      return
    }

    const result = register(formData)
    
    if (!result.success) {
      setError(result.error)
    }
    setLoading(false)
  }

  const days = Array.from({ length: 31 }, (_, i) => i + 1)
  const months = [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
  ]
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i)

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>Registrate</h2>
            <p className={styles.subtitle}>Es rapido y facil.</p>
          </div>
          <button className={styles.closeButton} onClick={onSwitchToLogin}>
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className={styles.divider} />

        <form className={styles.form} onSubmit={handleSubmit}>
          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.row}>
            <input
              type="text"
              placeholder="Nombre"
              className={styles.input}
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Apellido"
              className={styles.input}
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              required
            />
          </div>

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
            placeholder="Contrasena nueva"
            className={styles.input}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Fecha de nacimiento</label>
            <div className={styles.dateRow}>
              <select
                className={styles.select}
                value={formData.birthDay}
                onChange={(e) => setFormData({ ...formData, birthDay: e.target.value })}
              >
                {days.map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
              <select
                className={styles.select}
                value={formData.birthMonth}
                onChange={(e) => setFormData({ ...formData, birthMonth: e.target.value })}
              >
                {months.map((month, i) => (
                  <option key={month} value={i + 1}>{month}</option>
                ))}
              </select>
              <select
                className={styles.select}
                value={formData.birthYear}
                onChange={(e) => setFormData({ ...formData, birthYear: e.target.value })}
              >
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Genero</label>
            <div className={styles.genderRow}>
              <label className={styles.genderOption}>
                <span>Mujer</span>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === 'female'}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                />
              </label>
              <label className={styles.genderOption}>
                <span>Hombre</span>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === 'male'}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                />
              </label>
              <label className={styles.genderOption}>
                <span>Otro</span>
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  checked={formData.gender === 'other'}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                />
              </label>
            </div>
          </div>

          <p className={styles.terms}>
            Al hacer clic en Registrarte, aceptas nuestras Condiciones, la Politica de privacidad y la Politica de cookies.
          </p>

          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? 'Registrando...' : 'Registrarte'}
          </button>

          <button type="button" className={styles.loginLink} onClick={onSwitchToLogin}>
            Ya tienes una cuenta?
          </button>
        </form>
      </div>
    </div>
  )
}
