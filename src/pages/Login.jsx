import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import api from '../utils/api';

const Login = ({ setIsLoggedIn, setIsOrganizer, setUser }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await api.post('/login', {
        email,
        password,
      });

      localStorage.setItem('auth_token', response.data.access_token);
      setUser(response.data.user);
      setIsLoggedIn(true);
      setIsOrganizer(!!response.data.user.organisateur);

      if (response.data.user.organisateur) {
        navigate('/organizer/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.message || 
        err.response?.data?.errors?.email?.[0] || 
        "Identifiants incorrects ou erreur de connexion."
      );
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-[#1e2da7] p-8 text-white text-center">
          <h2 className="text-2xl font-black uppercase tracking-tighter">Connexion</h2>
          <p className="text-blue-200 text-xs mt-2">Accédez à votre espace SparkUp.</p>
        </div>

        <form onSubmit={handleLogin} className="p-8 space-y-4">
          {error && (
            <div className="text-red-500 text-xs font-bold text-center bg-red-50 p-3 rounded-xl border border-red-100">
              {error}
            </div>
          )}
          
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
            <input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1e2da7]" 
              required 
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
            <input 
              type="password" 
              placeholder="Mot de passe" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1e2da7]" 
              required 
            />
          </div>

          <button type="submit" className="w-full py-4 bg-[#1e2da7] text-white font-bold rounded-xl hover:bg-[#f06292] transition-all flex items-center justify-center gap-2">
            Se connecter <ArrowRight size={18} />
          </button>

          <p className="text-center text-sm text-gray-500 mt-6">
            Pas encore de compte ? <Link to="/register" className="text-[#1e2da7] font-bold">Créer un compte</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;