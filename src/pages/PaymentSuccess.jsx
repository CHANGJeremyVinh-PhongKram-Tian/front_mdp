import React, { useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, Ticket, MessageSquare, ArrowRight, PartyPopper } from 'lucide-react';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const count = searchParams.get('count') || 1;

  // Petit effet au chargement pour simuler la réussite
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6 bg-[#f8f9fe]">
      <div className="max-w-md w-full bg-white rounded-[3rem] shadow-2xl p-8 text-center border border-gray-50 relative overflow-hidden">
        
        {/* Déco de fond discrète */}
        <div className="absolute top-0 right-0 p-4 opacity-10 text-[#f06292]">
          <PartyPopper size={120} />
        </div>

        {/* --- ICONE SUCCESS --- */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full animate-bounce">
            <CheckCircle2 size={60} className="text-green-500" />
          </div>
        </div>

        {/* --- TEXTE PRINCIPAL --- */}
        <h1 className="text-3xl font-black text-[#1e2da7] uppercase tracking-tighter mb-2">
          Paiement Confirmé !
        </h1>
        <p className="text-gray-500 font-medium mb-8">
          Tes <span className="text-[#1e2da7] font-bold">{count} billets</span> sont maintenant disponibles dans ton wallet.
        </p>

        {/* --- RÉCAPITULATIF --- */}
        <div className="bg-blue-50 rounded-3xl p-6 mb-8 text-left border border-blue-100">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-black text-[#1e2da7] uppercase">Statut</span>
            <span className="bg-green-500 text-white text-[10px] font-black px-3 py-1 rounded-full">VALIDE</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400 font-bold">Transaction</span>
              <span className="text-[#1e2da7] font-mono">#SPK-772933</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400 font-bold">Total payé</span>
              <span className="text-[#1e2da7] font-black">{count * 35}€</span>
            </div>
          </div>
        </div>

        {/* --- ACTIONS --- */}
        <div className="space-y-4">
          <Link 
            to="/my-tickets" 
            className="w-full bg-[#1e2da7] text-white py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-lg shadow-blue-200 hover:scale-[1.02] transition-all"
          >
            <Ticket size={20} /> Voir mes billets
          </Link>

          <Link 
            to="/messages" 
            className="w-full bg-white border-2 border-[#1e2da7] text-[#1e2da7] py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-blue-50 transition-all"
          >
            <MessageSquare size={20} /> Retour au chat
          </Link>
        </div>

        <button 
          onClick={() => navigate('/')}
          className="mt-8 text-gray-400 text-xs font-black uppercase tracking-widest hover:text-[#f06292] transition-colors inline-flex items-center gap-2"
        >
          Retour à l'accueil <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;