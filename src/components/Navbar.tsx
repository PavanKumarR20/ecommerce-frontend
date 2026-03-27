import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { useCart } from '@/context/CartContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { items } = useCart()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const cartCount = items.reduce((n, i) => n + i.quantity, 0)
  const close = () => setOpen(false)

  function handleLogout() {
    logout()
    close()
    navigate('/')
  }

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `block py-2 text-sm font-medium transition-colors ${isActive ? 'text-indigo-600' : 'text-gray-600 hover:text-gray-900'}`

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-indigo-600 tracking-tight" onClick={close}>
          ShopApp
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-6">
          <NavLink to="/" end className={({ isActive }) => `text-sm font-medium transition-colors ${isActive ? 'text-indigo-600' : 'text-gray-600 hover:text-gray-900'}`}>
            Home
          </NavLink>

          <NavLink to="/cart" className={({ isActive }) => `relative text-sm font-medium transition-colors ${isActive ? 'text-indigo-600' : 'text-gray-600 hover:text-gray-900'}`}>
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </NavLink>

          {user ? (
            <>
              <NavLink to="/orders" className={({ isActive }) => `text-sm font-medium transition-colors ${isActive ? 'text-indigo-600' : 'text-gray-600 hover:text-gray-900'}`}>
                Orders
              </NavLink>
              <span className="text-sm text-gray-500">Hi, {user.name}</span>
              <button onClick={handleLogout} className="text-sm font-medium text-red-500 hover:text-red-700 transition-colors">
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={({ isActive }) => `text-sm font-medium transition-colors ${isActive ? 'text-indigo-600' : 'text-gray-600 hover:text-gray-900'}`}>
                Login
              </NavLink>
              <NavLink to="/signup" className="text-sm font-medium bg-indigo-600 text-white px-4 py-1.5 rounded-md hover:bg-indigo-700 transition-colors">
                Sign Up
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile: cart badge + hamburger */}
        <div className="flex sm:hidden items-center gap-3">
          <NavLink to="/cart" className={({ isActive }) => `relative text-sm font-medium transition-colors ${isActive ? 'text-indigo-600' : 'text-gray-600'}`} onClick={close}>
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </NavLink>
          <button
            onClick={() => setOpen((o) => !o)}
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {open ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {open && (
        <div className="sm:hidden border-t border-gray-100 bg-white px-4 pb-4">
          <NavLink to="/" end className={linkClass} onClick={close}>Home</NavLink>
          {user ? (
            <>
              <NavLink to="/orders" className={linkClass} onClick={close}>Orders</NavLink>
              <p className="py-2 text-sm text-gray-500">Hi, {user.name}</p>
              <button onClick={handleLogout} className="block py-2 text-sm font-medium text-red-500 hover:text-red-700 transition-colors w-full text-left">
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={linkClass} onClick={close}>Login</NavLink>
              <NavLink to="/signup" className={linkClass} onClick={close}>Sign Up</NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
