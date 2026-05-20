import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Tag, Search as SearchIcon, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const Search = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/evenements`)
      .then((res) => {
        if (!res.ok) throw new Error('Erreur serveur');
        return res.json();
      })
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erreur de connexion:', err);
        setError('Impossible de charger les événements. Vérifiez que le serveur Laravel est démarré.');
        setLoading(false);
      });
  }, []);

  // Filtrage par titre
  const filteredEvents = events.filter((event) =>
    event.title?.toLowerCase().includes(query.toLowerCase())
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
              onClick={() => setQuery('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#f06292]"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      {/* --- États : chargement / erreur --- */}
      {loading && (
        <div className="p-4 rounded-xl font-bold text-center bg-blue-50 text-blue-600 mb-8">
          Chargement des événements...
        </div>
      )}
      {error && (
        <div className="p-4 rounded-xl font-bold text-center bg-red-100 text-red-700 mb-8">
          {error}
        </div>
      )}

      {/* --- Compteur de résultats --- */}
      {!loading && !error && (
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-xl font-black text-[#1e2da7] uppercase tracking-tight">
            {filteredEvents.length > 0 ? `Résultats (${filteredEvents.length})` : 'Aucun résultat'}
          </h2>
        </div>
      )}

      {/* --- Grille de résultats --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {filteredEvents.map((event) => (
          <div key={event.id} className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-50 flex flex-col">
            <div className="relative h-48 overflow-hidden">
              {event.image ? (
                <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#1e2da7] to-[#f06292] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <span className="text-white text-5xl font-black opacity-30">
                    {event.title?.charAt(0)}
                  </span>
                </div>
              )}
              {event.city && (
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                  {event.countryFlag} {event.city}
                </div>
              )}
            </div>

            <div className="p-5 flex-grow">
              <h3 className="text-xl font-black text-[#1e2da7] mb-3 truncate">{event.title}</h3>

              <div className="space-y-2 text-sm text-gray-600 mb-6">
                {event.theme && (
                  <div className="flex items-center gap-2">
                    <Tag size={14} className="text-[#f06292]" />
                    <span className="font-semibold text-gray-800">{event.theme}</span>
                  </div>
                )}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{event.date}</span>
                  </div>
                  {event.time && (
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{event.time}</span>
                    </div>
                  )}
                </div>
              </div>

              <Link to={`/event/${event.id}`}>
                <button className="w-full py-3 bg-[#1e2da7] text-white font-bold rounded-xl hover:bg-[#f06292] transition-all">
                  Voir l'évènement
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;