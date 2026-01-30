"use client"

import { useState } from 'react'
import Header from '@/components/Header/Header'
import Sidebar from '@/components/Sidebar/Sidebar'
import RightSidebar from '@/components/Sidebar/RightSidebar'
import Feed from '@/components/Feed/Feed'
import Profile from '@/components/Profile/Profile'
import NotificationsPage from '@/components/Notifications/NotificationsPage'
import FriendsPage from '@/components/Friends/FriendsPage'
import styles from './MainApp.module.css'

export default function MainApp() {
  const [currentPage, setCurrentPage] = useState('home')

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div className={styles.homeLayout}>
            <Sidebar setCurrentPage={setCurrentPage} />
            <Feed />
            <RightSidebar />
          </div>
        )
      case 'profile':
        return (
          <div className={styles.profileLayout}>
            <Profile />
          </div>
        )
      case 'notifications':
        return (
          <div className={styles.pageLayout}>
            <NotificationsPage />
          </div>
        )
      case 'friends':
        return <FriendsPage />
      default:
        return (
          <div className={styles.homeLayout}>
            <Sidebar setCurrentPage={setCurrentPage} />
            <Feed />
            <RightSidebar />
          </div>
        )
    }
  }

  return (
    <div className={styles.app}>
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className={styles.main}>
        {renderPage()}
      </main>
    </div>
  )
}
