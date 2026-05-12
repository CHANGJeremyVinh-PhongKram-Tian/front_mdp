import React, { useState } from 'react';
import { MapPin, Calendar, Clock, Tag, ChevronDown } from 'lucide-react';

const eventsData = [
  {
    id: 1,
    title: "Match OL - PSG",
    city: "Lyon",
    countryFlag: "🇫🇷",
    theme: "Sport",
    date: "12 Mai 2026",
    time: "21:00",
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=500"
  },
  {
    id: 2,
    title: "Festival Lumière",
    city: "Lyon",
    countryFlag: "🇫🇷",
    theme: "Cinéma",
    date: "15 Mai 2026",
    time: "19:30",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=500"
  }
];

// Extraction dynamique des villes uniques
const availableCities = Array.from(new Set(eventsData.map(event => event.city)));

const Home = () => {
  const [selectedCity, setSelectedCity] = useState("");

  const filteredEvents = eventsData.filter(event => 
    selectedCity === "" ? true : event.city === selectedCity
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      
      {/* --- Zone de Filtre (Version Select avec flèche) --- */}
      <div className="mb-10 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 max-w-sm">
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
          Choisir une ville
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 text-[#1e2da7]" size={20} />
          
          <select 
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full pl-10 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none appearance-none focus:ring-2 focus:ring-[#1e2da7] transition-all cursor-pointer text-gray-700 font-medium"
          >
            <option value="">Toutes les destinations</option>
            {availableCities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>

          {/* Flèche personnalisée Lucide */}
          <div className="absolute right-3 top-3 pointer-events-none text-gray-400">
            <ChevronDown size={20} />
          </div>
        </div>
      </div>

      {/* --- Grille d'Évènements --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEvents.map(event => (
          <div key={event.id} className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-50">
            <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-black text-[#1e2da7] tracking-tight">{event.title}</h3>
                <span className="text-sm font-bold bg-gray-100 px-2 py-1 rounded-lg">
                  {event.countryFlag} {event.city}
                </span>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <Tag size={14} className="text-[#f06292]" /> <span>{event.theme}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={14} /> <span>{event.date}</span>
                  <Clock size={14} className="ml-2" /> <span>{event.time}</span>
                </div>
              </div>

              <button className="w-full py-3 bg-[#1e2da7] text-white font-bold rounded-xl hover:bg-opacity-90 transition-all">
                Rejoindre
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;