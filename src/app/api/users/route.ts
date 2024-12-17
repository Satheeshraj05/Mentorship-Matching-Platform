import { NextResponse, NextRequest } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { authenticateToken } from '@/lib/auth'

interface UserQuery {
    role?: string;
    skills?: { $in: string[] };
    interests?: { $in: string[] };
}

export async function GET(request: NextRequest) {
    try {
        const user = await authenticateToken(request)
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { searchParams } = new URL(request.url)
        const role = searchParams.get('role')
        const skills = searchParams.get('skills')
        const interests = searchParams.get('interests')

        const db = await getDatabase()

        const query: UserQuery = {}

        if (role) query.role = role
        if (skills) query.skills = { $in: skills.split(',').map(s => s.trim()) }
        if (interests) query.interests = { $in: interests.split(',').map(s => s.trim()) }

        const users = await db.collection('users')
            .find(query, { projection: { password: 0 } })
            .limit(20)
            .toArray()

        return NextResponse.json(users)
    } catch (error) {
        console.error('Get users error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
