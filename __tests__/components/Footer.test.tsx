import { render, screen } from '@testing-library/react'
import Footer from '@/components/layout/Footer'

describe('Footer', () => {
  it('renders copyright text', () => {
    render(<Footer />)
    expect(screen.getByText(/public future initiative/i)).toBeInTheDocument()
    expect(screen.getByText(/all rights reserved/i)).toBeInTheDocument()
  })

  it('renders Privacy and About links', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: /privacy/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument()
  })

  it('renders all support links', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: /faq/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /corrections/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /partners/i })).toBeInTheDocument()
  })

  it('has accessible footer navigation', () => {
    render(<Footer />)
    expect(screen.getByRole('navigation', { name: /footer explore navigation/i })).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: /footer about navigation/i })).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: /footer trust navigation/i })).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: /footer support navigation/i })).toBeInTheDocument()
  })
})

