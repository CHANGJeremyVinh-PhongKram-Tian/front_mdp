import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Camera, Mic, Plus, Calendar, ShieldCheck, Users } from 'lucide-react';

const ChatView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const bottomRef = useRef(null);
  const isGroup = id.startsWith('group_');

  // 1. Charger les données du contact ou du groupe
  const getChatDetails = () => {
    if (isGroup) {
      const savedGroups = localStorage.getItem('sparkup_groups');
      if (savedGroups) {
        const groups = JSON.parse(savedGroups);
        const group = groups.find(g => g.id === id);
        if (group) return { name: group.name, subtitle: `${group.members.length} membres`, avatar: group.image, code: group.code, members: group.members };
      }
      return { 
        name: "Groupe soirée After School", 
        subtitle: "6 membres", 
        avatar: "https://i.pravatar.cc/150?u=after_school", 
        code: "AFTER-SCHOOL-2026",
        members: [
          { id: 101, name: "Killian", username: "@kiki.pt06200", image: "https://i.pravatar.cc/150?u=killian1" },
          { id: 102, name: "Killian", username: "@kiki.pt06200", image: "https://i.pravatar.cc/150?u=killian2" }
        ]
      };
    } else {
      if (id === '2') return { name: "Sarah", subtitle: "@sarah.lyon", avatar: "https://i.pravatar.cc/150?u=sarah" };
      if (id === '3') return { name: "Hugo", subtitle: "@hugo.boss", avatar: "https://i.pravatar.cc/150?u=hugo" };
      return { name: "Killian", subtitle: "@kiki.pt06200", avatar: "https://i.pravatar.cc/150?u=killian" };
    }
  };

  const chatInfo = getChatDetails();

  // 2. Messages initiaux
  const getInitialMessages = () => {
    const getPastDate = (daysAgo) => {
      const d = new Date();
      d.setDate(d.getDate() - daysAgo);
      return d.toISOString();
    };

    if (isGroup) {
      return [
        {
          id: 1,
          text: `Groupe créé. Code d'invitation : ${chatInfo.code}`,
          isSystem: true,
          timestamp: getPastDate(2)
        },
        {
          id: 2,
          text: "Slt tout le monde ! Vous êtes chauds pour la soirée After School ?",
          isMe: false,
          senderName: "Killian",
          avatar: "https://i.pravatar.cc/150?u=killian1",
          timestamp: getPastDate(1)
        },
        {
          id: 3,
          text: "Grave ! Moi il me faut une prévente",
          isMe: false,
          senderName: "Killian",
          avatar: "https://i.pravatar.cc/150?u=killian2",
          timestamp: getPastDate(1)
        },
        {
          id: 4,
          text: "Je vais nous prendre les places via le paiement de groupe !",
          isMe: true,
          senderName: "Moi",
          avatar: "https://i.pravatar.cc/150?u=moi",
          timestamp: getPastDate(0)
        }
      ];
    } else {
      return [
        { 
          id: 1, 
          text: "Slt frérot, ouais je te prends les places pas", 
          isMe: false, 
          avatar: chatInfo.avatar,
          timestamp: getPastDate(1)
        },
        { 
          id: 2, 
          text: "Slt frérot, ouais je te prends les places pas de soucis", 
          isMe: true,
          timestamp: getPastDate(1)
        },
        { 
          id: 3, 
          text: "Ceci est le billet pour : Soirée After School pour killian.", 
          isTicket: true, 
          isMe: true,
          timestamp: getPastDate(0)
        }
      ];
    }
  };

  // État local des messages
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem(`chat_messages_${id}`);
    if (saved) {
      return JSON.parse(saved);
    }
    return getInitialMessages();
  });

  const [inputText, setInputText] = useState("");

  // Sauvegarde et scroll
  useEffect(() => {
    localStorage.setItem(`chat_messages_${id}`, JSON.stringify(messages));
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, id]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    
    let isMe = true;
    let text = inputText.trim();
    let avatar = null;
    let senderName = "Moi";

    // Simulation de réception de message
    if (text.startsWith("/killian ")) {
      isMe = false;
      text = text.replace("/killian ", "");
      avatar = "https://i.pravatar.cc/150?u=killian1";
      senderName = "Killian";
    }

    const newMessage = {
      id: Date.now(),
      text,
      isMe,
      senderName,
      avatar: isMe ? null : (avatar || chatInfo.avatar),
      timestamp: new Date().toISOString()
    };

    setMessages([...messages, newMessage]);
    setInputText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-gradient-to-b from-[#f3ebfc] via-[#f9f8ff] to-[#fcf0cd] relative overflow-hidden font-sans">
      
      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 relative z-50 bg-white/40 backdrop-blur-md border-b border-gray-100">
        <Link to="/messages" className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 flex items-center justify-center">
          <ArrowLeft size={20} className="text-black font-bold" />
        </Link>
        <div className="flex items-center gap-2 flex-grow justify-center -ml-8">
          <img src={chatInfo.avatar} alt="Avatar" className="w-9 h-9 rounded-full object-cover border border-gray-200" />
          <div className="flex flex-col items-start leading-tight">
            <span className="font-bold text-sm text-black flex items-center gap-1">
              {chatInfo.name} <span className="text-gray-400 text-xs">{'>'}</span>
            </span>
            <span className="text-[10px] text-gray-500 font-semibold">{chatInfo.subtitle}</span>
          </div>
        </div>
      </div>

      {/* Hero Profile Area */}
      <div className="flex flex-col items-center justify-center mt-6 mb-4 z-10">
        <img 
          src={chatInfo.avatar} 
          alt="Avatar Grand" 
          className="w-24 h-24 rounded-full object-cover shadow-lg border-2 border-white bg-purple-100"
        />
        <h2 className="font-extrabold text-xl mt-3 text-gray-800 text-center px-4">{chatInfo.name}</h2>
        <p className="text-xs text-gray-400 font-semibold mt-1">
          {isGroup ? `Code d'invitation : ${chatInfo.code}` : chatInfo.subtitle}
        </p>
      </div>

      {/* Messages Area */}
      <div className="flex-grow overflow-y-auto px-4 space-y-4 pb-28 z-10 scrollbar-hide">
        {messages.map((msg) => {
          // Message système
          if (msg.isSystem) {
            return (
              <div key={msg.id} className="flex justify-center my-2">
                <span className="bg-gray-200/70 backdrop-blur-sm text-gray-600 text-[11px] font-bold px-4 py-1.5 rounded-full shadow-sm border border-gray-100">
                  {msg.text}
                </span>
              </div>
            );
          }

          // Message d'achat groupé
          if (msg.isGroupPaymentNotice) {
            return (
              <div key={msg.id} className="flex justify-center my-3">
                <div className="bg-white rounded-2xl p-4 shadow-md border-t-4 border-[#9146ff] text-sm flex flex-col items-center max-w-[90%]">
                  <div className="bg-[#f3ebfc] text-[#9146ff] p-2 rounded-full mb-2">
                    <Users size={20} />
                  </div>
                  <p className="text-gray-800 font-bold text-center mb-1 text-xs">ACHAT DE GROUPE CONFIRMÉ</p>
                  <p className="text-gray-600 text-center text-xs">{msg.text}</p>
                </div>
              </div>
            );
          }

          return (
            <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'} items-end gap-2`}>
              
              {!msg.isMe && (
                <img 
                  src={msg.avatar || "https://i.pravatar.cc/150?u=default"} 
                  alt="" 
                  className="w-8 h-8 rounded-full object-cover shadow-sm bg-purple-100" 
                />
              )}

              {/* Bubble Rendering */}
              <div className={`max-w-[75%] flex flex-col`}>
                
                {/* Afficher le nom de l'expéditeur dans un groupe */}
                {isGroup && !msg.isMe && (
                  <span className="text-[10px] text-gray-500 font-bold ml-2 mb-0.5">
                    {msg.senderName}
                  </span>
                )}
                
                {!msg.isTicket ? (
                  <div 
                    className={`px-4 py-3 text-sm font-medium shadow-sm 
                      ${msg.isMe 
                        ? 'bg-white text-gray-800 rounded-2xl rounded-br-sm border border-gray-100' 
                        : 'bg-[#9146ff] text-white rounded-2xl rounded-bl-sm'
                      }
                    `}
                  >
                    {msg.text}
                  </div>
                ) : (
                  /* Widget de Billet */
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-sm flex flex-col items-center">
                    <p className="text-gray-800 font-medium mb-3">{msg.text}</p>
                    
                    <div className="w-full rounded-xl p-4 border border-gray-100 flex flex-col items-center shadow-sm">
                      <h3 className="font-bold text-xs mb-3 text-center uppercase tracking-tight text-gray-800">
                        LUTHER - Lyon - Transbordeur
                      </h3>
                      
                      <img 
                        src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Ticket-Luther-Lyon" 
                        alt="QR Code" 
                        className="w-32 h-32 mb-1" 
                      />
                      
                      <p className="text-[10px] text-gray-400 mb-4 tracking-wider">
                        42389014713514 - 31,99 €
                      </p>
                      
                      <div className="w-full flex justify-between items-center text-[10px] text-gray-600 font-semibold border-t pt-2 border-gray-100">
                        <span>ven 4 déc.</span>
                        <span>20:00 - 22:30</span>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Bottom Input Bar */}
      <div className="absolute bottom-0 inset-x-0 bg-transparent px-4 py-4 pb-8 z-20">
        <div className="bg-white rounded-full p-2 flex items-center gap-3 shadow-lg border border-gray-100">
          
          <button className="bg-[#9146ff] p-2.5 rounded-full text-white shadow-md flex items-center justify-center shrink-0">
            <Camera size={20} />
          </button>
          
          <input 
            type="text" 
            placeholder="Message..." 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400" 
          />
          
          <button className="text-gray-400 hover:text-gray-600 p-1 shrink-0 mr-2">
            <Mic size={22} className="w-5 h-5" />
          </button>
          
          <button className="text-gray-400 hover:text-gray-600 p-1 shrink-0 mr-1">
            <Plus size={22} className="w-5 h-5" />
          </button>

        </div>
      </div>

      {/* iOS Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-black rounded-full z-30 opacity-80" />
      
    </div>
  );
};

export default ChatView;