import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Building2, Save, LogOut, Camera } from 'lucide-react';
import api from '../utils/api';

const OrganizerProfile = ({ user, setUser, setIsLoggedIn, setIsOrganizer }) => {
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await api.post('/logout');
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem('auth_token');
      setIsLoggedIn(false);
      setIsOrganizer(false);
      setUser(null);
      navigate('/');
    }
  };

  const displayName = user 
    ? (user.organisateur ? user.organisateur.nom_structure : `${user.prenom} ${user.nom}`)
    : 'Organisateur Pro';

  return (
    <div className="min-h-screen bg-[#f8f9fe] p-6 md:p-12 pb-32">
      <div className="max-w-3xl mx-auto">
        <button onClick={() => navigate('/organizer/dashboard')} className="flex items-center gap-2 text-gray-500 hover:text-[#1e2da7] font-bold mb-8 transition-colors">
          <ArrowLeft size={20} /> Retour Dashboard
        </button>

        <div className="mb-10">
          <h1 className="text-4xl font-black text-[#1e2da7] uppercase tracking-tighter italic">Mon Compte Pro</h1>
          <p className="text-gray-500 font-bold">Gérez les informations de votre profil organisateur.</p>
        </div>

        <div className="bg-white rounded-[3rem] p-8 md:p-10 shadow-xl border border-gray-100">
          {/* --- PHOTO DE PROFIL / LOGO --- */}
          <div className="flex flex-col items-center mb-10">
            <div className="relative group">
              <div className="w-32 h-32 bg-gray-100 rounded-[2.5rem] overflow-hidden border-4 border-white shadow-lg">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Adrien" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <button className="absolute bottom-0 right-0 bg-[#f06292] text-white p-3 rounded-2xl shadow-lg hover:scale-110 transition-transform">
                <Camera size={18} />
              </button>
            </div>
            <h2 className="mt-4 text-xl font-black text-[#1e2da7] uppercase">{displayName}</h2>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Organisateur Certifié</p>
          </div>

          {/* --- FORMULAIRE --- */}
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-4 tracking-widest">Nom complet / Agence</label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-4 text-gray-300" size={18} />
                  <input 
                    type="text" 
                    defaultValue={displayName} 
                    className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl font-bold focus:bg-white focus:border-[#1e2da7] outline-none transition-all" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-4 tracking-widest">Email professionnel</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-4 text-gray-300" size={18} />
                  <input 
                    type="email" 
                    defaultValue={user ? user.email : ''} 
                    className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl font-bold focus:bg-white focus:border-[#1e2da7] outline-none transition-all" 
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-50 flex flex-col md:flex-row gap-4">
              <button type="button" className="flex-1 bg-[#1e2da7] text-white py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#f06292] transition-all shadow-lg shadow-blue-100">
                <Save size={20} /> Enregistrer
              </button>
              <button 
                onClick={handleLogout} 
                className="flex-1 bg-red-50 text-red-500 py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-red-500 hover:text-white transition-all"
              >
                <LogOut size={20} /> Déconnexion
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrganizerProfile;