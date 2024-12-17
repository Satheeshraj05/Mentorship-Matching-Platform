import React from 'react'
import { User } from '@/lib/types'

async function getUser(id: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/${id}`, {
        cache: 'no-store'
    })
    if (!res.ok) {
        throw new Error('Failed to fetch user')
    }
    return res.json()
}

export default async function UserProfile({ params }: { params: Promise<{ id: string }> }) {
    // Ensure that params is resolved if it is a Promise
    const resolvedParams = await params;

    const user: User = await getUser(resolvedParams.id)

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">{user.name}s Profile</h1>

            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <p><strong>Role:</strong> {user.role || 'Not set'}</p>
                <p><strong>Skills:</strong> {user.skills.join(', ') || 'None added'}</p>
                <p><strong>Interests:</strong> {user.interests.join(', ') || 'None added'}</p>
                <p><strong>Bio:</strong> {user.bio || 'No bio added'}</p>
            </div>

            <button
                onClick={() => window.history.back()}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Back to Matches
            </button>
        </div>
    )
}
