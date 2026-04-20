import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/ui/PageHeader'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for the Public Future Initiative.',
}

export default function PrivacyPage() {
  return (
    <>
      <PageHeader title="Privacy Policy" />
      <section className="max-w-3xl mx-auto px-6 py-12 prose prose-gray">
        <p>
          The Public Future Initiative is committed to protecting your privacy. We collect minimal
          data and never sell your information.
        </p>
        <h2>Information We Collect</h2>
        <p>
          We may collect anonymous analytics data (page views, referrer) to understand how the site
          is used. No personally identifiable information is collected without your explicit consent.
        </p>
        <h2>Cookies</h2>
        <p>
          We use only essential cookies required for site functionality. No third-party tracking
          cookies are used.
        </p>
        <h2>Contact</h2>
        <p>
          Questions about our privacy practices? Visit our{' '}
          <Link href="/about" className="text-blue-700 hover:underline">
            About
          </Link>{' '}
          page.
        </p>
      </section>
    </>
  )
}
