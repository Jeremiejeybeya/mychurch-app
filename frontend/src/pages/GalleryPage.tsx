import { useState } from 'react'
const ALBUMS = ['Tous','Cultes 2025','Baptêmes','Jeunesse','Activités']
const PHOTOS = [
  {id:'1',title:'Culte de Pâques',album:'Cultes 2025',emoji:'🙌',g:'linear-gradient(135deg,#0D1B3E,#1A56DB)',span:2},
  {id:'2',title:'Baptêmes Printemps',album:'Baptêmes',emoji:'🕊️',g:'linear-gradient(135deg,#C07B00,#F5A623)'},
  {id:'3',title:'Groupe Jeunesse',album:'Jeunesse',emoji:'🎶',g:'linear-gradient(135deg,#7C3AED,#5B21B6)'},
  {id:'4',title:'Pique-nique 2025',album:'Activités',emoji:'🌿',g:'linear-gradient(135deg,#047857,#059669)'},
  {id:'5',title:'Louange & Worship',album:'Cultes 2025',emoji:'🎵',g:'linear-gradient(135deg,#1A56DB,#4F46E5)'},
  {id:'6',title:'Camp Jeunesse',album:'Jeunesse',emoji:'🏕️',g:'linear-gradient(135deg,#92400E,#D97706)'},
  {id:'7',title:'Noël 2024',album:'Activités',emoji:'⭐',g:'linear-gradient(135deg,#991B1B,#DC2626)',span:2},
  {id:'8',title:'École du Dimanche',album:'Activités',emoji:'📖',g:'linear-gradient(135deg,#0F766E,#0D9488)'},
  {id:'9',title:'Mariage',album:'Activités',emoji:'💒',g:'linear-gradient(135deg,#9D174D,#DB2777)'},
]

export default function GalleryPage() {
  const [album,setAlbum] = useState('Tous')
  const [zoom,setZoom] = useState<typeof PHOTOS[0]|null>(null)
  const filtered = album==='Tous' ? PHOTOS : PHOTOS.filter(p=>p.album===album)

  return (
    <div style={{paddingBottom:24}}>
      {zoom && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.96)',zIndex:500,display:'flex',flexDirection:'column'}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px 20px'}}>
            <button onClick={()=>setZoom(null)} style={{color:'rgba(255,255,255,0.7)',background:'none',border:'none',cursor:'pointer',fontSize:14}}>← Retour</button>
            <span style={{color:'rgba(255,255,255,0.4)',fontSize:12}}>{zoom.album}</span>
          </div>
          <div style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'0 20px'}}>
            <div style={{width:'100%',background:zoom.g,borderRadius:20,display:'flex',alignItems:'center',justifyContent:'center',fontSize:72,height:260,marginBottom:16}}>{zoom.emoji}</div>
            <h3 style={{fontFamily:'Syne,sans-serif',fontWeight:700,color:'#fff',fontSize:20}}>{zoom.title}</h3>
            <p style={{color:'rgba(255,255,255,0.5)',fontSize:13,marginTop:4}}>{zoom.album}</p>
          </div>
        </div>
      )}

      <div style={{background:'var(--navy)',padding:'20px 20px 24px'}}>
        <h1 style={{fontFamily:'Syne,sans-serif',fontWeight:900,fontSize:22,color:'#fff',marginBottom:4}}>Galerie Photos</h1>
        <p style={{color:'rgba(255,255,255,0.5)',fontSize:13}}>{PHOTOS.length} photos · {ALBUMS.length-1} albums</p>
      </div>

      <div style={{padding:'12px 20px'}}>
        <div className="filter-row">
          {ALBUMS.map(a=><button key={a} onClick={()=>setAlbum(a)} className={`filter-chip${album===a?' active':''}`}>{a}</button>)}
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:6,padding:'0 20px'}}>
        {filtered.map(p=>(
          <div key={p.id} onClick={()=>setZoom(p)}
            style={{gridColumn:p.span===2?'span 2':'span 1',borderRadius:14,overflow:'hidden',cursor:'pointer',aspectRatio:p.span===2?'2/1':'1/1',background:p.g,display:'flex',alignItems:'center',justifyContent:'center',fontSize:p.span===2?44:28,transition:'opacity 0.2s',position:'relative'}}
            onMouseEnter={e=>(e.currentTarget.style.opacity='0.8')} onMouseLeave={e=>(e.currentTarget.style.opacity='1')}>
            {p.emoji}
          </div>
        ))}
      </div>
    </div>
  )
}
