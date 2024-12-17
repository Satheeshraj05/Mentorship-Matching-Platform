import Link from 'next/link'

const Header = () => {
  return (
    <header className="bg-blue-600 text-white">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          MentorMatch
        </Link>
        <ul className="flex space-x-4">
          <li><Link href="/dashboard">Dashboard</Link></li>
          <li><Link href="/discover">Discover</Link></li>
          <li><Link href="/matches">Matches</Link></li>
          <li><Link href="/profile">Profile</Link></li>
          <li><Link href="/login">Login</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header

