import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Building2 } from 'lucide-react';
import api from '../utils/api';

const OrganizerAuth = ({ setIsLoggedIn, setIsOrganizer, setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [nomStructure, setNomStructure] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (isLogin) {
      try {
        const response = await api.post('/login', {
          email,
          password
        });
        
        localStorage.setItem('auth_token', response.data.access_token);
        setUser(response.data.user);
        setIsLoggedIn(true);
        setIsOrganizer(!!response.data.user.organisateur);
        
        navigate('/organizer/dashboard');
      } catch (err) {
        console.error("Pro Login error:", err);
        setError("Identifiants incorrects ou erreur serveur.");
      }
    } else {
      try {
        const response = await api.post('/register', {
          nom: 'Organisateur',
          prenom: 'Pro',
          email,
          password,
          nom_structure: nomStructure
        });

        localStorage.setItem('auth_token', response.data.access_token);
        setUser(response.data.user);
        setIsLoggedIn(true);
        setIsOrganizer(true);

        navigate('/organizer/dashboard');
      } catch (err) {
        console.error("Pro Register error:", err);
        setError(
          err.response?.data?.message || 
          err.response?.data?.errors?.email?.[0] || 
          "Erreur lors de la création du compte Pro."
        );
      }
    }
  };

  const handleSocialLogin = async (provider) => {
    setError(null);
    try {
      const response = await api.get(`/auth/${provider}/redirect`);
      window.location.href = response.data.url;
    } catch (err) {
      console.error(`Error redirecting to ${provider}:`, err);
      setError(`Impossible de lancer la connexion avec ${provider}.`);
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
                <Building2 className="absolute left-4 top-3.5 text-gray-300" size={20} />
                <input 
                  type="text" 
                  value={nomStructure}
                  onChange={(e) => setNomStructure(e.target.value)}
                  placeholder="Nom de l'organisation" 
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-[#1e2da7] font-medium"
                  required
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

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-gray-100"></div>
              <span className="flex-shrink mx-4 text-gray-400 text-xs font-black uppercase tracking-wider">Ou</span>
              <div className="flex-grow border-t border-gray-100"></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleSocialLogin('google')}
                className="py-3 px-4 border border-gray-200 rounded-2xl hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-2 font-bold text-gray-700 text-sm cursor-pointer"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.61 14.99 1 12 1 7.35 1 3.39 3.67 1.39 7.56l3.85 2.99c.9-2.7 3.4-4.51 6.76-4.51z"/>
                  <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.34H12v4.51h6.46c-.29 1.48-1.14 2.73-2.4 3.58l3.76 2.91c2.2-2.03 3.47-5.01 3.47-8.66z"/>
                  <path fill="#FBBC05" d="M5.24 10.55c-.24-.72-.38-1.5-.38-2.3s.14-1.58.38-2.3L1.39 2.96C.5 4.77 0 6.82 0 9s.5 4.23 1.39 6.04l3.85-2.99c-.24-.72-.38-1.5-.38-2.3z"/>
                  <path fill="#34A853" d="M12 18.96c-3.36 0-5.86-1.81-6.76-4.51L1.39 17.44c2 3.89 5.96 6.56 10.61 6.56 2.93 0 5.61-.97 7.56-2.65l-3.76-2.91c-1.04.68-2.39 1.52-3.8 1.52z"/>
                </svg>
                Google
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin('apple')}
                className="py-3 px-4 border border-gray-200 rounded-2xl hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-2 font-bold text-gray-700 text-sm cursor-pointer"
              >
                <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.2.67-2.92 1.49-.61.69-1.15 1.84-1.01 2.96 1.1.09 2.23-.58 2.94-1.39z"/>
                </svg>
                Apple
              </button>
            </div>
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