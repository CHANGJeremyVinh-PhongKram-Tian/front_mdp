import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { QrCode, MapPin, Calendar, Clock, ArrowLeft, Download } from 'lucide-react';
import { allEvents } from '../data/events';

const TicketDetail = () => {
  const { id } = useParams();
  const event = allEvents.find(e => e.id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!event) return <div className="p-20 text-center font-bold">Billet introuvable</div>;

  return (
    <div className="max-w-md mx-auto p-6 mb-20">
      {/* Retour arrière */}
      <Link to="/my-tickets" className="flex items-center gap-2 text-gray-500 hover:text-[#1e2da7] mb-6 font-semibold transition-colors">
        <ArrowLeft size={20} /> Mes billets
      </Link>

      {/* --- DESIGN DU TICKET --- */}
      <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 flex flex-col">
        
        {/* Partie Haute : Image & Titre */}
        <div className="relative h-40">
          <img src={event.image} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
            <h1 className="text-white text-2xl font-black uppercase tracking-tighter">{event.title}</h1>
          </div>
        </div>

        {/* Partie Milieu : Infos */}
        <div className="p-8 space-y-6 bg-white relative">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Date</p>
              <div className="flex items-center gap-2 text-[#1e2da7] font-bold">
                <Calendar size={16} /> <span>{event.date}</span>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Heure</p>
              <div className="flex items-center gap-2 text-[#1e2da7] font-bold">
                <Clock size={16} /> <span>{event.time}</span>
              </div>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Lieu</p>
            <div className="flex items-center gap-2 text-gray-800 font-bold">
              <MapPin size={16} className="text-[#f06292]" /> <span>{event.city}, France</span>
            </div>
          </div>

          {/* Séparateur Pointillé (Effet Ticket) */}
          <div className="relative h-px border-t-2 border-dashed border-gray-100 my-8">
            <div className="absolute -left-12 -top-3 w-8 h-8 bg-gray-50 rounded-full border border-gray-100 shadow-inner"></div>
            <div className="absolute -right-12 -top-3 w-8 h-8 bg-gray-50 rounded-full border border-gray-100 shadow-inner"></div>
          </div>

          {/* --- ZONE QR CODE --- */}
          <div className="flex flex-col items-center justify-center py-4">
            <div className="bg-gray-50 p-6 rounded-3xl border-2 border-gray-100 mb-4 group hover:bg-white transition-all duration-500 hover:shadow-xl">
              <QrCode size={180} strokeWidth={1.5} className="text-[#1e2da7]" />
            </div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">Scannez à l'entrée</p>
            <p className="text-xs font-mono text-gray-300 mt-2">ID-{event.id}99283745</p>
          </div>
        </div>

        {/* Bouton Action */}
        <div className="p-6 bg-gray-50 border-t border-gray-100">
          <button className="w-full py-4 bg-white border border-gray-200 rounded-2xl text-[#1e2da7] font-bold flex items-center justify-center gap-2 hover:bg-[#1e2da7] hover:text-white transition-all shadow-sm">
            <Download size={18} /> Télécharger en PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;