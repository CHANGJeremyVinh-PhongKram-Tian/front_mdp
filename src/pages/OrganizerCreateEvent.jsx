import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Image as ImageIcon, 
  Calendar, 
  MapPin, 
  Euro, 
  Info, 
  CheckCircle2, 
  Clock, 
  AlignLeft 
} from 'lucide-react';

const OrganizerCreateEvent = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  navigate('/organizer/create-success');
};

  return (
    <div className="min-h-screen bg-[#f8f9fe] p-6 md:p-12 pb-32">
      <div className="max-w-3xl mx-auto">
        <button 
          onClick={() => navigate('/organizer/dashboard')} 
          className="flex items-center gap-2 text-gray-500 hover:text-[#1e2da7] font-bold mb-8 transition-colors"
        >
          <ArrowLeft size={20} /> Annuler
        </button>

        <div className="mb-10">
          <h1 className="text-4xl font-black text-[#1e2da7] uppercase tracking-tighter italic">Créer un Évènement</h1>
          <p className="text-gray-500 font-bold">Configurez les derniers détails de votre Spark.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* --- SECTION 1 : VISUEL --- */}
          <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-100">
            <h2 className="flex items-center gap-3 text-lg font-black text-[#1e2da7] uppercase mb-6">
              <ImageIcon size={20} className="text-[#f06292]" /> Affiche de l'évènement
            </h2>
            <div className="relative group">
              <div className={`w-full h-64 rounded-[2.5rem] border-4 border-dashed transition-all flex flex-col items-center justify-center overflow-hidden bg-gray-50 ${preview ? 'border-transparent' : 'border-gray-200 group-hover:border-[#1e2da7]'}`}>
                {preview ? (
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center">
                    <ImageIcon size={48} className="mx-auto text-gray-300 mb-2" />
                    <p className="text-[10px] font-black text-gray-400 uppercase">Formats acceptés : JPG, PNG</p>
                  </div>
                )}
                <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" required />
              </div>
            </div>
          </div>

          {/* --- SECTION 2 : INFOS & DESCRIPTION --- */}
          <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-100 space-y-6">
            <h2 className="flex items-center gap-3 text-lg font-black text-[#1e2da7] uppercase mb-2">
              <Info size={20} className="text-[#f06292]" /> Informations Générales
            </h2>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-4 tracking-widest">Titre</label>
              <input type="text" placeholder="Nom de l'évènement..." className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-[#1e2da7] transition-all font-bold" required />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-4 tracking-widest">Description</label>
              <div className="relative">
                <AlignLeft className="absolute left-4 top-4 text-gray-300" size={18} />
                <textarea 
                  rows="4" 
                  placeholder="Décrivez l'ambiance, les artistes, le programme..." 
                  className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-[#1e2da7] transition-all font-bold resize-none"
                  required
                ></textarea>
              </div>
            </div>
          </div>

          {/* --- SECTION 3 : LOGISTIQUE (DATES & HORAIRES) --- */}
          <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-100 space-y-6">
            <h2 className="flex items-center gap-3 text-lg font-black text-[#1e2da7] uppercase mb-2">
              <Clock size={20} className="text-[#f06292]" /> Date & Horaires
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-4 tracking-widest">Date</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-4 text-gray-300" size={18} />
                  <input type="date" className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl font-bold" required />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-4 tracking-widest">Début</label>
                <div className="relative">
                  <Clock className="absolute left-4 top-4 text-gray-300" size={18} />
                  <input type="time" className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl font-bold" required />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-4 tracking-widest">Fin</label>
                <div className="relative">
                  <Clock className="absolute left-4 top-4 text-gray-300" size={18} />
                  <input type="time" className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl font-bold" required />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-4 tracking-widest">Lieu / Ville</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 text-gray-300" size={18} />
                  <input type="text" placeholder="Groupama Stadium..." className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl font-bold" required />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-4 tracking-widest">Prix (€)</label>
                <div className="relative">
                  <Euro className="absolute left-4 top-4 text-gray-300" size={18} />
                  <input type="number" placeholder="25" className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl font-bold" required />
                </div>
              </div>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-6 bg-[#1e2da7] text-white rounded-[2rem] font-black uppercase tracking-widest shadow-2xl shadow-blue-200 hover:bg-[#f06292] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            Lancer l'évènement <CheckCircle2 size={24} />
          </button>

        </form>
      </div>
    </div>
  );
};

export default OrganizerCreateEvent;