'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import UserCard from '@/components/UserCard'

interface User {
    id: string
    name: string
    role: string
    skills: string[]
    interests: string[]
    bio: string
    _id?: string // Optional if the field is not always available
    email?: string // Optional if the field is not always available
}

export default function Discover() {
    const [users, setUsers] = useState<User[]>([])
    const [filters, setFilters] = useState({
        role: '',
        skills: '',
        interests: '',
    })
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true)
            try {
                const token = localStorage.getItem('token')
                if (!token) {
                    router.push('/login')
                    return
                }

                const queryParams = new URLSearchParams(filters)
                const response = await fetch(`/api/users?${queryParams}`, {
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
                    setUsers(data)
                } else {
                    console.error('Failed to fetch users')
                }
            } catch (error) {
                console.error('Error fetching users:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchUsers()
    }, [filters, router])

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Discover Users</h1>
            <div className="mb-6 flex flex-wrap gap-4">
                <select
                    value={filters.role}
                    onChange={(e) => setFilters({ ...filters, role: e.target.value })}
                    className="p-2 border rounded"
                >
                    <option value="">All Roles</option>
                    <option value="mentor">Mentors</option>
                    <option value="mentee">Mentees</option>
                </select>
                <input
                    type="text"
                    placeholder="Skills (comma-separated)"
                    value={filters.skills}
                    onChange={(e) => setFilters({ ...filters, skills: e.target.value })}
                    className="p-2 border rounded"
                />
                <input
                    type="text"
                    placeholder="Interests (comma-separated)"
                    value={filters.interests}
                    onChange={(e) => setFilters({ ...filters, interests: e.target.value })}
                    className="p-2 border rounded"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map((user, index) => (
                    // Ensure unique key: fallback to index if user.id is not unique
                    <UserCard key={user.id || index} user={user} />
                ))}
            </div>
        </div>
    )
}
