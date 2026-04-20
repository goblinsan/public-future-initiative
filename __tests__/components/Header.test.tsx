import { render, screen } from '@testing-library/react'
import Header from '@/components/layout/Header'

describe('Header', () => {
  it('renders the site name', () => {
    render(<Header />)
    expect(screen.getByText('Public Future Initiative')).toBeInTheDocument()
  })

  it('renders all main navigation links', () => {
    render(<Header />)
    expect(screen.getByRole('link', { name: /explainers/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /policy/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /pilots/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /actions/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument()
  })

  it('has accessible navigation landmark', () => {
    render(<Header />)
    expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument()
  })
})
