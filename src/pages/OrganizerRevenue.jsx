import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, DollarSign, Download, TrendingUp } from 'lucide-react';

const OrganizerRevenue = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8f9fe] p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        <button onClick={() => navigate('/organizer/dashboard')} className="flex items-center gap-2 text-gray-500 hover:text-[#1e2da7] font-bold mb-8 transition-colors">
          <ArrowLeft size={20} /> Retour
        </button>

        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-4xl font-black text-[#1e2da7] uppercase tracking-tighter italic">Chiffre d'Affaires</h1>
            <p className="text-gray-500 font-bold">Suivez vos revenus et vos virements.</p>
          </div>
          <button className="flex items-center gap-2 bg-white border border-gray-100 p-4 rounded-2xl font-black uppercase text-xs tracking-widest text-[#1e2da7] shadow-sm hover:shadow-md transition-all">
            <Download size={18} /> Exporter CSV
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="bg-[#1e2da7] p-10 rounded-[3rem] text-white shadow-xl shadow-blue-100">
            <p className="opacity-60 font-bold uppercase text-[10px] tracking-widest mb-2">Total en attente de virement</p>
            <h2 className="text-5xl font-black italic">8 240,50€</h2>
          </div>
          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
            <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mb-2">Revenus nets (après frais SparkUp)</p>
            <h2 className="text-5xl font-black text-[#f06292] italic">11 850,00€</h2>
          </div>
        </div>

        {/* Liste des transactions */}
        <div className="bg-white rounded-[3rem] p-8 border border-gray-100 shadow-sm">
           <h3 className="text-xl font-black text-[#1e2da7] uppercase mb-6">Dernières ventes</h3>
           <div className="space-y-4 italic text-gray-400 font-medium text-center py-10">
              [ Graphique des ventes et liste des paiements à venir ]
           </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizerRevenue;