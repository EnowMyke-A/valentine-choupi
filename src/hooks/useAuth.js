import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // Check authentication status on mount and route change
    const authStatus = localStorage.getItem('valentine-auth') === 'true'
    setIsAuthenticated(authStatus)
    setIsLoading(false)

    // If not authenticated and not on entry page, redirect to entry
    if (!authStatus && location.pathname !== '/') {
      navigate('/', { replace: true })
    }
  }, [location.pathname, navigate])

  const login = () => {
    setIsAuthenticated(true)
    localStorage.setItem('valentine-auth', 'true')
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('valentine-auth')
    navigate('/', { replace: true })
  }

  return { isAuthenticated, isLoading, login, logout }
}

export default useAuth
