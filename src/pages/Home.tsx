import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Clock, Tag, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

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

  // Villes uniques extraites dynamiquement depuis la BDD
  const availableCities = Array.from(new Set(events.map((e) => e.city).filter(Boolean)));

  const filteredEvents = events.filter((event) =>
    selectedCity === '' ? true : event.city === selectedCity
  );

  return (
    <div className="max-w-6xl mx-auto p-6">

      {/* --- État du chargement --- */}
      {loading && (
        <div className="mb-6 p-4 rounded-xl font-bold text-center bg-blue-50 text-blue-600">
          Chargement des événements...
        </div>
      )}

      {/* --- Erreur de connexion --- */}
      {error && (
        <div className="mb-6 p-4 rounded-xl font-bold text-center bg-red-100 text-red-700">
          {error}
        </div>
      )}

      {/* --- Aucun événement en base --- */}
      {!loading && !error && events.length === 0 && (
        <div className="mb-6 p-4 rounded-xl font-bold text-center bg-yellow-50 text-yellow-700">
          Aucun événement trouvé en base de données.
        </div>
      )}

      {/* --- Zone de Filtre --- */}
      {!loading && events.length > 0 && (
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
              {availableCities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            <div className="absolute right-3 top-3 pointer-events-none text-gray-400">
              <ChevronDown size={20} />
            </div>
          </div>
        </div>
      )}

      {/* --- Grille d'Évènements --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEvents.map((event) => (
          <div key={event.id} className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-50">
            {event.image ? (
              <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
            ) : (
              <div className="w-full h-48 bg-gradient-to-br from-[#1e2da7] to-[#f06292] flex items-center justify-center">
                <span className="text-white text-4xl font-black opacity-30">
                  {event.title?.charAt(0)}
                </span>
              </div>
            )}
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-black text-[#1e2da7] tracking-tight">{event.title}</h3>
                {event.city && (
                  <span className="text-sm font-bold bg-gray-100 px-2 py-1 rounded-lg">
                    {event.countryFlag} {event.city}
                  </span>
                )}
              </div>

              <div className="space-y-2 text-sm text-gray-600 mb-4">
                {event.theme && (
                  <div className="flex items-center gap-2">
                    <Tag size={14} className="text-[#f06292]" />
                    <span>{event.theme}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar size={14} />
                  <span>{event.date}</span>
                  {event.time && (
                    <>
                      <Clock size={14} className="ml-2" />
                      <span>{event.time}</span>
                    </>
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

export default Home;