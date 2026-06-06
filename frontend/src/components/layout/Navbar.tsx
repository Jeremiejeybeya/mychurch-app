import { Link } from 'react-router-dom'
import { Bell, Search } from 'lucide-react'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-navy px-5 py-3 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2">
        <div className="w-9 h-9 bg-gold rounded-xl flex items-center justify-center text-lg">✝</div>
        <span className="font-syne font-black text-lg text-white">
          My<span className="text-gold">Church</span>
        </span>
      </Link>
      <div className="flex gap-2">
        <button className="w-9 h-9 bg-white/10 rounded-xl text-white flex items-center justify-center hover:bg-white/20 transition-colors">
          <Bell size={18} />
        </button>
        <button className="w-9 h-9 bg-white/10 rounded-xl text-white flex items-center justify-center hover:bg-white/20 transition-colors">
          <Search size={18} />
        </button>
      </div>
    </header>
  )
}
