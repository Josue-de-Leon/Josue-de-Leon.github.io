"use client"

import { AuthProvider } from '@/context/AuthContext'
import { DataProvider } from '@/context/DataContext'
import AuthWrapper from '@/components/App/AuthWrapper'

export default function Home() {
  return (
    <AuthProvider>
      <DataProvider>
        <AuthWrapper />
      </DataProvider>
    </AuthProvider>
  )
}
