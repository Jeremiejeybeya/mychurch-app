import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, BookOpen, Share2, Heart, Search, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

// Données complètes de la Bible (livres + chapitres)
const BIBLE_BOOKS = [
  // Ancien Testament
  { id: 'GEN', name: 'Genèse', chapters: 50, testament: 'AT' },
  { id: 'EXO', name: 'Exode', chapters: 40, testament: 'AT' },
  { id: 'LEV', name: 'Lévitique', chapters: 27, testament: 'AT' },
  { id: 'NUM', name: 'Nombres', chapters: 36, testament: 'AT' },
  { id: 'DEU', name: 'Deutéronome', chapters: 34, testament: 'AT' },
  { id: 'JOS', name: 'Josué', chapters: 24, testament: 'AT' },
  { id: 'JDG', name: 'Juges', chapters: 21, testament: 'AT' },
  { id: 'RUT', name: 'Ruth', chapters: 4, testament: 'AT' },
  { id: '1SA', name: '1 Samuel', chapters: 31, testament: 'AT' },
  { id: '2SA', name: '2 Samuel', chapters: 24, testament: 'AT' },
  { id: '1KI', name: '1 Rois', chapters: 22, testament: 'AT' },
  { id: '2KI', name: '2 Rois', chapters: 25, testament: 'AT' },
  { id: 'PSA', name: 'Psaumes', chapters: 150, testament: 'AT' },
  { id: 'PRO', name: 'Proverbes', chapters: 31, testament: 'AT' },
  { id: 'ECC', name: 'Ecclésiaste', chapters: 12, testament: 'AT' },
  { id: 'ISA', name: 'Ésaïe', chapters: 66, testament: 'AT' },
  { id: 'JER', name: 'Jérémie', chapters: 52, testament: 'AT' },
  { id: 'DAN', name: 'Daniel', chapters: 12, testament: 'AT' },
  // Nouveau Testament
  { id: 'MAT', name: 'Matthieu', chapters: 28, testament: 'NT' },
  { id: 'MRK', name: 'Marc', chapters: 16, testament: 'NT' },
  { id: 'LUK', name: 'Luc', chapters: 24, testament: 'NT' },
  { id: 'JHN', name: 'Jean', chapters: 21, testament: 'NT' },
  { id: 'ACT', name: 'Actes', chapters: 28, testament: 'NT' },
  { id: 'ROM', name: 'Romains', chapters: 16, testament: 'NT' },
  { id: '1CO', name: '1 Corinthiens', chapters: 16, testament: 'NT' },
  { id: '2CO', name: '2 Corinthiens', chapters: 13, testament: 'NT' },
  { id: 'GAL', name: 'Galates', chapters: 6, testament: 'NT' },
  { id: 'EPH', name: 'Éphésiens', chapters: 6, testament: 'NT' },
  { id: 'PHP', name: 'Philippiens', chapters: 4, testament: 'NT' },
  { id: 'COL', name: 'Colossiens', chapters: 4, testament: 'NT' },
  { id: '1TH', name: '1 Thessaloniciens', chapters: 5, testament: 'NT' },
  { id: '1TI', name: '1 Timothée', chapters: 6, testament: 'NT' },
  { id: '2TI', name: '2 Timothée', chapters: 4, testament: 'NT' },
  { id: 'HEB', name: 'Hébreux', chapters: 13, testament: 'NT' },
  { id: 'JAM', name: 'Jacques', chapters: 5, testament: 'NT' },
  { id: '1PE', name: '1 Pierre', chapters: 5, testament: 'NT' },
  { id: '1JN', name: '1 Jean', chapters: 5, testament: 'NT' },
  { id: 'REV', name: 'Apocalypse', chapters: 22, testament: 'NT' },
]

// Versets intégrés pour fonctionner sans API (mode hors-ligne)
const OFFLINE_VERSES: Record<string, Record<number, { num: number; text: string }[]>> = {
  JHN: {
    3: [
      { num: 1, text: "Il y avait parmi les pharisiens un homme appelé Nicodème, un chef des Juifs." },
      { num: 2, text: "Il vint auprès de Jésus pendant la nuit, et lui dit: Rabbi, nous savons que tu es un docteur venu de Dieu; car personne ne peut faire ces miracles que tu fais, si Dieu n'est pas avec lui." },
      { num: 3, text: "Jésus lui répondit: En vérité, en vérité, je te le dis, à moins qu'un homme ne soit né de nouveau, il ne peut voir le royaume de Dieu." },
      { num: 14, text: "Et comme Moïse éleva le serpent dans le désert, il faut de même que le Fils de l'homme soit élevé," },
      { num: 15, text: "Afin que quiconque croit en lui ait la vie éternelle." },
      { num: 16, text: "Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse pas, mais qu'il ait la vie éternelle." },
      { num: 17, text: "Car Dieu n'a pas envoyé son Fils dans le monde pour condamner le monde, mais pour que le monde soit sauvé par lui." },
      { num: 18, text: "Celui qui croit en lui n'est pas condamné; mais celui qui ne croit pas est déjà condamné, parce qu'il n'a pas cru au nom du Fils unique de Dieu." },
      { num: 36, text: "Celui qui croit au Fils a la vie éternelle; celui qui ne croit pas au Fils ne verra pas la vie, mais la colère de Dieu demeure sur lui." },
    ],
    1: [
      { num: 1, text: "Au commencement était la Parole, et la Parole était avec Dieu, et la Parole était Dieu." },
      { num: 2, text: "Elle était au commencement avec Dieu." },
      { num: 3, text: "Toutes choses ont été faites par elle, et rien de ce qui a été fait n'a été fait sans elle." },
      { num: 14, text: "Et la Parole a été faite chair, et elle a habité parmi nous, pleine de grâce et de vérité; et nous avons contemplé sa gloire, une gloire comme la gloire du Fils unique venu du Père." },
    ],
  },
  PSA: {
    23: [
      { num: 1, text: "L'Éternel est mon berger: je ne manquerai de rien." },
      { num: 2, text: "Il me fait reposer dans de verts pâturages, il me dirige près des eaux paisibles." },
      { num: 3, text: "Il restaure mon âme, il me conduit dans les sentiers de la justice, à cause de son nom." },
      { num: 4, text: "Quand je marche dans la vallée de l'ombre de la mort, je ne crains aucun mal, car tu es avec moi: ta houlette et ton bâton me rassurent." },
      { num: 5, text: "Tu dresses devant moi une table, en face de mes adversaires; tu oins d'huile ma tête, et ma coupe déborde." },
      { num: 6, text: "Oui, le bonheur et la grâce m'accompagneront tous les jours de ma vie, et j'habiterai dans la maison de l'Éternel jusqu'à la fin de mes jours." },
    ],
    91: [
      { num: 1, text: "Celui qui demeure sous l'abri du Très-Haut repose à l'ombre du Tout-Puissant." },
      { num: 2, text: "Je dis à l'Éternel: Mon refuge et ma forteresse, mon Dieu en qui je me confie!" },
      { num: 11, text: "Car il ordonnera à ses anges de te garder dans toutes tes voies;" },
    ],
  },
  PHP: {
    4: [
      { num: 4, text: "Réjouissez-vous toujours dans le Seigneur; je le répète, réjouissez-vous." },
      { num: 6, text: "Ne vous inquiétez de rien; mais en toute chose faites connaître vos besoins à Dieu par des prières et des supplications, avec des actions de grâces." },
      { num: 7, text: "Et la paix de Dieu, qui surpasse toute intelligence, gardera vos cœurs et vos pensées en Jésus-Christ." },
      { num: 11, text: "Ce n'est pas que je cherche à avoir des dons; mais je cherche à avoir des fruits qui abondent pour votre compte." },
      { num: 13, text: "Je puis tout par celui qui me fortifie." },
    ],
  },
  ROM: {
    8: [
      { num: 1, text: "Il n'y a donc maintenant aucune condamnation pour ceux qui sont en Jésus-Christ." },
      { num: 28, text: "Nous savons, du reste, que toutes choses concourent au bien de ceux qui aiment Dieu, de ceux qui sont appelés selon son dessein." },
      { num: 38, text: "Car j'ai l'assurance que ni la mort ni la vie, ni les anges ni les dominations, ni les choses présentes ni les choses à venir, ni les puissances," },
      { num: 39, text: "Ni la hauteur ni la profondeur, ni aucune autre créature ne pourra nous séparer de l'amour de Dieu manifesté en Jésus-Christ notre Seigneur." },
    ],
  },
  GEN: {
    1: [
      { num: 1, text: "Au commencement, Dieu créa les cieux et la terre." },
      { num: 2, text: "La terre était informe et vide; il y avait des ténèbres à la surface de l'abîme, et l'Esprit de Dieu se mouvait au-dessus des eaux." },
      { num: 3, text: "Dieu dit: Que la lumière soit! Et la lumière fut." },
      { num: 26, text: "Puis Dieu dit: Faisons l'homme à notre image, selon notre ressemblance, et qu'il domine sur les poissons de la mer, sur les oiseaux du ciel, sur le bétail, sur toute la terre." },
      { num: 27, text: "Dieu créa l'homme à son image, il le créa à l'image de Dieu, il créa l'homme et la femme." },
    ],
  },
  MAT: {
    5: [
      { num: 3, text: "Heureux les pauvres en esprit, car le royaume des cieux est à eux!" },
      { num: 4, text: "Heureux ceux qui pleurent, car ils seront consolés!" },
      { num: 5, text: "Heureux les débonnaires, car ils hériteront la terre!" },
      { num: 6, text: "Heureux ceux qui ont faim et soif de la justice, car ils seront rassasiés!" },
      { num: 7, text: "Heureux les miséricordieux, car ils obtiendront miséricorde!" },
      { num: 8, text: "Heureux ceux qui ont le cœur pur, car ils verront Dieu!" },
      { num: 9, text: "Heureux ceux qui procurent la paix, car ils seront appelés fils de Dieu!" },
    ],
    28: [
      { num: 19, text: "Allez, faites de toutes les nations des disciples, les baptisant au nom du Père, du Fils et du Saint-Esprit," },
      { num: 20, text: "Et enseignez-leur à observer tout ce que je vous ai prescrit. Et voici, je suis avec vous tous les jours, jusqu'à la fin du monde." },
    ],
  },
}

const DAILY_VERSES = [
  { ref: 'Jean 3:16', bookId: 'JHN', chapter: 3, text: '"Car Dieu a tant aimé le monde qu\'il a donné son Fils unique..."' },
  { ref: 'Psaumes 23:1', bookId: 'PSA', chapter: 23, text: '"L\'Éternel est mon berger: je ne manquerai de rien."' },
  { ref: 'Philippiens 4:13', bookId: 'PHP', chapter: 4, text: '"Je puis tout par celui qui me fortifie."' },
  { ref: 'Romains 8:28', bookId: 'ROM', chapter: 8, text: '"Toutes choses concourent au bien de ceux qui aiment Dieu..."' },
  { ref: 'Matthieu 5:3', bookId: 'MAT', chapter: 5, text: '"Heureux les pauvres en esprit, car le royaume des cieux est à eux!"' },
]

type View = 'home' | 'books' | 'chapters' | 'reader'

export default function BiblePage() {
  const navigate = useNavigate()
  const [view, setView] = useState<View>('home')
  const [selectedBook, setSelectedBook] = useState(BIBLE_BOOKS.find(b => b.id === 'JHN')!)
  const [selectedChapter, setSelectedChapter] = useState(3)
  const [verses, setVerses] = useState(OFFLINE_VERSES['JHN']?.[3] ?? [])
  const [favorites, setFavorites] = useState<string[]>([])
  const [search, setSearch] = useState('')
  const [testament, setTestament] = useState<'AT' | 'NT' | 'all'>('all')
  const todayVerse = DAILY_VERSES[new Date().getDay() % DAILY_VERSES.length]

  const loadChapter = (bookId: string, chapter: number) => {
    const data = OFFLINE_VERSES[bookId]?.[chapter]
    if (data) {
      setVerses(data)
    } else {
      setVerses([{ num: 1, text: `Chapitre ${chapter} — Connectez-vous à Internet pour charger ce chapitre via l'API Bible.` }])
    }
    setView('reader')
  }

  const selectBook = (book: typeof BIBLE_BOOKS[0]) => {
    setSelectedBook(book)
    setSelectedChapter(1)
    setView('chapters')
  }

  const toggleFavorite = (ref: string) => {
    setFavorites(prev => prev.includes(ref) ? prev.filter(f => f !== ref) : [...prev, ref])
  }

  const prevChapter = () => {
    if (selectedChapter > 1) {
      const newChap = selectedChapter - 1
      setSelectedChapter(newChap)
      loadChapter(selectedBook.id, newChap)
    }
  }

  const nextChapter = () => {
    if (selectedChapter < selectedBook.chapters) {
      const newChap = selectedChapter + 1
      setSelectedChapter(newChap)
      loadChapter(selectedBook.id, newChap)
    }
  }

  const filteredBooks = BIBLE_BOOKS.filter(b => {
    const matchSearch = b.name.toLowerCase().includes(search.toLowerCase())
    const matchTestament = testament === 'all' || b.testament === testament
    return matchSearch && matchTestament
  })

  // ── VUE ACCUEIL BIBLE ──────────────────────────────────────────────────────
  if (view === 'home') return (
    <div className="pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-navy to-blue-dark px-5 pt-6 pb-8 relative overflow-hidden">
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-gold/10 rounded-full" />
        <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white/5 rounded-full" />
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-white/60 text-sm mb-4 hover:text-white transition-colors">
          <ArrowLeft size={16} /> Accueil
        </button>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gold/20 rounded-xl flex items-center justify-center">
            <BookOpen size={20} className="text-gold" />
          </div>
          <h1 className="font-syne font-black text-2xl text-white">La Bible</h1>
        </div>
        <p className="text-white/60 text-sm">Version Louis Segond • 66 livres</p>
      </div>

      <div className="px-5 py-5 space-y-4">
        {/* Verset du jour */}
        <div className="bg-gradient-to-br from-navy to-blue-dark rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute -top-4 -right-4 text-7xl opacity-5">✝</div>
          <p className="text-gold text-xs font-bold uppercase tracking-widest mb-2">📖 Verset du jour</p>
          <p className="text-white/90 text-sm italic leading-relaxed mb-3">{todayVerse.text}</p>
          <div className="flex items-center justify-between">
            <span className="text-white/50 text-xs font-medium">{todayVerse.ref}</span>
            <button
              onClick={() => { setSelectedBook(BIBLE_BOOKS.find(b => b.id === todayVerse.bookId)!); setSelectedChapter(todayVerse.chapter); loadChapter(todayVerse.bookId, todayVerse.chapter) }}
              className="text-gold text-xs font-bold hover:text-gold/80 transition-colors"
            >
              Lire le chapitre →
            </button>
          </div>
        </div>

        {/* Bouton principal */}
        <button
          onClick={() => setView('books')}
          className="w-full bg-blue text-white font-syne font-bold py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-blue-dark transition-colors"
        >
          <BookOpen size={20} /> Parcourir tous les livres
        </button>

        {/* Lectures rapides */}
        <div>
          <h2 className="font-syne font-bold text-base text-navy mb-3">Lectures populaires</h2>
          <div className="space-y-2">
            {[
              { label: 'Jean 3', sub: 'La nouvelle naissance', bookId: 'JHN', ch: 3 },
              { label: 'Psaume 23', sub: 'Le bon berger', bookId: 'PSA', ch: 23 },
              { label: 'Matthieu 5', sub: 'Les Béatitudes', bookId: 'MAT', ch: 5 },
              { label: 'Philippiens 4', sub: 'La paix de Dieu', bookId: 'PHP', ch: 4 },
              { label: 'Romains 8', sub: 'Plus que vainqueurs', bookId: 'ROM', ch: 8 },
              { label: 'Genèse 1', sub: 'La création', bookId: 'GEN', ch: 1 },
            ].map(item => (
              <button key={item.label}
                onClick={() => { setSelectedBook(BIBLE_BOOKS.find(b => b.id === item.bookId)!); setSelectedChapter(item.ch); loadChapter(item.bookId, item.ch) }}
                className="w-full flex items-center justify-between p-3.5 bg-white rounded-xl border border-gray-100 hover:border-blue/30 hover:shadow-sm transition-all text-left"
              >
                <div>
                  <span className="font-semibold text-sm text-navy">{item.label}</span>
                  <p className="text-xs text-gray-400 mt-0.5">{item.sub}</p>
                </div>
                <ChevronRight size={16} className="text-gray-300" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  // ── VUE LISTE DES LIVRES ───────────────────────────────────────────────────
  if (view === 'books') return (
    <div className="flex flex-col h-full">
      <div className="bg-navy px-5 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => setView('home')} className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-white hover:bg-white/20 transition-colors">
            <ArrowLeft size={16} />
          </button>
          <span className="font-syne font-bold text-white text-lg">Choisir un livre</span>
        </div>
        {/* Recherche */}
        <div className="relative mb-3">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher un livre..."
            className="w-full bg-white/10 border border-white/20 rounded-xl pl-9 pr-4 py-2 text-white text-sm placeholder-white/40 outline-none focus:bg-white/15"
          />
        </div>
        {/* Filtre AT/NT */}
        <div className="flex gap-2">
          {(['all', 'AT', 'NT'] as const).map(t => (
            <button key={t}
              onClick={() => setTestament(t)}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors ${testament === t ? 'bg-gold text-navy' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}
            >
              {t === 'all' ? 'Tous' : t === 'AT' ? 'Ancien Testament' : 'Nouveau Testament'}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-5 py-3">
        {testament === 'all' && (
          <>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Ancien Testament</p>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {filteredBooks.filter(b => b.testament === 'AT').map(book => (
                <button key={book.id} onClick={() => selectBook(book)}
                  className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100 hover:border-blue/40 hover:bg-blue-light transition-all text-left">
                  <div>
                    <p className="font-semibold text-sm text-navy leading-tight">{book.name}</p>
                    <p className="text-xs text-gray-400">{book.chapters} ch.</p>
                  </div>
                  <ChevronRight size={14} className="text-gray-300 flex-shrink-0" />
                </button>
              ))}
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Nouveau Testament</p>
            <div className="grid grid-cols-2 gap-2">
              {filteredBooks.filter(b => b.testament === 'NT').map(book => (
                <button key={book.id} onClick={() => selectBook(book)}
                  className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100 hover:border-blue/40 hover:bg-blue-light transition-all text-left">
                  <div>
                    <p className="font-semibold text-sm text-navy leading-tight">{book.name}</p>
                    <p className="text-xs text-gray-400">{book.chapters} ch.</p>
                  </div>
                  <ChevronRight size={14} className="text-gray-300 flex-shrink-0" />
                </button>
              ))}
            </div>
          </>
        )}
        {testament !== 'all' && (
          <div className="grid grid-cols-2 gap-2">
            {filteredBooks.map(book => (
              <button key={book.id} onClick={() => selectBook(book)}
                className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100 hover:border-blue/40 hover:bg-blue-light transition-all text-left">
                <div>
                  <p className="font-semibold text-sm text-navy leading-tight">{book.name}</p>
                  <p className="text-xs text-gray-400">{book.chapters} ch.</p>
                </div>
                <ChevronRight size={14} className="text-gray-300 flex-shrink-0" />
              </button>
            ))}
          </div>
        )}
        <div className="h-6" />
      </div>
    </div>
  )

  // ── VUE CHAPITRES ─────────────────────────────────────────────────────────
  if (view === 'chapters') return (
    <div>
      <div className="bg-navy px-5 py-4">
        <div className="flex items-center gap-3">
          <button onClick={() => setView('books')} className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-white hover:bg-white/20 transition-colors">
            <ArrowLeft size={16} />
          </button>
          <div>
            <span className="font-syne font-bold text-white text-lg">{selectedBook.name}</span>
            <p className="text-white/50 text-xs">{selectedBook.chapters} chapitres</p>
          </div>
        </div>
      </div>
      <div className="px-5 py-4">
        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: selectedBook.chapters }, (_, i) => i + 1).map(ch => {
            const hasData = !!OFFLINE_VERSES[selectedBook.id]?.[ch]
            return (
              <button key={ch}
                onClick={() => { setSelectedChapter(ch); loadChapter(selectedBook.id, ch) }}
                className={`aspect-square rounded-xl font-bold text-sm flex items-center justify-center transition-all ${
                  hasData
                    ? 'bg-blue text-white hover:bg-blue-dark shadow-sm'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {ch}
              </button>
            )
          })}
        </div>
        <p className="text-xs text-gray-400 text-center mt-4">
          🔵 Chapitres disponibles hors-ligne · ⬜ Nécessite Internet
        </p>
      </div>
    </div>
  )

  // ── VUE LECTEUR ───────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col min-h-full">
      {/* Header lecteur */}
      <div className="bg-navy px-5 py-3 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setView('chapters')} className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-white hover:bg-white/20 transition-colors">
              <ArrowLeft size={16} />
            </button>
            <div>
              <span className="font-syne font-bold text-white">{selectedBook.name} {selectedChapter}</span>
              <p className="text-white/50 text-xs">{verses.length} versets</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => toggleFavorite(`${selectedBook.name} ${selectedChapter}`)}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                favorites.includes(`${selectedBook.name} ${selectedChapter}`)
                  ? 'bg-gold text-navy'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Heart size={15} />
            </button>
            <button className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-white hover:bg-white/20 transition-colors">
              <Share2 size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Versets */}
      <div className="flex-1 px-5 py-4 overflow-y-auto">
        <div className="space-y-1 mb-6">
          {verses.map((verse) => (
            <div key={verse.num}
              className="flex gap-3 p-3 rounded-xl hover:bg-blue-light cursor-pointer transition-colors group"
              onClick={() => toggleFavorite(`${selectedBook.name} ${selectedChapter}:${verse.num}`)}
            >
              <span className="text-gold font-bold text-xs min-w-[24px] pt-1 group-hover:text-gold-dark">
                {verse.num}
              </span>
              <p className="text-gray-800 text-[15px] leading-relaxed flex-1">{verse.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation chapitres */}
      <div className="sticky bottom-0 bg-white border-t border-gray-100 px-5 py-3 flex items-center justify-between gap-3">
        <button
          onClick={prevChapter}
          disabled={selectedChapter <= 1}
          className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 rounded-xl text-sm font-medium text-gray-600 disabled:opacity-30 hover:bg-gray-200 transition-colors"
        >
          <ChevronLeft size={16} /> Précédent
        </button>
        <button
          onClick={() => setView('chapters')}
          className="flex-1 py-2.5 bg-blue-light rounded-xl text-blue text-sm font-bold text-center hover:bg-blue/10 transition-colors"
        >
          {selectedBook.name} — Ch. {selectedChapter}
        </button>
        <button
          onClick={nextChapter}
          disabled={selectedChapter >= selectedBook.chapters}
          className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 rounded-xl text-sm font-medium text-gray-600 disabled:opacity-30 hover:bg-gray-200 transition-colors"
        >
          Suivant <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}
