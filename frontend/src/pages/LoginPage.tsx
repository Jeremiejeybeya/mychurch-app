import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/slices/authStore'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const [form, setForm] = useState({ email:'', password:'' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await login(form.email, form.password)
      toast.success('Connexion réussie !')
      navigate('/')
    } catch {
      toast.error('Email ou mot de passe incorrect')
    } finally { setLoading(false) }
  }

  return (
    <div className="auth-page">
      <div className="auth-header">
        <div className="auth-logo">✝</div>
        <div className="auth-title">My<span style={{color:'var(--gold)'}}>Church</span></div>
        <div className="auth-subtitle">Bienvenue dans votre communauté</div>
      </div>
      <div className="auth-form">
        <h2 style={{fontFamily:'Syne,sans-serif',fontWeight:700,fontSize:20,color:'var(--navy)',marginBottom:20}}>Connexion</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input type="email" required value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} className="form-input" placeholder="votre@email.com" />
          </div>
          <div className="form-group">
            <label className="form-label">Mot de passe</label>
            <input type="password" required value={form.password} onChange={e=>setForm(f=>({...f,password:e.target.value}))} className="form-input" placeholder="••••••••" />
          </div>
          <button type="submit" disabled={loading} className="auth-btn">
            {loading ? '⏳ Connexion...' : '🔐 Se connecter'}
          </button>
        </form>
        <p style={{textAlign:'center',marginTop:20,fontSize:14,color:'var(--muted)'}}>
          Pas encore de compte ? <Link to="/register" className="auth-link">S'inscrire</Link>
        </p>
        <div className="auth-demo">
          <div className="auth-demo-title">Compte de démonstration</div>
          <div className="auth-demo-info">Email: admin@mychurch.com<br/>Mot de passe: Admin1234!</div>
        </div>
      </div>
    </div>
  )
}
