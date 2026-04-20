export interface SectionIntroProps {
  /** Short uppercase label displayed above the title */
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

export default function SectionIntro({
  eyebrow,
  title,
  description,
  align = 'left',
}: SectionIntroProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : ''

  return (
    <div className={`mb-12 max-w-2xl ${alignClass}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="font-serif text-display-md text-brand-navy mb-4">{title}</h2>
      {description && (
        <p className="text-body-lg text-slate-600 leading-relaxed">{description}</p>
      )}
    </div>
  )
}
