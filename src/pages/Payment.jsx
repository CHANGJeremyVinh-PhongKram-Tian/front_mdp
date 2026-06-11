import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { CreditCard, Lock, ShieldCheck, ArrowLeft, ChevronDown, ChevronUp, Check } from 'lucide-react';
import { allEvents } from '../data/events';

const Payment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  
  // Détails de l'événement
  const event = allEvents.find(e => e.id === parseInt(id)) || {
    id: parseInt(id),
    title: "Soirée After School",
    city: "Lyon",
    theme: "Loisirs",
    date: "11 Juin 2026",
    time: "20:00",
    price: "25€",
    image: "https://images.unsplash.com/photo-1514525253361-bee8718a7439?q=80&w=500"
  };

  const parsedPrice = parseInt(event.price.replace('€', '')) || 25;

  // États pour le choix des tickets et groupes
  const [count, setCount] = useState(1);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);
  const [selectedMembers, setSelectedMembers] = useState([]); // Array of member IDs
  const [choiceValidated, setChoiceValidated] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Charger les groupes depuis le localStorage
    const savedGroups = localStorage.getItem('sparkup_groups');
    if (savedGroups) {
      const parsed = JSON.parse(savedGroups);
      setGroups(parsed);
      if (parsed.length > 0) {
        setSelectedGroup(parsed[0]); // Sélectionner le premier groupe par défaut
      }
    }
  }, []);

  // Synchroniser le compteur de tickets avec le nombre de membres sélectionnés
  useEffect(() => {
    if (selectedMembers.length > 0) {
      setCount(selectedMembers.length);
    }
  }, [selectedMembers]);

  const handleIncrement = () => {
    // Si aucun membre n'est sélectionné, on incrémente manuellement
    if (selectedMembers.length === 0) {
      setCount(prev => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (selectedMembers.length === 0 && count > 1) {
      setCount(prev => prev - 1);
    }
  };

  const toggleMemberSelection = (memberId) => {
    if (selectedMembers.includes(memberId)) {
      setSelectedMembers(selectedMembers.filter(id => id !== memberId));
    } else {
      setSelectedMembers([...selectedMembers, memberId]);
    }
  };

  const handleValidateChoice = () => {
    setChoiceValidated(true);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulation de transaction
    setTimeout(() => {
      // Si paiement par groupe, poster un message système dans le chat du groupe
      if (selectedGroup && selectedMembers.length > 0) {
        const memberNames = selectedMembers.map(mId => {
          const member = selectedGroup.members.find(m => m.id === mId);
          return member ? member.name : "Killian";
        });

        // Formater le message (ex: "Vous avez acheté 3 places pour Killian, Sarah et Hugo")
        let namesText = memberNames.join(', ');
        if (memberNames.length > 1) {
          const lastCommaIndex = namesText.lastIndexOf(', ');
          namesText = namesText.substring(0, lastCommaIndex) + ' et ' + namesText.substring(lastCommaIndex + 2);
        }

        const systemMessage = {
          id: Date.now(),
          text: `Vous avez acheté ${selectedMembers.length} places de prévente pour ${namesText}.`,
          isGroupPaymentNotice: true,
          timestamp: new Date().toISOString()
        };

        // Charger l'historique des messages du groupe
        const chatKey = `chat_messages_${selectedGroup.id}`;
        const existingMessages = JSON.parse(localStorage.getItem(chatKey)) || [];
        const updatedMessages = [...existingMessages, systemMessage];
        localStorage.setItem(chatKey, JSON.stringify(updatedMessages));

        // Mettre à jour le dernier message du groupe dans la liste
        const savedGroups = JSON.parse(localStorage.getItem('sparkup_groups')) || [];
        const updatedGroups = savedGroups.map(g => {
          if (g.id === selectedGroup.id) {
            return {
              ...g,
              lastMsg: `Paiement groupé effectué par Moi pour ${selectedMembers.length} places !`,
              time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
            };
          }
          return g;
        });
        localStorage.setItem('sparkup_groups', JSON.stringify(updatedGroups));
      }

      navigate(`/payment-success?count=${count}`);
    }, 2000);
  };

  const totalPrice = parsedPrice * count;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 font-sans">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* --- Colonne Gauche : Récapitulatif de l'événement --- */}
        <div className="space-y-8">
          <button 
            onClick={() => choiceValidated ? setChoiceValidated(false) : navigate(-1)} 
            className="flex items-center gap-2 text-gray-500 hover:text-[#9146ff] transition-colors font-bold"
          >
            <ArrowLeft size={20} /> {choiceValidated ? "Modifier la sélection" : "Retour"}
          </button>
          
          <div>
            <p className="text-[#9146ff] font-extrabold uppercase tracking-widest text-sm mb-2">Votre commande</p>
            <h1 className="text-4xl font-black text-gray-900 leading-tight uppercase tracking-tighter">{event.title}</h1>
            <p className="text-5xl font-black text-[#9146ff] mt-4">{totalPrice},00 €</p>
          </div>

          <div className="flex items-center gap-4 p-4 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <img src={event.image} alt="" className="w-20 h-20 object-cover rounded-2xl shadow-sm" />
            <div>
              <p className="font-extrabold text-gray-800 text-lg">{event.city}</p>
              <p className="text-sm text-gray-500 font-semibold">{event.date} • {event.time}</p>
            </div>
          </div>
        </div>

        {/* --- Colonne Droite : Panel Interactif (Mockup Tickets / Stripe) --- */}
        <div className="w-full">
          {!choiceValidated ? (
            /* ========================================================= */
            /* MOCKUP ÉCRAN "TICKETS" (CONFORME À L'IMAGE DE L'UTILISATEUR) */
            /* ========================================================= */
            <div className="bg-white rounded-[2rem] shadow-xl border border-gray-50 overflow-hidden flex flex-col p-6 animate-in fade-in duration-200">
              <h2 className="text-3xl font-black text-gray-900 tracking-tighter uppercase mb-6">TICKETS</h2>
              
              {/* Box Ticket Type */}
              <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm flex items-center justify-between mb-8">
                <div>
                  <h3 className="font-extrabold text-gray-800 text-lg uppercase tracking-tight">PRÉVENTE</h3>
                  <p className="text-[#9146ff] font-black text-lg mt-1">{parsedPrice},00 €</p>
                </div>
                
                {/* Stepper Count */}
                <div className="flex items-center bg-gray-50 border border-gray-100 rounded-full px-3 py-1.5 shadow-sm">
                  <button 
                    onClick={handleDecrement}
                    className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-bold text-gray-500 hover:text-black border border-gray-100 shadow-sm"
                  >
                    —
                  </button>
                  <span className="w-10 text-center font-black text-lg text-purple-750">{count}</span>
                  <button 
                    onClick={handleIncrement}
                    className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-bold text-gray-500 hover:text-black border border-gray-100 shadow-sm"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Accordion Group Selection */}
              <div className="border-t border-gray-100 pt-6 space-y-4">
                <div className="text-center font-black text-gray-800 text-lg mb-4 flex items-center justify-center gap-1.5">
                  Quelle groupe ? 👀
                </div>

                {selectedGroup ? (
                  <div className="border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
                    {/* Header Accordion */}
                    <button 
                      onClick={() => setIsAccordionOpen(!isAccordionOpen)}
                      className="w-full bg-white px-5 py-4 flex items-center justify-between border-b border-gray-50 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <img src={selectedGroup.image} alt="" className="w-10 h-10 rounded-full object-cover shadow-sm bg-purple-100" />
                        <span className="font-extrabold text-gray-800 text-sm text-left">{selectedGroup.name}</span>
                      </div>
                      {isAccordionOpen ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
                    </button>

                    {/* Content Accordion (Grid of Members) */}
                    {isAccordionOpen && (
                      <div className="p-6 bg-white">
                        <div className="grid grid-cols-3 gap-6 justify-items-center">
                          {selectedGroup.members.map((member) => {
                            const isSelected = selectedMembers.includes(member.id);
                            return (
                              <button
                                key={member.id}
                                onClick={() => toggleMemberSelection(member.id)}
                                className="flex flex-col items-center gap-2 group outline-none"
                              >
                                <div className="relative">
                                  <img 
                                    src={member.image} 
                                    alt={member.name} 
                                    className={`w-16 h-16 rounded-full object-cover shadow-md transition-all duration-200 border-2 ${
                                      isSelected ? 'border-[#9146ff] scale-105' : 'border-transparent group-hover:scale-102'
                                    }`}
                                  />
                                  {/* Purple Check badge */}
                                  {isSelected && (
                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#9146ff] border-2 border-white rounded-full flex items-center justify-center text-white shadow-sm">
                                      <Check size={12} strokeWidth={3} />
                                    </div>
                                  )}
                                </div>
                                <span className="font-extrabold text-xs text-gray-800 tracking-tight group-hover:text-black">
                                  {member.name}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-6 border border-dashed border-gray-200 rounded-3xl">
                    <p className="text-gray-400 text-sm font-semibold mb-2">Vous n'avez pas encore de groupe</p>
                    <button 
                      onClick={() => navigate('/messages')}
                      className="text-[#9146ff] font-bold text-xs underline"
                    >
                      Créer un groupe
                    </button>
                  </div>
                )}
              </div>

              {/* Validate Choice Button */}
              <button 
                onClick={handleValidateChoice}
                className="w-full py-4 mt-8 bg-[#9146ff] hover:bg-[#7c3aed] text-white font-black text-base rounded-3xl shadow-lg transition-all"
              >
                VALIDER LE CHOIX
              </button>
            </div>
          ) : (
            /* ========================================================= */
            /* ÉCRAN FORMULAIRE STRIPE DE PAIEMENT                       */
            /* ========================================================= */
            <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100 animate-in fade-in duration-200">
              <h2 className="text-2xl font-black text-gray-950 mb-6 tracking-tight flex items-center gap-2 uppercase">
                Paiement Sécurisé
              </h2>
              
              <form onSubmit={handlePaymentSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Informations de carte</label>
                  <div className="relative">
                    <CreditCard className="absolute left-4 top-3.5 text-gray-400" size={20} />
                    <input 
                      type="text" 
                      placeholder="1234 5678 1234 5678" 
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#9146ff]"
                      required 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="MM / YY" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#9146ff]" required />
                    <input type="text" placeholder="CVC" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#9146ff]" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Nom sur la carte</label>
                  <input type="text" placeholder="Adrien Macaire" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#9146ff]" required />
                </div>

                {selectedGroup && selectedMembers.length > 0 && (
                  <div className="p-4 bg-purple-50/50 rounded-2xl border border-purple-100/50 text-xs text-purple-750 font-semibold leading-relaxed">
                    🎫 Achat groupé : vous allez payer pour {selectedMembers.length} membres de votre groupe <strong>"{selectedGroup.name}"</strong>. Les billets leur seront directement envoyés dans leur espace.
                  </div>
                )}

                <button 
                  disabled={loading}
                  className={`w-full py-4 rounded-xl text-white font-black text-lg shadow-lg transition-all flex items-center justify-center gap-3 ${loading ? 'bg-gray-400' : 'bg-[#9146ff] hover:bg-[#7c3aed]'}`}
                >
                  {loading ? "Traitement..." : `Payer ${totalPrice},00 €`}
                  {!loading && <Lock size={18} />}
                </button>

                <div className="flex items-center justify-center gap-6 text-gray-400 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest">
                    <ShieldCheck size={14} className="text-green-500" /> Sécurisé par Stripe
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Payment;