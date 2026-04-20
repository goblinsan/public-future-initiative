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

export interface PolicyFaq {
  question: string
  answer: string
}

export interface PolicyTradeoffs {
  pros?: string[]
  cons?: string[]
}

export interface PolicyOption extends Omit<ContentBase, 'status'> {
  type: 'policy'
  status: 'draft' | 'published' | 'archived' | 'adopted' | 'rejected'
  summary?: string
  contentLabel?: 'explainer' | 'analysis' | 'policy-brief' | 'debate-summary'
  problemStatement: string
  proposedSolution: string
  evidenceStrength: 'strong' | 'moderate' | 'emerging' | 'contested'
  tradeoffs?: PolicyTradeoffs
  faqs?: PolicyFaq[]
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
  publishedAt?: string
  status?: 'draft' | 'published' | 'archived'
  relatedTerms?: string[]
  citations?: Citation[]
}

export interface TimelineEvent {
  slug: string
  title: string
  year: string
  description: string
  publishedAt?: string
  status?: 'draft' | 'published' | 'archived'
  location?: string
  outcome?: string
  tags?: string[]
  citations?: Citation[]
}
