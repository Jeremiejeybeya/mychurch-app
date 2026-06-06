import { useState } from 'react'
import { useSermons, useLiveStatus } from '../hooks/useSermons'
import type { Sermon } from '../types'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

const DEMO: Sermon[] = [
    { id: '1', title: 'Au milieu de la nuit', description: 'Une prédication puissante sur la foi et la confiance en Dieu selon Matthieu 17.', speaker: 'Jeremie Beya', preachedAt: '2025-06-02', youTubeVideoId:'https://www.youtube.com/watch?v=pkwc32PrsPc&t=1983s',scriptureReference:'Matthieu 17:20',viewCount:1240,series:'Foi & Puissance',isActive:true},
    { id: '2', title: 'Marcher dans la grâce divine', description: 'Découvrez comment vivre sous la grâce de Dieu chaque jour de votre vie.', speaker: 'Pasteur Marie', preachedAt: '2025-05-25', youTubeVideoId:'https://www.youtube.com/watch?v=cHW4ivtiSqU&t=1725s',scriptureReference:'Éphésiens 2:8',viewCount:987,series:'Vie Chrétienne',isActive:true},
  {id:'3',title:"Les fruits de l'Esprit Saint",description:'Étude approfondie des 9 fruits mentionnés en Galates 5.',speaker:'Pasteur Jean',preachedAt:'2025-05-18',youTubeVideoId:'',scriptureReference:'Galates 5:22',viewCount:2100,series:'Esprit & Vie',isActive:true},
  {id:'4',title:'La prière qui change tout',description:'Apprendre à prier avec puissance et efficacité selon la Parole.',speaker:'Pasteur Marie',preachedAt:'2025-05-11',youTubeVideoId:'',scriptureReference:'Jacques 5:16',viewCount:1580,series:'Vie de Prière',isActive:true},
  {id:'5',title:'Servir avec joie',description:"Comment servir Dieu et les autres avec un cœur joyeux.",speaker:'Pasteur Jean',preachedAt:'2025-05-04',youTubeVideoId:'',scriptureReference:'Romains 12:11',viewCount:890,series:'Service & Ministère',isActive:true},
]
const GRADIENTS = ['linear-gradient(135deg,#0D1B3E,#1A56DB)','linear-gradient(135deg,#7C3AED,#1a3a8a)','linear-gradient(135deg,#059669,#1A56DB)','linear-gradient(135deg,#0D1B3E,#7C3AED)','linear-gradient(135deg,#1A56DB,#059669)']
const SERIES_LIST = ['Tous','Foi & Puissance','Vie Chrétienne','Esprit & Vie','Vie de Prière','Service & Ministère']

function Player({sermon,onClose}:{sermon:Sermon;onClose:()=>void}) {
  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.95)',zIndex:500,display:'flex',flexDirection:'column'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px 20px'}}>
        <button onClick={onClose} style={{color:'rgba(255,255,255,0.7)',background:'none',border:'none',cursor:'pointer',fontSize:14,display:'flex',alignItems:'center',gap:6}}>← Retour</button>
        <span style={{color:'rgba(255,255,255,0.4)',fontSize:12}}>{sermon.speaker}</span>
      </div>
      <div style={{flex:1,display:'flex',flexDirection:'column',justifyContent:'center',padding:'0 20px'}}>
        <div style={{background:'#111',borderRadius:16,overflow:'hidden',marginBottom:16,aspectRatio:'16/9'}}>
          {sermon.youTubeVideoId
                      ? <iframe src={sermon.youTubeVideoId?.includes('youtube.com') || sermon.youTubeVideoId?.includes('youtu.be')
                          ? sermon.youTubeVideoId.replace('watch?v=', 'embed/').replace('youtu.be/', 'www.youtube.com/embed/')
                          : `https://www.youtube.com/embed/${sermon.youTubeVideoId}?autoplay=1`
                      } style={{width:'100%',height:'100%',border:'none'}} allow="autoplay;encrypted-media" allowFullScreen />
            : <div style={{width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center',color:'rgba(255,255,255,0.3)',fontSize:40}}>▶</div>
          }
        </div>
        <h2 style={{fontFamily:'Syne,sans-serif',fontWeight:700,color:'#fff',fontSize:17,marginBottom:6}}>{sermon.title}</h2>
        <p style={{color:'rgba(255,255,255,0.5)',fontSize:13,marginBottom:8}}>{sermon.speaker} · {format(new Date(sermon.preachedAt),'d MMMM yyyy',{locale:fr})}</p>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:13,lineHeight:1.6}}>{sermon.description}</p>
      </div>
    </div>
  )
}

export default function SermonsPage() {
  const {data:sermons} = useSermons()
  const {data:live} = useLiveStatus()
  const [search,setSearch] = useState('')
  const [series,setSeries] = useState('Tous')
  const [playing,setPlaying] = useState<Sermon|null>(null)
  const all = sermons?.length ? sermons : DEMO
  const filtered = all.filter(s=>{
    const ms = s.title.toLowerCase().includes(search.toLowerCase()) || s.speaker.toLowerCase().includes(search.toLowerCase())
    const mr = series==='Tous' || s.series===series
    return ms && mr
  })
  if (playing) return <Player sermon={playing} onClose={()=>setPlaying(null)} />

  return (
    <div style={{paddingBottom:24}}>
      <div style={{background:'var(--navy)',padding:'20px 20px 24px'}}>
        <h1 style={{fontFamily:'Syne,sans-serif',fontWeight:900,fontSize:22,color:'#fff',marginBottom:4}}>Prédications</h1>
        <p style={{color:'rgba(255,255,255,0.5)',fontSize:13}}>{all.length} messages disponibles</p>
      </div>

      {live?.isLive && (
        <div style={{margin:'12px 20px',background:'rgba(239,68,68,0.1)',border:'1.5px solid rgba(239,68,68,0.3)',borderRadius:14,padding:'12px 14px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div>
            <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:3}}>
              <span style={{width:7,height:7,background:'#EF4444',borderRadius:'50%',animation:'blink 1.2s infinite',display:'inline-block'}}></span>
              <span style={{color:'#EF4444',fontSize:11,fontWeight:700,textTransform:'uppercase'}}>Direct en cours</span>
            </div>
            <p style={{fontSize:13,fontWeight:600,color:'var(--text)'}}>{live.title}</p>
          </div>
          <a href={`https://youtube.com/watch?v=${live.streamId}`} target="_blank" rel="noreferrer"
            style={{background:'#EF4444',color:'#fff',fontWeight:700,fontSize:12,padding:'8px 14px',borderRadius:10,textDecoration:'none'}}>
            📺 Rejoindre
          </a>
        </div>
      )}

      {!live?.isLive && (
        <div style={{margin:'12px 20px',background:'var(--blue-light)',borderRadius:14,padding:'12px 14px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div>
            <p style={{fontSize:11,color:'var(--blue)',fontWeight:700,textTransform:'uppercase',marginBottom:2}}>📺 YouTube Live</p>
            <p style={{fontSize:13,fontWeight:600,color:'var(--navy)'}}>Culte chaque dimanche 10h00</p>
          </div>
          <button style={{background:'var(--blue)',color:'#fff',fontSize:11,fontWeight:700,padding:'8px 12px',borderRadius:10,border:'none',cursor:'pointer'}}>
            S'abonner
          </button>
        </div>
      )}

      <div style={{padding:'0 20px 12px'}}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Rechercher une prédication..."
          style={{width:'100%',background:'#fff',border:'1.5px solid var(--border)',borderRadius:12,padding:'10px 14px',fontSize:13,outline:'none',fontFamily:'Inter,sans-serif',boxSizing:'border-box'}} />
      </div>

      <div style={{padding:'0 20px 14px'}}>
        <div className="filter-row">
          {SERIES_LIST.map(s => (
            <button key={s} onClick={()=>setSeries(s)} className={`filter-chip${series===s?' active':''}`}>{s}</button>
          ))}
        </div>
      </div>

      <div style={{padding:'0 20px'}}>
        {filtered.map((s,i) => (
          <div key={s.id} onClick={()=>setPlaying(s)}
            style={{background:'#fff',borderRadius:16,border:'1px solid var(--border)',overflow:'hidden',marginBottom:12,cursor:'pointer',transition:'all 0.2s'}}>
            <div style={{height:150,background:GRADIENTS[i%GRADIENTS.length],display:'flex',alignItems:'center',justifyContent:'center',position:'relative'}}>
              <div style={{width:46,height:46,background:'rgba(255,255,255,0.9)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,color:'var(--blue)'}}>▶</div>
              <div style={{position:'absolute',bottom:8,right:8,background:'rgba(0,0,0,0.7)',color:'#fff',fontSize:10,padding:'2px 7px',borderRadius:5}}>42:18</div>
              {s.series && <div style={{position:'absolute',top:8,left:8,background:'var(--gold)',color:'var(--navy)',fontSize:10,fontWeight:700,padding:'3px 9px',borderRadius:50}}>{s.series}</div>}
            </div>
            <div style={{padding:'12px 14px'}}>
              <h3 style={{fontSize:14,fontWeight:600,color:'var(--text)',marginBottom:5,lineHeight:1.3}}>{s.title}</h3>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:6}}>
                <span style={{fontSize:12,color:'var(--muted)'}}>{s.speaker} · {format(new Date(s.preachedAt),'d MMM yyyy',{locale:fr})}</span>
                <span style={{fontSize:11,color:'var(--muted)'}}>👁 {s.viewCount.toLocaleString()}</span>
              </div>
              {s.scriptureReference && <span style={{display:'inline-block',background:'var(--blue-light)',color:'var(--blue)',fontSize:11,fontWeight:600,padding:'3px 9px',borderRadius:50}}>📖 {s.scriptureReference}</span>}
            </div>
          </div>
        ))}
        {filtered.length===0 && <p style={{textAlign:'center',color:'var(--muted)',fontSize:13,padding:32}}>Aucune prédication trouvée</p>}
      </div>
    </div>
  )
}
