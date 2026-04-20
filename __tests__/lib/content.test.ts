import { getContentBySlug, getAllContent } from '@/lib/content'

describe('getContentBySlug', () => {
  it('returns null for a non-existent slug', () => {
    const result = getContentBySlug('explainers', 'this-does-not-exist')
    expect(result).toBeNull()
  })

  it('returns null for a non-existent file', () => {
    const result = getContentBySlug('explainers', '__missing__')
    expect(result).toBeNull()
  })

  it('returns parsed content for an existing file', () => {
    const result = getContentBySlug('explainers', 'universal-basic-income')
    expect(result).not.toBeNull()
    expect(result?.slug).toBe('universal-basic-income')
    expect(result?.frontmatter.title).toBeTruthy()
    expect(typeof result?.content).toBe('string')
  })
})

describe('getAllContent', () => {
  it('returns an empty array for a missing content type directory', () => {
    const result = getAllContent('glossary')
    expect(Array.isArray(result)).toBe(true)
  })

  it('returns only published items', () => {
    const items = getAllContent('explainers')
    items.forEach((item) => {
      const fm = item.frontmatter as Record<string, unknown>
      expect(fm['status']).toBe('published')
    })
  })

  it('returns items sorted by publishedAt descending', () => {
    const items = getAllContent('explainers')
    for (let i = 1; i < items.length; i++) {
      const dateA = (items[i - 1].frontmatter as Record<string, unknown>)['publishedAt'] as string
      const dateB = (items[i].frontmatter as Record<string, unknown>)['publishedAt'] as string
      expect(dateA >= dateB).toBe(true)
    }
  })
})
