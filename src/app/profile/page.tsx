'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Profile {
    role: string
    skills: string[]
    interests: string[]
    bio: string
}

export default function Profile() {
    const [profile, setProfile] = useState<Profile>({
        role: '',
        skills: [],
        interests: [],
        bio: '',
    })
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    useEffect(() => {
        const fetchProfile = async () => {
            setIsLoading(true)
            setError(null)
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
                    setError('Failed to fetch profile')
                }
            } catch (error) {
                console.error('Error fetching profile:', error)
                setError('An unexpected error occurred')
            } finally {
                setIsLoading(false)
            }
        }

        fetchProfile()
    }, [router])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        try {
            const token = localStorage.getItem('token')
            if (!token) {
                router.push('/login')
                return
            }

            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(profile),
            })

            if (response.status === 401) {
                localStorage.removeItem('token')
                router.push('/login')
                return
            }

            if (response.ok) {
                router.push('/dashboard')
            } else {
                const errorData = await response.json()
                setError(errorData.error || 'Failed to update profile')
            }
        } catch (error) {
            console.error('Error updating profile:', error)
            setError('An unexpected error occurred')
        }
    }

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen text-white">Loading...</div>
    }

    if (error) {
        return <div className="text-red-500 text-center">{error}</div>
    }

    return (
        <div className="max-w-md mx-auto mt-8 bg-black text-white p-6 rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="role" className="block mb-1">Role</label>
                    <select
                        id="role"
                        value={profile.role}
                        onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                        required
                        className="w-full px-3 py-2 border rounded bg-gray-800 text-white"
                    >
                        <option value="">Select a role</option>
                        <option value="mentor">Mentor</option>
                        <option value="mentee">Mentee</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="skills" className="block mb-1">Skills (comma-separated)</label>
                    <input
                        type="text"
                        id="skills"
                        value={profile.skills.join(', ')}
                        onChange={(e) => setProfile({ ...profile, skills: e.target.value.split(',').map(s => s.trim()) })}
                        className="w-full px-3 py-2 border rounded bg-gray-800 text-white"
                    />
                </div>
                <div>
                    <label htmlFor="interests" className="block mb-1">Interests (comma-separated)</label>
                    <input
                        type="text"
                        id="interests"
                        value={profile.interests.join(', ')}
                        onChange={(e) => setProfile({ ...profile, interests: e.target.value.split(',').map(s => s.trim()) })}
                        className="w-full px-3 py-2 border rounded bg-gray-800 text-white"
                    />
                </div>
                <div>
                    <label htmlFor="bio" className="block mb-1">Bio</label>
                    <textarea
                        id="bio"
                        value={profile.bio}
                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                        className="w-full px-3 py-2 border rounded bg-gray-800 text-white"
                        rows={4}
                    ></textarea>
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    Save Profile
                </button>
            </form>
        </div>
    )
}
