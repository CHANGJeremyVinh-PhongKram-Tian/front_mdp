import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-[#1e2da7] p-8 text-white text-center">
          <h2 className="text-2xl font-black uppercase tracking-tighter">Créer un compte</h2>
          <p className="text-blue-200 text-xs mt-2">Rejoignez SparkUp pour organiser vos sorties.</p>
        </div>

        <form onSubmit={handleRegister} className="p-8 space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400" size={20} />
            <input type="text" placeholder="Nom complet" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1e2da7]" required />
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
            <input type="email" placeholder="Email" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1e2da7]" required />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
            <input type="password" placeholder="Mot de passe" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1e2da7]" required />
          </div>

          <button type="submit" className="w-full py-4 bg-[#1e2da7] text-white font-bold rounded-xl hover:bg-[#f06292] transition-all flex items-center justify-center gap-2">
            S'inscrire <ArrowRight size={18} />
          </button>

          <p className="text-center text-sm text-gray-500 mt-6">
            Déjà un compte ? <Link to="/login" className="text-[#1e2da7] font-bold">Se connecter</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;