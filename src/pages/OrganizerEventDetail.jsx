import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit3, Calendar, MapPin, Trash2, Users, Ticket } from 'lucide-react';
import { allEvents } from '../data/events'; // On importe tes datas

const OrganizerEventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // On cherche l'événement correspondant à l'ID de l'URL
  const event = allEvents.find(e => e.id === parseInt(id));

  // Sécurité si l'event n'est pas trouvé
  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-black uppercase text-[#1e2da7]">Événement introuvable</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fe] p-6 md:p-12 pb-32">
      <div className="max-w-5xl mx-auto">
        <button 
          onClick={() => navigate('/organizer/dashboard')} 
          className="flex items-center gap-2 text-gray-500 hover:text-[#1e2da7] font-bold mb-8 transition-colors"
        >
          <ArrowLeft size={20} /> Retour Dashboard
        </button>

        <div className="bg-white rounded-[3rem] p-8 md:p-10 shadow-xl border border-gray-100 overflow-hidden">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            
            {/* --- PHOTO AJUSTÉE (Plus petite et mieux proportionnée) --- */}
            <div className="w-full md:w-48 h-48 bg-gray-100 rounded-[2rem] overflow-hidden shadow-md flex-shrink-0 border-4 border-white">
               <img 
                 src={event.image} 
                 alt={event.title} 
                 className="w-full h-full object-cover" 
               />
            </div>
            
            <div className="flex-1 w-full">
               <div className="flex items-center gap-3 mb-4">
                  <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                    Actif
                  </span>
                  <span className="bg-blue-50 text-[#1e2da7] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest italic">
                    ID: #{event.id}
                  </span>
               </div>

               {/* --- DONNÉES DYNAMIQUES --- */}
               <h1 className="text-3xl md:text-4xl font-black text-[#1e2da7] uppercase tracking-tighter italic mb-4 leading-none">
                 {event.title}
               </h1>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-3 text-gray-500 font-bold text-sm">
                    <div className="p-2 bg-pink-50 rounded-lg text-[#f06292]">
                      <Calendar size={18} />
                    </div>
                    {event.date} • {event.time || "20:00"}
                  </div>
                  <div className="flex items-center gap-3 text-gray-500 font-bold text-sm">
                    <div className="p-2 bg-pink-50 rounded-lg text-[#f06292]">
                      <MapPin size={18} />
                    </div>
                    {event.city}
                  </div>
               </div>

               {/* --- BOUTONS D'ACTION --- */}
               <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-50">
                  <button className="flex-1 md:flex-none bg-[#1e2da7] text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2 hover:bg-blue-800 transition-all shadow-lg shadow-blue-100 active:scale-95">
                    <Edit3 size={16} /> Modifier
                  </button>
                  <button className="flex-1 md:flex-none bg-gray-50 text-gray-400 px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2 hover:bg-red-50 hover:text-red-500 transition-all active:scale-95">
                    <Trash2 size={16} /> Supprimer
                  </button>
               </div>
            </div>
          </div>
        </div>

        {/* --- PETIT RÉCAP RAPIDE EN DESSOUS --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                <Ticket size={20} className="text-[#1e2da7] mb-2" />
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Prix</p>
                <p className="font-black text-lg">{event.price}</p>
            </div>
            <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                <Users size={20} className="text-[#f06292] mb-2" />
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Catégorie</p>
                <p className="font-black text-lg">{event.category || "Sport"}</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizerEventDetail;