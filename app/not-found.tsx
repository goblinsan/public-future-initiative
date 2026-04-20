import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-32 text-center">
      <p className="eyebrow mb-4">404 — Page not found</p>
      <h1 className="font-serif text-display-lg text-brand-navy mb-6">
        This page doesn&apos;t exist.
      </h1>
      <p className="text-body-lg text-slate-600 mb-10 max-w-md mx-auto">
        The page you were looking for has moved, been removed, or never existed.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link href="/" className="btn-primary">
          Return home
        </Link>
        <Link href="/search" className="btn-outline">
          Search the site
        </Link>
      </div>
    </div>
  )
}

