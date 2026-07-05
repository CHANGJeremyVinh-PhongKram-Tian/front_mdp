import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Music, Heart, ChevronLeft, Forward, ChevronDown, Ticket } from 'lucide-react';

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
  image: 'https://images.unsplash.com/photo-1540039155732-68473668c2d1?q=80&w=800'
};

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`${API_URL}/evenements/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('API Error');
        return res.json();
      })
      .then((data) => {
        if (data && (data.title || data.titre)) {
          // Normalize data
          const normalizedEvent = {
            ...data,
            title: data.titre || data.title,
            image: data.photo || data.image,
            city: data.lieu || data.city,
            date: data.date_debut || data.date,
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
  }, [id]);

  const formatPrice = (price) => {
    if (!price && price !== 0) return '25,00 €'; // Fallback
    return `${Number(price).toFixed(2).replace('.', ',')} €`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#8b44f7] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Formatting date for display
  let day = "24";
  let month = "MAI";
  let fullDate = "sam 24 mai 2025";
  if (event.date) {
    const parts = event.date.split('-');
    if (parts.length === 3) {
      day = parts[2];
      const m = parseInt(parts[1]);
      const mois = ['JAN', 'FÉV', 'MAR', 'AVR', 'MAI', 'JUN', 'JUI', 'AOÛ', 'SEP', 'OCT', 'NOV', 'DÉC'];
      month = mois[m-1] || 'MAI';
      fullDate = `sam ${day} ${month.toLowerCase()} ${parts[0]}`;
    } else if (event.date.includes(' ')) {
      day = event.date.substring(8, 10);
      const m = parseInt(event.date.substring(5, 7));
      const mois = ['JAN', 'FÉV', 'MAR', 'AVR', 'MAI', 'JUN', 'JUI', 'AOÛ', 'SEP', 'OCT', 'NOV', 'DÉC'];
      month = mois[m-1] || 'MAI';
      fullDate = `sam ${day} ${month.toLowerCase()} 2025`;
    }
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans antialiased relative pb-32">
      {/* Background Halos */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#DBCDF8]/50 rounded-full blur-[80px] -z-10 -translate-y-20 translate-x-10 pointer-events-none"></div>
      <div className="absolute top-40 left-0 w-64 h-64 bg-[#FFF9C4]/60 rounded-full blur-[80px] -z-10 -translate-x-20 pointer-events-none"></div>

      {/* Floating Header */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-5 pt-12 pointer-events-none">
        <button onClick={() => navigate(-1)} className="w-11 h-11 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-[0_2px_15px_rgba(0,0,0,0.05)] pointer-events-auto active:scale-95 transition-transform">
          <ChevronLeft size={24} strokeWidth={2.5} className="text-gray-900 pr-0.5" />
        </button>
        <button className="w-11 h-11 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-[0_2px_15px_rgba(0,0,0,0.05)] pointer-events-auto active:scale-95 transition-transform">
          <Forward size={22} strokeWidth={2.5} className="text-gray-900" />
        </button>
      </div>

      <div className="px-5 pt-28">
        {/* Main Image */}
        <div className="relative h-64 w-full rounded-[28px] overflow-hidden mb-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] bg-gray-100">
          <img 
            src={event.image && event.image.startsWith('http') ? event.image : (event.image ? `http://localhost:8000/storage/${event.image}` : FAKE_EVENT.image)} 
            alt={event.title} 
            className="w-full h-full object-cover"
          />
          <button className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center bg-black/30 backdrop-blur-md">
            <Heart size={14} className="text-white" strokeWidth={2.5} />
          </button>
          <div className="absolute bottom-3 left-3 bg-[#f5c000] rounded-xl px-3 py-2 flex flex-col items-center justify-center min-w-[50px] shadow-lg">
            <span className="text-[18px] font-black leading-none">{day}</span>
            <span className="text-[10px] font-black uppercase leading-none mt-1 text-gray-900">{month}</span>
          </div>
        </div>

        {/* Title & Price */}
        <div className="flex justify-between items-start mb-7 px-1">
          <div className="flex-1 pr-2">
            <h1 className="text-[22px] font-black text-gray-900 uppercase leading-tight tracking-tight">{event.title}</h1>
            <p className="text-[13px] font-medium text-gray-600 mt-1.5">
              Par <span className="text-[#8b44f7] font-bold">{event.organisateur?.name || 'David Guetta'}</span>
            </p>
          </div>
          <div className="text-[18px] font-black text-[#8b44f7] pt-0.5 shrink-0">
            {formatPrice(event.prix || event.price)}
          </div>
        </div>

        {/* Details Card */}
        <div className="bg-white rounded-[26px] p-5 shadow-[0_2px_20px_rgba(0,0,0,0.03)] border border-gray-50 mb-8">
          {/* Date */}
          <div className="flex items-start gap-4 mb-5">
            <div className="mt-0.5 text-[#8b44f7]">
              <Calendar size={22} strokeWidth={2} />
            </div>
            <div>
              <p className="text-[13px] font-black text-gray-900">{fullDate}</p>
              <p className="text-[12px] font-medium text-gray-500 mt-0.5">{event.time || 'De 18:00 à 02:00'}</p>
            </div>
          </div>
          <div className="h-[1px] w-full bg-gray-50 ml-10 mb-5"></div>
          
          {/* Location */}
          <div className="flex items-start gap-4 mb-5">
            <div className="mt-0.5 text-[#8b44f7]">
              <MapPin size={22} strokeWidth={2} />
            </div>
            <div>
              <p className="text-[13px] font-black text-gray-900">{event.address ? event.address.split(',')[0] : 'La Sucrière'}</p>
              <p className="text-[12px] font-medium text-gray-500 mt-0.5 leading-snug">{event.address || '49-50 Quai Rambaud, 69002 Lyon, France'}</p>
            </div>
          </div>
          <div className="h-[1px] w-full bg-gray-50 ml-10 mb-5"></div>

          {/* Music Style */}
          <div className="flex items-start gap-4">
            <div className="mt-0.5 text-[#8b44f7]">
              <Music size={22} strokeWidth={2} />
            </div>
            <div>
              <p className="text-[13px] font-black text-gray-900">{event.theme || 'Électro - House - Techno'}</p>
              <p className="text-[12px] font-medium text-gray-500 mt-0.5">{event.tags || 'DJ Set - Live - Good vibes'}</p>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="mb-8 px-1">
          <h2 className="text-[13px] font-black text-gray-900 uppercase tracking-wide mb-3">À propos</h2>
          <p className="text-[13px] font-medium text-gray-700 leading-relaxed">
            {event.description || FAKE_EVENT.description}
          </p>
          <div className="flex justify-center mt-3">
            <ChevronDown size={20} className="text-[#8b44f7]" />
          </div>
        </div>

        {/* Organizer */}
        <div className="mb-9 px-1">
          <h2 className="text-[13px] font-black text-gray-900 uppercase tracking-wide mb-4">Organisé par</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src={event.organisateur?.avatar || FAKE_EVENT.organisateur.avatar} 
                alt="Organizer" 
                className="w-12 h-12 rounded-full object-cover border-[3px] border-white shadow-sm"
              />
              <span className="text-[14px] font-black text-gray-900">{event.organisateur?.name || 'David Guetta'}</span>
            </div>
            <button className="bg-[#DBCDF8]/40 text-[#8b44f7] text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest transition-colors hover:bg-[#DBCDF8]/60">
              Suivre
            </button>
          </div>
        </div>

        {/* Map */}
        <div className="mb-4 px-1">
          <h2 className="text-[13px] font-black text-gray-900 uppercase tracking-wide mb-4 flex items-center gap-4">
            Lieu <div className="h-[3px] w-24 bg-gray-900 rounded-full"></div>
          </h2>
          <div className="w-full h-44 rounded-[24px] overflow-hidden shadow-sm border border-gray-100 bg-gray-200">
            {/* Fake Map Image with Google Maps style */}
            <img 
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600&blur=2" 
              alt="Map" 
              className="w-full h-full object-cover opacity-90 scale-105"
            />
          </div>
        </div>
      </div>

      {/* Sticky Bottom Button */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-50">
        <Link to={`/payment/${event.id || 'demo'}`} className="block w-full">
          <button className="w-full bg-[#8b44f7] text-white rounded-[24px] py-[18px] px-6 flex items-center justify-between shadow-[0_8px_30px_rgba(139,68,247,0.3)] active:scale-95 transition-transform border border-purple-500/50">
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