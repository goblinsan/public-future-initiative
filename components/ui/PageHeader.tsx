export interface PageHeaderProps {
  title: string
  description?: string
  eyebrow?: string
}

export default function PageHeader({ title, description, eyebrow }: PageHeaderProps) {
  return (
    <div className="bg-brand-navy text-white py-16 px-6 md:px-10">
      <div className="max-w-5xl mx-auto">
        {eyebrow && (
          <p className="eyebrow text-white/60 mb-3">{eyebrow}</p>
        )}
        <h1 className="font-serif text-display-md md:text-display-lg mb-4">{title}</h1>
        {description && (
          <p className="text-white/80 text-body-lg max-w-2xl">{description}</p>
        )}
      </div>
    </div>
  )
}

