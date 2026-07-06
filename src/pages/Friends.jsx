import React, { useState, useEffect, useRef } from 'react';
import { Search, UserPlus, UserCheck, X, Users, UserMinus, ChevronRight } from 'lucide-react';

// --- Données fictives (à remplacer par un appel API) ---
const MOCK_USERS = [
  { id: 1, username: 'marie_dupont', name: 'Marie Dupont',     avatar: null, mutualFriends: 3, isFriend: false, requestSent: false },
  { id: 2, username: 'alex_martin', name: 'Alexandre Martin',  avatar: null, mutualFriends: 7, isFriend: true,  requestSent: false },
  { id: 3, username: 'sophia_l',    name: 'Sophia Laurent',    avatar: null, mutualFriends: 1, isFriend: false, requestSent: true  },
  { id: 4, username: 'julien_r',    name: 'Julien Renaud',     avatar: null, mutualFriends: 0, isFriend: false, requestSent: false },
  { id: 5, username: 'camille_b',   name: 'Camille Bernard',   avatar: null, mutualFriends: 5, isFriend: true,  requestSent: false },
  { id: 6, username: 'theo_v',      name: 'Théo Vidal',        avatar: null, mutualFriends: 2, isFriend: false, requestSent: false },
  { id: 7, username: 'lucie_m',     name: 'Lucie Moreau',      avatar: null, mutualFriends: 4, isFriend: false, requestSent: false },
  { id: 8, username: 'pierre_d',    name: 'Pierre Dubois',     avatar: null, mutualFriends: 0, isFriend: true,  requestSent: false },
];

// Génère les initiales et une couleur à partir du nom
const getAvatarInfo = (name) => {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  const colors = [
    ['#1e2da7', '#f06292'],
    ['#f06292', '#1e2da7'],
    ['#7c3aed', '#f472b6'],
    ['#0891b2', '#34d399'],
    ['#d97706', '#f472b6'],
  ];
  const hash = name.charCodeAt(0) % colors.length;
  return { initials, from: colors[hash][0], to: colors[hash][1] };
};

const Friends = () => {
  const [query, setQuery]           = useState('');
  const [users, setUsers]           = useState(MOCK_USERS);
  const [activeTab, setActiveTab]   = useState('discover'); // 'discover' | 'friends'
  const [showResults, setShowResults] = useState(false);
  const [focused, setFocused]       = useState(false);
  const inputRef = useRef(null);

  // Filtrage en temps réel
  const filtered = users.filter(u =>
    u.username.toLowerCase().includes(query.toLowerCase()) ||
    u.name.toLowerCase().includes(query.toLowerCase())
  );

  const friends   = users.filter(u => u.isFriend);
  const discover  = users.filter(u => !u.isFriend);

  // Afficher les résultats dès qu'on tape
  useEffect(() => {
    setShowResults(query.length > 0);
  }, [query]);

  const handleAddFriend = (id) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, requestSent: true } : u));
  };

  const handleRemoveFriend = (id) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, isFriend: false } : u));
  };

  const clearSearch = () => {
    setQuery('');
    setShowResults(false);
    inputRef.current?.focus();
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ===== HERO HEADER ===== */}
      <div
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1e2da7 0%, #7c3aed 60%, #f06292 100%)' }}
      >
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />
        <div className="relative max-w-2xl mx-auto px-4 pt-10 pb-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
            <Users size={14} /> Communauté SparkUp
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2">Trouve tes amis</h1>
          <p className="text-white/70 text-sm font-medium">Connecte-toi avec des participants qui partagent tes passions</p>
        </div>
      </div>

      {/* ===== BARRE DE RECHERCHE FLOTTANTE ===== */}
      <div className="max-w-2xl mx-auto px-4 -mt-8 relative z-10">
        <div className={`relative transition-all duration-300 ${focused ? 'scale-[1.02]' : 'scale-100'}`}>
          {/* Ombre glassmorphism */}
          <div className="absolute inset-0 rounded-2xl blur-xl opacity-30" style={{ background: 'linear-gradient(135deg, #1e2da7, #f06292)' }} />

          <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="flex items-center px-4 py-4 gap-3">
              <Search
                size={20}
                className="shrink-0 transition-colors duration-200"
                style={{ color: focused ? '#1e2da7' : '#9ca3af' }}
              />
              <input
                ref={inputRef}
                id="friends-search-input"
                type="text"
                placeholder="Rechercher un utilisateur..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setTimeout(() => setFocused(false), 150)}
                className="flex-1 outline-none text-base font-semibold text-gray-800 placeholder-gray-400 bg-transparent"
                autoComplete="off"
              />
              {query && (
                <button onClick={clearSearch} className="shrink-0 text-gray-400 hover:text-[#f06292] transition-colors">
                  <X size={18} />
                </button>
              )}
            </div>

            {/* ===== DROPDOWN RÉSULTATS ===== */}
            {showResults && (
              <div className="border-t border-gray-100 max-h-80 overflow-y-auto">
                {filtered.length === 0 ? (
                  <div className="py-8 text-center">
                    <div className="text-3xl mb-2">🔍</div>
                    <p className="text-gray-400 font-semibold text-sm">Aucun utilisateur trouvé</p>
                  </div>
                ) : (
                  filtered.map(user => (
                    <SearchResultRow
                      key={user.id}
                      user={user}
                      onAdd={handleAddFriend}
                      onRemove={handleRemoveFriend}
                    />
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ===== CONTENU PRINCIPAL ===== */}
      <div className="max-w-2xl mx-auto px-4 mt-8 pb-24">

        {/* Onglets */}
        <div className="flex gap-2 mb-6">
          {[
            { key: 'discover', label: 'Découvrir', count: discover.length },
            { key: 'friends',  label: 'Mes amis',  count: friends.length  },
          ].map(tab => (
            <button
              key={tab.key}
              id={`tab-${tab.key}`}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-200 ${
                activeTab === tab.key
                  ? 'text-white shadow-lg'
                  : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-200'
              }`}
              style={activeTab === tab.key ? { background: 'linear-gradient(135deg, #1e2da7, #7c3aed)' } : {}}
            >
              {tab.label}
              <span className={`text-xs px-2 py-0.5 rounded-full font-black ${
                activeTab === tab.key ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Liste */}
        <div className="space-y-3">
          {activeTab === 'discover' && discover.map(user => (
            <UserCard key={user.id} user={user} onAdd={handleAddFriend} onRemove={handleRemoveFriend} />
          ))}
          {activeTab === 'friends' && (
            friends.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-gray-100">
                <div className="text-4xl mb-3">👥</div>
                <p className="font-bold text-gray-600">Aucun ami pour l'instant</p>
                <p className="text-gray-400 text-sm mt-1">Utilise la recherche pour trouver des amis !</p>
              </div>
            ) : (
              friends.map(user => (
                <UserCard key={user.id} user={user} onAdd={handleAddFriend} onRemove={handleRemoveFriend} />
              ))
            )
          )}
        </div>
      </div>
    </div>
  );
};

/* ───────────────────────────────────────────
   Composant : ligne dans le dropdown
─────────────────────────────────────────── */
const SearchResultRow = ({ user, onAdd, onRemove }) => {
  const av = getAvatarInfo(user.name);
  return (
    <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer">
      {/* Avatar */}
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm shrink-0"
        style={{ background: `linear-gradient(135deg, ${av.from}, ${av.to})` }}
      >
        {av.initials}
      </div>

      {/* Infos */}
      <div className="flex-1 min-w-0">
        <p className="font-bold text-gray-800 text-sm truncate">{user.name}</p>
        <p className="text-gray-400 text-xs truncate">@{user.username}</p>
      </div>

      {/* Action */}
      {user.isFriend ? (
        <span className="text-xs font-bold text-[#1e2da7] bg-blue-50 px-3 py-1 rounded-full flex items-center gap-1">
          <UserCheck size={12} /> Ami
        </span>
      ) : user.requestSent ? (
        <span className="text-xs font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-full">Envoyé</span>
      ) : (
        <button
          id={`add-friend-search-${user.id}`}
          onClick={() => onAdd(user.id)}
          className="text-xs font-bold text-white px-3 py-1 rounded-full transition-all"
          style={{ background: 'linear-gradient(135deg, #1e2da7, #7c3aed)' }}
        >
          + Ajouter
        </button>
      )}

      <ChevronRight size={14} className="text-gray-300 shrink-0" />
    </div>
  );
};

/* ───────────────────────────────────────────
   Composant : carte utilisateur
─────────────────────────────────────────── */
const UserCard = ({ user, onAdd, onRemove }) => {
  const av = getAvatarInfo(user.name);
  return (
    <div
      id={`user-card-${user.id}`}
      className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
    >
      {/* Avatar */}
      <div
        className="relative w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-lg shrink-0"
        style={{ background: `linear-gradient(135deg, ${av.from}, ${av.to})` }}
      >
        {av.initials}
        {user.isFriend && (
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 border-2 border-white rounded-full flex items-center justify-center">
            <UserCheck size={10} className="text-white" />
          </div>
        )}
      </div>

      {/* Infos */}
      <div className="flex-1 min-w-0">
        <p className="font-black text-gray-800 truncate">{user.name}</p>
        <p className="text-gray-400 text-sm truncate">@{user.username}</p>
        {user.mutualFriends > 0 && (
          <p className="text-xs text-[#7c3aed] font-semibold mt-0.5">
            👥 {user.mutualFriends} ami{user.mutualFriends > 1 ? 's' : ''} en commun
          </p>
        )}
      </div>

      {/* Bouton action */}
      {user.isFriend ? (
        <button
          id={`remove-friend-${user.id}`}
          onClick={() => onRemove(user.id)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl border-2 border-gray-200 text-gray-500 hover:border-red-300 hover:text-red-400 font-bold text-sm transition-all duration-200"
        >
          <UserMinus size={15} />
          Retirer
        </button>
      ) : user.requestSent ? (
        <button
          disabled
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-100 text-gray-400 font-bold text-sm cursor-default"
        >
          <UserCheck size={15} />
          Envoyé
        </button>
      ) : (
        <button
          id={`add-friend-${user.id}`}
          onClick={() => onAdd(user.id)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-white font-bold text-sm hover:opacity-90 hover:scale-105 transition-all duration-200 shadow-md"
          style={{ background: 'linear-gradient(135deg, #1e2da7, #7c3aed)' }}
        >
          <UserPlus size={15} />
          Ajouter
        </button>
      )}
    </div>
  );
};

export default Friends;
