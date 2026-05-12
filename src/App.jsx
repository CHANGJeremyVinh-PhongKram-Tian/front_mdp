import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer' // N'oublie pas d'importer ton nouveau footer

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* 1. Barre de navigation en haut (ou bas sur mobile) */}
      <Navbar />

      {/* 2. Zone de contenu principal qui pousse le footer vers le bas */}
      <main className="flex-grow">
        {/* Ici viendront tes futures pages (Accueil, Recherche, etc.) */}
        <section className="p-10 text-center">
          <h1 className="text-3xl font-black text-[#1e2da7]">
            Bienvenue sur Spark<span className="text-[#f06292]">Up</span>
          </h1>
          <p className="mt-4 text-gray-600">Prêt pour votre prochaine expérience collective ?</p>
        </section>
      </main>

      {/* 3. Footer avec tes liens réseaux et RGPD */}
      <Footer />
    </div>
  )
}

export default App