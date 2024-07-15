import React from 'react'
import ProfileHeader from '../components/ProfileHeader'
export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <div>
            <ProfileHeader />
          {children}
        </div>
    )
  }
