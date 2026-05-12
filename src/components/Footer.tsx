import React from 'react';
// On utilise 'Music' à la place de 'Music2' et 'Share' à la place de 'Share2'
import { Music, Share, Globe } from 'lucide-react'; 

const Footer = () => {
  return (
    <footer className="bg-[#1e2da7] text-white pt-10 pb-24 md:pb-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Mission SparkUp */}
        <div>
          <h2 className="font-black text-xl tracking-tighter uppercase mb-4">
            Spark<span className="text-[#f06292]">Up</span> 
          </h2>
          <p className="text-sm text-blue-100">
            L'étincelle qui déclenche vos expériences collectives.
          </p>
        </div>

        {/* Réseaux Sociaux avec icônes sûres */}
        <div>
          <h3 className="font-bold mb-4 uppercase text-xs tracking-widest text-blue-200">Réseaux</h3>
          <div className="flex flex-col gap-2 text-sm">
            <a href="https://www.instagram.com/sparkupevents69" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-[#f0da50]">
              <Share size={18} /> Instagram
            </a>
            <a href="https://www.linkedin.com/in/spark-up-events-b857983b0/" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-[#f0da50]">
              <Globe size={18} /> LinkedIn
            </a>
            <a href="https://www.tiktok.com/@sparkup.events" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-[#f0da50]">
              <Music size={18} /> TikTok
            </a>
          </div>
        </div>

        {/* Légal & RGPD [cite: 451, 482] */}
        <div>
          <h3 className="font-bold mb-4 uppercase text-xs tracking-widest text-blue-200">Légal</h3>
          <ul className="space-y-2 text-sm text-blue-100">
            <li><button className="hover:text-[#f0da50]">Confidentialité (RGPD)</button></li>
            <li className="pt-2 text-[10px] opacity-70">
              © 2026 SparkUp Events - MDS Lyon
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;