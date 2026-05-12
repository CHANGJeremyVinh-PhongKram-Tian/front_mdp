import React from 'react';
import { Link } from 'react-router-dom';
import { Ticket, Calendar, MapPin, ArrowRight, QrCode } from 'lucide-react';
import { allEvents } from '../data/events';

const MyTickets = () => {
  // Simulation : on considère que l'utilisateur a acheté les events 1, 3 et 5
  const purchasedIds = [1, 3, 5];
  const myTickets = allEvents.filter(event => purchasedIds.includes(event.id));

  return (
    <div className="max-w-4xl mx-auto p-6 mb-20">
      <div className="flex items-center gap-4 mb-10">
        <div className="bg-[#1e2da7] p-3 rounded-2xl text-white shadow-lg shadow-blue-100">
          <Ticket size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-black text-[#1e2da7] uppercase tracking-tighter">Mes Billets</h1>
          <p className="text-gray-500 font-medium">Retrouvez toutes vos réservations SparkUp.</p>
        </div>
      </div>

      <div className="space-y-6">
        {myTickets.length > 0 ? (
          myTickets.map(ticket => (
            <div key={ticket.id} className="bg-white rounded-[2rem] shadow-md border border-gray-100 overflow-hidden flex flex-col md:flex-row hover:shadow-xl transition-all group">
              {/* Image / Thumbnail */}
              <div className="md:w-48 h-40 md:h-auto relative">
                <img src={ticket.image} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[#1e2da7]/10 group-hover:bg-transparent transition-colors"></div>
              </div>

              {/* Infos */}
              <div className="flex-grow p-6 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-black text-[#f06292] uppercase tracking-widest">{ticket.theme}</span>
                    <span className="bg-green-100 text-green-600 text-[10px] font-bold px-2 py-1 rounded-full uppercase">Confirmé</span>
                  </div>
                  <h3 className="text-xl font-black text-[#1e2da7] mb-3 uppercase tracking-tight">{ticket.title}</h3>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-gray-400" />
                      <span>{ticket.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-gray-400" />
                      <span>{ticket.city}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-dashed border-gray-100 pt-4">
                  <div className="flex items-center gap-2 text-[#1e2da7] font-bold">
                    <QrCode size={20} />
                    <span className="text-xs uppercase">Billet prêt</span>
                  </div>
                  <Link to={`/ticket-detail/${ticket.id}`}>
                    <button className="flex items-center gap-2 bg-gray-50 hover:bg-[#1e2da7] hover:text-white px-4 py-2 rounded-xl text-sm font-bold transition-all">
                      Voir le billet <ArrowRight size={16} />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-[2rem] border-2 border-dashed border-gray-200">
            <p className="text-gray-400 font-bold uppercase">Aucun billet pour le moment</p>
            <Link to="/search">
              <button className="mt-4 text-[#1e2da7] font-black underline">Explorer les évènements</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTickets;