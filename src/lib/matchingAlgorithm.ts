import { User } from './types'

export function findMatches(currentUser: User, users: User[]): UserWithScore[] {
  return users
    .filter((user) => user._id !== currentUser._id && user.role !== currentUser.role)
    .map((user) => ({
      ...user,
      matchScore: calculateMatchScore(currentUser, user),
    }))
    .sort((a, b) => b.matchScore - a.matchScore) // matchScore is explicitly typed
}

function calculateMatchScore(user1: User, user2: User): number {
  const skillsScore = calculateOverlap(user1.skills, user2.skills)
  const interestsScore = calculateOverlap(user1.interests, user2.interests)
  return (skillsScore + interestsScore) / 2
}

function calculateOverlap(arr1: string[], arr2: string[]): number {
  const set1 = new Set(arr1)
  const set2 = new Set(arr2)
  const intersection = new Set([...set1].filter((x) => set2.has(x)))
  const union = new Set([...set1, ...set2])
  return intersection.size / union.size
}

// Extend the User type to include matchScore
interface UserWithScore extends User {
  matchScore: number
}
