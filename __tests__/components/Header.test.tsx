import { render, screen } from '@testing-library/react'
import Header from '@/components/layout/Header'

describe('Header', () => {
  it('renders the site name', () => {
    render(<Header />)
    expect(screen.getByText('Public Future')).toBeInTheDocument()
  })

  it('renders all main navigation links', () => {
    render(<Header />)
    expect(screen.getByRole('link', { name: /what's changing/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /policy paths/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /pilots/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /take action/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /debate/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /trust center/i })).toBeInTheDocument()
  })

  it('has accessible navigation landmark', () => {
    render(<Header />)
    expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument()
  })

  it('renders mobile menu toggle button', () => {
    render(<Header />)
    expect(
      screen.getByRole('button', { name: /open navigation menu/i })
    ).toBeInTheDocument()
  })

  it('renders a search link', () => {
    render(<Header />)
    expect(screen.getByRole('link', { name: /search/i })).toBeInTheDocument()
  })
})

