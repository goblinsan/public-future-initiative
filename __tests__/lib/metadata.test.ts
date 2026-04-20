import { generatePageMetadata, siteMetadata } from '@/lib/metadata'

describe('generatePageMetadata', () => {
  it('returns default site metadata when called with no options', () => {
    const meta = generatePageMetadata()
    expect(meta.title).toBe(siteMetadata.title)
    expect(meta.description).toBe(siteMetadata.description)
  })

  it('prepends page title to site title', () => {
    const meta = generatePageMetadata({ title: 'Explainers' })
    expect(meta.title).toBe(`Explainers | ${siteMetadata.title}`)
  })

  it('uses provided description', () => {
    const meta = generatePageMetadata({ description: 'Custom description' })
    expect(meta.description).toBe('Custom description')
  })

  it('includes openGraph metadata', () => {
    const meta = generatePageMetadata({ title: 'Test', description: 'Desc' })
    expect(meta.openGraph).toBeDefined()
    expect(meta.openGraph?.title).toBe(`Test | ${siteMetadata.title}`)
    expect(meta.openGraph?.description).toBe('Desc')
  })

  it('includes twitter metadata', () => {
    const meta = generatePageMetadata({ title: 'Test' })
    expect(meta.twitter).toBeDefined()
    // twitter.card is defined in the metadata object
    expect(meta.twitter).toMatchObject({ card: 'summary_large_image' })
  })
})
