import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, HelpCircle, Mail, MessageSquare, ChevronDown, ShieldQuestion } from 'lucide-react';

const OrganizerSupport = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      q: "Comment sont versés mes revenus ?",
      a: "Les fonds sont virés automatiquement sur votre compte bancaire 48h après la fin de l'événement, déduction faite de la commission SparkUp."
    },
    {
      q: "Comment scanner les billets à l'entrée ?",
      a: "Vous pouvez utiliser n'importe quel smartphone via l'interface 'Scanner' de votre dashboard Pro. Les QR codes sont vérifiés en temps réel."
    },
    {
      q: "Puis-je annuler un événement déjà publié ?",
      a: "Oui, via l'onglet 'Modifier' de votre événement. En cas d'annulation, tous les participants seront remboursés intégralement sous 5 jours."
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fe] p-6 md:p-12 pb-32">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate('/organizer/dashboard')} 
          className="flex items-center gap-2 text-gray-500 hover:text-[#1e2da7] font-bold mb-8 transition-colors"
        >
          <ArrowLeft size={20} /> Dashboard
        </button>

        <div className="mb-12">
          <h1 className="text-4xl font-black text-[#1e2da7] uppercase tracking-tighter italic">Support Pro</h1>
          <p className="text-gray-500 font-bold">Besoin d'aide pour gérer vos évènements ? Nous sommes là.</p>
        </div>

        {/* --- SECTION FAQ --- */}
        <div className="space-y-6 mb-12">
          <h2 className="flex items-center gap-3 text-lg font-black text-[#1e2da7] uppercase">
            <HelpCircle size={24} className="text-[#f06292]" /> Questions Fréquentes
          </h2>
          
          <div className="grid gap-4">
            {faqs.map((faq, index) => (
              <details key={index} className="group bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden transition-all">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none outline-none">
                  <span className="font-black text-[#1e2da7] uppercase text-sm tracking-tight">{faq.q}</span>
                  <ChevronDown className="text-gray-300 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-6 pb-6 text-gray-500 font-medium text-sm leading-relaxed border-t border-gray-50 pt-4">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* --- SECTION CONTACT DIRECT --- */}
        <div className="bg-[#1e2da7] rounded-[3rem] p-10 shadow-2xl shadow-blue-200 text-white relative overflow-hidden text-center md:text-left">
        <div className="absolute -right-10 -bottom-10 opacity-10 hidden md:block">
            <Mail size={200} />
        </div>
        
        <div className="relative z-10 flex flex-col items-center md:items-start">
            <h2 className="text-2xl font-black uppercase italic mb-4">Contactez-nous</h2>
            <p className="text-blue-100 font-bold mb-8 max-w-sm">
            Une question spécifique ou un besoin technique ? Envoyez-nous un message directement.
            </p>
            
            <a 
            href="mailto:sparkupevents69@gmail.com" 
            className="w-full md:w-auto flex items-center justify-center gap-4 bg-white text-[#1e2da7] px-8 py-5 rounded-2xl font-black uppercase text-[11px] md:text-xs tracking-widest hover:bg-[#f06292] hover:text-white transition-all shadow-xl active:scale-95"
            >
            <Mail size={20} />
            sparkupevents69@gmail.com
            </a>
        </div>
        </div>
        <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 text-gray-300 font-black uppercase text-[10px] tracking-[0.2em]">
                <ShieldQuestion size={14} /> SparkUp Assistance Organisateur
            </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizerSupport;