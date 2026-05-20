import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, Clock, Tag, CreditCard, ArrowLeft, Users } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);

    fetch(`${API_URL}/evenements/${id}`)
      .then((res) => {
        if (res.status === 404) throw new Error('not_found');
        if (!res.ok) throw new Error('server_error');
        return res.json();
      })
      .then((data) => {
        setEvent(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.message === 'not_found') {
          setError('not_found');
        } else {
          setError('server_error');
        }
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="p-20 text-center font-bold text-[#1e2da7]">
        Chargement de l'événement...
      </div>
    );
  }

  if (error === 'not_found') {
    return (
      <div className="p-20 text-center">
        <p className="font-bold text-[#1e2da7] text-xl mb-4">Évènement non trouvé.</p>
        <Link to="/" className="text-[#f06292] underline font-semibold">Retour à l'accueil</Link>
      </div>
    );
  }

  if (error === 'server_error') {
    return (
      <div className="p-20 text-center">
        <p className="font-bold text-red-600 text-xl mb-4">Erreur de connexion au serveur.</p>
        <Link to="/" className="text-[#f06292] underline font-semibold">Retour à l'accueil</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 mb-20">
      <Link to={-1} className="flex items-center gap-2 text-gray-500 hover:text-[#1e2da7] mb-6 transition-colors font-semibold">
        <ArrowLeft size={20} /> Retour
      </Link>

      <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">
        {event.image ? (
          <img src={event.image} alt={event.title} className="w-full h-64 md:h-96 object-cover" />
        ) : (
          <div className="w-full h-64 md:h-96 bg-gradient-to-br from-[#1e2da7] to-[#f06292] flex items-center justify-center">
            <span className="text-white text-8xl font-black opacity-20">
              {event.title?.charAt(0)}
            </span>
          </div>
        )}

        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              {event.theme && (
                <span className="bg-blue-100 text-[#1e2da7] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {event.theme}
                </span>
              )}
              <h1 className="text-4xl font-black text-[#1e2da7] mt-2 tracking-tighter uppercase">
                {event.title}
              </h1>
            </div>
            {event.price && (
              <div className="text-3xl font-black text-[#f06292]">{event.price}</div>
            )}
          </div>

          {event.description && (
            <p className="text-gray-600 mb-8 leading-relaxed">{event.description}</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="space-y-4">
              {event.city && (
                <div className="flex items-center gap-4 text-gray-600">
                  <div className="bg-gray-100 p-3 rounded-xl">
                    <MapPin size={24} className="text-[#1e2da7]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-gray-400">Lieu</p>
                    <p className="font-semibold text-lg">{event.countryFlag} {event.city}</p>
                  </div>
                </div>
              )}
              {event.date && (
                <div className="flex items-center gap-4 text-gray-600">
                  <div className="bg-gray-100 p-3 rounded-xl">
                    <Calendar size={24} className="text-[#1e2da7]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-gray-400">Date</p>
                    <p className="font-semibold text-lg">{event.date}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {event.time && (
                <div className="flex items-center gap-4 text-gray-600">
                  <div className="bg-gray-100 p-3 rounded-xl">
                    <Clock size={24} className="text-[#1e2da7]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-gray-400">Heure</p>
                    <p className="font-semibold text-lg">{event.time}</p>
                  </div>
                </div>
              )}
              {event.capacite && (
                <div className="flex items-center gap-4 text-gray-600">
                  <div className="bg-gray-100 p-3 rounded-xl">
                    <Users size={24} className="text-[#1e2da7]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-gray-400">Capacité</p>
                    <p className="font-semibold text-lg">{event.capacite} places</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Link to={`/payment/${event.id}`} className="block w-full">
            <button className="w-full py-4 bg-[#1e2da7] text-white font-black text-lg rounded-2xl hover:bg-[#f06292] transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-blue-100 mt-4 group">
              <CreditCard size={22} className="group-hover:scale-110 transition-transform" />
              Payer ma place
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;