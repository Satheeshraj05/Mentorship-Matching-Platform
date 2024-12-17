import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { getDatabase } from '@/lib/mongodb'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ error: 'Missing email or password' }, { status: 400 })
    }

    const db = await getDatabase()

    // Find user
    const user = await db.collection('users').findOne({ email })
    if (!user) {
      console.log('User not found:', email)
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      console.log('Password mismatch for user:', email)
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // Generate JWT
    const token = jwt.sign({ userId: user._id.toString() }, process.env.JWT_SECRET as string, {
      expiresIn: '1d',
    })

    console.log('Login successful for user:', email)
    return NextResponse.json({ token })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

