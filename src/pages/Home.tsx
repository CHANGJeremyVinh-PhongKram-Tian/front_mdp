import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, Heart, Send, MapPin, Music, Tent, Trophy, MoreHorizontal, Home as HomeIcon, Ticket, User, Disc, Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import starLogo from '../assets/star.png';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Hide standard navbar/footer for full immersion
    const nav = document.querySelector('nav');
    const footer = document.querySelector('footer');
    if (nav) nav.style.display = 'none';
    if (footer) footer.style.display = 'none';

    // Fetch from backend
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000/api'}/evenements`);
        if (!response.ok) throw new Error("Erreur");
        const data = await response.json();
        
        // Adapter les données du backend Laravel (Français) aux propriétés du Front (Anglais)
        const mappedData = data.map(evt => ({
          id: evt.id,
          title: evt.titre || evt.title,
          city: evt.lieu || evt.city,
          date: evt.date_debut || evt.date || "24 Mai 2026",
          price: evt.prix || evt.price,
          image: evt.photo ? (evt.photo.startsWith('http') ? evt.photo : `${(import.meta.env.VITE_API_URL || 'http://localhost:8000/api').replace('/api', '')}/storage/${evt.photo}`) : evt.image,
          theme: evt.categorie || evt.theme
        }));
        
        setEvents(mappedData);
      } catch (err) {
        console.error(err);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();

    return () => {
      if (nav) nav.style.display = '';
      if (footer) footer.style.display = '';
    }
  }, []);

  return (
    <div className={`w-full max-w-[430px] mx-auto min-h-screen relative pb-32 font-sans overflow-x-hidden transition-colors duration-300 ${isDarkMode ? 'bg-[#111111]' : 'bg-[#FAFAFA]'}`}>
      
      {/* BACKGROUND GRADIENT */}
      <div className={`absolute top-0 left-0 w-full h-72 -z-10 transition-opacity duration-500 ${isDarkMode ? 'bg-gradient-to-br from-[#FFE45E]/10 via-[#111111] to-[#8B5CF6]/20' : 'bg-gradient-to-br from-[#FFF5D1]/80 via-white to-[#EAE0FF]/80'}`}></div>

      {/* HEADER */}
      <div className="px-6 pt-14 pb-4 flex justify-between items-center">
        <div className="flex items-center gap-1">
          <h1 className={`text-2xl font-black tracking-tighter ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>SPARKUP</h1>
          <img src={starLogo} alt="SparkUp" className="w-8 h-8 object-contain" />
        </div>
        <div className="flex gap-2">
          {/* THEME TOGGLE BUTTON */}
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm border transition-colors ${isDarkMode ? 'bg-[#222222] border-[#333333] text-yellow-400' : 'bg-white border-gray-100 text-gray-700'}`}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm border transition-colors relative ${isDarkMode ? 'bg-[#222222] border-[#333333] text-white' : 'bg-white border-gray-100 text-gray-700'}`}>
            <Heart size={18} />
            {isDarkMode && <span className="absolute top-2 right-2 w-2 h-2 bg-[#8B5CF6] rounded-full border border-[#222]"></span>}
          </button>
          <button className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm border transition-colors ${isDarkMode ? 'bg-[#222222] border-[#333333] text-white' : 'bg-white border-gray-100 text-gray-700'}`}>
            <Send size={18} />
          </button>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="px-6 mb-8">
        <div className="relative">
          <SearchIcon className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} size={18} />
          <input 
            type="text" 
            placeholder="Rechercher un évènement, une ville, un artiste..." 
            className={`w-full pl-11 pr-4 py-3.5 rounded-full shadow-sm border text-[13px] font-medium focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/30 transition-colors ${isDarkMode ? 'bg-[#222222] border-[#333333] text-white placeholder-gray-400' : 'bg-white border-gray-100 text-gray-900 placeholder-gray-400'}`}
          />
        </div>
      </div>

      {/* CATEGORIES */}
      <div className="px-6 mb-10">
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {/* TOUT */}
          <div className="flex flex-col items-center gap-2 min-w-[60px]">
            <button className="w-16 h-16 rounded-2xl bg-[#FFE45E] flex items-center justify-center shadow-sm text-gray-900">
              <img src={starLogo} alt="Tout" className="w-8 h-8 object-contain" />
            </button>
            <span className={`text-[11px] font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Tout</span>
          </div>
          {/* CONCERTS */}
          <div className="flex flex-col items-center gap-2 min-w-[60px]">
            <button className={`w-16 h-16 rounded-2xl border flex items-center justify-center shadow-sm transition-colors ${isDarkMode ? 'bg-[#222222] border-[#333333] text-white' : 'bg-white border-gray-100 text-gray-900'}`}>
              <Music size={24} />
            </button>
            <span className={`text-[11px] font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Concerts</span>
          </div>
          {/* CLUBS */}
          <div className="flex flex-col items-center gap-2 min-w-[60px]">
            <button className={`w-16 h-16 rounded-2xl border flex items-center justify-center shadow-sm transition-colors ${isDarkMode ? 'bg-[#222222] border-[#333333] text-white' : 'bg-white border-gray-100 text-gray-900'}`}>
              <Disc size={24} />
            </button>
            <span className={`text-[11px] font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Clubs</span>
          </div>
          {/* FESTIVALS */}
          <div className="flex flex-col items-center gap-2 min-w-[60px]">
            <button className={`w-16 h-16 rounded-2xl border flex items-center justify-center shadow-sm transition-colors ${isDarkMode ? 'bg-[#222222] border-[#333333] text-white' : 'bg-white border-gray-100 text-gray-900'}`}>
              <Tent size={24} />
            </button>
            <span className={`text-[11px] font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Festivals</span>
          </div>
          {/* SPORT */}
          <div className="flex flex-col items-center gap-2 min-w-[60px]">
            <button className={`w-16 h-16 rounded-2xl border flex items-center justify-center shadow-sm transition-colors ${isDarkMode ? 'bg-[#222222] border-[#333333] text-white' : 'bg-white border-gray-100 text-gray-900'}`}>
              <Trophy size={24} />
            </button>
            <span className={`text-[11px] font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Sport</span>
          </div>
          {/* PLUS */}
          <div className="flex flex-col items-center gap-2 min-w-[60px]">
            <button className={`w-16 h-16 rounded-2xl border flex items-center justify-center shadow-sm transition-colors ${isDarkMode ? 'bg-[#222222] border-[#333333] text-white' : 'bg-white border-gray-100 text-gray-900'}`}>
              <MoreHorizontal size={24} />
            </button>
            <span className={`text-[11px] font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Plus</span>
          </div>
        </div>
      </div>

      {/* A LA UNE */}
      <div className="mb-8">
        <div className="px-6 mb-4 flex justify-between items-center">
          <h2 className={`text-xl font-bold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>À la une <img src={starLogo} alt="Star" className="w-5 h-5 object-contain inline-block" /></h2>
          <button className="text-[13px] font-semibold text-gray-500 hover:text-[#8B5CF6] transition-colors">Voir tout &gt;</button>
        </div>
        
        <div className="flex gap-4 overflow-x-auto no-scrollbar px-6 pb-4">
          {loading ? (
             <div className="w-full flex justify-center py-10"><div className="animate-spin h-6 w-6 border-b-2 border-[#8B5CF6] rounded-full"></div></div>
          ) : (
            events.slice(0,3).map(event => (
              <Link to={`/event/${event.id}`} key={event.id} className="min-w-[160px] w-[160px]">
                <div className={`rounded-[20px] overflow-hidden shadow-sm border h-[220px] flex flex-col relative transition-colors ${isDarkMode ? 'bg-[#222222] border-[#333333]' : 'bg-white border-gray-100'}`}>
                  {/* Image & Date */}
                  <div className="relative h-32 w-full shrink-0">
                    <img 
                      src={event.image || `https://picsum.photos/seed/${event.id}/400/300`} 
                      onError={(e) => { e.currentTarget.src = `https://picsum.photos/seed/${event.id + 100}/400/300`; }}
                      alt={event.title} 
                      className="w-full h-full object-cover" 
                    />
                    <button className="absolute top-2 right-2 text-white/80 hover:text-white">
                      <Heart size={18} />
                    </button>
                    <div className="absolute bottom-2 left-2 bg-[#FFE45E] px-2 py-1 rounded-lg flex flex-col items-center shadow-sm">
                      <span className="text-[14px] font-black text-gray-900 leading-none">{event.date?.split(' ')[0] || '24'}</span>
                      <span className="text-[8px] font-bold text-gray-900 uppercase leading-none mt-0.5">{event.date?.split(' ')[1] || 'MAI'}</span>
                    </div>
                  </div>
                  {/* Info */}
                  <div className="p-3 flex flex-col justify-between grow">
                    <div>
                      <h3 className={`text-[13px] font-black uppercase leading-tight line-clamp-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{event.title}</h3>
                      <p className="text-[11px] text-gray-500 font-medium flex items-center gap-1 mt-1 truncate">
                        <MapPin size={10} /> {event.city}
                      </p>
                    </div>
                    <p className="text-[13px] font-bold text-[#8B5CF6]">{event.price ? `${event.price} €` : 'Gratuit'}</p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>

      {/* BANNER ORGANISATEUR */}
      <div className="px-6 mb-10">
        <div className={`rounded-[24px] p-5 relative overflow-hidden flex items-center shadow-sm border transition-colors ${isDarkMode ? 'bg-[#2A2416] border-[#3D3525]' : 'bg-[#FFF8F0] border-orange-50'}`}>
          <div className="w-2/3 z-10 relative">
            <h3 className={`text-[15px] font-black mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Organisateur d'évènements ?</h3>
            <p className={`text-[11px] mb-3 leading-snug ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Créer ton évènement, personnalise ta page et vends tes billets en quelques minutes.</p>
            <button className="text-[12px] font-bold text-[#8B5CF6] flex items-center gap-1">
              En savoir plus <span>→</span>
            </button>
          </div>
          {/* Décoration tickets */}
          <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 text-7xl opacity-90 flex">
             🎟️
          </div>
        </div>
      </div>

      {/* RECOMMANDE POUR VOUS */}
      <div className="px-6 mb-8">
        <div className="mb-4 flex justify-between items-center">
          <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Recommandé pour vous</h2>
          <button className="text-[13px] font-semibold text-gray-500 hover:text-[#8B5CF6] transition-colors">Voir tout &gt;</button>
        </div>
        
        <div className="flex flex-col gap-3">
          {events.slice(0, 5).map(event => (
            <Link to={`/event/${event.id}`} key={`rec-${event.id}`} className={`rounded-[20px] p-2 flex items-center shadow-sm border gap-3 transition-colors ${isDarkMode ? 'bg-[#222222] border-[#333333]' : 'bg-white border-gray-100'}`}>
              <div className="w-[80px] h-[80px] shrink-0 rounded-[16px] overflow-hidden">
                <img 
                  src={event.image || `https://picsum.photos/seed/${event.id + 50}/200/200`} 
                  onError={(e) => { e.currentTarget.src = `https://picsum.photos/seed/${event.id + 150}/200/200`; }}
                  alt={event.title} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="flex-grow py-1 pr-2 flex justify-between items-center">
                <div>
                  <h3 className={`text-[14px] font-black uppercase leading-tight mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{event.title}</h3>
                  <p className="text-[12px] text-gray-500 font-medium flex items-center gap-1 mb-2">
                    <MapPin size={12} /> {event.city}
                  </p>
                  <span className={`text-[9px] font-bold bg-[#F3E8FF] px-2 py-0.5 rounded-md uppercase ${isDarkMode ? 'text-[#A78BFA] bg-[#2D1F3F]' : 'text-[#8B5CF6] bg-[#F3E8FF]'}`}>DJ SET</span>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <Heart size={18} className="text-gray-400" />
                  <span className="text-[14px] font-bold text-[#8B5CF6]">{event.price ? `${event.price} €` : '15,00 €'}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* BOTTOM TAB BAR FLOATING */}
      <div className={`fixed bottom-6 left-0 right-0 w-[90%] max-w-[390px] mx-auto rounded-full px-6 py-3 flex justify-between items-center z-50 shadow-[0_10px_40px_rgba(0,0,0,0.1)] border transition-colors ${isDarkMode ? 'bg-[#222222] border-[#333333]' : 'bg-white border-gray-100'}`}>
        <button className={`flex flex-col items-center gap-1 ${isDarkMode ? 'text-[#A78BFA]' : 'text-[#8B5CF6]'}`}>
          <div className={`w-14 h-9 rounded-full flex items-center justify-center transition-colors ${isDarkMode ? 'bg-[#2D1F3F]' : 'bg-[#F3E8FF]'}`}>
            <HomeIcon size={20} strokeWidth={2.5} />
          </div>
          <span className="text-[10px] font-bold mt-0.5">Accueil</span>
        </button>
        <button className={`flex flex-col items-center gap-1 pt-1 transition-colors ${isDarkMode ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-gray-900'}`}>
          <SearchIcon size={22} strokeWidth={2} />
          <span className="text-[10px] font-semibold mt-1">Recherche</span>
        </button>
        <button className={`flex flex-col items-center gap-1 pt-1 transition-colors ${isDarkMode ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-gray-900'}`}>
          <Ticket size={22} strokeWidth={2} />
          <span className="text-[10px] font-semibold mt-1">Mes billets</span>
        </button>
        <button className={`flex flex-col items-center gap-1 pt-1 transition-colors ${isDarkMode ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-gray-900'}`}>
          <User size={22} strokeWidth={2} />
          <span className="text-[10px] font-semibold mt-1">Profil</span>
        </button>
      </div>

    </div>
  );
};

export default Home;