import type { Metadata } from 'next'
import Link from 'next/link'
import { type ReactNode } from 'react'
import { HandHeart, Handshake, MapPin, Flask } from '@phosphor-icons/react/dist/ssr'
import PageHeader from '@/components/ui/PageHeader'
import GetInvolvedForms from '@/components/actions/GetInvolvedForms'

export const metadata: Metadata = {
  title: 'Get Involved',
  description:
    'Register as a volunteer, partner, local organiser, or submit a pilot for consideration.',
}

const ways: { id: string; icon: ReactNode; title: string; description: string; commitment: string }[] = [
  {
    id: 'volunteer',
    icon: <HandHeart size={28} weight="duotone" />,
    title: 'Volunteer Facilitator',
    description:
      'Host structured policy discussions in your community. We provide training, materials, and support. No expertise needed.',
    commitment: '2–6 hours/month',
  },
  {
    id: 'partner',
    icon: <Handshake size={28} weight="duotone" />,
    title: 'Partner Organisation',
    description:
      'Collaborate on research, events, content, or funding. We work with research institutions, charities, public bodies, and media organisations.',
    commitment: 'Flexible',
  },
  {
    id: 'local-organizer',
    icon: <MapPin size={28} weight="duotone" />,
    title: 'Local Organiser',
    description:
      'Register to host a discussion in your community group, faith group, workplace, or neighbourhood. We\'ll send you a free discussion kit.',
    commitment: 'One-off or ongoing',
  },
  {
    id: 'pilot-submission',
    icon: <Flask size={28} weight="duotone" />,
    title: 'Submit a Pilot',
    description:
      'Running or evaluating a local pilot or initiative? Submit it for consideration to our pilots directory. We publish honest results — including failures.',
    commitment: 'One-off submission',
  },
]

export default function GetInvolvedPage() {
  return (
    <div className="bg-brand-cream">
      <PageHeader
        eyebrow="Get Involved"
        title="Register your interest — we'll find the right fit"
        description="Whether you want to facilitate, partner, organise locally, or submit a pilot — this is where to start. We read every submission."
      />

      {/* Ways to get involved */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 py-14">
        <p className="eyebrow mb-6">What we&apos;re looking for</p>
        <div className="grid sm:grid-cols-2 gap-5 mb-16">
          {ways.map(({ id, icon, title, description, commitment }) => (
            <div
              key={id}
              className="bg-white rounded-card border border-slate-200 shadow-card p-6"
            >
              <div className="flex items-start gap-4">
                <div className="text-brand-blue flex-shrink-0 mt-0.5" aria-hidden>
                  {icon}
                </div>
                <div>
                  <h3 className="font-semibold text-heading-sm text-brand-navy mb-1">{title}</h3>
                  <p className="text-body-sm text-slate-600 mb-3">{description}</p>
                  <p className="text-label-sm text-brand-slate">
                    Commitment: {commitment}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Forms */}
        <div className="border-t border-slate-200 pt-12">
          <p className="eyebrow mb-2">Register your interest</p>
          <h2 className="font-serif text-display-md text-brand-navy mb-4">
            Tell us about yourself
          </h2>
          <p className="text-body-lg text-slate-600 max-w-2xl mb-10">
            Use the tabs below to select the type of involvement you&apos;re interested in. We&apos;ll
            respond within five to ten working days.
          </p>

          <div className="bg-white rounded-card border border-slate-200 shadow-card p-8">
            <GetInvolvedForms />
          </div>
        </div>

        {/* Privacy note */}
        <p className="mt-8 text-body-sm text-slate-400 max-w-2xl">
          We use the information you provide only to respond to your enquiry and connect you with
          relevant opportunities. We do not share it with third parties or use it for marketing.{' '}
          <Link href="/privacy" className="text-brand-blue hover:underline">
            Privacy policy →
          </Link>
        </p>

        <div className="mt-12">
          <Link href="/actions" className="text-brand-blue hover:underline text-label-sm">
            ← Back to Take Action
          </Link>
        </div>
      </section>
    </div>
  )
}
