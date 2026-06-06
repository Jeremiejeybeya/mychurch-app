import { NavLink } from 'react-router-dom'
import { Home, BookOpen, Video, Calendar, Heart } from 'lucide-react'

const navItems = [
  { to: '/', icon: Home, label: 'Accueil' },
  { to: '/bible', icon: BookOpen, label: 'Bible' },
  { to: '/sermons', icon: Video, label: 'Prédications' },
  { to: '/events', icon: Calendar, label: 'Agenda' },
  { to: '/donations', icon: Heart, label: 'Dons' },
]

export default function BottomNav() {
  return (
    <nav className="sticky bottom-0 bg-white border-t border-gray-100 flex py-2 z-50">
      {navItems.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center gap-1 py-1 transition-colors ${
              isActive ? 'text-blue' : 'text-gray-400 hover:text-blue'
            }`
          }
        >
          <Icon size={22} />
          <span className="text-[10px] font-medium">{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
