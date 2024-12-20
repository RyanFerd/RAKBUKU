import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import Sidebar from './Sidebar'
import '@testing-library/jest-dom'
import * as router from 'react-router'
import { vi } from 'vitest'

const navigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => navigate
  }
})

const createTestStore = (role = 'user') => {
  return configureStore({
    reducer: {
      auth: (state = { role }, action) => {
        switch (action.type) {
          case 'auth/logout':
            return { ...state, isAuthenticated: false }
          case 'auth/changeRole':
            return { ...state, role: action.payload }
          default:
            return state
        }
      }
    }
  })
}

describe('Sidebar Component', () => {
  const mockUser = {
    avatar: '/test-avatar.jpg',
    username: 'Test User',
    email: 'test@example.com'
  }

  beforeEach(() => {
    vi.clearAllMocks()
    Storage.prototype.clear = vi.fn()
  })

  it('renders user data correctly', () => {
    const store = createTestStore()
    
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Sidebar data={mockUser} />
        </MemoryRouter>
      </Provider>
    )

    expect(screen.getByAltText('Avatar')).toHaveAttribute('src', mockUser.avatar)
    expect(screen.getByText(mockUser.username)).toBeInTheDocument()
    expect(screen.getByText(mockUser.email)).toBeInTheDocument()
  })

  it('shows user menu items when role is user', () => {
    const store = createTestStore('user')
    
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Sidebar data={mockUser} />
        </MemoryRouter>
      </Provider>
    )

    expect(screen.getByText('Favourites')).toBeInTheDocument()
    expect(screen.getByText('Order History')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
  })

  it('shows admin menu items when role is admin', () => {
    const store = createTestStore('admin')
    
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Sidebar data={mockUser} />
        </MemoryRouter>
      </Provider>
    )

    expect(screen.getByText('All Orders')).toBeInTheDocument()
    expect(screen.getByText('Add Books')).toBeInTheDocument()
  })

  it('performs logout when logout button is clicked', () => {
    const store = createTestStore('user')
    
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Sidebar data={mockUser} />
        </MemoryRouter>
      </Provider>
    )

    const logoutButton = screen.getByText(/Log Out/i)
    fireEvent.click(logoutButton)

    expect(localStorage.clear).toHaveBeenCalled()
    expect(navigate).toHaveBeenCalledWith('/login')
  })
})