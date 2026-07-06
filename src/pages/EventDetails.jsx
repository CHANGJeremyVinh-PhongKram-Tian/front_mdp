import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Music, Heart, ChevronLeft, Forward, ChevronDown, Ticket, Moon, Sun } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Fake Data Fallback for Demo
const FAKE_EVENT = {
  id: 'demo',
  title: 'SUMMER VIBES',
  organisateur: {
    name: 'David Guetta',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=100'
  },
  date: '2025-05-24',
  time: 'De 18:00 à 02:00',
  city: 'Lyon',
  address: 'La Sucrière, 49-50 Quai Rambaud, 69002 Lyon, France',
  price: 25,
  theme: 'Électro - House - Techno',
  tags: 'DJ Set - Live - Good vibes',
  description: 'Summer Vibes is back ! ☀️ Une soirée électro au cœur de Lyon avec les meilleurs DJs, des lights de folie et une ambiance unique.',
  image: 'https://picsum.photos/seed/demo/800/600'
};

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Masquer Navbar et Footer pour garder l'aspect mobile first / full screen
    const nav = document.querySelector('nav');
    const footer = document.querySelector('footer');
    if (nav) nav.style.display = 'none';
    if (footer) footer.style.display = 'none';

    fetch(`${API_URL}/evenements/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('API Error');
        return res.json();
      })
      .then((data) => {
        if (data && (data.title || data.titre)) {
          // Normalize data and handle image URL securely (Render vs Localhost)
          const normalizedEvent = {
            ...data,
            title: data.titre || data.title,
            image: data.photo ? (data.photo.startsWith('http') ? data.photo : `${(import.meta.env.VITE_API_URL || 'http://localhost:8000/api').replace('/api', '')}/storage/${data.photo}`) : data.image,
            city: data.ville || data.lieu || data.city,
            address: data.adresse || data.address || data.lieu,
            date: data.date_debut || data.date,
            time: data.heure_debut || data.time || '20:00',
            price: data.prix || data.price,
            description: data.description || data.description,
          };
          setEvent(normalizedEvent);
        } else {
          setEvent(FAKE_EVENT);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('API Error, using fallback', err);
        setEvent(FAKE_EVENT);
        setLoading(false);
      });

    return () => {
      if (nav) nav.style.display = '';
      if (footer) footer.style.display = '';
    }
  }, [id]);

  const formatPrice = (price) => {
    if (!price && price !== 0) return 'Gratuit';
    return `${Number(price).toFixed(2).replace('.', ',')} €`;
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-[#111111]' : 'bg-[#FAFAFA]'}`}>
        <div className="w-10 h-10 border-4 border-[#8B5CF6] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Formatting date for display
  let day = "24";
  let month = "MAI";
  let fullDate = "sam 24 mai 2025";
  
  if (event.date) {
    try {
      // Si c'est déjà un format texte du type "24 Juillet 2025"
      if (/[a-zA-Z]/.test(event.date) && !event.date.includes('T')) {
        const parts = event.date.split(' ');
        if (parts.length >= 2) {
          day = parts[0];
          month = parts[1].substring(0, 3).toUpperCase();
          fullDate = event.date;
        }
      } else {
        // Format YYYY-MM-DD ou Date ISO
        const d = new Date(event.date);
        if (!isNaN(d.getTime())) {
          day = d.getDate().toString().padStart(2, '0');
          const mois = ['JAN', 'FÉV', 'MAR', 'AVR', 'MAI', 'JUN', 'JUI', 'AOÛ', 'SEP', 'OCT', 'NOV', 'DÉC'];
          month = mois[d.getMonth()];
          const jours = ['dim', 'lun', 'mar', 'mer', 'jeu', 'ven', 'sam'];
          fullDate = `${jours[d.getDay()]} ${day} ${month.toLowerCase()} ${d.getFullYear()}`;
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className={`w-full max-w-[430px] mx-auto min-h-screen relative pb-32 font-sans overflow-x-hidden transition-colors duration-300 ${isDarkMode ? 'bg-[#111111]' : 'bg-[#FAFAFA]'}`}>
      
      {/* BACKGROUND GRADIENT */}
      <div className={`absolute top-0 left-0 w-full h-72 -z-10 transition-opacity duration-500 ${isDarkMode ? 'bg-gradient-to-br from-[#FFE45E]/10 via-[#111111] to-[#8B5CF6]/20' : 'bg-gradient-to-br from-[#FFF5D1]/80 via-white to-[#EAE0FF]/80'}`}></div>

      {/* Floating Header */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 flex justify-between items-center p-5 pt-12 pointer-events-none">
        <button onClick={() => navigate(-1)} className={`w-11 h-11 rounded-full flex items-center justify-center shadow-sm pointer-events-auto active:scale-95 transition-colors border ${isDarkMode ? 'bg-[#222222] border-[#333333] text-white' : 'bg-white border-gray-100 text-gray-900'}`}>
          <ChevronLeft size={24} strokeWidth={2.5} className="pr-0.5" />
        </button>
        <div className="flex gap-2 pointer-events-auto">
           {/* THEME TOGGLE BUTTON */}
           <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`w-11 h-11 rounded-full flex items-center justify-center shadow-sm active:scale-95 transition-colors border ${isDarkMode ? 'bg-[#222222] border-[#333333] text-yellow-400' : 'bg-white border-gray-100 text-gray-700'}`}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className={`w-11 h-11 rounded-full flex items-center justify-center shadow-sm active:scale-95 transition-colors border ${isDarkMode ? 'bg-[#222222] border-[#333333] text-white' : 'bg-white border-gray-100 text-gray-900'}`}>
            <Forward size={22} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <div className="px-5 pt-28">
        {/* Main Image */}
        <div className={`relative h-64 w-full rounded-[28px] overflow-hidden mb-6 shadow-sm border ${isDarkMode ? 'bg-[#222222] border-[#333333]' : 'bg-white border-gray-100'}`}>
          <img 
            src={event.image || `https://picsum.photos/seed/${event.id || 'demo'}/800/600`} 
            onError={(e) => { e.currentTarget.src = `https://picsum.photos/seed/${event.id || 'demo'}100/800/600`; }}
            alt={event.title} 
            className="w-full h-full object-cover"
          />
          <button className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-md">
            <Heart size={14} className="text-white" strokeWidth={2.5} />
          </button>
          <div className="absolute bottom-3 left-3 bg-[#FFE45E] rounded-xl px-3 py-2 flex flex-col items-center justify-center min-w-[50px] shadow-sm">
            <span className="text-[18px] font-black leading-none text-gray-900">{day}</span>
            <span className="text-[10px] font-black uppercase leading-none mt-1 text-gray-900">{month}</span>
          </div>
        </div>

        {/* Title & Price */}
        <div className="flex justify-between items-start mb-7 px-1">
          <div className="flex-1 pr-2">
            <h1 className={`text-[22px] font-black uppercase leading-tight tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{event.title}</h1>
            <p className={`text-[13px] font-medium mt-1.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Par <span className="text-[#8B5CF6] font-bold">{event.organisateur?.name || 'David Guetta'}</span>
            </p>
          </div>
          <div className="text-[18px] font-black text-[#8B5CF6] pt-0.5 shrink-0">
            {formatPrice(event.prix || event.price)}
          </div>
        </div>

        {/* Details Card */}
        <div className={`rounded-[24px] p-5 shadow-sm border mb-8 transition-colors ${isDarkMode ? 'bg-[#222222] border-[#333333]' : 'bg-white border-gray-100'}`}>
          {/* Date */}
          <div className="flex items-start gap-4 mb-5">
            <div className="mt-0.5 text-[#8B5CF6]">
              <Calendar size={22} strokeWidth={2} />
            </div>
            <div>
              <p className={`text-[13px] font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{fullDate}</p>
              <p className={`text-[12px] font-medium mt-0.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{event.time || 'De 18:00 à 02:00'}</p>
            </div>
          </div>
          <div className={`h-[1px] w-full ml-10 mb-5 ${isDarkMode ? 'bg-[#333333]' : 'bg-gray-50'}`}></div>
          
          {/* Location */}
          <div className="flex items-start gap-4 mb-5">
            <div className="mt-0.5 text-[#8B5CF6]">
              <MapPin size={22} strokeWidth={2} />
            </div>
            <div>
              <p className={`text-[13px] font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{event.address ? event.address.split(',')[0] : (event.city || 'Lieu inconnu')}</p>
              <p className={`text-[12px] font-medium mt-0.5 leading-snug ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{event.address || event.city || 'Adresse non renseignée'}</p>
            </div>
          </div>
          <div className={`h-[1px] w-full ml-10 mb-5 ${isDarkMode ? 'bg-[#333333]' : 'bg-gray-50'}`}></div>

          {/* Music Style */}
          <div className="flex items-start gap-4">
            <div className="mt-0.5 text-[#8B5CF6]">
              <Music size={22} strokeWidth={2} />
            </div>
            <div>
              <p className={`text-[13px] font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{event.theme || 'Électro - House - Techno'}</p>
              <p className={`text-[12px] font-medium mt-0.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{event.tags || 'DJ Set - Live - Good vibes'}</p>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="mb-8 px-1">
          <h2 className={`text-[13px] font-black uppercase tracking-wide mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>À propos</h2>
          <p className={`text-[13px] font-medium leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>
            {event.description || FAKE_EVENT.description}
          </p>
          <div className="flex justify-center mt-3">
            <ChevronDown size={20} className="text-[#8B5CF6]" />
          </div>
        </div>

        {/* Organizer */}
        <div className="mb-9 px-1">
          <h2 className={`text-[13px] font-black uppercase tracking-wide mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Organisé par</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src={event.organisateur?.avatar || FAKE_EVENT.organisateur.avatar} 
                alt="Organizer" 
                className={`w-12 h-12 rounded-full object-cover border-[3px] shadow-sm ${isDarkMode ? 'border-[#111111]' : 'border-[#FAFAFA]'}`}
              />
              <span className={`text-[14px] font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{event.organisateur?.name || 'David Guetta'}</span>
            </div>
            <button className={`text-[#8B5CF6] text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest transition-colors ${isDarkMode ? 'bg-[#2D1F3F] hover:bg-[#3D2F4F]' : 'bg-[#F3E8FF] hover:bg-[#EAE0FF]'}`}>
              Suivre
            </button>
          </div>
        </div>

        {/* Map */}
        <div className="mb-4 px-1">
          <h2 className={`text-[13px] font-black uppercase tracking-wide mb-4 flex items-center gap-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Lieu <div className={`h-[3px] w-24 rounded-full ${isDarkMode ? 'bg-white' : 'bg-gray-900'}`}></div>
          </h2>
          <div className={`w-full h-44 rounded-[24px] overflow-hidden shadow-sm border ${isDarkMode ? 'bg-[#222222] border-[#333333]' : 'bg-white border-gray-100'}`}>
            <iframe 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              loading="lazy" 
              allowFullScreen 
              referrerPolicy="no-referrer-when-downgrade" 
              src={`https://www.google.com/maps?q=${encodeURIComponent(event.address || event.city || 'Lyon, France')}&output=embed`}
              className={`w-full h-full pointer-events-none sm:pointer-events-auto ${isDarkMode ? 'opacity-80 invert hue-rotate-180 contrast-90' : 'opacity-90'}`}
            ></iframe>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Button */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[390px] z-50">
        <Link to={`/payment/${event.id || 'demo'}`} className="block w-full">
          <button className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-[24px] py-[18px] px-6 flex items-center justify-between shadow-[0_10px_30px_rgba(139,92,246,0.3)] active:scale-95 transition-all">
            <div className="flex items-center gap-3">
              <Ticket size={22} strokeWidth={2.5} className="rotate-[-15deg] opacity-90" />
              <span className="text-[14px] font-black uppercase tracking-wide">Réserver votre billet</span>
            </div>
            <span className="text-[15px] font-black">{formatPrice(event.prix || event.price)}</span>
          </button>
        </Link>
      </div>

    </div>
  );
};

export default EventDetails;