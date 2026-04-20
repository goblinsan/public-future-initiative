import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import NewsletterSignup from '@/components/ui/NewsletterSignup'

// Mock fetch
const mockFetch = jest.fn()
global.fetch = mockFetch

beforeEach(() => {
  mockFetch.mockReset()
})

describe('NewsletterSignup', () => {
  it('renders the signup form', () => {
    render(<NewsletterSignup />)
    expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument()
  })

  it('renders descriptive text', () => {
    render(<NewsletterSignup />)
    expect(screen.getByText(/stay informed/i)).toBeInTheDocument()
    expect(screen.getByText(/no spam/i)).toBeInTheDocument()
  })

  it('shows loading state while submitting', async () => {
    mockFetch.mockImplementation(() => new Promise(() => {})) // never resolves

    render(<NewsletterSignup />)
    const input = screen.getByPlaceholderText('you@example.com')
    const button = screen.getByRole('button', { name: /sign up/i })

    fireEvent.change(input, { target: { value: 'test@example.com' } })
    fireEvent.click(button)

    expect(await screen.findByText(/signing up/i)).toBeInTheDocument()
    expect(button).toBeDisabled()
  })

  it('shows success state after successful submission', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    })

    render(<NewsletterSignup />)
    const input = screen.getByPlaceholderText('you@example.com')
    fireEvent.change(input, { target: { value: 'test@example.com' } })
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }))

    expect(await screen.findByText(/you're signed up/i)).toBeInTheDocument()
  })

  it('shows error state on failed submission', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Server error' }),
    })

    render(<NewsletterSignup />)
    const input = screen.getByPlaceholderText('you@example.com')
    fireEvent.change(input, { target: { value: 'test@example.com' } })
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }))

    expect(await screen.findByText(/server error/i)).toBeInTheDocument()
  })

  it('calls the newsletter API with the correct payload', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    })

    render(<NewsletterSignup location="homepage" />)
    const input = screen.getByPlaceholderText('you@example.com')
    fireEvent.change(input, { target: { value: 'user@example.com' } })
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }))

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        '/api/newsletter',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ email: 'user@example.com', location: 'homepage' }),
        })
      )
    })
  })

  it('renders inverted variant without crashing', () => {
    render(<NewsletterSignup variant="inverted" />)
    expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument()
  })

  it('does not submit with empty email', async () => {
    render(<NewsletterSignup />)
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }))
    expect(mockFetch).not.toHaveBeenCalled()
  })
})
