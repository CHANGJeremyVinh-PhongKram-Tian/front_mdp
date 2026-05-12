import React from 'react';
import { Search, Compass, ShieldCheck, UserCircle } from 'lucide-react';
import { Link } from 'react-router-dom'; // Important pour la redirection

const Navbar = () => {
  const navItems = [
    { label: 'Explorer', icon: <Compass size={24} />, path: '/' },
    { label: 'Recherche', icon: <Search size={24} />, path: '/search' }, // On définit le chemin
    { label: 'Organisateur', icon: <ShieldCheck size={24} />, path: '/organizer' },
    { label: 'Compte', icon: <UserCircle size={24} />, path: '/account' },
  ];

  return (
    <>
      {/* --- VERSION BUREAU --- */}
      <nav className="hidden md:flex items-center justify-center px-10 py-4 bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="flex items-center justify-between w-full max-w-6xl">
          <Link to="/" className="font-black text-2xl tracking-tighter text-[#1e2da7]">
            SPARK<span className="text-[#f06292]">UP</span>
          </Link>
          
          <div className="flex justify-center gap-8 flex-1">
            {navItems.map((item, index) => (
              <Link 
                key={index} 
                to={item.path} 
                className="text-gray-600 hover:text-[#1e2da7] font-medium text-sm uppercase tracking-wide transition-colors"
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
        <div className="flex justify-around items-center h-full max-w-md mx-auto">
          {navItems.map((item, index) => (
            <Link 
              key={index} 
              to={item.path} 
              className="flex flex-col items-center justify-center w-full text-gray-400 hover:text-[#1e2da7] transition-colors"
            >
              {item.icon}
              <span className="text-[10px] mt-1 font-bold uppercase">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navbar;