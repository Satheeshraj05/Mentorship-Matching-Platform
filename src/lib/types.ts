import { ObjectId } from 'mongodb'

export interface User {
    _id: ObjectId
    name: string
    email: string
    role: string
    skills: string[]
    interests: string[]
    bio: string
}

export interface MatchWithScore extends User {
    matchScore: number
}

export interface Mentorship {
    _id: ObjectId
    mentorId: ObjectId
    menteeId: ObjectId
    status: 'pending' | 'accepted' | 'rejected'
    createdAt: Date
}

