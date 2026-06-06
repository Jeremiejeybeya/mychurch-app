import { useNavigate } from 'react-router-dom'
import { Play, Calendar } from 'lucide-react'
import { useLiveStatus } from '../hooks/useSermons'
import { useUpcomingEvents } from '../hooks/useEvents'
import { useDonationStats } from '../hooks/useDonations'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

const QUICK_LINKS = [
  { to: '/bible', emoji: '📖', label: 'Bible', bg: 'bg-blue-light', color: 'text-blue' },
  { to: '/sermons', emoji: '🎬', label: 'Prédications', bg: 'bg-gold-light', color: 'text-gold-dark' },
  { to: '/donations', emoji: '💛', label: 'Dons', bg: 'bg-green-50', color: 'text-green-600' },
  { to: '/events', emoji: '📅', label: 'Agenda', bg: 'bg-indigo-50', color: 'text-indigo-600' },
  { to: '/gallery', emoji: '🖼️', label: 'Galerie', bg: 'bg-purple-50', color: 'text-purple-600' },
  { to: '/departments', emoji: '👥', label: 'Dépts', bg: 'bg-teal-50', color: 'text-teal-600' },
  { to: '/activities', emoji: '⭐', label: 'Activités', bg: 'bg-pink-50', color: 'text-pink-600' },
  { to: '#', emoji: '📍', label: 'Trouver', bg: 'bg-red-50', color: 'text-red-500' },
]

const CATEGORY_LABELS: Record<string, { label: string; cls: string }> = {
  Culte: { label: 'Culte', cls: 'bg-blue-light text-blue' },
  Sacrement: { label: 'Sacrement', cls: 'bg-gold-light text-gold-dark' },
  Social: { label: 'Social', cls: 'bg-green-50 text-green-600' },
  Etude: { label: 'Étude', cls: 'bg-indigo-50 text-indigo-600' },
  Jeunesse: { label: 'Jeunesse', cls: 'bg-pink-50 text-pink-600' },
  Autre: { label: 'Autre', cls: 'bg-gray-100 text-gray-600' },
}

export default function HomePage() {
  const navigate = useNavigate()
  const { data: liveStatus } = useLiveStatus()
  const { data: events } = useUpcomingEvents()
  const { data: stats } = useDonationStats()

  return (
    <div className="pb-4">
      {/* HERO */}
      <section className="bg-gradient-to-br from-navy to-blue-dark px-5 pt-7 pb-8 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-44 h-44 bg-gold/10 rounded-full" />
        {liveStatus?.isLive && (
          <span className="inline-flex items-center gap-1.5 bg-red-500/90 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            DIRECT EN COURS
          </span>
        )}
        <p className="text-white/60 text-xs uppercase tracking-widest mb-2">
          {format(new Date(), "EEEE d MMMM yyyy", { locale: fr })}
        </p>
        <h1 className="font-syne font-black text-white text-2xl leading-tight mb-2">
          Bienvenue chez<br />MyChurch 🙏
        </h1>
        <p className="text-white/70 text-sm italic mb-5">
          "Car Dieu a tant aimé le monde..." — Jean 3:16
        </p>
        <div className="flex gap-2 relative z-10">
          {liveStatus?.isLive ? (
            <button onClick={() => navigate('/sermons')}
              className="flex items-center gap-2 bg-gold text-navy font-syne font-bold text-sm px-5 py-2.5 rounded-full hover:bg-gold/90 transition-all">
              <Play size={14} /> Rejoindre le Direct
            </button>
          ) : (
            <button onClick={() => navigate('/sermons')}
              className="flex items-center gap-2 bg-gold text-navy font-syne font-bold text-sm px-5 py-2.5 rounded-full hover:bg-gold/90 transition-all">
              <Play size={14} /> Dernière Prédication
            </button>
          )}
          <button onClick={() => navigate('/events')}
            className="flex items-center gap-2 bg-white/10 border border-white/30 text-white text-sm px-5 py-2.5 rounded-full hover:bg-white/20 transition-all">
            <Calendar size={14} /> Agenda
          </button>
        </div>
      </section>

      {/* QUICK LINKS */}
      <section className="px-5 py-6">
        <h2 className="font-syne font-bold text-lg mb-4">Accès rapides</h2>
        <div className="grid grid-cols-4 gap-3">
          {QUICK_LINKS.map(({ to, emoji, label, bg, color }) => (
            <button key={label} onClick={() => navigate(to)}
              className="flex flex-col items-center gap-2 cursor-pointer hover:-translate-y-0.5 transition-transform">
              <div className={`w-14 h-14 ${bg} rounded-2xl flex items-center justify-center text-2xl`}>
                {emoji}
              </div>
              <span className={`text-xs font-medium ${color} text-center leading-tight`}>{label}</span>
            </button>
          ))}
        </div>
      </section>

      <div className="h-2 bg-gray-50 mx-0" />

      {/* STATS */}
      {stats && (
        <section className="px-5 py-5">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-light rounded-2xl p-4 text-center">
              <div className="font-syne font-black text-2xl text-blue">
                ${stats.totalThisMonth.toLocaleString()}
              </div>
              <div className="text-xs text-blue/70 mt-1">Dons ce mois</div>
            </div>
            <div className="bg-gold-light rounded-2xl p-4 text-center">
              <div className="font-syne font-black text-2xl text-gold-dark">
                {stats.activeDonors}
              </div>
              <div className="text-xs text-gold-dark/70 mt-1">Donateurs actifs</div>
            </div>
          </div>
        </section>
      )}

      <div className="h-2 bg-gray-50" />

      {/* UPCOMING EVENTS */}
      <section className="px-5 py-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-syne font-bold text-lg">Prochains événements</h2>
          <button onClick={() => navigate('/events')} className="text-xs text-blue font-medium">
            Voir tout →
          </button>
        </div>
        <div className="space-y-3">
          {(events ?? []).slice(0, 3).map(ev => {
            const cat = CATEGORY_LABELS[ev.category] ?? CATEGORY_LABELS.Autre
            return (
              <div key={ev.id} onClick={() => navigate('/events')}
                className="flex gap-4 p-3.5 bg-white rounded-2xl border border-gray-100 cursor-pointer hover:border-blue/30 hover:shadow-sm transition-all">
                <div className="flex flex-col items-center bg-blue-light rounded-xl px-3 py-2 min-w-[52px]">
                  <span className="font-syne font-black text-2xl text-blue leading-none">
                    {format(new Date(ev.startDate), 'd')}
                  </span>
                  <span className="text-[10px] font-bold text-blue uppercase">
                    {format(new Date(ev.startDate), 'MMM', { locale: fr })}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-gray-900 leading-snug mb-1">{ev.title}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span>{format(new Date(ev.startDate), 'HH:mm')}</span>
                    <span className={`px-2 py-0.5 rounded-full font-semibold text-[10px] ${cat.cls}`}>
                      {cat.label}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
          {(!events || events.length === 0) && (
            <p className="text-sm text-gray-400 text-center py-4">Aucun événement à venir</p>
          )}
        </div>
      </section>
    </div>
  )
}
