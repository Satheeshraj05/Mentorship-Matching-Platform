import Link from 'next/link'
import { MatchWithScore } from '@/lib/types'

interface MatchCardProps {
  match: MatchWithScore
}

const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  const matchPercentage = Math.round(match.matchScore * 100)

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{match.name}</h2>
        <p className="text-sm text-gray-600 mb-2">Role: {match.role}</p>
        <p className="text-sm text-gray-600 mb-2">Match: {matchPercentage}%</p>
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-1">Skills:</h3>
          <div className="flex flex-wrap gap-1">
            {match.skills.slice(0, 3).map((skill, index) => (
              <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                {skill}
              </span>
            ))}
            {match.skills.length > 3 && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                +{match.skills.length - 3} more
              </span>
            )}
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-1">Interests:</h3>
          <div className="flex flex-wrap gap-1">
            {match.interests.slice(0, 3).map((interest, index) => (
              <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                {interest}
              </span>
            ))}
            {match.interests.length > 3 && (
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                +{match.interests.length - 3} more
              </span>
            )}
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${matchPercentage}%` }}
          ></div>
        </div>
        <Link href={`/user/${match._id.toString()}`} className="text-blue-600 hover:underline">
          View Profile
        </Link>
      </div>
    </div>
  )
}

export default MatchCard

