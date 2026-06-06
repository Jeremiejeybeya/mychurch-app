import { useState } from 'react'
import { useDepartments } from '../hooks/useDepartments'
import type { Department } from '../types'
import toast from 'react-hot-toast'
const DEMO = [
  {id:'1',name:'Louange & Musique',description:'Notre équipe de musiciens et chanteurs qui conduisent la communauté dans la louange.',iconName:'🎵',colorHex:'#F5A623',leaderName:'Frère Samuel',memberCount:32,meetingSchedule:'Samedi 15h00'},
  {id:'2',name:'Jeunesse',description:'Un espace dynamique pour les 15-30 ans pour grandir dans la foi et se connecter.',iconName:'✨',colorHex:'#1A56DB',leaderName:'Sœur Amina',memberCount:58,meetingSchedule:'Vendredi 19h00'},
  {id:'3',name:'Enfants & Nurserie',description:'Un environnement sécuritaire pour les enfants de 0-14 ans pendant le culte.',iconName:'🌱',colorHex:'#059669',leaderName:'Sœur Claire',memberCount:41,meetingSchedule:'Dimanche 10h00'},
  {id:'4',name:'École du Dimanche',description:"Classes d'enseignement biblique approfondi pour adultes et adolescents.",iconName:'📖',colorHex:'#7C3AED',leaderName:'Frère Paul',memberCount:29,meetingSchedule:'Dimanche 09h00'},
  {id:'5',name:'Femmes de Foi',description:'Un ministère pour encourager et équiper les femmes dans leur marche avec Dieu.',iconName:'💛',colorHex:'#DB2777',leaderName:'Sœur Rachel',memberCount:47,meetingSchedule:'Mercredi 19h30'},
  {id:'6',name:'Hommes Debout',description:'Un ministère pour les hommes qui veulent grandir spirituellement.',iconName:'🛡️',colorHex:'#0D9488',leaderName:'Frère David',memberCount:35,meetingSchedule:'Samedi 08h00'},
  {id:'7',name:'Évangélisation',description:'Notre équipe chargée de partager la bonne nouvelle dans les rues.',iconName:'✝️',colorHex:'#DC2626',leaderName:'Frère Marc',memberCount:22,meetingSchedule:'Dimanche 14h00'},
  {id:'8',name:'Intercession',description:'Un groupe de priants dévoués qui intercèdent pour l\'église et les nations.',iconName:'🙏',colorHex:'#2563EB',leaderName:'Sœur Esther',memberCount:18,meetingSchedule:'Mardi 20h00'},
]

function Modal({d,onClose}:{d:any;onClose:()=>void}) {
  const [joined,setJoined]=useState(false)
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <div className="modal-header">
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <div style={{width:44,height:44,borderRadius:14,background:d.colorHex,display:'flex',alignItems:'center',justifyContent:'center',fontSize:20}}>{d.iconName}</div>
            <div>
              <div className="modal-title" style={{marginBottom:0}}>{d.name}</div>
              <div style={{fontSize:12,color:'var(--muted)'}}>{d.memberCount} membres</div>
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <p style={{fontSize:13,color:'var(--muted)',lineHeight:1.6,marginBottom:14}}>{d.description}</p>
        <div style={{display:'flex',flexDirection:'column',gap:6,marginBottom:16}}>
          {d.leaderName&&<div style={{fontSize:13,color:'var(--text)'}}>👤 Responsable: <strong>{d.leaderName}</strong></div>}
          {d.meetingSchedule&&<div style={{fontSize:13,color:'var(--text)'}}>📅 Réunions: <strong>{d.meetingSchedule}</strong></div>}
        </div>
        {!joined
          ? <button onClick={()=>{setJoined(true);toast.success('Demande envoyée !')}} style={{width:'100%',background:d.colorHex,color:'#fff',border:'none',padding:14,borderRadius:14,fontFamily:'Syne,sans-serif',fontWeight:700,fontSize:14,cursor:'pointer'}}>👥 Rejoindre ce département</button>
          : <div className="success-box"><div className="success-icon">✅</div><div className="success-text">Demande envoyée au responsable !</div></div>
        }
      </div>
    </div>
  )
}

export default function DepartmentsPage() {
  const {data:depts} = useDepartments()
  const [sel,setSel] = useState<any>(null)
  const all = depts?.length ? depts : DEMO
  return (
    <div style={{paddingBottom:24}}>
      {sel&&<Modal d={sel} onClose={()=>setSel(null)} />}
      <div style={{background:'var(--navy)',padding:'20px 20px 24px'}}>
        <h1 style={{fontFamily:'Syne,sans-serif',fontWeight:900,fontSize:22,color:'#fff',marginBottom:4}}>Départements</h1>
        <p style={{color:'rgba(255,255,255,0.5)',fontSize:13}}>{all.length} ministères actifs</p>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,padding:'16px 20px'}}>
        {all.map((d:any) => (
          <div key={d.id} onClick={()=>setSel(d)}
            style={{background:'#fff',borderRadius:16,border:'1px solid var(--border)',padding:14,cursor:'pointer',transition:'all 0.2s'}}
            onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='0 6px 20px rgba(26,86,219,0.1)'}}
            onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='none'}}>
            <div style={{width:40,height:40,borderRadius:12,background:d.colorHex,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,marginBottom:8}}>{d.iconName}</div>
            <div style={{fontSize:13,fontWeight:600,color:'var(--text)',marginBottom:2}}>{d.name}</div>
            <div style={{fontSize:11,color:'var(--muted)'}}>{d.memberCount} membres</div>
            {d.meetingSchedule&&<div style={{fontSize:10,color:'#C5C7D4',marginTop:2}}>{d.meetingSchedule}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}
