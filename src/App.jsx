import React from 'react'
import Navbar from './components/Navbar' // On importe ton fichier

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* On appelle la Navbar */}
      <Navbar />
    </div>
  )
}

export default App