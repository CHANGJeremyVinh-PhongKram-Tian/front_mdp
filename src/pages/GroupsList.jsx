import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MessageSquare, Users, ChevronRight, Search, Plus, X, UserCheck } from 'lucide-react';

const GroupsList = () => {
  const [activeTab, setActiveTab] = useState('private'); // 'private' | 'groups'
  const [myFriends, setMyFriends] = useState([]);
  const [myGroups, setMyGroups] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  // Formulaire de création de groupe
  const [groupName, setGroupName] = useState('');
  const [selectedFriends, setSelectedFriends] = useState([]);

  useEffect(() => {
    const getPastDate = (daysAgo) => {
      const d = new Date();
      d.setDate(d.getDate() - daysAgo);
      return d.toISOString();
    };

    // Charger les amis
    const baseFriends = [
      { id: 1, name: "Killian", username: "@kiki.pt06200", defaultMsg: "Slt frérot, ouais je te prends les places pas de soucis", defaultTime: getPastDate(0), unread: 1, image: "https://i.pravatar.cc/150?u=killian1" },
      { id: 2, name: "Sarah", username: "@sarah.lyon", defaultMsg: "Nouvelle discussion...", defaultTime: getPastDate(1), unread: 0, image: "https://i.pravatar.cc/150?u=sarah" },
      { id: 3, name: "Hugo", username: "@hugo.boss", defaultMsg: "Nouvelle discussion...", defaultTime: getPastDate(4), unread: 0, image: "https://i.pravatar.cc/150?u=hugo" },
    ];

    const formatRelativeTime = (isoString) => {
      if (!isoString) return "";
      const date = new Date(isoString);
      const now = new Date();
      const diffMs = now - date;
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      if (diffDays === 0 && now.getDate() === date.getDate()) {
        return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
      } else if (diffDays === 1 || (diffDays === 0 && now.getDate() !== date.getDate())) {
        return "Hier";
      } else if (diffDays < 7) {
        return `${diffDays} jours`;
      } else if (diffDays < 30) {
        const weeks = Math.floor(diffDays / 7);
        return `${weeks} sem.`;
      } else {
        const months = Math.floor(diffDays / 30);
        return `${months} mois`;
      }
    };

    const updatedFriends = baseFriends.map(friend => {
      const saved = localStorage.getItem(`chat_messages_${friend.id}`);
      let lastMsg = friend.defaultMsg;
      let timestamp = friend.defaultTime;
      
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.length > 0) {
          lastMsg = parsed[parsed.length - 1].text;
          timestamp = parsed[parsed.length - 1].timestamp || friend.defaultTime;
        }
      } else if (friend.id === 1) {
        lastMsg = "Ceci est le billet pour : Soirée After School pour killian.";
      }
      
      return { ...friend, lastMsg, time: formatRelativeTime(timestamp) };
    });

    setMyFriends(updatedFriends);

    // Charger/Créer les groupes
    const savedGroups = localStorage.getItem('sparkup_groups');
    if (savedGroups) {
      setMyGroups(JSON.parse(savedGroups));
    } else {
      // Groupe par défaut correspondant fidèlement au mockup utilisateur (6 membres nommés Killian)
      const defaultGroup = [
        {
          id: 'group_1',
          name: "Groupe soirée After School",
          code: "AFTER-SCHOOL-2026",
          image: "https://i.pravatar.cc/150?u=after_school",
          lastMsg: "Killian a rejoint le groupe !",
          time: "10:30",
          unread: 0,
          members: [
            { id: 101, name: "Killian", username: "@kiki.pt06200", image: "https://i.pravatar.cc/150?u=killian1" },
            { id: 102, name: "Killian", username: "@kiki.pt06200", image: "https://i.pravatar.cc/150?u=killian2" },
            { id: 103, name: "Killian", username: "@kiki.pt06200", image: "https://i.pravatar.cc/150?u=killian3" },
            { id: 104, name: "Killian", username: "@kiki.pt06200", image: "https://i.pravatar.cc/150?u=killian4" },
            { id: 105, name: "Killian", username: "@kiki.pt06200", image: "https://i.pravatar.cc/150?u=killian5" },
            { id: 106, name: "Killian", username: "@kiki.pt06200", image: "https://i.pravatar.cc/150?u=killian6" },
          ]
        }
      ];
      localStorage.setItem('sparkup_groups', JSON.stringify(defaultGroup));
      setMyGroups(defaultGroup);
    }
  }, []);

  const handleCreateGroup = (e) => {
    e.preventDefault();
    if (!groupName.trim()) return;

    // Ajouter le créateur (nous-même) + les amis sélectionnés au groupe
    const groupMembers = [
      { id: 999, name: "Moi", username: "@moi", image: "https://i.pravatar.cc/150?u=moi" },
      ...selectedFriends.map(fId => {
        const friend = myFriends.find(f => f.id === fId);
        return { id: friend.id, name: friend.name, username: friend.username, image: friend.image };
      })
    ];

    const newGroup = {
      id: `group_${Date.now()}`,
      name: groupName.trim(),
      code: `INV-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      image: `https://i.pravatar.cc/150?u=${encodeURIComponent(groupName)}`,
      lastMsg: "Groupe créé ! Bienvenue.",
      time: "A l'instant",
      unread: 0,
      members: groupMembers
    };

    const updatedGroups = [newGroup, ...myGroups];
    localStorage.setItem('sparkup_groups', JSON.stringify(updatedGroups));
    setMyGroups(updatedGroups);

    // Initialiser le chat pour ce groupe
    const initialGroupChat = [
      {
        id: 1,
        text: `Groupe créé par Moi. Code d'invitation : ${newGroup.code}`,
        isSystem: true,
        timestamp: new Date().toISOString()
      }
    ];
    localStorage.setItem(`chat_messages_${newGroup.id}`, JSON.stringify(initialGroupChat));

    // Reset formulaire et modal
    setGroupName('');
    setSelectedFriends([]);
    setShowCreateModal(false);
    setActiveTab('groups');
  };

  const toggleSelectFriend = (friendId) => {
    if (selectedFriends.includes(friendId)) {
      setSelectedFriends(selectedFriends.filter(id => id !== friendId));
    } else {
      setSelectedFriends([...selectedFriends, friendId]);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mb-20 bg-gray-50 min-h-screen font-sans">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-[#9146ff] uppercase tracking-tighter">Messages</h1>
          <p className="text-gray-500 font-medium">Vos salons de discussion</p>
        </div>
        <div className="flex items-center gap-2">
          {activeTab === 'groups' && (
            <button 
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-[#9146ff] text-white font-bold text-xs rounded-full shadow-md hover:bg-[#7c3aed] hover:scale-105 transition-all duration-200"
            >
              <Plus size={14} /> Créer un groupe
            </button>
          )}
          <div className="bg-[#f3ebfc] p-3 rounded-2xl text-[#9146ff]">
            <MessageSquare size={28} />
          </div>
        </div>
      </div>

      {/* Onglets Privé / Groupes */}
      <div className="flex gap-3 mb-6 bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm">
        <button
          onClick={() => setActiveTab('private')}
          className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-200 ${
            activeTab === 'private'
              ? 'bg-[#9146ff] text-white shadow-sm'
              : 'text-gray-500 hover:bg-gray-50'
          }`}
        >
          Discussions privées
        </button>
        <button
          onClick={() => setActiveTab('groups')}
          className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-200 ${
            activeTab === 'groups'
              ? 'bg-[#9146ff] text-white shadow-sm'
              : 'text-gray-500 hover:bg-gray-50'
          }`}
        >
          Groupes
        </button>
      </div>

      {/* Barre de recherche locale */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input 
          type="text" 
          placeholder={activeTab === 'private' ? "Rechercher un ami..." : "Rechercher un groupe..."}
          className="w-full pl-12 pr-6 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-[#9146ff] outline-none transition-all"
        />
      </div>

      {/* Liste des conversations (Amis / Groupes) */}
      <div className="space-y-4">
        {activeTab === 'private' ? (
          myFriends.map((friend) => (
            <Link 
              key={friend.id} 
              to={`/chat/${friend.id}`}
              className="flex items-center gap-4 bg-white p-4 rounded-[2rem] border border-gray-50 shadow-sm hover:shadow-md hover:translate-x-1 transition-all group"
            >
              <div className="relative">
                <img src={friend.image} alt={friend.name} className="w-16 h-16 rounded-full object-cover shadow-sm" />
                {friend.unread > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#f06292] text-white text-[10px] font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white">
                    {friend.unread}
                  </span>
                )}
              </div>

              <div className="flex-grow min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-black text-gray-800 truncate text-base tracking-tight">{friend.name}</h3>
                  <span className={`text-[10px] font-bold ${friend.unread > 0 ? 'text-[#f06292]' : 'text-gray-400'}`}>
                    {friend.time}
                  </span>
                </div>
                <p className="text-xs text-[#9146ff] font-bold mb-1 tracking-widest">{friend.username}</p>
                <p className={`text-sm truncate ${friend.unread > 0 ? 'text-gray-800 font-semibold' : 'text-gray-500'}`}>
                  {friend.lastMsg}
                </p>
              </div>

              <ChevronRight size={20} className="text-gray-200 group-hover:text-[#9146ff] transition-colors" />
            </Link>
          ))
        ) : (
          myGroups.length === 0 ? (
            <div className="bg-white rounded-[2rem] p-12 text-center shadow-sm border border-gray-100">
              <Users className="mx-auto text-gray-300 mb-4" size={48} />
              <h3 className="font-extrabold text-gray-800 text-lg mb-2">Aucun groupe pour le moment</h3>
              <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
                Créez un groupe pour réserver des billets ensemble et discuter des soirées à venir !
              </p>
              <button 
                onClick={() => setShowCreateModal(true)}
                className="px-6 py-3 bg-[#9146ff] text-white font-bold rounded-2xl shadow-md hover:bg-[#7c3aed]"
              >
                Créer mon premier groupe
              </button>
            </div>
          ) : (
            myGroups.map((group) => (
              <Link 
                key={group.id} 
                to={`/chat/${group.id}`}
                className="flex items-center gap-4 bg-white p-4 rounded-[2rem] border border-gray-50 shadow-sm hover:shadow-md hover:translate-x-1 transition-all group"
              >
                <div className="relative">
                  <img src={group.image} alt={group.name} className="w-16 h-16 rounded-full object-cover shadow-sm bg-purple-100" />
                  {group.unread > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#f06292] text-white text-[10px] font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white">
                      {group.unread}
                    </span>
                  )}
                </div>

                <div className="flex-grow min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-black text-gray-800 truncate text-base tracking-tight">{group.name}</h3>
                    <span className={`text-[10px] font-bold ${group.unread > 0 ? 'text-[#f06292]' : 'text-gray-400'}`}>
                      {group.time}
                    </span>
                  </div>
                  <p className="text-xs text-[#9146ff] font-bold mb-1 tracking-widest uppercase flex items-center gap-1.5">
                    <Users size={12} /> {group.members.length} membres
                  </p>
                  <p className={`text-sm truncate ${group.unread > 0 ? 'text-gray-800 font-semibold' : 'text-gray-500'}`}>
                    {group.lastMsg}
                  </p>
                </div>

                <ChevronRight size={20} className="text-gray-200 group-hover:text-[#9146ff] transition-colors" />
              </Link>
            ))
          )
        )}
      </div>

      {/* MODAL DE CRÉATION DE GROUPE */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[9999]">
          <div className="bg-white rounded-[2rem] w-full max-w-md p-6 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setShowCreateModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-gray-50 p-2 rounded-full transition-colors"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-black text-gray-850 mb-2 tracking-tight">Créer un nouveau groupe</h2>
            <p className="text-gray-500 text-sm mb-6">Réunissez vos amis pour commander vos places ensemble.</p>

            <form onSubmit={handleCreateGroup} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-750 block">Nom du groupe</label>
                <input 
                  type="text" 
                  placeholder="Ex: Soirée After School" 
                  value={groupName}
                  onChange={e => setGroupName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#9146ff]"
                  required
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-755 block">Ajouter des amis (facultatif)</label>
                <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
                  {myFriends.map(friend => (
                    <button
                      key={friend.id}
                      type="button"
                      onClick={() => toggleSelectFriend(friend.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                        selectedFriends.includes(friend.id)
                          ? 'border-[#9146ff] bg-[#fdfaff]'
                          : 'border-gray-150 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img src={friend.image} alt="" className="w-8 h-8 rounded-full object-cover" />
                        <div>
                          <p className="font-extrabold text-sm text-gray-800">{friend.name}</p>
                          <p className="text-gray-400 text-xs">{friend.username}</p>
                        </div>
                      </div>
                      {selectedFriends.includes(friend.id) && (
                        <div className="bg-[#9146ff] text-white p-1 rounded-full">
                          <UserCheck size={14} />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-4 bg-[#9146ff] text-white font-black text-base rounded-xl shadow-lg hover:bg-[#7c3aed] transition-all"
              >
                Valider la création
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupsList;