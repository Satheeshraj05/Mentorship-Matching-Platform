'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function MentorshipRequest({ mentorId }: { mentorId: string }) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleRequest = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const token = localStorage.getItem('token')
      if (!token) {
        router.push('/login')
        return
      }

      const response = await fetch('/api/mentorship', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ mentorId })
      })

      if (response.ok) {
        // You don't need the `data` variable if you're not using it
        alert('Mentorship request sent successfully!')
        // You might want to update the UI or redirect the user
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Failed to send mentorship request')
      }
    } catch (error) {
      console.error('Error sending mentorship request:', error)
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <button
        onClick={handleRequest}
        disabled={isLoading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
      >
        {isLoading ? 'Sending Request...' : 'Request Mentorship'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  )
}
