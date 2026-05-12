import React from 'react';
import { Search, Compass, ShieldCheck, UserCircle } from 'lucide-react';

const Navbar = () => {
  const navItems = [
    { label: 'Explorer', icon: <Compass size={24} /> },
    { label: 'Recherche', icon: <Search size={24} /> },
    { label: 'Organisateur', icon: <ShieldCheck size={24} /> },
    { label: 'Compte', icon: <UserCircle size={24} /> },
  ];

  return (
    <>
      {/* --- VERSION BUREAU (Centrée en haut) --- */}
      <nav className="hidden md:flex items-center justify-center px-10 py-4 bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="flex items-center justify-between w-full max-w-6xl">
          {/* Logo à gauche */}
          <div className="font-black text-2xl tracking-tighter text-[#1e2da7]">
            SPARK<span className="text-[#f06292]">UP</span>
          </div>
          
          {/* Menu centré grâce à flex-1 et text-center */}
          <div className="flex justify-center gap-8 flex-1">
            {navItems.map((item, index) => (
              <button key={index} className="text-gray-600 hover:text-[#1e2da7] font-medium text-sm uppercase tracking-wide transition-colors">
                {item.label}
              </button>
            ))}
          </div>
          
          {/* On remet un bloc vide à droite pour que le menu reste bien au centre mort */}
          <div className="w-[120px] hidden lg:block"></div>
        </div>
      </nav>

      {/* --- VERSION MOBILE (Onglets centrés en bas) --- */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 h-16">
        <div className="flex justify-around items-center h-full max-w-md mx-auto">
          {navItems.map((item, index) => (
            <button key={index} className="flex flex-col items-center justify-center w-full text-gray-400 active:text-[#1e2da7]">
              {item.icon}
              <span className="text-[10px] mt-1 font-bold uppercase">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navbar;