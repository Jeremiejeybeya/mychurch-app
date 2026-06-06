import { useNavigate } from 'react-router-dom'
import { useLiveStatus } from '../hooks/useSermons'
import { useUpcomingEvents } from '../hooks/useEvents'
import { useDonationStats } from '../hooks/useDonations'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

const VERSES = [
  { ref:'Jean 3:16', text:'"Car Dieu a tant aimé le monde qu\'il a donné son Fils unique, afin que quiconque croit en lui ne périsse pas, mais qu\'il ait la vie éternelle."' },
  { ref:'Psaumes 23:1', text:'"L\'Éternel est mon berger: je ne manquerai de rien."' },
  { ref:'Philippiens 4:13', text:'"Je puis tout par celui qui me fortifie."' },
  { ref:'Proverbes 3:5', text:'"Confie-toi en l\'Éternel de tout ton cœur, et ne t\'appuie pas sur ta sagesse."' },
  { ref:'Jérémie 29:11', text:'"Car je connais les projets que j\'ai formés sur vous, projets de paix et non de malheur."' },
]

const QUICK = [
  { to:'/bible', emoji:'📖', label:'Bible', cls:'qi-blue' },
  { to:'/sermons', emoji:'🎬', label:'Prédications', cls:'qi-gold' },
  { to:'/donations', emoji:'💛', label:'Dons', cls:'qi-green' },
  { to:'/events', emoji:'📅', label:'Agenda', cls:'qi-navy' },
  { to:'/gallery', emoji:'🖼️', label:'Galerie', cls:'qi-purple' },
  { to:'/departments', emoji:'👥', label:'Dépts', cls:'qi-teal' },
  { to:'/activities', emoji:'⭐', label:'Activités', cls:'qi-pink' },
  { to:'#', emoji:'📍', label:'Trouver', cls:'qi-red' },
]

const CAT_TAG: Record<string, {bg:string;color:string;label:string}> = {
  Culte:{bg:'var(--blue-light)',color:'var(--blue)',label:'Culte'},
  Sacrement:{bg:'var(--gold-light)',color:'var(--gold-dark)',label:'Sacrement'},
  Social:{bg:'#EDFDF4',color:'#059669',label:'Social'},
  Etude:{bg:'#EEF2FF',color:'#4F46E5',label:'Étude'},
  Jeunesse:{bg:'#FDF2F8',color:'#DB2777',label:'Jeunesse'},
  Autre:{bg:'#F3F4F6',color:'#6B7280',label:'Autre'},
}

const DEMO_EVENTS = [
  { id:'1', title:'Nuit de Prière & Louange', startDate:'2025-06-15T21:00:00', location:'Salle principale', category:'Culte', requiresRegistration:true },
  { id:'2', title:'Baptêmes du Printemps 2025', startDate:'2025-06-22T14:00:00', location:'Piscine', category:'Sacrement', requiresRegistration:true },
  { id:'3', title:'Pique-nique Communautaire', startDate:'2025-06-29T12:00:00', location:'Parc municipal', category:'Social', requiresRegistration:false },
]

export default function HomePage() {
  const navigate = useNavigate()
  const { data: liveStatus } = useLiveStatus()
  const { data: events } = useUpcomingEvents()
  const { data: stats } = useDonationStats()
  const vi = new Date().getDay() % VERSES.length
  const verse = VERSES[vi]
  const allEvents = events?.length ? events : DEMO_EVENTS

  return (
    <div style={{paddingBottom:24}}>
      {/* HERO */}
      <div className="hero">
        {liveStatus?.isLive && (
          <div className="hero-live">
            <span className="hero-live-dot"></span> DIRECT EN COURS
          </div>
        )}
        <div className="hero-date">{format(new Date(), "EEEE d MMMM yyyy", {locale:fr})}</div>
        <div className="hero-title">Bienvenue chez<br/>MyChurch 🙏</div>
        <div className="hero-verse">{verse.text.slice(0,80)}... — {verse.ref}</div>
        <div className="hero-actions">
          <button className="btn-gold" onClick={() => navigate('/sermons')}>
            ▶ Dernière Prédication
          </button>
          <button className="btn-ghost" onClick={() => navigate('/events')}>
            📅 Agenda
          </button>
        </div>
      </div>

      {/* QUICK */}
      <div className="section">
        <div className="section-header">
          <span className="section-title">Accès rapides</span>
        </div>
        <div className="quick-grid">
          {QUICK.map(q => (
            <button key={q.label} className="qi" onClick={() => navigate(q.to)}>
              <div className={`qi-icon ${q.cls}`}>{q.emoji}</div>
              <span className="qi-label">{q.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* STATS */}
      {(stats || true) && (
        <>
          <div className="divider"></div>
          <div className="section">
            <div className="section-header"><span className="section-title">Communauté</span></div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
              <div className="stat-card">
                <div className="stat-val">${(stats?.totalThisMonth ?? 12450).toLocaleString()}</div>
                <div className="stat-lbl">Dons ce mois</div>
              </div>
              <div className="stat-card">
                <div className="stat-val" style={{color:'var(--gold-dark)'}}>{stats?.activeDonors ?? 247}</div>
                <div className="stat-lbl">Donateurs actifs</div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* VERSET */}
      <div className="divider"></div>
      <div className="section">
        <div className="section-header">
          <span className="section-title">Verset du jour</span>
          <button className="see-all" onClick={() => navigate('/bible')}>Lire la Bible →</button>
        </div>
        <div className="bible-card">
          <div className="bible-ref">📖 {verse.ref}</div>
          <div className="bible-text">{verse.text}</div>
          <div className="bible-nav">
            <button className="bible-share">↗ Partager</button>
            <div style={{display:'flex',gap:6}}>
              <button className="bible-nav-btn">←</button>
              <button className="bible-nav-btn">→</button>
            </div>
          </div>
        </div>
      </div>

      {/* SERMONS */}
      <div className="divider"></div>
      <div className="section">
        <div className="section-header">
          <span className="section-title">Prédications récentes</span>
          <button className="see-all" onClick={() => navigate('/sermons')}>Voir tout →</button>
        </div>
        <div className="hscroll">
          {[
            {title:"La foi qui déplace les montagnes",speaker:"Pasteur Jean",date:"2 juin 2025",g:"linear-gradient(135deg,#0D1B3E,#1A56DB)"},
            {title:"Marcher dans la grâce divine",speaker:"Pasteur Marie",date:"25 mai 2025",g:"linear-gradient(135deg,#7C3AED,#1a3a8a)"},
            {title:"Les fruits de l'Esprit Saint",speaker:"Pasteur Jean",date:"18 mai 2025",g:"linear-gradient(135deg,#059669,#1A56DB)"},
          ].map((s,i) => (
            <div className="vcard" key={i} onClick={() => navigate('/sermons')}>
              <div className="vthumb" style={{background:s.g}}>
                <div className="vplay">▶</div>
                <div className="vduration">42:18</div>
              </div>
              <div className="vinfo">
                <div className="vtitle">{s.title}</div>
                <div className="vmeta">{s.speaker} · {s.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* EVENTS */}
      <div className="divider"></div>
      <div className="section" style={{paddingBottom:20}}>
        <div className="section-header">
          <span className="section-title">Prochains événements</span>
          <button className="see-all" onClick={() => navigate('/events')}>Voir tout →</button>
        </div>
        {allEvents.slice(0,3).map((ev:any) => {
          const cat = CAT_TAG[ev.category] ?? CAT_TAG.Autre
          return (
            <div className="ecard" key={ev.id} onClick={() => navigate('/events')}>
              <div className="edate">
                <div className="eday">{format(new Date(ev.startDate),'d')}</div>
                <div className="emon">{format(new Date(ev.startDate),'MMM',{locale:fr})}</div>
              </div>
              <div>
                <div className="ename">{ev.title}</div>
                <div className="emeta">
                  🕐 {format(new Date(ev.startDate),'HH:mm')}
                  <span className="etag" style={{background:cat.bg,color:cat.color}}>{cat.label}</span>
                </div>
              </div>
            </div>
          )
        })}
        {allEvents.length === 0 && <p style={{color:'var(--muted)',fontSize:13,textAlign:'center',padding:'16px 0'}}>Aucun événement à venir</p>}
      </div>
    </div>
  )
}
