import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    navigate('/');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-[#1e2da7] p-8 text-white text-center">
          <h2 className="text-2xl font-black uppercase tracking-tighter">Connexion</h2>
          <p className="text-blue-200 text-xs mt-2">Accédez à votre espace SparkUp.</p>
        </div>

        <form onSubmit={handleLogin} className="p-8 space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
            <input type="email" placeholder="Email" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1e2da7]" required />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
            <input type="password" placeholder="Mot de passe" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1e2da7]" required />
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