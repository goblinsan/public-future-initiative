import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentRoot = path.join(process.cwd(), 'content')

export type ContentType = 'explainers' | 'policy' | 'pilots' | 'actions' | 'glossary' | 'timeline' | 'debate'

export interface ParsedContent<T = Record<string, unknown>> {
  slug: string
  frontmatter: T
  content: string
}

export function getContentBySlug<T = Record<string, unknown>>(
  type: ContentType,
  slug: string
): ParsedContent<T> | null {
  const filePath = path.join(contentRoot, type, `${slug}.md`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  try {
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(raw)
    return {
      slug,
      frontmatter: data as T,
      content,
    }
  } catch {
    return null
  }
}

export function getAllContent<T = Record<string, unknown>>(type: ContentType): ParsedContent<T>[] {
  const dir = path.join(contentRoot, type)

  if (!fs.existsSync(dir)) {
    return []
  }

  try {
    const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'))

    return files
      .map((file) => {
        const slug = file.replace(/\.md$/, '')
        return getContentBySlug<T>(type, slug)
      })
      .filter((item): item is ParsedContent<T> => item !== null)
      .filter((item) => {
        if (process.env.PREVIEW_MODE === 'true') return true
        const status = (item.frontmatter as Record<string, unknown>)['status']
        return status === undefined || status === 'published'
      })
      .sort((a, b) => {
        const dateA = ((a.frontmatter as Record<string, unknown>)['publishedAt'] as string) ?? ''
        const dateB = ((b.frontmatter as Record<string, unknown>)['publishedAt'] as string) ?? ''
        return dateB.localeCompare(dateA)
      })
  } catch {
    return []
  }
}
