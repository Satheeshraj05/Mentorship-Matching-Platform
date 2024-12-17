import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { authenticateToken } from '@/lib/auth'
import { ObjectId } from 'mongodb'
import { findMatches } from '@/lib/matchingAlgorithm'
import { User, MatchWithScore } from '@/lib/types'

export async function GET(request: NextRequest) {
  try {
    const user = await authenticateToken(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const db = await getDatabase()

    const currentUser = await db.collection<User>('users').findOne(
      { _id: new ObjectId(user.userId) },
      { projection: { password: 0 } }
    )

    if (!currentUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const allUsers = await db.collection<User>('users').find(
      {},
      { projection: { password: 0 } }
    ).toArray()

    const matches = findMatches(currentUser, allUsers)

    return NextResponse.json(matches.slice(0, 10) as MatchWithScore[]) // Return top 10 matches
  } catch (error) {
    console.error('Get matches error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

