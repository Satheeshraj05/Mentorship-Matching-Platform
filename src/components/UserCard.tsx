import React from 'react'
import Link from 'next/link'


interface UserCardProps {
    user: {
        id: string
        name: string
        role: string
        skills: string[]
        interests: string[]
        bio: string
    }
}


const UserCard: React.FC<UserCardProps> = ({ user }) => {
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{user.name}</h2>
                <p className="text-sm text-gray-600 mb-4">{user.role}</p>
                <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Skills:</h3>
                    <div className="flex flex-wrap gap-2">
                        {user.skills.map((skill, index) => (
                            <span
                                key={index}
                                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Interests:</h3>
                    <div className="flex flex-wrap gap-2">
                        {user.interests.map((interest, index) => (
                            <span
                                key={index}
                                className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full"
                            >
                                {interest}
                            </span>
                        ))}
                    </div>
                </div>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">{user.bio}</p>
            </div>
            <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
                <Link
                    href={`/user/${user.id}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                    View Full Profile
                </Link>
            </div>
        </div>
    )
}

export default UserCard

