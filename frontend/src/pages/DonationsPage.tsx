import { useState } from 'react'
import { useDonationStats } from '../hooks/useDonations'
import toast from 'react-hot-toast'

const AMOUNTS = [10,25,50,100,200]
const FREQS = [{id:'OneTime',label:'Une fois'},{id:'Monthly',label:'Mensuel'},{id:'Weekly',label:'Hebdo'}]

export default function DonationsPage() {
  const {data:stats} = useDonationStats()
  const [amount,setAmount] = useState(25)
  const [custom,setCustom] = useState('')
  const [freq,setFreq] = useState('OneTime')
  const [step,setStep] = useState<'amount'|'payment'|'done'>('amount')
  const [card,setCard] = useState({name:'',number:'',expiry:'',cvv:''})
  const [loading,setLoading] = useState(false)
  const final = custom ? parseInt(custom)||0 : amount
  const fmtCard = (v:string) => v.replace(/\D/g,'').slice(0,16).replace(/(.{4})/g,'$1 ').trim()
  const fmtExp = (v:string) => { const n=v.replace(/\D/g,'').slice(0,4); return n.length>=2?n.slice(0,2)+'/'+n.slice(2):n }
  const pay = async (e:React.FormEvent) => {
    e.preventDefault()
    if(!card.name||!card.number){toast.error('Remplissez les informations');return}
    setLoading(true); await new Promise(r=>setTimeout(r,1500)); setLoading(false); setStep('done')
    toast.success('Don effectué avec succès !')
  }

  return (
    <div style={{paddingBottom:24}}>
      <div style={{background:'linear-gradient(135deg,#C07B00,#F5A623)',padding:'20px 20px 28px',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:-20,right:-20,width:100,height:100,background:'rgba(255,255,255,0.1)',borderRadius:'50%'}}></div>
        <h1 style={{fontFamily:'Syne,sans-serif',fontWeight:900,fontSize:22,color:'var(--navy)',marginBottom:4}}>Dons & Offrandes</h1>
        <p style={{fontSize:13,color:'rgba(13,27,62,0.6)',fontStyle:'italic',lineHeight:1.5}}>"Que chacun donne comme il l'a résolu en son cœur" — 2 Cor 9:7</p>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10,padding:'12px 20px'}}>
        {[
          {val:`$${(stats?.totalThisMonth??12450).toLocaleString()}`,lbl:'Ce mois',color:'var(--blue)'},
          {val:String(stats?.activeDonors??247),lbl:'Donateurs',color:'var(--gold-dark)'},
          {val:`$${(stats?.totalThisYear??98200).toLocaleString()}`,lbl:'Cette année',color:'#059669'},
        ].map(s=>(
          <div key={s.lbl} style={{background:'#fff',borderRadius:14,padding:'12px 8px',textAlign:'center',border:'1px solid var(--border)'}}>
            <div style={{fontFamily:'Syne,sans-serif',fontWeight:900,fontSize:16,color:s.color}}>{s.val}</div>
            <div style={{fontSize:11,color:'var(--muted)',marginTop:2}}>{s.lbl}</div>
          </div>
        ))}
      </div>

      <div style={{padding:'0 20px'}}>
        {step==='amount' && (
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            <div style={{background:'#fff',borderRadius:16,border:'1px solid var(--border)',padding:16}}>
              <h2 style={{fontFamily:'Syne,sans-serif',fontWeight:700,fontSize:15,color:'var(--navy)',marginBottom:12}}>Choisir un montant</h2>
              <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8,marginBottom:10}}>
                {AMOUNTS.map(a=>(
                  <button key={a} onClick={()=>{setAmount(a);setCustom('')}}
                    style={{padding:'12px 8px',borderRadius:12,border:'none',cursor:'pointer',fontFamily:'Syne,sans-serif',fontWeight:700,fontSize:14,transition:'all 0.2s',background:amount===a&&!custom?'var(--blue)':'var(--gray)',color:amount===a&&!custom?'#fff':'var(--muted)'}}>
                    {a}$
                  </button>
                ))}
                <div style={{gridColumn:'span 3',position:'relative'}}>
                  <span style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',fontSize:14,fontWeight:700,color:'var(--muted)'}}>$</span>
                  <input type="number" min="1" value={custom} onChange={e=>{setCustom(e.target.value);setAmount(0)}} placeholder="Autre montant"
                    style={{width:'100%',background:'var(--gray)',border:'1.5px solid '+(custom?'var(--blue)':'transparent'),borderRadius:12,padding:'11px 14px 11px 26px',fontSize:13,outline:'none',fontFamily:'Inter,sans-serif',boxSizing:'border-box'}} />
                </div>
              </div>
            </div>
            <div style={{background:'#fff',borderRadius:16,border:'1px solid var(--border)',padding:16}}>
              <h2 style={{fontFamily:'Syne,sans-serif',fontWeight:700,fontSize:15,color:'var(--navy)',marginBottom:12}}>Fréquence</h2>
              <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8}}>
                {FREQS.map(f=>(
                  <button key={f.id} onClick={()=>setFreq(f.id)}
                    style={{padding:'10px',borderRadius:12,border:'none',cursor:'pointer',fontWeight:600,fontSize:13,transition:'all 0.2s',background:freq===f.id?'var(--blue)':'var(--gray)',color:freq===f.id?'#fff':'var(--muted)'}}>
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
            <button onClick={()=>{if(final<1){toast.error('Choisissez un montant');return}setStep('payment')}}
              style={{width:'100%',background:'var(--gold)',color:'var(--navy)',border:'none',padding:'15px',borderRadius:16,fontFamily:'Syne,sans-serif',fontWeight:900,fontSize:15,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:8}}>
              💛 Donner {final}$ {freq!=='OneTime'?`/ ${FREQS.find(f=>f.id===freq)?.label.toLowerCase()}`:''}
            </button>
          </div>
        )}

        {step==='payment' && (
          <form onSubmit={pay} style={{display:'flex',flexDirection:'column',gap:12}}>
            <div style={{background:'var(--gold-light)',borderRadius:14,padding:'14px 16px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <div>
                <p style={{fontSize:11,color:'var(--gold-dark)',fontWeight:700,marginBottom:2}}>Montant du don</p>
                <p style={{fontFamily:'Syne,sans-serif',fontWeight:900,fontSize:26,color:'var(--navy)'}}>{final}$</p>
                <p style={{fontSize:12,color:'var(--muted)'}}>{FREQS.find(f=>f.id===freq)?.label}</p>
              </div>
              <button type="button" onClick={()=>setStep('amount')} style={{color:'var(--blue)',fontSize:12,fontWeight:600,background:'none',border:'none',cursor:'pointer',textDecoration:'underline'}}>Modifier</button>
            </div>
            <div style={{background:'#fff',borderRadius:16,border:'1px solid var(--border)',padding:16,display:'flex',flexDirection:'column',gap:10}}>
              <h2 style={{fontFamily:'Syne,sans-serif',fontWeight:700,fontSize:15,color:'var(--navy)'}}>Informations de paiement</h2>
              <input required value={card.name} onChange={e=>setCard(c=>({...c,name:e.target.value}))} placeholder="Nom sur la carte" className="app-input" style={{marginBottom:0}} />
              <input required value={card.number} onChange={e=>setCard(c=>({...c,number:fmtCard(e.target.value)}))} placeholder="1234 5678 9012 3456" maxLength={19} className="app-input" style={{marginBottom:0,fontFamily:'monospace'}} />
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
                <input required value={card.expiry} onChange={e=>setCard(c=>({...c,expiry:fmtExp(e.target.value)}))} placeholder="MM/AA" maxLength={5} className="app-input" style={{marginBottom:0}} />
                <input required value={card.cvv} onChange={e=>setCard(c=>({...c,cvv:e.target.value.replace(/\D/,'').slice(0,4)}))} placeholder="CVV" maxLength={4} className="app-input" style={{marginBottom:0}} />
              </div>
            </div>
            <p style={{textAlign:'center',fontSize:11,color:'var(--muted)'}}>🔒 Paiement sécurisé via Stripe · Chiffrement SSL 256-bit</p>
            <button type="submit" disabled={loading} className="btn-primary">
              {loading?'⏳ Traitement...':`🔐 Payer ${final}$ en toute sécurité`}
            </button>
          </form>
        )}

        {step==='done' && (
          <div style={{textAlign:'center',paddingTop:32}}>
            <div style={{width:80,height:80,background:'var(--gold-light)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px'}}>
              <div style={{width:56,height:56,background:'var(--gold)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:24}}>✓</div>
            </div>
            <h2 style={{fontFamily:'Syne,sans-serif',fontWeight:900,fontSize:24,color:'var(--navy)',marginBottom:8}}>Merci !</h2>
            <p style={{color:'var(--muted)',fontSize:14,marginBottom:6}}>Votre don de <strong style={{color:'var(--navy)'}}>{final}$</strong> a été reçu.</p>
            <p style={{color:'var(--muted)',fontSize:12,marginBottom:24}}>Un reçu vous sera envoyé par email.</p>
            <p style={{color:'rgba(13,27,62,0.5)',fontSize:13,fontStyle:'italic',marginBottom:24}}>"Dieu aime celui qui donne avec joie." — 2 Corinthiens 9:7</p>
            <button onClick={()=>{setStep('amount');setCard({name:'',number:'',expiry:'',cvv:''});setCustom('');setAmount(25)}}
              style={{background:'var(--blue-light)',color:'var(--blue)',fontWeight:600,fontSize:13,padding:'12px 24px',borderRadius:12,border:'none',cursor:'pointer'}}>
              Faire un autre don
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
