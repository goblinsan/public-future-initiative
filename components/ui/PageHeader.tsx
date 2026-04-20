export interface PageHeaderProps {
  title: string
  description?: string
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="bg-blue-700 text-white py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        {description && <p className="text-blue-100 text-lg max-w-2xl">{description}</p>}
      </div>
    </div>
  )
}
