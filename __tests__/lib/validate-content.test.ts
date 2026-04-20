import {
  validateExplainer,
  validatePolicy,
  validatePilot,
  validateAction,
  validateGlossaryEntry,
  validateTimelineEvent,
  validateFrontmatter,
  aggregateResults,
} from '@/lib/validate-content'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const validExplainer = {
  title: 'Test Explainer',
  description: 'A description.',
  summary: 'One-line summary.',
  publishedAt: '2024-01-01',
  status: 'published',
  type: 'explainer',
}

const validPolicy = {
  title: 'Test Policy',
  description: 'A description.',
  summary: 'One-line summary.',
  problemStatement: 'Problem here.',
  proposedSolution: 'Solution here.',
  publishedAt: '2024-01-01',
  status: 'published',
  type: 'policy',
  evidenceStrength: 'moderate',
}

const validPilot = {
  title: 'Test Pilot',
  description: 'A description.',
  location: 'London, UK',
  publishedAt: '2024-01-01',
  status: 'published',
  type: 'pilot',
}

const validAction = {
  title: 'Test Action',
  description: 'A description.',
  publishedAt: '2024-01-01',
  status: 'published',
  type: 'action',
  actionType: 'campaign',
}

const validGlossary = {
  term: 'UBI',
  definition: 'Universal Basic Income.',
}

const validTimeline = {
  title: 'Event',
  year: '2024',
  description: 'Something happened.',
}

// ---------------------------------------------------------------------------
// validateExplainer
// ---------------------------------------------------------------------------

describe('validateExplainer', () => {
  it('passes a fully valid explainer', () => {
    const errors = validateExplainer('test-slug', validExplainer)
    expect(errors).toHaveLength(0)
  })

  it('reports missing title', () => {
    const fm = { ...validExplainer, title: '' }
    const errors = validateExplainer('test-slug', fm)
    expect(errors.some((e) => e.field === 'title')).toBe(true)
  })

  it('reports missing summary', () => {
    const fm = { ...validExplainer, summary: undefined }
    const errors = validateExplainer('test-slug', fm as Record<string, unknown>)
    expect(errors.some((e) => e.field === 'summary')).toBe(true)
  })

  it('reports missing description', () => {
    const fm = { ...validExplainer, description: undefined }
    const errors = validateExplainer('test-slug', fm as Record<string, unknown>)
    expect(errors.some((e) => e.field === 'description')).toBe(true)
  })

  it('reports invalid publishedAt format', () => {
    const fm = { ...validExplainer, publishedAt: '01/01/2024' }
    const errors = validateExplainer('test-slug', fm)
    expect(errors.some((e) => e.field === 'publishedAt')).toBe(true)
  })

  it('reports impossible calendar date (roll-over)', () => {
    const fm = { ...validExplainer, publishedAt: '2024-02-30' }
    const errors = validateExplainer('test-slug', fm)
    expect(errors.some((e) => e.field === 'publishedAt')).toBe(true)
  })

  it('reports invalid status', () => {
    const fm = { ...validExplainer, status: 'pending' }
    const errors = validateExplainer('test-slug', fm)
    expect(errors.some((e) => e.field === 'status')).toBe(true)
  })

  it('reports invalid type value', () => {
    const fm = { ...validExplainer, type: 'article' }
    const errors = validateExplainer('test-slug', fm)
    expect(errors.some((e) => e.field === 'type')).toBe(true)
  })

  it('validates citation fields', () => {
    const fm = {
      ...validExplainer,
      citations: [{ id: 'c1', title: 'Paper', source: 'Journal', type: 'report' }],
    }
    const errors = validateExplainer('test-slug', fm)
    expect(errors).toHaveLength(0)
  })

  it('reports citation missing required fields', () => {
    const fm = { ...validExplainer, citations: [{ id: 'c1' }] }
    const errors = validateExplainer('test-slug', fm)
    expect(errors.length).toBeGreaterThan(0)
    expect(errors.some((e) => e.field === 'citations[0]')).toBe(true)
  })

  it('reports citations that is not an array', () => {
    const fm = { ...validExplainer, citations: 'not-an-array' }
    const errors = validateExplainer('test-slug', fm)
    expect(errors.some((e) => e.field === 'citations')).toBe(true)
  })
})

// ---------------------------------------------------------------------------
// validatePolicy
// ---------------------------------------------------------------------------

describe('validatePolicy', () => {
  it('passes a fully valid policy', () => {
    const errors = validatePolicy('test-slug', validPolicy)
    expect(errors).toHaveLength(0)
  })

  it('reports missing problemStatement', () => {
    const fm = { ...validPolicy, problemStatement: '' }
    const errors = validatePolicy('test-slug', fm)
    expect(errors.some((e) => e.field === 'problemStatement')).toBe(true)
  })

  it('reports missing proposedSolution', () => {
    const fm = { ...validPolicy, proposedSolution: undefined }
    const errors = validatePolicy('test-slug', fm as Record<string, unknown>)
    expect(errors.some((e) => e.field === 'proposedSolution')).toBe(true)
  })

  it('reports missing evidenceStrength', () => {
    const fm = { ...validPolicy, evidenceStrength: undefined }
    const errors = validatePolicy('test-slug', fm as Record<string, unknown>)
    expect(errors.some((e) => e.field === 'evidenceStrength')).toBe(true)
  })

  it('reports invalid evidenceStrength', () => {
    const fm = { ...validPolicy, evidenceStrength: 'very-strong' }
    const errors = validatePolicy('test-slug', fm)
    expect(errors.some((e) => e.field === 'evidenceStrength')).toBe(true)
  })

  it('reports invalid contentLabel', () => {
    const fm = { ...validPolicy, contentLabel: 'unknown-label' }
    const errors = validatePolicy('test-slug', fm)
    expect(errors.some((e) => e.field === 'contentLabel')).toBe(true)
  })

  it('allows valid contentLabel values', () => {
    for (const label of ['explainer', 'analysis', 'policy-brief', 'debate-summary']) {
      const fm = { ...validPolicy, contentLabel: label }
      const errors = validatePolicy('test-slug', fm)
      expect(errors.some((e) => e.field === 'contentLabel')).toBe(false)
    }
  })

  it('allows extended status values for policy', () => {
    for (const status of ['adopted', 'rejected']) {
      const fm = { ...validPolicy, status }
      const errors = validatePolicy('test-slug', fm)
      expect(errors.some((e) => e.field === 'status')).toBe(false)
    }
  })
})

// ---------------------------------------------------------------------------
// validatePilot
// ---------------------------------------------------------------------------

describe('validatePilot', () => {
  it('passes a fully valid pilot', () => {
    const errors = validatePilot('test-slug', validPilot)
    expect(errors).toHaveLength(0)
  })

  it('reports missing location', () => {
    const fm = { ...validPilot, location: '' }
    const errors = validatePilot('test-slug', fm)
    expect(errors.some((e) => e.field === 'location')).toBe(true)
  })

  it('reports invalid outcome value', () => {
    const fm = { ...validPilot, outcome: 'unknown' }
    const errors = validatePilot('test-slug', fm)
    expect(errors.some((e) => e.field === 'outcome')).toBe(true)
  })

  it('accepts valid outcome values', () => {
    for (const outcome of ['ongoing', 'success', 'partial', 'failed', 'cancelled']) {
      const fm = { ...validPilot, outcome }
      const errors = validatePilot('test-slug', fm)
      expect(errors.some((e) => e.field === 'outcome')).toBe(false)
    }
  })

  it('reports invalid evidenceStrength', () => {
    const fm = { ...validPilot, evidenceStrength: 'weak' }
    const errors = validatePilot('test-slug', fm)
    expect(errors.some((e) => e.field === 'evidenceStrength')).toBe(true)
  })
})

// ---------------------------------------------------------------------------
// validateAction
// ---------------------------------------------------------------------------

describe('validateAction', () => {
  it('passes a fully valid action', () => {
    const errors = validateAction('test-slug', validAction)
    expect(errors).toHaveLength(0)
  })

  it('reports missing actionType', () => {
    const fm = { ...validAction, actionType: undefined }
    const errors = validateAction('test-slug', fm as Record<string, unknown>)
    expect(errors.some((e) => e.field === 'actionType')).toBe(true)
  })

  it('reports invalid actionType', () => {
    const fm = { ...validAction, actionType: 'unknown' }
    const errors = validateAction('test-slug', fm)
    expect(errors.some((e) => e.field === 'actionType')).toBe(true)
  })

  it('accepts all valid actionType values', () => {
    for (const actionType of [
      'campaign',
      'event',
      'petition',
      'volunteer',
      'local-action',
      'toolkit',
      'other',
    ]) {
      const fm = { ...validAction, actionType }
      const errors = validateAction('test-slug', fm)
      expect(errors.some((e) => e.field === 'actionType')).toBe(false)
    }
  })
})

// ---------------------------------------------------------------------------
// validateGlossaryEntry
// ---------------------------------------------------------------------------

describe('validateGlossaryEntry', () => {
  it('passes a fully valid glossary entry', () => {
    const errors = validateGlossaryEntry('ubi', validGlossary)
    expect(errors).toHaveLength(0)
  })

  it('reports missing term', () => {
    const fm = { ...validGlossary, term: '' }
    const errors = validateGlossaryEntry('ubi', fm)
    expect(errors.some((e) => e.field === 'term')).toBe(true)
  })

  it('reports missing definition', () => {
    const fm = { ...validGlossary, definition: undefined }
    const errors = validateGlossaryEntry('ubi', fm as Record<string, unknown>)
    expect(errors.some((e) => e.field === 'definition')).toBe(true)
  })

  it('reports invalid status', () => {
    const fm = { ...validGlossary, status: 'unknown' }
    const errors = validateGlossaryEntry('ubi', fm)
    expect(errors.some((e) => e.field === 'status')).toBe(true)
  })
})

// ---------------------------------------------------------------------------
// validateTimelineEvent
// ---------------------------------------------------------------------------

describe('validateTimelineEvent', () => {
  it('passes a fully valid timeline event', () => {
    const errors = validateTimelineEvent('event-slug', validTimeline)
    expect(errors).toHaveLength(0)
  })

  it('reports missing year', () => {
    const fm = { ...validTimeline, year: '' }
    const errors = validateTimelineEvent('event-slug', fm)
    expect(errors.some((e) => e.field === 'year')).toBe(true)
  })

  it('reports missing description', () => {
    const fm = { ...validTimeline, description: '' }
    const errors = validateTimelineEvent('event-slug', fm)
    expect(errors.some((e) => e.field === 'description')).toBe(true)
  })
})

// ---------------------------------------------------------------------------
// validateFrontmatter dispatcher
// ---------------------------------------------------------------------------

describe('validateFrontmatter', () => {
  it('dispatches to the correct validator', () => {
    const errors = validateFrontmatter('explainers', 'slug', validExplainer)
    expect(errors).toHaveLength(0)
  })

  it('returns empty array for unknown type', () => {
    const errors = validateFrontmatter(
      'unknown' as 'explainers',
      'slug',
      validExplainer,
    )
    expect(errors).toHaveLength(0)
  })
})

// ---------------------------------------------------------------------------
// aggregateResults
// ---------------------------------------------------------------------------

describe('aggregateResults', () => {
  it('returns valid:true when no errors', () => {
    const result = aggregateResults([])
    expect(result.valid).toBe(true)
    expect(result.errors).toHaveLength(0)
  })

  it('returns valid:false when errors exist', () => {
    const result = aggregateResults([
      { slug: 's', type: 't', field: 'f', message: 'msg' },
    ])
    expect(result.valid).toBe(false)
    expect(result.errors).toHaveLength(1)
  })
})

// ---------------------------------------------------------------------------
// Integration: validate real content files
// ---------------------------------------------------------------------------

import { getAllContent } from '@/lib/content'

describe('real content validation', () => {
  const contentTypes: Array<'explainers' | 'policy' | 'pilots' | 'actions'> = [
    'explainers',
    'policy',
    'pilots',
    'actions',
  ]

  for (const type of contentTypes) {
    it(`all published ${type} pass validation`, () => {
      const items = getAllContent(type)
      const allErrors: ReturnType<typeof validateFrontmatter> = []

      for (const item of items) {
        const errors = validateFrontmatter(
          type,
          item.slug,
          item.frontmatter as Record<string, unknown>,
        )
        allErrors.push(...errors)
      }

      if (allErrors.length > 0) {
        const details = allErrors
          .map((e) => `  [${e.type}/${e.slug}] ${e.field}: ${e.message}`)
          .join('\n')
        throw new Error(`Validation errors found:\n${details}`)
      }
      expect(allErrors).toHaveLength(0)
    })
  }
})
