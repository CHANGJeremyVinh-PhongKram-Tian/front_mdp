import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Ticket, Users, Search, QrCode } from 'lucide-react';

const OrganizerTickets = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8f9fe] p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        <button onClick={() => navigate('/organizer/dashboard')} className="flex items-center gap-2 text-gray-500 hover:text-[#1e2da7] font-bold mb-8 transition-colors">
          <ArrowLeft size={20} /> Dashboard
        </button>

        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-black text-[#1e2da7] uppercase tracking-tighter italic leading-none">Billetterie</h1>
            <p className="text-gray-500 font-bold mt-2">Gestion des participants et inventaire.</p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
             <QrCode size={24} className="text-[#1e2da7]" />
             <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Scanner Entrée</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <p className="text-gray-400 font-black uppercase text-[10px] tracking-widest mb-2">Vendues</p>
            <h3 className="text-4xl font-black text-[#1e2da7]">842</h3>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <p className="text-gray-400 font-black uppercase text-[10px] tracking-widest mb-2">Restantes</p>
            <h3 className="text-4xl font-black text-gray-300">158</h3>
          </div>
          <div className="bg-[#1e2da7] p-8 rounded-[2.5rem] shadow-xl shadow-blue-100 text-white">
            <p className="opacity-60 font-black uppercase text-[10px] tracking-widest mb-2">Check-in</p>
            <h3 className="text-4xl font-black italic">0 / 842</h3>
          </div>
        </div>

        <div className="bg-white rounded-[3rem] p-8 border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-[#1e2da7] uppercase italic">Liste des Participants</h3>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-gray-300" size={18} />
              <input type="text" placeholder="Rechercher un nom..." className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#1e2da7]" />
            </div>
          </div>
          <div className="space-y-4">
             {/* Simulation ligne participant */}
             <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-blue-100 transition-all">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-[#1e2da7]">AM</div>
                   <p className="font-bold text-gray-800">Adrien Macaire</p>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-green-500 bg-green-50 px-3 py-1 rounded-full">Payé</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizerTickets;