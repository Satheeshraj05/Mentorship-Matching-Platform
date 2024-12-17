'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import MatchCard from '@/components/MatchCard'
import { MatchWithScore } from '@/lib/types'

export default function Matches() {
  const [matches, setMatches] = useState<MatchWithScore[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchMatches = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          router.push('/login')
          return
        }

        const response = await fetch('/api/matches', {
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
          setMatches(data)
        } else {
          setError('Failed to fetch matches')
        }
      } catch (error) {
        console.error('Error fetching matches:', error)
        setError('An unexpected error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchMatches()
  }, [router])

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Matches</h1>
      {matches.length === 0 ? (
        <p className="text-center">No matches found. Try updating your profile to find more matches!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((match) => (
            <MatchCard key={match._id.toString()} match={match} />
          ))}
        </div>
      )}
    </div>
  )
}

