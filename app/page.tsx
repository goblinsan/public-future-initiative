import Link from 'next/link'

const sections = [
  {
    href: '/explainers',
    title: 'Explainers',
    description: 'Clear, evidence-based breakdowns of complex policy topics.',
  },
  {
    href: '/policy',
    title: 'Policy',
    description: 'Concrete policy options with evidence, trade-offs, and citations.',
  },
  {
    href: '/pilots',
    title: 'Pilots',
    description: 'Real-world experiments and what we learned from them.',
  },
  {
    href: '/actions',
    title: 'Actions',
    description: 'Ways to get involved — campaigns, events, and petitions.',
  },
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-blue-700 text-white py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">Public Future Initiative</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Exploring policy, piloting change, enabling public action.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/explainers"
              className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Read Explainers
            </Link>
            <Link
              href="/about"
              className="border border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              About Us
            </Link>
          </div>
        </div>
      </section>

      {/* Sections grid */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-10">Explore</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {sections.map(({ href, title, description }) => (
            <Link
              key={href}
              href={href}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md hover:border-blue-300 transition-all group"
            >
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition-colors mb-2">
                {title}
              </h3>
              <p className="text-gray-600 text-sm">{description}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
