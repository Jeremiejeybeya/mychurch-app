import { useState } from 'react'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import toast from 'react-hot-toast'

const ACTS = [
  {id:'1',title:'Tournoi de Basketball Inter-Dépts',description:'Grand tournoi annuel entre tous les départements. Snacks et boissons fournis.',date:'2025-06-14T09:00:00',location:'Gymnase St-Michel',dept:'Jeunesse',type:'Sport',emoji:'🏀',color:'#FFF7ED',tcolor:'#EA580C'},
  {id:'2',title:'Répétition Chorale & Orchestre',description:'Répétition générale pour le concert de fin d\'année.',date:'2025-06-20T18:30:00',location:'Salle de musique',dept:'Louange & Musique',type:'Arts',emoji:'🎵',color:'#F5F3FF',tcolor:'#7C3AED'},
  {id:'3',title:'Groupe Étude Biblique Adultes',description:'Étude du livre de l\'Apocalypse. Apportez votre Bible.',date:'2025-06-18T19:00:00',location:'Salle B',dept:'École du Dimanche',type:'Étude',emoji:'📚',color:'#FFF8EB',tcolor:'#C07B00'},
  {id:'4',title:'Sortie Famille au Parc',description:'Sortie famille pour les enfants de 0-12 ans avec leurs parents.',date:'2025-06-21T10:00:00',location:'Parc Maisonneuve',dept:"Enfants & Nurserie",type:'Famille',emoji:'🌳',color:'#EDFDF4',tcolor:'#059669'},
  {id:'5',title:'Retraite Femmes de Foi',description:'Week-end de retraite spirituelle. Thème: Femme forte selon Proverbes 31.',date:'2025-07-05T09:00:00',location:'Centre retraite Laurentides',dept:'Femmes de Foi',type:'Retraite',emoji:'🕊️',color:'#FDF2F8',tcolor:'#DB2777'},
  {id:'6',title:'Evangelisation Centre-Ville',description:'Sortie d\'évangélisation. Distribution de tracts et prière.',date:'2025-06-28T14:00:00',location:'Place des Arts',dept:'Évangélisation',type:'Mission',emoji:'✝️',color:'#FEF2F2',tcolor:'#DC2626'},
]

function Modal({a,onClose}:{a:any;onClose:()=>void}) {
  const [done,setDone]=useState(false)
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">{a.title}</span>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div style={{background:a.color,borderRadius:14,padding:'12px 14px',marginBottom:14,display:'flex',alignItems:'center',gap:12}}>
          <span style={{fontSize:30}}>{a.emoji}</span>
          <div>
            <span style={{fontSize:11,fontWeight:700,color:a.tcolor,textTransform:'uppercase'}}>{a.type} · {a.dept}</span>
            <div style={{fontSize:14,fontWeight:600,color:'var(--text)',marginTop:2}}>{a.title}</div>
          </div>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:7,marginBottom:12}}>
          <div style={{fontSize:13,color:'var(--muted)'}}>📅 {format(new Date(a.date),"EEEE d MMMM yyyy",{locale:fr})}</div>
          <div style={{fontSize:13,color:'var(--muted)'}}>🕐 {format(new Date(a.date),'HH:mm')}</div>
          <div style={{fontSize:13,color:'var(--muted)'}}>📍 {a.location}</div>
        </div>
        <p style={{fontSize:13,color:'var(--muted)',lineHeight:1.6,marginBottom:16}}>{a.description}</p>
        {!done
          ? <button onClick={()=>{setDone(true);toast.success('Participation confirmée !')}} className="btn-primary">Je participe !</button>
          : <div className="success-box"><div className="success-icon">✅</div><div className="success-text">Participation confirmée !</div></div>
        }
      </div>
    </div>
  )
}

export default function ActivitiesPage() {
  const [sel,setSel]=useState<any>(null)
  const [filter,setFilter]=useState('Tous')
  const types=['Tous','Sport','Arts','Étude','Famille','Mission','Retraite']
  const filtered=filter==='Tous'?ACTS:ACTS.filter(a=>a.type===filter)
  return (
    <div style={{paddingBottom:24}}>
      {sel&&<Modal a={sel} onClose={()=>setSel(null)} />}
      <div style={{background:'var(--navy)',padding:'20px 20px 24px'}}>
        <h1 style={{fontFamily:'Syne,sans-serif',fontWeight:900,fontSize:22,color:'#fff',marginBottom:4}}>Activités</h1>
        <p style={{color:'rgba(255,255,255,0.5)',fontSize:13}}>{ACTS.length} activités programmées</p>
      </div>
      <div style={{padding:'12px 20px'}}>
        <div className="filter-row">
          {types.map(t=><button key={t} onClick={()=>setFilter(t)} className={`filter-chip${filter===t?' active':''}`}>{t}</button>)}
        </div>
      </div>
      <div style={{padding:'0 20px',display:'flex',flexDirection:'column',gap:10}}>
        {filtered.map(a=>(
          <div key={a.id} onClick={()=>setSel(a)}
            style={{background:'#fff',borderRadius:16,border:'1px solid var(--border)',padding:'12px 14px',display:'flex',alignItems:'center',gap:12,cursor:'pointer',transition:'all 0.2s'}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--blue)';e.currentTarget.style.boxShadow='0 3px 12px rgba(26,86,219,0.07)'}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.boxShadow='none'}}>
            <div style={{width:48,height:48,borderRadius:14,background:a.color,display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,flexShrink:0}}>{a.emoji}</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:13,fontWeight:600,color:'var(--text)',marginBottom:4,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{a.title}</div>
              <div style={{fontSize:11,color:'var(--muted)',display:'flex',alignItems:'center',gap:4}}>
                📅 {format(new Date(a.date),'EEE d MMM',{locale:fr})} · 🕐 {format(new Date(a.date),'HH:mm')}
              </div>
              <div style={{fontSize:10,color:'#C5C7D4',marginTop:2}}>{a.dept}</div>
            </div>
            <span style={{color:'var(--muted)',fontSize:20}}>›</span>
          </div>
        ))}
      </div>
    </div>
  )
}
