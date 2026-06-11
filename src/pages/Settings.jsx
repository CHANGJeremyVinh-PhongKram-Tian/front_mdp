import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Ticket, LogOut, ChevronRight, Shield } from 'lucide-react';
import api from '../utils/api';

const Settings = ({ user, setUser, setIsLoggedIn, setIsOrganizer }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
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

  return (
    <div className="max-w-2xl mx-auto p-6 mb-20">
      <h1 className="text-3xl font-black text-[#1e2da7] uppercase tracking-tighter mb-8">Mon Compte</h1>

      {/* --- Section Profil --- */}
      <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 mb-6 flex items-center gap-6">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-[#1e2da7]">
          <User size={40} />
        </div>
        <div>
          <h2 className="text-xl font-black text-gray-900">{user ? `${user.prenom} ${user.nom}` : 'Utilisateur'}</h2>
          <p className="text-gray-500 text-sm">Membre SparkUp</p>
        </div>
      </div>

      {/* --- Menu d'actions --- */}
      <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100">
        
        {/* Lien vers les billets */}
        <Link to="/my-tickets" className="flex items-center justify-between p-6 hover:bg-gray-50 transition-colors border-b border-gray-50 group">
          <div className="flex items-center gap-4 text-gray-700">
            <div className="bg-blue-50 p-3 rounded-xl text-[#1e2da7]">
              <Ticket size={20} />
            </div>
            <span className="font-bold">Mes Billets</span>
          </div>
          <ChevronRight size={20} className="text-gray-300 group-hover:text-[#1e2da7] transition-colors" />
        </Link>

        {/* Info Mail (Non éditable pour l'instant) */}
        <div className="flex items-center justify-between p-6 border-b border-gray-50">
          <div className="flex items-center gap-4 text-gray-700">
            <div className="bg-gray-50 p-3 rounded-xl text-gray-400">
              <Mail size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email</p>
              <p className="font-bold">{user ? user.email : ''}</p>
            </div>
          </div>
        </div>

        {/* Sécurité */}
        <div className="flex items-center justify-between p-6 border-b border-gray-50 opacity-50 cursor-not-allowed">
          <div className="flex items-center gap-4 text-gray-700">
            <div className="bg-gray-50 p-3 rounded-xl">
              <Shield size={20} />
            </div>
            <span className="font-bold">Sécurité & Mot de passe</span>
          </div>
        </div>
      </div>

      {/* --- Bouton Déconnexion --- */}
      <button 
        onClick={handleLogout}
        className="w-full mt-8 py-4 bg-white border-2 border-red-50 text-red-500 font-bold rounded-2xl hover:bg-red-50 hover:border-red-100 transition-all flex items-center justify-center gap-2"
      >
        <LogOut size={20} /> Se déconnecter
      </button>
    </div>
  );
};

export default Settings;