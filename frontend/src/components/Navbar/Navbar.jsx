import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaGripLines } from 'react-icons/fa'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const role = useSelector((state) => state.auth.role)

  const links = [
    { title: 'Home', link: '/' },
    { title: 'All Books', link: '/all-books' },
    ...(isLoggedIn ? [{ title: 'Cart', link: '/cart' }] : []),
    ...(isLoggedIn && role === 'user'
      ? [{ title: 'Profile', link: '/profile' }]
      : []),
    ...(isLoggedIn && role === 'admin'
      ? [{ title: 'Admin Profile', link: '/profile' }]
      : []),
  ]

  const [isMobileNavVisible, setMobileNavVisible] = useState(false)

  const handleToggleMobileNav = () => {
    setMobileNavVisible(!isMobileNavVisible)
  }

  const renderAuthButtons = (extraClasses = '') => {
    if (!isLoggedIn) {
      return (
        <div className={`flex gap-4 ${extraClasses}`}>
          <Link
            to="/Login"
            className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
          >
            Login
          </Link>
          <Link
            to="/SignUp"
            className="px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
          >
            SignUp
          </Link>
        </div>
      )
    }
    return null
  }

  return (
    <>
      {/* Navbar */}
      <nav className="z-50 relative flex bg-zinc-800 text-white px-8 py-4 items-center justify-between">
        <Link to="/" className="flex items-center">
          <img className="h-10 me-4" src="/logo.png" alt="logo" />
          <h1 className="text-2xl font-semibold">RAKBUKU.ID</h1>
        </Link>
        <div className="nav-links-rakbuku block md:flex items-center gap-4">
          <div className="hidden md:flex gap-4">
            {links.map((item, index) => (
              <Link
                to={item.link}
                key={index}
                className={
                  item.title.includes('Profile')
                    ? 'px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'
                    : 'hover:text-blue-500 transition-all duration-300'
                }
              >
                {item.title}
              </Link>
            ))}
          </div>
          {renderAuthButtons('hidden md:flex')}
          <button
            className="block md:hidden text-white text-2xl hover:text-zinc-400"
            onClick={handleToggleMobileNav}
          >
            <FaGripLines />
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMobileNavVisible && (
        <div className="bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center">
          {links.map((item, index) => (
            <Link
              to={item.link}
              key={index}
              className="text-white text-4xl font-semibold mb-8 hover:text-blue-500 transition-all duration-300"
              onClick={handleToggleMobileNav}
            >
              {item.title}
            </Link>
          ))}
          {renderAuthButtons('flex flex-col gap-4')}
        </div>
      )}
    </>
  )
}

export default Navbar
