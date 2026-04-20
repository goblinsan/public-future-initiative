import { marked, Tokens } from 'marked'

export interface TocEntry {
  id: string
  text: string
  depth: number
}

/** Convert a heading text to a URL-safe id (mirrors GitHub behaviour). */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

/** Strip simple markdown formatting characters for plain-text usage. */
function stripMarkdownFormatting(text: string): string {
  return text.replace(/\*\*/g, '').replace(/\*/g, '')
}

/** Parse markdown and return a flat list of headings (depth 2 and 3). */
export function extractToc(markdown: string): TocEntry[] {
  const tokens = marked.lexer(markdown)
  const toc: TocEntry[] = []

  for (const token of tokens) {
    if (token.type === 'heading') {
      const heading = token as Tokens.Heading
      if (heading.depth === 2 || heading.depth === 3) {
        const text = stripMarkdownFormatting(heading.text)
        toc.push({ id: slugify(text), text, depth: heading.depth })
      }
    }
  }

  return toc
}

/**
 * Render markdown to an HTML string with heading IDs added so the TOC
 * anchor links work.
 */
export function renderMarkdown(markdown: string): string {
  const renderer = new marked.Renderer()

  renderer.heading = ({ text, depth }: Tokens.Heading) => {
    const cleanText = stripMarkdownFormatting(text)
    const id = slugify(cleanText)
    const tag = `h${depth}`
    return `<${tag} id="${id}">${text}</${tag}>\n`
  }

  return marked(markdown, { renderer }) as string
}

/** Convert a hyphen-separated slug to a title-cased display string. */
export function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
