import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import BookCard from './BookCard'
import '@testing-library/jest-dom'
import axios from 'axios'

vi.mock('axios')

// Mock window.alert
const alertMock = vi.fn()
window.alert = alertMock

describe('BookCard', () => {
  const mockData = {
    _id: '123',
    url: 'https://example.com/book-cover.jpg',
    title: 'Test Book',
    author: 'Test Author',
    price: 100000,
  }

  // Setup localStorage mock untuk authentication
  beforeEach(() => {
    vi.clearAllMocks()
    
    // Mock localStorage untuk menyediakan token dan user id
    Storage.prototype.getItem = vi.fn((key) => {
      if (key === 'token') return 'dummy-token'
      if (key === 'id') return 'dummy-user-id'
      return null
    })

    // Setup axios mock
    axios.put.mockResolvedValue({ 
      data: { message: 'Book removed from favourite' } 
    })
  })

  it('renders book details correctly', () => {
    render(
      <MemoryRouter>
        <BookCard data={mockData} favourite={true} />
      </MemoryRouter>
    )

    expect(screen.getByText('Test Book')).toBeInTheDocument()
    expect(screen.getByText('by Test Author')).toBeInTheDocument()
    expect(screen.getByText(/Rp.?100\.000/)).toBeInTheDocument()
  })

  it('calls handleRemoveBook when remove button is clicked', async () => {
    render(
      <MemoryRouter>
        <BookCard data={mockData} favourite={true} />
      </MemoryRouter>
    )

    const removeButton = screen.getByText('Remove From favourite')
    fireEvent.click(removeButton)

    await waitFor(() => {
      // Verifikasi axios.put dipanggil dengan parameter yang benar
      expect(axios.put).toHaveBeenCalledWith(
        'http://localhost:1000/api/v1/remove-book-from-favourite',
        {},
        {
          headers: {
            id: 'dummy-user-id',
            authorization: 'Bearer dummy-token',
            bookid: mockData._id,
          }
        }
      )

      // Verifikasi alert dipanggil
      expect(alertMock).toHaveBeenCalled()
    })
  })
})