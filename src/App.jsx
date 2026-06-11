import React, { useState, useEffect } from 'react';
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
import Settings from './pages/Settings';
import MentionsLegales from './pages/MentionsLegales';
import GroupsList from './pages/GroupsList';
import ChatView from './pages/ChatView';
import PaymentSuccess from './pages/PaymentSuccess';
import OrganizerAuth from './pages/OrganizerAuth';
import OrganizerDashboard from './pages/OrganizerDashboard';
import OrganizerRevenue from './pages/OrganizerRevenue';
import OrganizerProfile from './pages/OrganizerProfile';
import OrganizerTickets from './pages/OrganizerTickets';
import OrganizerEngagement from './pages/OrganizerEngagement';
import OrganizerEventDetail from './pages/OrganizerEventDetail';
import OrganizerCreateEvent from './pages/OrganizerCreateEvent';
import EventCreationSuccess from './pages/EventCreationSuccess';
import OrganizerSupport from './pages/OrganizerSupport'; 
import Friends from './pages/Friends';
import api from './utils/api';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOrganizer, setIsOrganizer] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get('/user');
        setUser(response.data);
        setIsLoggedIn(true);
        setIsOrganizer(!!response.data.organisateur);
      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem('auth_token');
        setUser(null);
        setIsLoggedIn(false);
        setIsOrganizer(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-t-[#1e2da7] border-r-transparent border-b-[#f06292] border-l-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 font-bold uppercase tracking-wider text-xs mt-4">Chargement de SparkUp...</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        {/* On passe l'état à la Navbar pour changer le texte du bouton */}
        <Navbar isLoggedIn={isLoggedIn} isOrganizer={isOrganizer}/>
        
        <main className="flex-grow pb-20 md:pb-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setIsOrganizer={setIsOrganizer} setUser={setUser} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/event/:id" element={<EventDetails />} />
            <Route path="/payment/:id" element={<Payment />} />
            <Route path="/my-tickets" element={<MyTickets />} />
            <Route path="/ticket-detail/:id" element={<TicketDetail />} />
            <Route path="/account" element={<Settings isLoggedIn={isLoggedIn} user={user} setUser={setUser} setIsLoggedIn={setIsLoggedIn} setIsOrganizer={setIsOrganizer} />} />
            <Route path="/mentions-legales" element={<MentionsLegales />} />
            <Route path="/messages" element={<GroupsList />} />
            <Route path="/chat/:id" element={<ChatView />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/organizer/login" element={<OrganizerAuth setIsLoggedIn={setIsLoggedIn} setIsOrganizer={setIsOrganizer} setUser={setUser} />} />
            <Route path="/organizer/dashboard" element={<OrganizerDashboard user={user} />} />
            <Route path="/organizer/stats/revenue" element={<OrganizerRevenue />} />
            <Route path="/organizer/stats/tickets" element={<OrganizerTickets />} />
            <Route path="/organizer/stats/engagement" element={<OrganizerEngagement />} />
            <Route path="/organizer/event/:id" element={<OrganizerEventDetail />} />
            <Route path="/organizer/create" element={<OrganizerCreateEvent />} />
            <Route path="/organizer/create-success" element={<EventCreationSuccess />} />
            <Route path="/organizer/support" element={<OrganizerSupport />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/organizer/profile" element={<OrganizerProfile user={user} setUser={setUser} setIsLoggedIn={setIsLoggedIn} setIsOrganizer={setIsOrganizer} />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;