import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, LayoutDashboard, Eye, PlusCircle, Share2, ArrowRight } from 'lucide-react';

const EventCreationSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6 bg-[#f8f9fe]">
      <div className="max-w-md w-full bg-white rounded-[3rem] shadow-2xl p-10 text-center border border-gray-50 relative overflow-hidden">
        
        {/* Déco Spark de fond */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-50 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-50 rounded-full blur-3xl opacity-50" />

        {/* --- ICONE CELEBRATION --- */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-[#f06292] opacity-20 blur-xl rounded-full animate-pulse" />
            <div className="bg-white p-5 rounded-full shadow-lg relative border-2 border-[#f06292]">
              <CheckCircle2 size={60} className="text-[#f06292]" />
            </div>
          </div>
        </div>

        {/* --- TEXTE --- */}
        <h1 className="text-3xl font-black text-[#1e2da7] uppercase tracking-tighter mb-3 leading-none">
          Ton Spark est en ligne !
        </h1>
        <p className="text-gray-500 font-medium mb-10 leading-relaxed">
          Félicitations ! Ton évènement est maintenant visible par toute la communauté SparkUp.
        </p>

        {/* --- ACTIONS --- */}
        <div className="space-y-4">
          <Link 
            to="/organizer/dashboard" 
            className="w-full bg-[#1e2da7] text-white py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-lg shadow-blue-100 hover:scale-[1.02] transition-all"
          >
            <LayoutDashboard size={20} /> Mon Dashboard
          </Link>

          <button 
            onClick={() => {/* Logique partage */}}
            className="w-full bg-white border-2 border-gray-100 text-gray-500 py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:border-[#f06292] hover:text-[#f06292] transition-all"
          >
            <Share2 size={20} /> Partager l'event
          </button>
        </div>

        <button 
          onClick={() => navigate('/organizer/create')}
          className="mt-10 text-gray-400 text-[10px] font-black uppercase tracking-widest hover:text-[#1e2da7] transition-colors inline-flex items-center gap-2"
        >
          Créer un autre évènement <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default EventCreationSuccess;