import Link from 'next/link'

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to MentorMatch</h1>
      <p className="mb-8">Connect with mentors and mentees in your field</p>
      <div className="space-x-4">
        <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Sign Up
        </Link>
        <Link href="/login" className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">
          Login
        </Link>
      </div>
    </div>
  )
}

