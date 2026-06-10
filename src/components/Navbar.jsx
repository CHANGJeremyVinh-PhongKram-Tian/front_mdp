import React from 'react';
import { Search, Compass, ShieldCheck, UserCircle, MessageSquare, LayoutDashboard, Users } from 'lucide-react'; 
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn, isOrganizer }) => {
  // 1. Items de base
  const navItems = [
    { label: 'Explorer', icon: <Compass size={24} />, path: '/' },
    { label: 'Recherche', icon: <Search size={24} />, path: '/search' },
  ];

  // 2. Gestion de l'item "Organisateur" ou "Dashboard"
  // Si connecté en tant que Pro, on remplace "Organisateur" par "Dashboard"
  if (isOrganizer && isLoggedIn) {
    navItems.push({ label: 'Dashboard', icon: <LayoutDashboard size={24} />, path: '/organizer/dashboard' });
  } else {
    navItems.push({ label: 'Organisateur', icon: <ShieldCheck size={24} />, path: '/organizer/login' });
  }

  // 3. Items "Messages" et "Amis" (Client ou Pro connecté)
  if (isLoggedIn) {
    navItems.push({ label: 'Messages', icon: <MessageSquare size={24} />, path: '/groups' });
    navItems.push({ label: 'Amis', icon: <Users size={24} />, path: '/friends' });
  }

  // 4. Bouton Compte dynamique
  // Si isOrganizer est vrai, on va vers le profil pro, sinon vers le profil client
  let authPath = '/login';
  let authLabel = 'Connexion';

  if (isLoggedIn) {
    authLabel = 'Compte';
    authPath = isOrganizer ? '/organizer/profile' : '/account';
  }

  const authItem = { label: authLabel, icon: <UserCircle size={24} />, path: authPath };
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
          <div className="w-[120px] hidden lg:block"></div>
        </div>
      </nav>

      {/* --- VERSION MOBILE --- */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 h-16">
        <div className="flex justify-around items-center h-full w-full px-2">
          {allItems.map((item, index) => (
            <Link 
              key={index} 
              to={item.path} 
              className="flex flex-col items-center justify-center w-full text-gray-400 hover:text-[#1e2da7] transition-colors"
            >
              {React.cloneElement(item.icon, { size: 22 })}
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