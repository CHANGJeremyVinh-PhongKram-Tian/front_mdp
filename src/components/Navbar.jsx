import React from 'react';
import { Search, Compass, ShieldCheck, UserCircle, MessageSquare } from 'lucide-react'; // Ajout de MessageSquare
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn }) => {
  // 1. On garde les items de base visibles par tout le monde
  const navItems = [
    { label: 'Explorer', icon: <Compass size={24} />, path: '/' },
    { label: 'Recherche', icon: <Search size={24} />, path: '/search' },
    { label: 'Organisateur', icon: <ShieldCheck size={24} />, path: '/organizer/login' },
  ];

  // 2. On ajoute l'item "Messages" UNIQUEMENT si l'utilisateur est connecté
  if (isLoggedIn) {
    navItems.push({ label: 'Messages', icon: <MessageSquare size={24} />, path: '/groups' });
  }

  // 3. On gère dynamiquement le dernier bouton (Compte ou Auth)
  const authItem = isLoggedIn 
    ? { label: 'Compte', icon: <UserCircle size={24} />, path: '/account' }
    : { label: 'Connexion', icon: <UserCircle size={24} />, path: '/login' }; // Label raccourci pour le mobile

  const allItems = [...navItems, authItem];

  return (
    <>
      {/* --- VERSION BUREAU --- */}
      <nav className="hidden md:flex items-center justify-center px-10 py-4 bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="flex items-center justify-between w-full max-w-6xl">
          <Link to="/" className="font-black text-2xl tracking-tighter text-[#1e2da7]">
            SPARK<span className="text-[#f06292]">UP</span>
          </Link>
          
          <div className="flex justify-center gap-8 flex-1">
            {allItems.map((item, index) => (
              <Link 
                key={index} 
                to={item.path} 
                className="text-gray-600 hover:text-[#1e2da7] font-medium text-sm uppercase tracking-wide transition-colors whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}
          </div>
          {/* Ajustement de la marge pour centrer parfaitement si besoin */}
          <div className="w-[120px] hidden lg:block"></div>
        </div>
      </nav>

      {/* --- VERSION MOBILE --- */}
      {/* On réduit un peu la taille du texte pour que 5 icônes tiennent bien */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 h-16">
        <div className="flex justify-around items-center h-full w-full px-2">
          {allItems.map((item, index) => (
            <Link 
              key={index} 
              to={item.path} 
              className="flex flex-col items-center justify-center w-full text-gray-400 hover:text-[#1e2da7] transition-colors"
            >
              {React.cloneElement(item.icon, { size: 22 })} {/* Icônes légèrement plus petites pour le mobile */}
              <span className="text-[8px] mt-1 font-black uppercase text-center truncate w-full px-1">
                {item.label === 'Connexion' ? 'Profil' : item.label} 
              </span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navbar;