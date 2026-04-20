import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about the Public Future Initiative and our mission.',
}

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-6">About the Public Future Initiative</h1>
      <div className="prose prose-blue max-w-none">
        <p className="text-xl text-gray-600 mb-8">
          We believe that the best decisions about our shared future are made when communities have
          access to transparent information and meaningful ways to participate.
        </p>
        <h2>Our Mission</h2>
        <p>
          The Public Future Initiative is a non-partisan civic platform dedicated to democratizing
          policy development. We connect citizens, researchers, and policymakers to create a
          collaborative space for ideas that address our most pressing challenges.
        </p>
        <h2>How It Works</h2>
        <ol>
          <li>
            <strong>Propose</strong> — Community members and organizations submit detailed policy
            proposals with clear goals, evidence, and implementation plans.
          </li>
          <li>
            <strong>Deliberate</strong> — Open discussion allows experts, affected communities, and
            the public to refine and improve proposals.
          </li>
          <li>
            <strong>Advance</strong> — The most supported proposals are elevated to decision-makers
            and advocacy networks for real-world impact.
          </li>
        </ol>
        <h2>Our Values</h2>
        <ul>
          <li>
            <strong>Transparency</strong> — All proposals, evidence, and deliberations are publicly
            accessible.
          </li>
          <li>
            <strong>Inclusivity</strong> — Every community has a voice, regardless of resources or
            political power.
          </li>
          <li>
            <strong>Evidence-Based</strong> — We prioritize proposals grounded in data, research,
            and lived experience.
          </li>
          <li>
            <strong>Non-Partisan</strong> — We serve the public interest, not any political party or
            ideology.
          </li>
        </ul>
      </div>
    </div>
  )
}
