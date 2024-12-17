'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { User } from '@/lib/types'

export default function Dashboard() {
  const [profile, setProfile] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          router.push('/login')
          return
        }

        const response = await fetch('/api/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (response.status === 401) {
          localStorage.removeItem('token')
          router.push('/login')
          return
        }

        if (response.ok) {
          const data = await response.json()
          setProfile(data)
        } else {
          console.error('Failed to fetch profile')
        }
      } catch (error) {
        console.error('Error fetching profile:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [router])

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-black">Loading...</div>
  }

  if (!profile) {
    return <div className="flex justify-center items-center h-screen text-black">Error loading profile</div>
  }

  return (
    <div className="max-w-4xl mx-auto p-4 text-black">
      <h1 className="text-3xl font-bold mb-6">Welcome, {profile.name}!</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Your Profile</h2>
        <p><strong>Role:</strong> {profile.role || 'Not set'}</p>
        <p><strong>Skills:</strong> {profile.skills.join(', ') || 'None added'}</p>
        <p><strong>Interests:</strong> {profile.interests.join(', ') || 'None added'}</p>
        <p><strong>Bio:</strong> {profile.bio || 'No bio added'}</p>
        <Link href="/profile" className="text-blue-600 hover:underline mt-4 inline-block">
          Edit Profile
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Find Matches</h2>
          <p className="mb-4">Discover potential mentors or mentees based on your profile.</p>
          <Link href="/matches" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            View Matches
          </Link>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Discover Users</h2>
          <p className="mb-4">Browse through other users and find potential connections.</p>
          <Link href="/discover" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Discover Users
          </Link>
        </div>
      </div>
    </div>
  )
}
