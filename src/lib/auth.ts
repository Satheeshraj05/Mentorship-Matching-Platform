import { NextRequest } from 'next/server'  // Remove NextResponse import as it's unused
import jwt from 'jsonwebtoken'

export async function authenticateToken(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return null

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string }
    return user
  } catch (error) {
    console.error('Token verification error:', error)
    return null
  }
}
