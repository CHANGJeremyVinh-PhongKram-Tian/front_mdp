import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Mail, Lock, User, ArrowRight, Building2 } from 'lucide-react';
import axios from 'axios';

const OrganizerAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (isLogin) {
      try {
        const response = await axios.post('http://localhost:8000/api/login', {
          email,
          password
        });
        
        // Stocker le token
        localStorage.setItem('auth_token', response.data.access_token);
        
        navigate('/organizer/dashboard');
      } catch (err) {
        setError("Identifiants incorrects ou erreur serveur.");
      }
    } else {
      // Simulation pour l'inscription pour l'instant
      navigate('/organizer/dashboard');
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-[#f8f9fe] p-6">
      <div className="max-w-md w-full bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-50">
        
        {/* Header de la carte */}
        <div className="bg-[#1e2da7] p-10 text-center relative">
          <div className="absolute top-4 right-6 opacity-20 text-white">
            <Building2 size={80} />
          </div>
          <h1 className="text-white text-3xl font-black uppercase tracking-tighter italic">
            Spark<span className="text-[#f06292]">Up</span> Pro
          </h1>
          <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mt-2">
            {isLogin ? "Espace Organisateur" : "Créer un compte Pro"}
          </p>
        </div>

        {/* Formulaire */}
        <div className="p-10">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && <div className="text-red-500 text-sm font-bold text-center bg-red-50 p-3 rounded-xl">{error}</div>}
            
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-4 top-3.5 text-gray-300" size={20} />
                <input 
                  type="text" 
                  placeholder="Nom de l'organisation" 
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-[#1e2da7] font-medium"
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-4 top-3.5 text-gray-300" size={20} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email professionnel" 
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-[#1e2da7] font-medium"
                required 
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-3.5 text-gray-300" size={20} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe" 
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-[#1e2da7] font-medium"
                required 
              />
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-[#1e2da7] text-white rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-blue-100 hover:bg-[#f06292] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              {isLogin ? "Se connecter" : "Rejoindre SparkUp"}
              <ArrowRight size={20} />
            </button>
          </form>

          {/* Switch Login/Register */}
          <div className="mt-8 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-gray-400 text-xs font-black uppercase tracking-widest hover:text-[#1e2da7] transition-colors"
            >
              {isLogin 
                ? "Pas encore de compte ? Créer un compte" 
                : "Déjà un compte ? Se connecter"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizerAuth;