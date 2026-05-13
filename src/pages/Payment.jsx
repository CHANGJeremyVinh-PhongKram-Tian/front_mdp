import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { CreditCard, Lock, ShieldCheck, ArrowLeft } from 'lucide-react';
import { allEvents } from '../data/events';

const Payment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const count = parseInt(searchParams.get('count')) || 1;  
  const event = allEvents.find(e => e.id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePayment = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulation d'un délai de transaction
    setTimeout(() => {
      navigate(`/payment-success?count=${count}`);
    }, 2000);
  };

  if (!event) return null;

  const totalPrice = parseInt(event.price) * count;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* --- Colonne Gauche : Récapitulatif --- */}
        <div className="space-y-8">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-[#1e2da7] transition-colors">
            <ArrowLeft size={20} /> Retour
          </button>
          
          <div>
            <p className="text-[#1e2da7] font-bold uppercase tracking-widest text-sm mb-2">Votre commande</p>
            <h1 className="text-4xl font-black text-gray-900 leading-tight">{event.title}</h1>
            <p className="text-5xl font-black text-[#1e2da7] mt-4">{totalPrice}€</p>
          </div>

          <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <img src={event.image} alt="" className="w-20 h-20 object-cover rounded-xl" />
            <div>
              <p className="font-bold text-gray-800">{event.city}</p>
              <p className="text-sm text-gray-500">{event.date} • {event.time}</p>
            </div>
          </div>
        </div>

        {/* --- Colonne Droite : Formulaire Type Stripe --- */}
        <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100 h-fit">
          <form onSubmit={handlePayment} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Informations de carte</label>
              <div className="relative">
                <CreditCard className="absolute left-4 top-3.5 text-gray-400" size={20} />
                <input 
                  type="text" 
                  placeholder="1234 5678 1234 5678" 
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1e2da7]"
                  required 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="MM / YY" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1e2da7]" required />
                <input type="text" placeholder="CVC" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1e2da7]" required />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Nom sur la carte</label>
              <input type="text" placeholder="Adrien Macaire" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1e2da7]" required />
            </div>

            <button 
              disabled={loading}
              className={`w-full py-4 rounded-xl text-white font-black text-lg shadow-lg transition-all flex items-center justify-center gap-3 ${loading ? 'bg-gray-400' : 'bg-[#1e2da7] hover:bg-[#f06292]'}`}
            >
            {loading ? "Traitement..." : `Payer ${totalPrice}€`}
              {!loading && <Lock size={18} />}
            </button>

            <div className="flex items-center justify-center gap-6 text-gray-400 pt-4">
              <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest">
                <ShieldCheck size={14} /> Sécurisé par Stripe
              </div>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Payment;