import React, { useState, useEffect } from 'react';
import { 
  Heart, Send, Search, Music, Disc, Tent, Trophy, MoreHorizontal, 
  MapPin, Home as HomeIcon, User, Ticket, ArrowRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const FAKE_EVENTS = [
    { id: 'demo-1', title: 'SUMMER VIBES', city: 'Lyon', date: '2025-05-24 18:00:00', prix: 25, theme: 'Électro', image: 'https://images.unsplash.com/photo-1540039155732-68473668c2d1?q=80&w=400' },
    { id: 'demo-2', title: 'TECHNO ROOM', city: 'Marseille', date: '2025-05-24 23:00:00', prix: 18, theme: 'Techno', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=400' },
    { id: 'demo-3', title: 'GREEN FESTIVAL', city: 'Bordeaux', date: '2025-05-24 14:00:00', prix: 35, theme: 'Festival', image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=400' },
    { id: 'demo-4', title: 'AFTER SCHOOL', city: 'Paris', date: '2025-06-10 19:00:00', prix: 20, theme: 'DJ SET', image: 'https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=200' },
    { id: 'demo-5', title: 'SUNSET PARTY', city: 'Nice', date: '2025-07-15 17:00:00', prix: 15, theme: 'HOUSE', image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=200' }
  ];

  useEffect(() => {
    fetch(`${API_URL}/evenements`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          // Normalize data
          const normalizedData = data.map(evt => ({
            ...evt,
            title: evt.titre || evt.title,
            image: evt.photo || evt.image,
            city: evt.lieu || evt.city,
            date: evt.date_debut || evt.date,
            price: evt.prix || evt.price,
          }));
          setEvents(normalizedData);
        } else {
          setEvents(FAKE_EVENTS); // Fallback demo
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erreur API, activation mode démo:', err);
        setEvents(FAKE_EVENTS); // Fallback demo on error
        setLoading(false);
      });
  }, []);

  const formatPrice = (price) => {
    if (!price && price !== 0) return 'Gratuit';
    return `${Number(price).toFixed(2).replace('.', ',')} €`;
  };

  const categories = [
    { id: 'all', label: 'Tout', icon: <div className="w-5 h-5 flex items-center justify-center"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div>, active: true },
    { id: 'concerts', label: 'Concerts', icon: <Music size={20} strokeWidth={2.5} /> },
    { id: 'clubs', label: 'Clubs', icon: <Disc size={20} strokeWidth={2.5} /> },
    { id: 'festivals', label: 'Festivals', icon: <Tent size={20} strokeWidth={2.5} /> },
    { id: 'sport', label: 'Sport', icon: <Trophy size={20} strokeWidth={2.5} /> },
    { id: 'plus', label: 'Plus', icon: <MoreHorizontal size={20} strokeWidth={2.5} /> },
  ];

  // Séparation pour l'affichage : 3 premiers "À la une", le reste "Recommandé"
  const featuredEvents = events.slice(0, 3);
  const recommendedEvents = events.slice(3, 10);

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans antialiased relative pb-28">
      {/* Background Halos */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#DBCDF8]/40 rounded-full blur-[70px] -z-10 -translate-y-16 translate-x-12 pointer-events-none"></div>
      <div className="absolute top-32 left-0 w-72 h-72 bg-[#FFF9C4]/50 rounded-full blur-[70px] -z-10 -translate-x-16 pointer-events-none"></div>

      <div className="px-5 pt-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-7">
          <div className="flex items-center gap-2">
            <h1 className="text-[22px] font-black tracking-tighter text-gray-900 uppercase">SPARKUP</h1>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill="#f5c000"/>
            </svg>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.03)] relative active:scale-95 transition-transform">
              <Heart size={20} strokeWidth={2.5} className="text-gray-800" />
              <span className="absolute top-2.5 right-2 w-[7px] h-[7px] bg-[#8b44f7] rounded-full border border-white"></span>
            </button>
            <button className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.03)] relative active:scale-95 transition-transform">
              <Send size={20} strokeWidth={2.5} className="text-gray-800" />
              <span className="absolute top-2.5 right-2 w-[7px] h-[7px] bg-[#8b44f7] rounded-full border border-white"></span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input 
            type="text" 
            placeholder="Rechercher un événement, une ville, un artiste..." 
            className="w-full pl-11 pr-4 py-[15px] bg-white rounded-[20px] text-[13px] font-medium text-gray-700 placeholder-gray-400 outline-none shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-50"
          />
        </div>

        {/* Categories Scroll */}
        <div className="flex overflow-x-auto gap-3 pb-4 mb-5 scrollbar-hide -mx-5 px-5">
          {categories.map(cat => (
            <button 
              key={cat.id} 
              className={`flex flex-col items-center justify-center min-w-[76px] h-[84px] rounded-[24px] shrink-0 gap-1.5 transition-all shadow-[0_2px_10px_rgba(0,0,0,0.02)] active:scale-95
                ${cat.active ? 'bg-[#f5c000] text-gray-900 border border-yellow-300/30' : 'bg-white text-gray-900 border border-gray-50'}`}
            >
              <div className="mt-1">{cat.icon}</div>
              <span className="text-[10px] font-black">{cat.label}</span>
            </button>
          ))}
        </div>

        {/* À la une */}
        <div className="mb-9">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[18px] font-black flex items-center gap-1.5 text-gray-900">
              À la une <svg width="14" height="14" viewBox="0 0 24 24" fill="#f5c000"><path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"/></svg>
            </h2>
            <button className="text-[11px] text-gray-500 font-bold flex items-center hover:text-gray-900 transition-colors">Voir tout <ArrowRight size={12} className="ml-0.5" /></button>
          </div>

          <div className="flex overflow-x-auto gap-4 pb-4 -mx-5 px-5 scrollbar-hide">
            {loading ? (
               <div className="w-full flex justify-center py-6">
                 <div className="w-8 h-8 border-4 border-[#8b44f7] border-t-transparent rounded-full animate-spin"></div>
               </div>
            ) : featuredEvents.length > 0 ? featuredEvents.map(event => {
              // Parse date correctly
              let day = "24";
              let month = "MAI";
              if (event.date) {
                const dateParts = event.date.split(' ');
                if (dateParts.length >= 2) {
                  day = dateParts[0];
                  month = dateParts[1].substring(0, 3).toUpperCase();
                } else {
                  day = event.date.substring(8, 10);
                  const m = parseInt(event.date.substring(5, 7));
                  const mois = ['JAN', 'FÉV', 'MAR', 'AVR', 'MAI', 'JUN', 'JUI', 'AOÛ', 'SEP', 'OCT', 'NOV', 'DÉC'];
                  month = mois[m-1] || 'MAI';
                }
              }

              return (
              <Link to={`/event/${event.id}`} key={event.id} className="min-w-[170px] max-w-[170px] bg-white rounded-[26px] p-2.5 pb-3.5 shrink-0 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-50 block active:scale-95 transition-transform">
                <div className="relative h-36 w-full rounded-[20px] overflow-hidden mb-3.5 bg-gray-100">
                  <img 
                    src={event.image && event.image.startsWith('http') ? event.image : (event.image ? `http://localhost:8000/storage/${event.image}` : 'https://images.unsplash.com/photo-1540039155732-68473668c2d1?q=80&w=400')} 
                    alt={event.title} 
                    className="w-full h-full object-cover" 
                  />
                  <button className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center bg-black/20 backdrop-blur-md">
                    <Heart size={14} className="text-white" strokeWidth={2.5} />
                  </button>
                  <div className="absolute bottom-2 left-2 bg-[#f5c000] rounded-xl px-2.5 py-1.5 flex flex-col items-center justify-center min-w-[38px] shadow-sm">
                    <span className="text-[15px] font-black leading-none">{day}</span>
                    <span className="text-[8px] font-black uppercase leading-none mt-0.5">{month}</span>
                  </div>
                </div>
                <div className="px-1">
                  <h3 className="text-[13px] font-black leading-tight mb-1.5 truncate text-gray-900">{event.title}</h3>
                  <div className="flex items-center text-gray-400 text-[10px] font-medium mb-2">
                    <MapPin size={11} className="mr-1 shrink-0" />
                    <span className="truncate">{event.city || 'Ville'}, France</span>
                  </div>
                  <p className="text-[#8b44f7] text-[13px] font-black">{formatPrice(event.prix || event.price)}</p>
                </div>
              </Link>
            )}) : (
              <p className="text-gray-500 font-medium text-sm">Aucun événement à la une.</p>
            )}
          </div>
        </div>

        {/* Banner Promo */}
        <div className="bg-gradient-to-r from-[#FFF9E6] to-[#F1E9FF] rounded-[24px] p-5 mb-9 relative overflow-hidden flex items-center justify-between shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
          <div className="relative z-10 w-2/3 pr-2">
            <h3 className="text-[15px] font-black text-gray-900 mb-1.5 leading-tight">Organisateur d'évènements ?</h3>
            <p className="text-[10px] font-medium text-gray-600 mb-3 leading-snug">
              Créer ton événement, personnalise ta page et vends tes billets en quelques minutes.
            </p>
            <Link to="/organizer/auth" className="text-[#8b44f7] text-[11px] font-black flex items-center">
              En savoir plus <ArrowRight size={12} className="ml-1" strokeWidth={3} />
            </Link>
          </div>
          {/* Illustration simple tickets */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-full flex items-center justify-end pr-3 pointer-events-none opacity-90">
             <div className="relative w-20 h-16 mr-2">
               <div className="absolute w-16 h-10 bg-[#f5c000] rounded-lg rotate-12 right-0 top-0 shadow-sm flex items-center justify-center">
                 <div className="w-2 h-2 rounded-full bg-white opacity-50 absolute -left-1"></div>
                 <div className="w-2 h-2 rounded-full bg-white opacity-50 absolute -right-1"></div>
               </div>
               <div className="absolute w-16 h-10 bg-[#8b44f7] rounded-lg -rotate-6 left-0 bottom-1 shadow-sm flex items-center justify-center">
                 <div className="w-2 h-2 rounded-full bg-white opacity-50 absolute -left-1"></div>
                 <div className="w-2 h-2 rounded-full bg-white opacity-50 absolute -right-1"></div>
                 <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"/></svg>
               </div>
             </div>
          </div>
        </div>

        {/* Recommandé pour vous */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[18px] font-black text-gray-900">Recommandé pour vous</h2>
            <button className="text-[11px] text-gray-500 font-bold flex items-center hover:text-gray-900 transition-colors">Voir tout <ArrowRight size={12} className="ml-0.5" /></button>
          </div>

          <div className="flex flex-col gap-3">
             {loading ? (
                <div className="w-full flex justify-center py-4"></div>
             ) : recommendedEvents.length > 0 ? recommendedEvents.map(event => (
               <Link to={`/event/${event.id}`} key={event.id} className="bg-white rounded-[24px] p-2.5 flex items-center gap-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-50 active:scale-95 transition-transform">
                  <img 
                    src={event.image && event.image.startsWith('http') ? event.image : (event.image ? `http://localhost:8000/storage/${event.image}` : 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=200')} 
                    alt={event.title} 
                    className="w-[72px] h-[72px] rounded-[18px] object-cover shrink-0 bg-gray-100" 
                  />
                  <div className="flex-1 min-w-0 py-1">
                    <h3 className="text-[14px] font-black truncate text-gray-900">{event.title}</h3>
                    <div className="flex items-center text-gray-400 text-[10px] font-medium mt-0.5 mb-1.5">
                      <MapPin size={10} className="mr-1 shrink-0" />
                      <span className="truncate">{event.city || 'Ville'}, France</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-black text-[#8b44f7] bg-[#DBCDF8]/30 px-2 py-0.5 rounded-full uppercase tracking-wide">
                        {event.theme || 'DJ SET'}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between self-stretch py-1 pr-2 shrink-0">
                    <Heart size={16} strokeWidth={2.5} className="text-gray-300" />
                    <span className="text-[#8b44f7] text-[13px] font-black">{formatPrice(event.prix || event.price)}</span>
                  </div>
               </Link>
             )) : (
               <p className="text-gray-500 font-medium text-sm text-center py-4">Plus d'événements à afficher.</p>
             )}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-white/95 backdrop-blur-md rounded-full p-2 shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex justify-between items-center z-50 border border-gray-50">
        <button className="flex flex-col items-center justify-center gap-1 bg-[#DBCDF8]/40 px-5 py-2.5 rounded-full text-[#8b44f7] transition-all">
          <HomeIcon size={22} strokeWidth={2.5} />
          <span className="text-[10px] font-black">Accueil</span>
        </button>
        <button className="flex flex-col items-center justify-center gap-1 text-gray-400 hover:text-gray-900 transition-colors px-4 py-2.5">
          <Search size={22} strokeWidth={2.5} />
          <span className="text-[10px] font-bold">Recherche</span>
        </button>
        <button className="flex flex-col items-center justify-center gap-1 text-gray-400 hover:text-gray-900 transition-colors px-4 py-2.5">
          <Ticket size={22} strokeWidth={2.5} />
          <span className="text-[10px] font-bold">Mes billets</span>
        </button>
        <button className="flex flex-col items-center justify-center gap-1 text-gray-400 hover:text-gray-900 transition-colors px-4 py-2.5">
          <User size={22} strokeWidth={2.5} />
          <span className="text-[10px] font-bold">Profil</span>
        </button>
      </div>

    </div>
  );
};

export default Home;