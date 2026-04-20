import Link from 'next/link'

export interface CTAPanelProps {
  title: string
  description: string
  primaryCTA: { label: string; href: string }
  secondaryCTA?: { label: string; href: string }
  variant?: 'navy' | 'light' | 'bordered'
}

export default function CTAPanel({
  title,
  description,
  primaryCTA,
  secondaryCTA,
  variant = 'navy',
}: CTAPanelProps) {
  if (variant === 'navy') {
    return (
      <section className="bg-brand-navy text-white rounded-lg px-8 py-12 md:px-12">
        <div className="max-w-2xl">
          <h2 className="font-serif text-display-md mb-4">{title}</h2>
          <p className="text-body-lg text-white/80 mb-8">{description}</p>
          <div className="flex flex-wrap gap-4">
            <Link
              href={primaryCTA.href}
              className="btn-primary bg-white text-brand-navy hover:bg-brand-cream"
            >
              {primaryCTA.label}
            </Link>
            {secondaryCTA && (
              <Link
                href={secondaryCTA.href}
                className="btn-secondary text-white border-white/60 hover:bg-white/10"
              >
                {secondaryCTA.label}
              </Link>
            )}
          </div>
        </div>
      </section>
    )
  }

  if (variant === 'bordered') {
    return (
      <section className="border-2 border-brand-blue/30 rounded-lg px-8 py-12 md:px-12 bg-brand-blue-muted/30">
        <div className="max-w-2xl">
          <h2 className="font-serif text-display-md text-brand-navy mb-4">{title}</h2>
          <p className="text-body-lg text-slate-600 mb-8">{description}</p>
          <div className="flex flex-wrap gap-4">
            <Link href={primaryCTA.href} className="btn-primary">
              {primaryCTA.label}
            </Link>
            {secondaryCTA && (
              <Link href={secondaryCTA.href} className="btn-outline">
                {secondaryCTA.label}
              </Link>
            )}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-brand-cream border border-slate-200 rounded-lg px-8 py-12 md:px-12">
      <div className="max-w-2xl">
        <h2 className="font-serif text-display-md text-brand-navy mb-4">{title}</h2>
        <p className="text-body-lg text-slate-600 mb-8">{description}</p>
        <div className="flex flex-wrap gap-4">
          <Link href={primaryCTA.href} className="btn-primary">
            {primaryCTA.label}
          </Link>
          {secondaryCTA && (
            <Link href={secondaryCTA.href} className="btn-outline">
              {secondaryCTA.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
