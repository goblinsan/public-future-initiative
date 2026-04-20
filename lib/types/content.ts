export interface ContentBase {
  slug: string
  title: string
  description: string
  publishedAt: string
  updatedAt?: string
  tags?: string[]
  status: 'draft' | 'published' | 'archived'
}

export interface Citation {
  id: string
  title: string
  url?: string
  author?: string
  publishedAt?: string
  source: string
  type: 'report' | 'article' | 'legislation' | 'dataset' | 'other'
}

export interface Explainer extends ContentBase {
  type: 'explainer'
  summary: string
  citations?: Citation[]
  relatedPolicy?: string[]
  relatedPilots?: string[]
}

export interface PolicyOption extends Omit<ContentBase, 'status'> {
  type: 'policy'
  status: 'draft' | 'published' | 'archived' | 'adopted' | 'rejected'
  problemStatement: string
  proposedSolution: string
  evidenceStrength: 'strong' | 'moderate' | 'emerging' | 'contested'
  citations?: Citation[]
  relatedExplainers?: string[]
  relatedPilots?: string[]
}

export interface Pilot extends ContentBase {
  type: 'pilot'
  location: string
  startDate?: string
  endDate?: string
  outcome?: 'ongoing' | 'success' | 'partial' | 'failed' | 'cancelled'
  citations?: Citation[]
  relatedPolicy?: string[]
}

export interface Action extends ContentBase {
  type: 'action'
  actionType: 'campaign' | 'event' | 'petition' | 'volunteer' | 'other'
  startDate?: string
  endDate?: string
  location?: string
  url?: string
  organizer?: string
}

export interface GlossaryEntry {
  slug: string
  term: string
  definition: string
  relatedTerms?: string[]
  citations?: Citation[]
}
