#!/usr/bin/env node
/**
 * Content validation script.
 *
 * Run with:   node scripts/validate-content.js
 * Or via npm: npm run validate
 *
 * Reads all Markdown files from the content/ directory and validates
 * that each file has the required frontmatter fields for its content type.
 * Exits with code 1 if any errors are found.
 */

const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const contentRoot = path.join(__dirname, '..', 'content')

// ---------------------------------------------------------------------------
// Inline validation rules (mirrors lib/validate-content.ts without TypeScript)
// ---------------------------------------------------------------------------

function required(slug, type, fm, field, errors) {
  const value = fm[field]
  if (value === undefined || value === null || value === '') {
    errors.push({ slug, type, field, message: `Required field "${field}" is missing or empty.` })
  }
}

function isValidDate(value) {
  if (typeof value !== 'string') return false
  return /^\d{4}-\d{2}-\d{2}$/.test(value)
}

function dateField(slug, type, fm, field, errors) {
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

function oneOf(slug, type, fm, field, allowed, errors) {
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

function validateExplainer(slug, fm) {
  const errors = []
  const type = 'explainers'
  required(slug, type, fm, 'title', errors)
  required(slug, type, fm, 'description', errors)
  required(slug, type, fm, 'summary', errors)
  dateField(slug, type, fm, 'publishedAt', errors)
  oneOf(slug, type, fm, 'status', ['draft', 'published', 'archived'], errors)
  oneOf(slug, type, fm, 'type', ['explainer'], errors)
  validateCitations(slug, type, fm, errors)
  return errors
}

function validatePolicy(slug, fm) {
  const errors = []
  const type = 'policy'
  required(slug, type, fm, 'title', errors)
  required(slug, type, fm, 'description', errors)
  required(slug, type, fm, 'summary', errors)
  required(slug, type, fm, 'problemStatement', errors)
  required(slug, type, fm, 'proposedSolution', errors)
  dateField(slug, type, fm, 'publishedAt', errors)
  oneOf(slug, type, fm, 'status', ['draft', 'published', 'archived', 'adopted', 'rejected'], errors)
  oneOf(slug, type, fm, 'type', ['policy'], errors)
  oneOf(slug, type, fm, 'evidenceStrength', ['strong', 'moderate', 'emerging', 'contested'], errors)
  return errors
}

function validatePilot(slug, fm) {
  const errors = []
  const type = 'pilots'
  required(slug, type, fm, 'title', errors)
  required(slug, type, fm, 'description', errors)
  required(slug, type, fm, 'location', errors)
  dateField(slug, type, fm, 'publishedAt', errors)
  oneOf(slug, type, fm, 'status', ['draft', 'published', 'archived'], errors)
  oneOf(slug, type, fm, 'type', ['pilot'], errors)
  return errors
}

function validateAction(slug, fm) {
  const errors = []
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

function validateGlossary(slug, fm) {
  const errors = []
  const type = 'glossary'
  required(slug, type, fm, 'term', errors)
  required(slug, type, fm, 'definition', errors)
  return errors
}

function validateTimeline(slug, fm) {
  const errors = []
  const type = 'timeline'
  required(slug, type, fm, 'title', errors)
  required(slug, type, fm, 'year', errors)
  required(slug, type, fm, 'description', errors)
  return errors
}

function validateCitations(slug, type, fm, errors) {
  const citations = fm['citations']
  if (citations === undefined) return
  if (!Array.isArray(citations)) {
    errors.push({ slug, type, field: 'citations', message: '"citations" must be an array.' })
    return
  }
  citations.forEach((c, i) => {
    const prefix = `citations[${i}]`
    if (!c['id']) errors.push({ slug, type, field: prefix, message: `${prefix}: "id" is required.` })
    if (!c['title']) errors.push({ slug, type, field: prefix, message: `${prefix}: "title" is required.` })
    if (!c['source']) errors.push({ slug, type, field: prefix, message: `${prefix}: "source" is required.` })
    if (!c['type']) errors.push({ slug, type, field: prefix, message: `${prefix}: "type" is required.` })
  })
}

const validators = {
  explainers: validateExplainer,
  policy: validatePolicy,
  pilots: validatePilot,
  actions: validateAction,
  glossary: validateGlossary,
  timeline: validateTimeline,
}

// ---------------------------------------------------------------------------
// File runner
// ---------------------------------------------------------------------------

function validateDirectory(typeName) {
  const dir = path.join(contentRoot, typeName)
  if (!fs.existsSync(dir)) return []

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'))
  const allErrors = []

  for (const file of files) {
    const slug = file.replace(/\.md$/, '')
    const raw = fs.readFileSync(path.join(dir, file), 'utf-8')
    let fm
    try {
      const parsed = matter(raw)
      fm = parsed.data
    } catch (e) {
      allErrors.push({ slug, type: typeName, field: 'frontmatter', message: `Failed to parse frontmatter: ${e.message}` })
      continue
    }

    const validate = validators[typeName]
    if (validate) {
      allErrors.push(...validate(slug, fm))
    }
  }

  return allErrors
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const allErrors = []
for (const typeName of Object.keys(validators)) {
  allErrors.push(...validateDirectory(typeName))
}

if (allErrors.length === 0) {
  console.log('✅  All content validated successfully.')
  process.exit(0)
} else {
  console.error(`\n❌  Found ${allErrors.length} validation error(s):\n`)
  for (const err of allErrors) {
    console.error(`  [${err.type}/${err.slug}] ${err.field}: ${err.message}`)
  }
  console.error('')
  process.exit(1)
}
