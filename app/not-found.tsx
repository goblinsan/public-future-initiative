import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-32 text-center">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Page not found.</p>
      <Link href="/" className="text-blue-700 hover:underline font-medium">
        Return home
      </Link>
    </div>
  )
}
