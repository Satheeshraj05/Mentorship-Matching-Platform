import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { authenticateToken } from '@/lib/auth'
import { ObjectId } from 'mongodb'

export async function GET(request: NextRequest) {
  try {
    const user = await authenticateToken(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const db = await getDatabase()
    const mentorships = await db.collection('mentorships').find({ $or: [{ mentorId: user.userId }, { menteeId: user.userId }] }).toArray()

    return NextResponse.json(mentorships)
  } catch (error) {
    console.error('Get mentorships error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await authenticateToken(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { mentorId, menteeId } = await request.json()
    
    const db = await getDatabase()
    const result = await db.collection('mentorships').insertOne({
      mentorId: new ObjectId(mentorId),
      menteeId: new ObjectId(menteeId),
      status: 'pending',
      createdAt: new Date()
    })

    return NextResponse.json({ message: 'Mentorship request sent', mentorshipId: result.insertedId })
  } catch (error) {
    console.error('Create mentorship error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

