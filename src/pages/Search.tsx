import React, { useState } from 'react';
import { Calendar, Clock, Tag, Search as SearchIcon, X } from 'lucide-react';

const searchResults = [
  { id: 1, title: "Match OL - PSG", city: "Lyon", countryFlag: "🇫🇷", theme: "Sport", date: "12 Mai 2026", time: "21:00", image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=500" },
  { id: 2, title: "Festival Lumière", city: "Lyon", countryFlag: "🇫🇷", theme: "Cinéma", date: "15 Mai 2026", time: "19:30", image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=500" },
  { id: 3, title: "Afterwork Tech", city: "Paris", countryFlag: "🇫🇷", theme: "Networking", date: "18 Mai 2026", time: "18:30", image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=500" },
  { id: 4, title: "Concert Jazz", city: "Marseille", countryFlag: "🇫🇷", theme: "Musique", date: "20 Mai 2026", time: "20:00", image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=500" },
  { id: 5, title: "Expo Street Art", city: "Lyon", countryFlag: "🇫🇷", theme: "Art", date: "22 Mai 2026", time: "14:00", image: "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?q=80&w=500" },
  { id: 6, title: "Marathon de Paris", city: "Paris", countryFlag: "🇫🇷", theme: "Sport", date: "24 Mai 2026", time: "08:00", image: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?q=80&w=500" },
  { id: 7, title: "Dégustation Vins", city: "Bordeaux", countryFlag: "🇫🇷", theme: "Gastronomie", date: "26 Mai 2026", time: "19:00", image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=500" },
  { id: 8, title: "Soirée Stand-up", city: "Lyon", countryFlag: "🇫🇷", theme: "Loisirs", date: "28 Mai 2026", time: "20:30", image: "https://images.unsplash.com/photo-1514525253361-bee8718a7439?q=80&w=500" },
  { id: 9, title: "Salon du Design", city: "Milan", countryFlag: "🇮🇹", theme: "Design", date: "02 Juin 2026", time: "10:00", image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=500" }
];

const Search = () => {
  const [query, setQuery] = useState("");

  // Logique de filtrage par titre
  const filteredEvents = searchResults.filter(event => 
    event.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      
      {/* --- Champ de Recherche --- */}
      <div className="mb-12">
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <SearchIcon className="text-gray-400" size={20} />
          </div>
          <input
            type="text"
            placeholder="Rechercher un évènement (ex: Match, Concert...)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="block w-full pl-12 pr-12 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm outline-none focus:ring-2 focus:ring-[#1e2da7] focus:border-transparent transition-all text-lg font-medium"
          />
          {query && (
            <button 
              onClick={() => setQuery("")}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#f06292]"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      {/* --- Résultats --- */}
      <div className="flex items-center gap-3 mb-8">
        <h2 className="text-xl font-black text-[#1e2da7] uppercase tracking-tight">
          {filteredEvents.length > 0 ? `Résultats (${filteredEvents.length})` : "Aucun résultat"}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {filteredEvents.map(event => (
          <div key={event.id} className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-50 flex flex-col">
            <div className="relative h-48 overflow-hidden">
              <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                {event.countryFlag} {event.city}
              </div>
            </div>
            
            <div className="p-5 flex-grow">
              <h3 className="text-xl font-black text-[#1e2da7] mb-3 truncate">{event.title}</h3>
              
              <div className="space-y-2 text-sm text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <Tag size={14} className="text-[#f06292]" />
                  <span className="font-semibold text-gray-800">{event.theme}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} /> <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} /> <span>{event.time}</span>
                  </div>
                </div>
              </div>

              <button className="w-full py-3 bg-[#1e2da7] text-white font-bold rounded-xl hover:bg-[#f06292] transition-colors">
                Voir l'évènement
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;