import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Zap, MessageSquare, Share2, Users } from 'lucide-react';

const OrganizerEngagement = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8f9fe] p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        <button onClick={() => navigate('/organizer/dashboard')} className="flex items-center gap-2 text-gray-400 hover:text-[#f06292] font-bold mb-8 transition-colors">
          <ArrowLeft size={20} /> Dashboard
        </button>

        <div className="bg-[#f06292] p-12 rounded-[3.5rem] shadow-2xl shadow-pink-100 text-white mb-10 relative overflow-hidden">
          <Zap size={120} className="absolute -right-6 -top-6 opacity-20 rotate-12" />
          <h1 className="text-5xl font-black uppercase tracking-tighter italic mb-4">Social Spark</h1>
          <p className="text-pink-100 font-bold text-lg max-w-md leading-tight italic">Votre évènement génère du buzz. Voyez comment les groupes s'organisent.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
            <div className="flex items-center gap-4 mb-6 text-[#f06292]">
              <Users size={32} />
              <h3 className="text-2xl font-black uppercase italic tracking-tight">Groupes Créés</h3>
            </div>
            <div className="text-6xl font-black text-gray-900 mb-2">156</div>
            <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Moyenne de 4.2 personnes par groupe</p>
          </div>

          <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
            <div className="flex items-center gap-4 mb-6 text-[#1e2da7]">
              <MessageSquare size={32} />
              <h3 className="text-2xl font-black uppercase italic tracking-tight">Messages</h3>
            </div>
            <div className="text-6xl font-black text-gray-900 mb-2">2 412</div>
            <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Échanges dans les chats de l'évènement</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizerEngagement;