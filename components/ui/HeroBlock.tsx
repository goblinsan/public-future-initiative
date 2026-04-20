import Link from 'next/link'

export interface HeroCTA {
  label: string
  href: string
  variant?: 'primary' | 'secondary'
}

export interface HeroBlockProps {
  eyebrow?: string
  title: string
  description: string
  ctas?: HeroCTA[]
  variant?: 'navy' | 'slate' | 'light'
}

export default function HeroBlock({
  eyebrow,
  title,
  description,
  ctas = [],
  variant = 'navy',
}: HeroBlockProps) {
  const bg =
    variant === 'navy'
      ? 'bg-brand-navy text-white'
      : variant === 'slate'
        ? 'bg-brand-slate text-white'
        : 'bg-brand-cream text-brand-navy'

  const eyebrowColor =
    variant === 'light' ? 'text-brand-slate' : 'text-white/70'
  const descColor =
    variant === 'light' ? 'text-slate-600' : 'text-white/80'

  return (
    <section className={`${bg} py-24 px-6 md:px-10`}>
      <div className="max-w-5xl mx-auto">
        {eyebrow && (
          <p className={`eyebrow mb-4 ${eyebrowColor}`}>{eyebrow}</p>
        )}
        <h1 className="font-serif text-display-lg md:text-display-xl mb-6 max-w-3xl">
          {title}
        </h1>
        <p className={`text-body-xl max-w-2xl mb-10 ${descColor}`}>{description}</p>
        {ctas.length > 0 && (
          <div className="flex flex-wrap gap-4">
            {ctas.map(({ label, href, variant: ctaVariant = 'primary' }) =>
              ctaVariant === 'primary' ? (
                <Link
                  key={href}
                  href={href}
                  className="btn-primary bg-white text-brand-navy hover:bg-brand-cream"
                >
                  {label}
                </Link>
              ) : (
                <Link
                  key={href}
                  href={href}
                  className="btn-secondary text-white border-white/60 hover:bg-white/10"
                >
                  {label}
                </Link>
              )
            )}
          </div>
        )}
      </div>
    </section>
  )
}
