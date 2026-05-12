import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, CreditCard, Check, X } from 'lucide-react';

const ChatView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showPayMenu, setShowPayMenu] = useState(false);
  
  const messages = [
    { id: 1, user: "Lucas", text: "Salut l'équipe ! On est combien pour le match ?", time: "14:02", isMe: false, avatar: "https://i.pravatar.cc/150?u=lucas" },
    { id: 2, user: "Moi", text: "On est 4 normalement. J'ai vu qu'il restait des places en tribune Nord.", time: "14:05", isMe: true },
    { id: 3, user: "Sarah", text: "Top ! Adrien, tu peux t'occuper de prendre les billets pour tout le monde ? On te rembourse après !", time: "14:06", isMe: false, avatar: "https://i.pravatar.cc/150?u=sarah" },
  ];

  const [members, setMembers] = useState([
    { id: 'me', name: "Moi", avatar: "https://i.pravatar.cc/150?u=adrien", selected: true },
    { id: 1, name: "Lucas", avatar: "https://i.pravatar.cc/150?u=lucas", selected: false },
    { id: 2, name: "Sarah", avatar: "https://i.pravatar.cc/150?u=sarah", selected: false },
    { id: 3, name: "Hugo", avatar: "https://i.pravatar.cc/150?u=hugo", selected: false },
  ]);

  const toggleMember = (memberId) => {
    setMembers(members.map(m => m.id === memberId ? { ...m, selected: !m.selected } : m));
  };

  const selectedCount = members.filter(m => m.selected).length;
  const pricePerTicket = 35;

  return (
    /* MODIFICATION ICI :
       - On applique m-3 (marge) et rounded-[2.5rem] (gros arrondis) pour TOUTES les vues.
       - h-[calc(100vh-120px)] : On réduit encore un peu la hauteur pour laisser respirer les marges.
    */
    <div className="flex flex-col h-[calc(100vh-130px)] md:h-[calc(100vh-100px)] bg-gray-50 max-w-2xl mx-auto relative overflow-hidden shadow-2xl m-3 rounded-[2.5rem] border border-gray-100">
      
      {/* --- HEADER --- */}
      <div className="bg-white p-5 border-b border-gray-50 flex items-center gap-4 sticky top-0 z-10">
        <button onClick={() => navigate('/groups')} className="text-gray-400 hover:text-[#1e2da7] transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="font-black text-[#1e2da7] uppercase text-xs tracking-tighter">La commu OL</h1>
          <p className="text-[9px] text-green-500 font-bold uppercase tracking-widest">En ligne</p>
        </div>
      </div>

      {/* --- ZONE DE MESSAGES --- */}
      <div className="flex-grow p-6 overflow-y-auto space-y-4 bg-[#f8f9fe]">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'} items-end gap-2`}>
            {!msg.isMe && <img src={msg.avatar} alt="" className="w-8 h-8 rounded-full mb-1 border border-gray-100" />}
            <div className={`max-w-[75%] flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
              {!msg.isMe && <span className="text-[10px] font-black text-gray-400 ml-2 mb-1 uppercase tracking-wider">{msg.user}</span>}
              <div className={`p-4 rounded-[1.8rem] text-sm font-medium shadow-sm ${msg.isMe ? 'bg-[#1e2da7] text-white rounded-br-none' : 'bg-white text-gray-700 rounded-bl-none border border-gray-100'}`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- TIROIR DE PAIEMENT --- */}
      <div 
        className={`absolute inset-0 bg-black/40 transition-opacity z-20 ${showPayMenu ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setShowPayMenu(false)}
      />
      
      <div className={`absolute inset-x-0 bottom-0 bg-white rounded-t-[3rem] shadow-2xl transition-transform duration-500 z-30 ${showPayMenu ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="p-8 pb-10">
          <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-black text-[#1e2da7] uppercase tracking-tighter text-xl italic">Check-out Groupe</h2>
            <button onClick={() => setShowPayMenu(false)} className="bg-gray-100 p-2 rounded-full text-gray-400"><X size={20}/></button>
          </div>

          <div className="space-y-3 max-h-52 overflow-y-auto mb-8 pr-2">
            {members.map(member => (
              <div 
                key={member.id}
                onClick={() => toggleMember(member.id)}
                className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${member.selected ? 'border-[#1e2da7] bg-blue-50' : 'border-gray-50 bg-white hover:border-gray-200'}`}
              >
                <div className="flex items-center gap-4">
                  <img src={member.avatar} alt="" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
                  <span className={`font-bold ${member.selected ? 'text-[#1e2da7]' : 'text-gray-600'}`}>{member.name}</span>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${member.selected ? 'bg-[#1e2da7] border-[#1e2da7]' : 'border-gray-200'}`}>
                  {member.selected && <Check size={14} className="text-white" />}
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={() => navigate(`/payment/${id}?count=${selectedCount}`)}
            className="w-full py-5 bg-[#1e2da7] text-white rounded-[1.5rem] font-black uppercase tracking-widest shadow-lg active:scale-95 transition-transform"
          >
            Confirmer {selectedCount * pricePerTicket}€
          </button>
        </div>
      </div>

      {/* --- BARRE D'ENTRÉE --- */}
      <div className="bg-white p-4 border-t border-gray-50 flex items-center gap-3 sticky bottom-0">
        <button 
          onClick={() => setShowPayMenu(true)}
          className="p-3 bg-[#f06292] text-white rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all"
        >
          <CreditCard size={24} />
        </button>
        <input 
          type="text" 
          placeholder="Message..." 
          className="flex-grow bg-gray-50 border-none rounded-2xl px-4 py-3 outline-none text-sm" 
        />
        <button className="bg-[#1e2da7] text-white p-3 rounded-2xl hover:bg-blue-800">
          <Send size={24} />
        </button>
      </div>
    </div>
  );
};

export default ChatView;