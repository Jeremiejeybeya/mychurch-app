import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/slices/authStore'
import toast from 'react-hot-toast'

export default function Navbar() {
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuthStore()

  return (
    <div className="app-topbar">
      <Link to="/" className="app-topbar-logo">
        <div className="app-topbar-logo-icon">✝</div>
        <div className="app-topbar-logo-text">My<span>Church</span></div>
      </Link>
      <div className="app-topbar-actions">
        <button className="app-icon-btn" onClick={() => toast('Notifications bientôt!', {icon:'🔔'})}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
        </button>
        <button className="app-icon-btn" onClick={() => isAuthenticated ? navigate('/profile') : navigate('/login')}>
          {isAuthenticated && user ? (
            <span style={{fontSize:'11px',fontWeight:'800',color:'var(--gold)'}}>{user.firstName[0]}{user.lastName[0]}</span>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          )}
        </button>
      </div>
    </div>
  )
}
