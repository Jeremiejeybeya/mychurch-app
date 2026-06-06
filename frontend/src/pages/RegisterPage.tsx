import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/slices/authStore'
import toast from 'react-hot-toast'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { register } = useAuthStore()
  const [form, setForm] = useState({ firstName:'', lastName:'', email:'', password:'', confirm:'' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password !== form.confirm) { toast.error('Les mots de passe ne correspondent pas'); return }
    setLoading(true)
    try {
      await register(form.firstName, form.lastName, form.email, form.password)
      toast.success('Compte créé !')
      navigate('/')
    } catch { toast.error('Erreur lors de la création du compte') }
    finally { setLoading(false) }
  }

  const f = (k:string) => (e:React.ChangeEvent<HTMLInputElement>) => setForm(p=>({...p,[k]:e.target.value}))

  return (
    <div className="auth-page">
      <div className="auth-header">
        <div className="auth-logo">✝</div>
        <div className="auth-title">My<span style={{color:'var(--gold)'}}>Church</span></div>
        <div className="auth-subtitle">Créer votre compte</div>
      </div>
      <div className="auth-form">
        <h2 style={{fontFamily:'Syne,sans-serif',fontWeight:700,fontSize:20,color:'var(--navy)',marginBottom:20}}>Inscription</h2>
        <form onSubmit={handleSubmit}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:0}}>
            <div className="form-group">
              <label className="form-label">Prénom</label>
              <input type="text" required value={form.firstName} onChange={f('firstName')} className="form-input" placeholder="Jean" />
            </div>
            <div className="form-group">
              <label className="form-label">Nom</label>
              <input type="text" required value={form.lastName} onChange={f('lastName')} className="form-input" placeholder="Dupont" />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input type="email" required value={form.email} onChange={f('email')} className="form-input" placeholder="votre@email.com" />
          </div>
          <div className="form-group">
            <label className="form-label">Mot de passe</label>
            <input type="password" required value={form.password} onChange={f('password')} className="form-input" placeholder="Min. 8 caractères" />
          </div>
          <div className="form-group">
            <label className="form-label">Confirmer</label>
            <input type="password" required value={form.confirm} onChange={f('confirm')} className="form-input" placeholder="Répéter le mot de passe" />
          </div>
          <button type="submit" disabled={loading} className="auth-btn">
            {loading ? '⏳ Création...' : '✨ Créer mon compte'}
          </button>
        </form>
        <p style={{textAlign:'center',marginTop:16,fontSize:14,color:'var(--muted)'}}>
          Déjà un compte ? <Link to="/login" className="auth-link">Se connecter</Link>
        </p>
      </div>
    </div>
  )
}
