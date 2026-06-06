import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/slices/authStore'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function ProfilePage() {
  const navigate = useNavigate()
  const { user, logout, isAuthenticated } = useAuthStore()
  const [notifs,setNotifs] = useState(true)

  if (!isAuthenticated) { navigate('/login'); return null }

  const initials = user ? (user.firstName[0]+user.lastName[0]).toUpperCase() : 'MC'

  return (
    <div style={{paddingBottom:32}}>
      <div style={{background:'var(--navy)',padding:'24px 20px 36px',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:-20,right:-20,width:100,height:100,background:'rgba(255,255,255,0.05)',borderRadius:'50%'}}></div>
        <div style={{display:'flex',alignItems:'center',gap:14}}>
          <div style={{width:60,height:60,background:'var(--gold)',borderRadius:18,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Syne,sans-serif',fontWeight:900,fontSize:22,color:'var(--navy)',flexShrink:0}}>{initials}</div>
          <div>
            <div style={{fontFamily:'Syne,sans-serif',fontWeight:700,fontSize:19,color:'#fff'}}>{user?`${user.firstName} ${user.lastName}`:'Visiteur'}</div>
            <div style={{color:'rgba(255,255,255,0.5)',fontSize:13}}>{user?.email??''}</div>
            <span style={{display:'inline-block',background:'rgba(245,166,35,0.2)',color:'var(--gold)',fontSize:11,fontWeight:700,padding:'2px 10px',borderRadius:50,marginTop:4}}>{user?.role??'Membre'}</span>
          </div>
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10,padding:'12px 20px',marginTop:-16}}>
        {[{val:'12',lbl:'Dons',color:'var(--gold-dark)'},{val:'8',lbl:'Événements',color:'var(--blue)'},{val:'2',lbl:'Dépts',color:'#059669'}].map(s=>(
          <div key={s.lbl} style={{background:'#fff',borderRadius:14,padding:'12px 8px',textAlign:'center',boxShadow:'0 2px 12px rgba(0,0,0,0.06)',border:'1px solid var(--border)'}}>
            <div style={{fontFamily:'Syne,sans-serif',fontWeight:900,fontSize:20,color:s.color}}>{s.val}</div>
            <div style={{fontSize:11,color:'var(--muted)',marginTop:2}}>{s.lbl}</div>
          </div>
        ))}
      </div>

      <div style={{padding:'0 20px',display:'flex',flexDirection:'column',gap:12}}>
        <div style={{background:'#fff',borderRadius:16,border:'1px solid var(--border)',overflow:'hidden'}}>
          <div style={{fontSize:11,fontWeight:700,color:'var(--muted)',textTransform:'uppercase',letterSpacing:'0.8px',padding:'14px 16px 8px'}}>Paramètres</div>
          <div style={{borderTop:'1px solid var(--gray)',padding:'13px 16px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <span style={{fontSize:14,fontWeight:500,color:'var(--text)'}}>🔔 Notifications</span>
            <div onClick={()=>setNotifs(n=>!n)} style={{width:44,height:26,borderRadius:50,background:notifs?'var(--blue)':'var(--gray)',cursor:'pointer',position:'relative',transition:'background 0.2s'}}>
              <div style={{position:'absolute',top:3,left:notifs?20:3,width:20,height:20,background:'#fff',borderRadius:'50%',boxShadow:'0 1px 4px rgba(0,0,0,0.2)',transition:'left 0.2s'}}></div>
            </div>
          </div>
          <div style={{borderTop:'1px solid var(--gray)',padding:'13px 16px',display:'flex',alignItems:'center',justifyContent:'space-between',cursor:'pointer'}}>
            <span style={{fontSize:14,fontWeight:500,color:'var(--text)'}}>🛡️ Confidentialité</span>
            <span style={{color:'var(--muted)'}}>›</span>
          </div>
          <div style={{borderTop:'1px solid var(--gray)',padding:'13px 16px',display:'flex',alignItems:'center',justifyContent:'space-between',cursor:'pointer'}}>
            <span style={{fontSize:14,fontWeight:500,color:'var(--text)'}}>❓ Aide & Support</span>
            <span style={{color:'var(--muted)'}}>›</span>
          </div>
        </div>

        <div style={{background:'var(--blue-light)',borderRadius:16,padding:16}}>
          <div style={{fontFamily:'Syne,sans-serif',fontWeight:700,color:'var(--navy)',fontSize:14,marginBottom:6}}>MyChurch — Montréal</div>
          <div style={{fontSize:12,color:'rgba(26,86,219,0.7)',lineHeight:1.7}}>123 Rue Principale, Montréal QC H1A 1A1<br/>Culte: Dimanche 10h00 & 18h00<br/>info@mychurch.ca · (514) 555-0123</div>
        </div>

        <button onClick={()=>{logout();toast.success('Déconnexion réussie');navigate('/login')}}
          style={{width:'100%',background:'#FEF2F2',color:'#DC2626',border:'none',padding:14,borderRadius:14,fontWeight:600,fontSize:14,cursor:'pointer'}}>
          🚪 Se déconnecter
        </button>
        <p style={{textAlign:'center',fontSize:11,color:'var(--muted)'}}>MyChurch App v1.0.0</p>
      </div>
    </div>
  )
}
