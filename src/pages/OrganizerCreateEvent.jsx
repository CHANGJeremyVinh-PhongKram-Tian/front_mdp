import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { 
  ArrowLeft, 
  Image as ImageIcon, 
  Calendar, 
  MapPin, 
  Euro, 
  Info, 
  CheckCircle2, 
  Clock, 
  AlignLeft,
  Users
} from 'lucide-react';

const OrganizerCreateEvent = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  
  // États du formulaire
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    date: '',
    heure_debut: '',
    heure_fin: '',
    lieu: '',
    prix: '',
    capacite: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const date_debut = `${formData.date} ${formData.heure_debut}:00`;
      const date_fin = `${formData.date} ${formData.heure_fin}:00`;

      const data = new FormData();
      data.append('titre', formData.titre);
      data.append('description', formData.description);
      data.append('date_debut', date_debut);
      data.append('date_fin', date_fin);
      data.append('lieu', formData.lieu);
      data.append('capacite', parseInt(formData.capacite, 10));
      
      if (imageFile) {
        data.append('affiche', imageFile);
      }

      console.log("Tentative d'envoi du FormData au backend");

      const response = await api.post('/evenements', data, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data'
        },
        timeout: 10000 // Timeout de 10 secondes pour éviter de rester bloqué
      });
      
      console.log("Réponse du serveur :", response.data);
      navigate('/organizer/create-success');
    } catch (err) {
      console.error("Erreur détaillée attrapée :", err);
      if (err.response) {
        console.error("Données d'erreur du serveur :", err.response.data);
        setError(`Erreur serveur : ${err.response.data.message || 'Validation échouée'}`);
      } else if (err.request) {
        console.error("Aucune réponse reçue du serveur (Vérifiez que le backend tourne) :", err.request);
        setError("Impossible de contacter le serveur. Le backend est-il lancé sur le port 8000 ?");
      } else {
        setError(`Erreur lors de la requête : ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
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

        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-2xl font-bold">
            {error}
          </div>
        )}

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
                <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
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
              <input 
                type="text" 
                name="titre"
                value={formData.titre}
                onChange={handleChange}
                placeholder="Nom de l'évènement..." 
                className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-[#1e2da7] transition-all font-bold" 
                required 
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-4 tracking-widest">Description</label>
              <div className="relative">
                <AlignLeft className="absolute left-4 top-4 text-gray-300" size={18} />
                <textarea 
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
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
                  <input 
                    type="date" 
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl font-bold" 
                    required 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-4 tracking-widest">Début</label>
                <div className="relative">
                  <Clock className="absolute left-4 top-4 text-gray-300" size={18} />
                  <input 
                    type="time" 
                    name="heure_debut"
                    value={formData.heure_debut}
                    onChange={handleChange}
                    className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl font-bold" 
                    required 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-4 tracking-widest">Fin</label>
                <div className="relative">
                  <Clock className="absolute left-4 top-4 text-gray-300" size={18} />
                  <input 
                    type="time" 
                    name="heure_fin"
                    value={formData.heure_fin}
                    onChange={handleChange}
                    className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl font-bold" 
                    required 
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-4 tracking-widest">Lieu / Ville</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 text-gray-300" size={18} />
                  <input 
                    type="text" 
                    name="lieu"
                    value={formData.lieu}
                    onChange={handleChange}
                    placeholder="Groupama Stadium..." 
                    className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl font-bold" 
                    required 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-4 tracking-widest">Prix (€)</label>
                <div className="relative">
                  <Euro className="absolute left-4 top-4 text-gray-300" size={18} />
                  <input 
                    type="number" 
                    name="prix"
                    value={formData.prix}
                    onChange={handleChange}
                    placeholder="25" 
                    className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl font-bold" 
                    required 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-4 tracking-widest">Capacité</label>
                <div className="relative">
                  <Users className="absolute left-4 top-4 text-gray-300" size={18} />
                  <input 
                    type="number" 
                    name="capacite"
                    value={formData.capacite}
                    onChange={handleChange}
                    placeholder="5000" 
                    className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl font-bold" 
                    required 
                  />
                </div>
              </div>
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className={`w-full py-6 bg-[#1e2da7] text-white rounded-[2rem] font-black uppercase tracking-widest shadow-2xl shadow-blue-200 hover:bg-[#f06292] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Création en cours...' : 'Lancer l\'évènement'} <CheckCircle2 size={24} />
          </button>

        </form>
      </div>
    </div>
  );
};

export default OrganizerCreateEvent;