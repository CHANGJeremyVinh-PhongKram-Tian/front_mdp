import { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import api from '../utils/api';

const AuthCallback = ({ setIsLoggedIn, setIsOrganizer, setUser }) => {
  const { provider } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const code = searchParams.get('code');

    if (!code) {
      setError("Code d'autorisation manquant.");
      return;
    }

    const verifyCode = async () => {
      try {
        const response = await api.post(`/auth/${provider}/callback`, { code });

        // Enregistrer le token
        localStorage.setItem('auth_token', response.data.access_token);
        
        // Mettre à jour l'état de l'application
        setUser(response.data.user);
        setIsLoggedIn(true);
        setIsOrganizer(!!response.data.user.organisateur);

        // Rediriger vers l'espace approprié
        if (response.data.user.organisateur) {
          navigate('/organizer/dashboard');
        } else {
          navigate('/');
        }
      } catch (err) {
        console.error("OAuth Callback verification failed:", err);
        setError(
          err.response?.data?.message || 
          "Échec de l'authentification avec votre compte."
        );
      }
    };

    verifyCode();
  }, [provider, searchParams, navigate, setIsLoggedIn, setIsOrganizer, setUser]);

  if (error) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6 bg-[#f8f9fe]">
        <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-xl border border-gray-100 p-8 text-center space-y-6">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-500 mx-auto">
            <AlertCircle size={36} />
          </div>
          <div>
            <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Erreur de Connexion</h2>
            <p className="text-gray-500 text-sm mt-2">{error}</p>
          </div>
          <button 
            onClick={() => navigate('/login')}
            className="w-full py-4 bg-[#1e2da7] text-white font-bold rounded-2xl hover:bg-[#f06292] transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft size={18} /> Retour à la connexion
          </button>
        </div>
      </div>
    );
  }

  const providerName = provider === 'google' ? 'Google' : provider === 'apple' ? 'Apple' : provider;

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 bg-[#f8f9fe]">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-xl border border-gray-100 p-10 text-center space-y-6">
        <div className="relative flex justify-center">
          <div className="w-20 h-20 border-4 border-t-[#1e2da7] border-r-transparent border-b-[#f06292] border-l-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 size={24} className="text-gray-300 animate-pulse" />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-black text-[#1e2da7] uppercase tracking-tight italic">SparkUp</h2>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mt-3">
            Connexion en cours avec {providerName}...
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthCallback;
