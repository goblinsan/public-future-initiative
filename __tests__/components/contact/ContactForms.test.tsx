import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ContactForms from '@/components/contact/ContactForms'

// Mock fetch
const mockFetch = jest.fn()
global.fetch = mockFetch

beforeEach(() => {
  mockFetch.mockReset()
})

describe('ContactForms', () => {
  it('renders the tab bar', () => {
    render(<ContactForms />)
    expect(screen.getByRole('button', { name: /general/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /media/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /partner/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /speaking/i })).toBeInTheDocument()
  })

  it('renders the general form by default', () => {
    render(<ContactForms />)
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
  })

  it('switches to media form tab', () => {
    render(<ContactForms />)
    fireEvent.click(screen.getByRole('button', { name: /media/i }))
    expect(screen.getByLabelText(/publication or outlet/i)).toBeInTheDocument()
  })

  it('switches to partner form tab', () => {
    render(<ContactForms />)
    fireEvent.click(screen.getByRole('button', { name: /partner/i }))
    expect(screen.getByLabelText(/what kind of partnership/i)).toBeInTheDocument()
  })

  it('switches to speaking form tab', () => {
    render(<ContactForms />)
    fireEvent.click(screen.getByRole('button', { name: /speaking/i }))
    expect(screen.getByLabelText(/event or opportunity/i)).toBeInTheDocument()
  })

  it('shows loading state on general form submit', async () => {
    mockFetch.mockImplementation(() => new Promise(() => {})) // never resolves

    render(<ContactForms />)
    fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: 'Alice' } })
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'alice@example.com' } })
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Hello there' } })
    fireEvent.click(screen.getByRole('button', { name: /send message/i }))

    expect(await screen.findByText(/sending/i)).toBeInTheDocument()
  })

  it('shows success state after submission', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    })

    render(<ContactForms />)
    fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: 'Alice' } })
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'alice@example.com' } })
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Hello' } })
    fireEvent.click(screen.getByRole('button', { name: /send message/i }))

    expect(await screen.findByText(/message received/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send another message/i })).toBeInTheDocument()
  })

  it('shows error state on failed submission', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Server error' }),
    })

    render(<ContactForms />)
    fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: 'Alice' } })
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'alice@example.com' } })
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Hello' } })
    fireEvent.click(screen.getByRole('button', { name: /send message/i }))

    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument()
  })

  it('allows resetting after success', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    })

    render(<ContactForms />)
    fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: 'Alice' } })
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'alice@example.com' } })
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Hello' } })
    fireEvent.click(screen.getByRole('button', { name: /send message/i }))

    await screen.findByText(/message received/i)
    fireEvent.click(screen.getByRole('button', { name: /send another message/i }))

    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
  })

  it('calls the contact API with correct type', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    })

    render(<ContactForms />)
    fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: 'Bob' } })
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'bob@example.com' } })
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'A question' } })
    fireEvent.click(screen.getByRole('button', { name: /send message/i }))

    await waitFor(() => {
      const body = JSON.parse(mockFetch.mock.calls[0][1].body)
      expect(body.type).toBe('general')
      expect(body.name).toBe('Bob')
      expect(body.email).toBe('bob@example.com')
    })
  })
})
