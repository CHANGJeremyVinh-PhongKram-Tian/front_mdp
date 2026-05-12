import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Search from './pages/Search';
import Login from './pages/Login';
import Register from './pages/Register';
import EventDetails from './pages/EventDetails';
import Payment from './pages/Payment';
import MyTickets from './pages/MyTickets';
import TicketDetail from './pages/TicketDetail';

function App() {
  // État global de connexion (simulé)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        {/* On passe l'état à la Navbar pour changer le texte du bouton */}
        <Navbar isLoggedIn={isLoggedIn} />
        
        <main className="flex-grow pb-20 md:pb-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/event/:id" element={<EventDetails />} />
            <Route path="/payment/:id" element={<Payment />} />
            <Route path="/my-tickets" element={<MyTickets />} />
            <Route path="/ticket-detail/:id" element={<TicketDetail />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;