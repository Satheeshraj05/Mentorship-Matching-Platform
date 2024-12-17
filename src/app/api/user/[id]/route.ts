import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { authenticateToken } from '@/lib/auth'
import { ObjectId } from 'mongodb'
import { User } from '@/lib/types'

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const resolvedParams = await params; // Ensure params is a resolved promise here
        const { id } = resolvedParams;

        // Continue with your logic, now `id` is properly extracted
        const user = await authenticateToken(request);
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const db = await getDatabase();
        const profile = await db.collection<User>('users').findOne(
            { _id: new ObjectId(id) },
            { projection: { password: 0, email: 0 } }
        );

        if (!profile) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(profile);
    } catch (error) {
        console.error('Get user profile error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

