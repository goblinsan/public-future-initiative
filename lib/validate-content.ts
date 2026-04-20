/**
 * Content validation utilities for enforcing required frontmatter fields
 * across all site content types. Used by the validate-content script and tests.
 */

export interface ValidationError {
  slug: string
  type: string
  field: string
  message: string
}

export interface ValidationResult {
  valid: boolean
  errors: ValidationError[]
}

type FM = Record<string, unknown>

function required(
  slug: string,
  type: string,
  fm: FM,
  field: string,
  errors: ValidationError[],
): void {
  const value = fm[field]
  if (value === undefined || value === null || value === '') {
    errors.push({ slug, type, field, message: `Required field "${field}" is missing or empty.` })
  }
}

function isValidDate(value: unknown): boolean {
  if (typeof value !== 'string') return false
  return /^\d{4}-\d{2}-\d{2}$/.test(value)
}

function dateField(
  slug: string,
  type: string,
  fm: FM,
  field: string,
  errors: ValidationError[],
): void {
  const value = fm[field]
  if (value === undefined || value === null) {
    errors.push({ slug, type, field, message: `Required field "${field}" is missing.` })
    return
  }
  if (!isValidDate(value)) {
    errors.push({
      slug,
      type,
      field,
      message: `Field "${field}" must be a date string in YYYY-MM-DD format. Got: ${String(value)}`,
    })
  }
}

function oneOf(
  slug: string,
  type: string,
  fm: FM,
  field: string,
  allowed: string[],
  errors: ValidationError[],
): void {
  const value = fm[field]
  if (value === undefined || value === null) {
    errors.push({
      slug,
      type,
      field,
      message: `Required field "${field}" is missing. Allowed values: ${allowed.join(', ')}.`,
    })
    return
  }
  if (!allowed.includes(String(value))) {
    errors.push({
      slug,
      type,
      field,
      message: `Field "${field}" has invalid value "${String(value)}". Allowed: ${allowed.join(', ')}.`,
    })
  }
}

// ---------------------------------------------------------------------------
// Per-type validators
// ---------------------------------------------------------------------------

export function validateExplainer(slug: string, fm: FM): ValidationError[] {
  const errors: ValidationError[] = []
  const type = 'explainers'

  required(slug, type, fm, 'title', errors)
  required(slug, type, fm, 'description', errors)
  required(slug, type, fm, 'summary', errors)
  dateField(slug, type, fm, 'publishedAt', errors)
  oneOf(slug, type, fm, 'status', ['draft', 'published', 'archived'], errors)
  oneOf(slug, type, fm, 'type', ['explainer'], errors)

  // Citation shape validation
  const citations = fm['citations']
  if (citations !== undefined) {
    if (!Array.isArray(citations)) {
      errors.push({ slug, type, field: 'citations', message: '"citations" must be an array.' })
    } else {
      citations.forEach((c: unknown, i: number) => {
        const cit = c as FM
        const prefix = `citations[${i}]`
        if (!cit['id'])
          errors.push({ slug, type, field: prefix, message: `${prefix}: "id" is required.` })
        if (!cit['title'])
          errors.push({ slug, type, field: prefix, message: `${prefix}: "title" is required.` })
        if (!cit['source'])
          errors.push({ slug, type, field: prefix, message: `${prefix}: "source" is required.` })
        if (!cit['type'])
          errors.push({ slug, type, field: prefix, message: `${prefix}: "type" is required.` })
      })
    }
  }

  return errors
}

export function validatePolicy(slug: string, fm: FM): ValidationError[] {
  const errors: ValidationError[] = []
  const type = 'policy'

  required(slug, type, fm, 'title', errors)
  required(slug, type, fm, 'description', errors)
  required(slug, type, fm, 'summary', errors)
  required(slug, type, fm, 'problemStatement', errors)
  required(slug, type, fm, 'proposedSolution', errors)
  dateField(slug, type, fm, 'publishedAt', errors)
  oneOf(
    slug,
    type,
    fm,
    'status',
    ['draft', 'published', 'archived', 'adopted', 'rejected'],
    errors,
  )
  oneOf(slug, type, fm, 'type', ['policy'], errors)
  oneOf(
    slug,
    type,
    fm,
    'evidenceStrength',
    ['strong', 'moderate', 'emerging', 'contested'],
    errors,
  )

  const contentLabel = fm['contentLabel']
  if (contentLabel !== undefined) {
    const allowed = ['explainer', 'analysis', 'policy-brief', 'debate-summary']
    if (!allowed.includes(String(contentLabel))) {
      errors.push({
        slug,
        type,
        field: 'contentLabel',
        message: `"contentLabel" must be one of: ${allowed.join(', ')}.`,
      })
    }
  }

  return errors
}

export function validatePilot(slug: string, fm: FM): ValidationError[] {
  const errors: ValidationError[] = []
  const type = 'pilots'

  required(slug, type, fm, 'title', errors)
  required(slug, type, fm, 'description', errors)
  required(slug, type, fm, 'location', errors)
  dateField(slug, type, fm, 'publishedAt', errors)
  oneOf(slug, type, fm, 'status', ['draft', 'published', 'archived'], errors)
  oneOf(slug, type, fm, 'type', ['pilot'], errors)

  const outcome = fm['outcome']
  if (outcome !== undefined) {
    const allowed = ['ongoing', 'success', 'partial', 'failed', 'cancelled']
    if (!allowed.includes(String(outcome))) {
      errors.push({
        slug,
        type,
        field: 'outcome',
        message: `"outcome" must be one of: ${allowed.join(', ')}.`,
      })
    }
  }

  const evidenceStrength = fm['evidenceStrength']
  if (evidenceStrength !== undefined) {
    const allowed = ['strong', 'moderate', 'emerging', 'contested']
    if (!allowed.includes(String(evidenceStrength))) {
      errors.push({
        slug,
        type,
        field: 'evidenceStrength',
        message: `"evidenceStrength" must be one of: ${allowed.join(', ')}.`,
      })
    }
  }

  return errors
}

export function validateAction(slug: string, fm: FM): ValidationError[] {
  const errors: ValidationError[] = []
  const type = 'actions'

  required(slug, type, fm, 'title', errors)
  required(slug, type, fm, 'description', errors)
  dateField(slug, type, fm, 'publishedAt', errors)
  oneOf(slug, type, fm, 'status', ['draft', 'published', 'archived'], errors)
  oneOf(slug, type, fm, 'type', ['action'], errors)
  oneOf(
    slug,
    type,
    fm,
    'actionType',
    ['campaign', 'event', 'petition', 'volunteer', 'local-action', 'toolkit', 'other'],
    errors,
  )

  return errors
}

export function validateGlossaryEntry(slug: string, fm: FM): ValidationError[] {
  const errors: ValidationError[] = []
  const type = 'glossary'

  required(slug, type, fm, 'term', errors)
  required(slug, type, fm, 'definition', errors)

  const status = fm['status']
  if (status !== undefined) {
    const allowed = ['draft', 'published', 'archived']
    if (!allowed.includes(String(status))) {
      errors.push({
        slug,
        type,
        field: 'status',
        message: `"status" must be one of: ${allowed.join(', ')}.`,
      })
    }
  }

  return errors
}

export function validateTimelineEvent(slug: string, fm: FM): ValidationError[] {
  const errors: ValidationError[] = []
  const type = 'timeline'

  required(slug, type, fm, 'title', errors)
  required(slug, type, fm, 'year', errors)
  required(slug, type, fm, 'description', errors)

  const status = fm['status']
  if (status !== undefined) {
    const allowed = ['draft', 'published', 'archived']
    if (!allowed.includes(String(status))) {
      errors.push({
        slug,
        type,
        field: 'status',
        message: `"status" must be one of: ${allowed.join(', ')}.`,
      })
    }
  }

  return errors
}

// ---------------------------------------------------------------------------
// Top-level entry point
// ---------------------------------------------------------------------------

type ContentTypeKey = 'explainers' | 'policy' | 'pilots' | 'actions' | 'glossary' | 'timeline'

const validators: Record<ContentTypeKey, (slug: string, fm: FM) => ValidationError[]> = {
  explainers: validateExplainer,
  policy: validatePolicy,
  pilots: validatePilot,
  actions: validateAction,
  glossary: validateGlossaryEntry,
  timeline: validateTimelineEvent,
}

export function validateFrontmatter(
  type: ContentTypeKey,
  slug: string,
  fm: FM,
): ValidationError[] {
  const validator = validators[type]
  return validator ? validator(slug, fm) : []
}

export function aggregateResults(errors: ValidationError[]): ValidationResult {
  return { valid: errors.length === 0, errors }
}
