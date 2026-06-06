import { useState } from 'react'
import { useAllEvents } from '../hooks/useEvents'
import type { ChurchEvent, EventCategory } from '../types'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import toast from 'react-hot-toast'

const DEMO: ChurchEvent[] = [
  {id:'1',title:'Culte Dominical',description:'Notre culte hebdomadaire de louange et d\'adoration.',startDate:'2025-06-08T10:00:00',endDate:'2025-06-08T12:00:00',location:'Salle principale',category:'Culte',maxCapacity:200,requiresRegistration:false,registrationCount:87,isActive:true},
  {id:'2',title:'Étude Biblique',description:'Étude approfondie de l\'épître aux Romains.',startDate:'2025-06-12T19:00:00',endDate:'2025-06-12T21:00:00',location:'Salle B',category:'Etude',maxCapacity:50,requiresRegistration:true,registrationCount:23,isActive:true},
  {id:'3',title:'Nuit de Prière & Louange',description:'Une nuit entière consacrée à la prière et la louange.',startDate:'2025-06-15T21:00:00',endDate:'2025-06-16T05:00:00',location:'Salle principale',category:'Culte',maxCapacity:150,requiresRegistration:true,registrationCount:64,isActive:true},
  {id:'4',title:'Baptêmes du Printemps 2025',description:'Cérémonie de baptême par immersion pour tous les nouveaux croyants.',startDate:'2025-06-22T14:00:00',endDate:'2025-06-22T17:00:00',location:'Piscine communautaire',category:'Sacrement',requiresRegistration:true,registrationCount:12,isActive:true},
  {id:'5',title:'Pique-nique Communautaire',description:'Grande rencontre en famille ! BBQ, jeux pour enfants.',startDate:'2025-06-29T12:00:00',endDate:'2025-06-29T18:00:00',location:'Parc municipal',category:'Social',requiresRegistration:false,registrationCount:145,isActive:true},
  {id:'6',title:'Camp Jeunesse Été 2025',description:'3 jours de camp spirituel pour les 15-30 ans.',startDate:'2025-07-11T08:00:00',endDate:'2025-07-13T18:00:00',location:'Centre de retraite Lac Bleu',category:'Jeunesse',maxCapacity:60,requiresRegistration:true,registrationCount:38,isActive:true},
]

const CAT: Record<string,{bg:string;color:string;label:string}> = {
  Culte:{bg:'var(--blue-light)',color:'var(--blue)',label:'Culte'},
  Sacrement:{bg:'var(--gold-light)',color:'var(--gold-dark)',label:'Sacrement'},
  Social:{bg:'#EDFDF4',color:'#059669',label:'Social'},
  Etude:{bg:'#EEF2FF',color:'#4F46E5',label:'Étude'},
  Jeunesse:{bg:'#FDF2F8',color:'#DB2777',label:'Jeunesse'},
  Autre:{bg:'#F3F4F6',color:'#6B7280',label:'Autre'},
}

function Modal({ev,onClose}:{ev:ChurchEvent;onClose:()=>void}) {
  const [nom,setNom]=useState(''); const [email,setEmail]=useState(''); const [done,setDone]=useState(false)
  const cat = CAT[ev.category]??CAT.Autre
  const submit = (e:React.FormEvent) => { e.preventDefault(); setDone(true); toast.success('Inscription confirmée !') }
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">{ev.requiresRegistration?'S\'inscrire':'Détails'}</span>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div style={{background:cat.bg,borderRadius:14,padding:'12px 14px',marginBottom:16}}>
          <span style={{fontSize:11,fontWeight:700,color:cat.color,textTransform:'uppercase'}}>{cat.label}</span>
          <h3 style={{fontFamily:'Syne,sans-serif',fontWeight:700,color:'var(--navy)',fontSize:16,marginTop:3}}>{ev.title}</h3>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:8,marginBottom:14}}>
          <div style={{display:'flex',alignItems:'center',gap:8,fontSize:13,color:'var(--muted)'}}>📅 {format(new Date(ev.startDate),"EEEE d MMMM yyyy",{locale:fr})}</div>
          <div style={{display:'flex',alignItems:'center',gap:8,fontSize:13,color:'var(--muted)'}}>🕐 {format(new Date(ev.startDate),'HH:mm')} – {format(new Date(ev.endDate),'HH:mm')}</div>
          <div style={{display:'flex',alignItems:'center',gap:8,fontSize:13,color:'var(--muted)'}}>📍 {ev.location}</div>
          {ev.maxCapacity && <div style={{display:'flex',alignItems:'center',gap:8,fontSize:13,color:'var(--muted)'}}>👥 {ev.registrationCount}/{ev.maxCapacity} inscrits
            <div style={{flex:1,height:6,background:'var(--gray)',borderRadius:3,overflow:'hidden'}}>
              <div style={{height:'100%',background:'var(--blue)',width:`${Math.min(100,(ev.registrationCount/(ev.maxCapacity||1))*100)}%`,borderRadius:3}}></div>
            </div>
          </div>}
        </div>
        <p style={{fontSize:13,color:'var(--muted)',lineHeight:1.6,marginBottom:16}}>{ev.description}</p>
        {ev.requiresRegistration && !done && (
          <form onSubmit={submit}>
            <input required value={nom} onChange={e=>setNom(e.target.value)} placeholder="Nom complet *" className="app-input" />
            <input required type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email *" className="app-input" />
            <button type="submit" className="btn-primary">✓ Confirmer l'inscription</button>
          </form>
        )}
        {done && <div className="success-box"><div className="success-icon">✅</div><div className="success-text">Inscription confirmée !</div><div className="success-sub">Un email de confirmation vous sera envoyé.</div></div>}
        {!ev.requiresRegistration && <div style={{background:'var(--blue-light)',borderRadius:12,padding:'12px 14px',textAlign:'center',fontSize:13,fontWeight:600,color:'var(--blue)'}}>Entrée libre — pas d'inscription requise</div>}
      </div>
    </div>
  )
}

export default function EventsPage() {
  const {data:events} = useAllEvents()
  const [selected,setSelected] = useState<ChurchEvent|null>(null)
  const [filter,setFilter] = useState<string>('Tous')
  const all = events?.length ? events : DEMO
  const filtered = filter==='Tous' ? all : all.filter(e=>e.category===filter)
  const cats = ['Tous','Culte','Sacrement','Social','Etude','Jeunesse']

  return (
    <div style={{paddingBottom:24}}>
      {selected && <Modal ev={selected} onClose={()=>setSelected(null)} />}
      <div style={{background:'var(--navy)',padding:'20px 20px 24px'}}>
        <h1 style={{fontFamily:'Syne,sans-serif',fontWeight:900,fontSize:22,color:'#fff',marginBottom:4}}>Événements</h1>
        <p style={{color:'rgba(255,255,255,0.5)',fontSize:13}}>{all.length} événements à venir</p>
      </div>
      <div style={{padding:'14px 20px 12px'}}>
        <div className="filter-row">
          {cats.map(c => <button key={c} onClick={()=>setFilter(c)} className={`filter-chip${filter===c?' active':''}`}>{c==='Etude'?'Étude':c}</button>)}
        </div>
      </div>
      <div style={{padding:'0 20px'}}>
        {filtered.map(ev => {
          const cat = CAT[ev.category]??CAT.Autre
          return (
            <div key={ev.id} className="ecard" onClick={()=>setSelected(ev)}>
              <div className="edate">
                <div className="eday">{format(new Date(ev.startDate),'d')}</div>
                <div className="emon">{format(new Date(ev.startDate),'MMM',{locale:fr})}</div>
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:8,marginBottom:4}}>
                  <div className="ename">{ev.title}</div>
                  <span style={{color:'var(--muted)',fontSize:18,flexShrink:0}}>›</span>
                </div>
                <div className="emeta">
                  🕐 {format(new Date(ev.startDate),'HH:mm')} · 📍 <span style={{maxWidth:120,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',display:'inline-block'}}>{ev.location}</span>
                </div>
                <div style={{marginTop:5,display:'flex',alignItems:'center',gap:6}}>
                  <span className="etag" style={{background:cat.bg,color:cat.color}}>{cat.label}</span>
                  {ev.requiresRegistration && <span style={{fontSize:10,color:'var(--muted)'}}>Inscription requise</span>}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
