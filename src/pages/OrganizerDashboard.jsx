import React from 'react';
import { 
  TrendingUp, 
  Zap, // Remplaçant pour l'engagement
  Ticket, 
  PlusCircle, 
  ArrowUpRight, 
  Calendar,
  MoreHorizontal
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OrganizerDashboard = () => {
  const navigate = useNavigate();

  // Data simulée avec paths de redirection
  const stats = [
    { id: 1, label: 'Chiffre d\'affaires', value: '12 450€', icon: <TrendingUp size={24} />, color: 'text-green-600', bg: 'bg-green-100', trend: '+12.5%', path: '/organizer/stats/revenue' },
    { id: 2, label: 'Billets vendus', value: '842', icon: <Ticket size={24} />, color: 'text-blue-600', bg: 'bg-blue-100', trend: '+5.2%', path: '/organizer/stats/tickets' },
    { id: 3, label: 'Taux d\'engagement', value: '68%', icon: <Zap size={24} />, color: 'text-pink-600', bg: 'bg-pink-100', trend: '+18.7%', path: '/organizer/stats/engagement' },
  ];

  const myEvents = [
    { id: 1, title: 'OL - PSG', date: '16 Mai 2026', sold: 450, total: 500, status: 'Presque complet' },
    { id: 2, title: 'Festival Electro Lyon', date: '22 Juin 2026', sold: 1200, total: 3000, status: 'En cours' },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fe] p-6 md:p-12 pb-24 md:pb-12">
      <div className="max-w-6xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-[#1e2da7] uppercase tracking-tighter italic">Dashboard</h1>
            <p className="text-gray-500 font-bold mt-1 text-sm md:text-base">Suivez vos performances et gérez vos évènements SparkUp.</p>
          </div>
          <div>
            <div className="flex items-center gap-4 mt-1">
            <p className="text-gray-500 font-bold">Gestion Pro</p>
            <span className="text-gray-200">|</span>
            {/* BOUTON VERS LE SUPPORT */}
            <button 
                onClick={() => navigate('/organizer/support')}
                className="text-[#f06292] font-black uppercase text-[10px] tracking-widest hover:underline"
            >
                Besoin d'aide ?
            </button>
            </div>
        </div>
          <button 
            onClick={() => navigate('/organizer/create')}
            className="w-full md:w-auto flex items-center justify-center gap-3 bg-[#1e2da7] text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-[#f06292] hover:scale-105 active:scale-95 transition-all"
          >
            <PlusCircle size={20} /> Nouvel Event
          </button>
        </div>

        {/* --- STATS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {stats.map((stat) => (
            <div 
              key={stat.id} 
              onClick={() => navigate(stat.path)}
              className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 relative overflow-hidden group cursor-pointer hover:border-[#1e2da7] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`inline-flex p-4 rounded-2xl ${stat.bg} ${stat.color} mb-6 group-hover:scale-110 transition-transform`}>
                {stat.icon}
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-gray-400 font-black uppercase text-[10px] tracking-widest mb-1">{stat.label}</p>
                  <h3 className="text-3xl font-black text-gray-900 group-hover:text-[#1e2da7] transition-colors">{stat.value}</h3>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-green-500 font-bold text-sm flex items-center gap-1 bg-green-50 px-2 py-1 rounded-lg">
                    {stat.trend} <ArrowUpRight size={14} />
                  </span>
                </div>
              </div>
              {/* Overlay discret au survol */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#1e2da7]">
                <ArrowUpRight size={24} />
              </div>
            </div>
          ))}
        </div>

        {/* --- ÉVÉNEMENTS RÉCENTS --- */}
        <div className="bg-white rounded-[3rem] p-8 md:p-10 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-black text-[#1e2da7] uppercase tracking-tight">Vos Événements</h2>
            <button className="text-gray-400 hover:text-[#1e2da7] transition-colors"><MoreHorizontal size={24} /></button>
          </div>

          <div className="space-y-4">
            {myEvents.map((event) => (
              <div 
                key={event.id} 
                onClick={() => navigate(`/organizer/event/${event.id}`)}
                className="group flex flex-col md:flex-row md:items-center justify-between p-6 rounded-[2.2rem] bg-gray-50 border-2 border-transparent hover:border-[#1e2da7] hover:bg-white cursor-pointer transition-all duration-300"
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-[#1e2da7] rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-lg shadow-blue-100">
                    <Calendar size={28} />
                  </div>
                  <div>
                    <h4 className="font-black text-gray-900 uppercase text-lg leading-none group-hover:text-[#1e2da7] transition-colors">{event.title}</h4>
                    <p className="text-sm text-gray-500 font-bold mt-1 tracking-tight">{event.date}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-8 mt-4 md:mt-0">
                  <div className="text-left md:text-right">
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Remplissage</p>
                    <p className="font-black text-[#1e2da7] text-sm">{event.sold} / {event.total} <span className="text-gray-300 ml-1">vendu</span></p>
                    <div className="w-32 h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                      <div 
                        className="h-full bg-[#f06292] rounded-full transition-all duration-1000" 
                        style={{ width: `${(event.sold / event.total) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="p-3 bg-white text-gray-400 rounded-xl border border-gray-100 group-hover:bg-[#1e2da7] group-hover:text-white group-hover:rotate-45 transition-all">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default OrganizerDashboard;