import React, { useState } from 'react';
import { Send, Server, Users, Wifi, Clock, User } from 'lucide-react';

export default function MessagingSystem() {
  const [activeTab, setActiveTab] = useState('client');
  const [serverAddresses, setServerAddresses] = useState('');
  const [message, setMessage] = useState('');
  const [sentMessages, setSentMessages] = useState([]);
  const [receivedMessages, setReceivedMessages] = useState([]);

  const handleSendMessage = () => {
    if (!serverAddresses.trim() || !message.trim()) {
      alert('Inserisci almeno un indirizzo server e un messaggio!');
      return;
    }

    const addresses = serverAddresses.split(/[,\s]+/).filter(addr => addr.trim());
    const timestamp = new Date().toLocaleString('it-IT');

    addresses.forEach(addr => {
      const newMessage = {
        id: Date.now() + Math.random(),
        to: addr.trim(),
        content: message,
        timestamp: timestamp,
        status: 'inviato'
      };
      setSentMessages(prev => [newMessage, ...prev]);

      // Simula ricezione sul server
      setTimeout(() => {
        setReceivedMessages(prev => [{
          id: Date.now() + Math.random(),
          from: 'Client',
          content: message,
          timestamp: new Date().toLocaleString('it-IT'),
          serverAddr: addr.trim()
        }, ...prev]);
      }, 500);
    });

    setMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Wifi className="w-12 h-12 text-cyan-400 animate-pulse" />
            <h1 className="text-5xl font-bold text-white">Sistema di Comunicazione</h1>
          </div>
          <p className="text-cyan-200 text-lg">Piattaforma di messaggistica distribuita</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('client')}
            className={`flex-1 py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
              activeTab === 'client'
                ? 'bg-white text-purple-900 shadow-2xl scale-105'
                : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm'
            }`}
          >
            <Users className="w-6 h-6" />
            Client - Invia Messaggi
          </button>
          <button
            onClick={() => setActiveTab('server')}
            className={`flex-1 py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
              activeTab === 'server'
                ? 'bg-white text-purple-900 shadow-2xl scale-105'
                : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm'
            }`}
          >
            <Server className="w-6 h-6" />
            Server - Ricevi Messaggi
          </button>
        </div>

        {/* Client Tab */}
        {activeTab === 'client' && (
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Send className="w-7 h-7 text-cyan-400" />
                Componi Messaggio
              </h2>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-cyan-200 font-semibold mb-2 text-lg">
                    Indirizzi Server Destinatari
                  </label>
                  <input
                    type="text"
                    value={serverAddresses}
                    onChange={(e) => setServerAddresses(e.target.value)}
                    placeholder="es. 192.168.4.12, 192.168.4.15, 192.168.4.18"
                    className="w-full px-5 py-4 rounded-xl bg-white/20 border-2 border-white/30 text-white placeholder-cyan-300/60 focus:outline-none focus:border-cyan-400 focus:bg-white/30 transition-all text-lg backdrop-blur-sm"
                  />
                  <p className="text-cyan-300/80 text-sm mt-2">Separa gli indirizzi con virgole o spazi</p>
                </div>

                <div>
                  <label className="block text-cyan-200 font-semibold mb-2 text-lg">
                    Messaggio
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Scrivi il tuo messaggio qui..."
                    rows="8"
                    className="w-full px-5 py-4 rounded-xl bg-white/20 border-2 border-white/30 text-white placeholder-cyan-300/60 focus:outline-none focus:border-cyan-400 focus:bg-white/30 transition-all text-lg backdrop-blur-sm resize-none"
                  />
                </div>

                <button
                  onClick={handleSendMessage}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-4 rounded-xl font-bold text-xl hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 flex items-center justify-center gap-3"
                >
                  <Send className="w-6 h-6" />
                  Invia Messaggio
                </button>
              </div>
            </div>

            {/* Sent Messages History */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6">Messaggi Inviati</h3>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {sentMessages.length === 0 ? (
                  <p className="text-cyan-300/70 text-center py-8 text-lg">Nessun messaggio inviato ancora</p>
                ) : (
                  sentMessages.map(msg => (
                    <div key={msg.id} className="bg-white/20 backdrop-blur-sm rounded-2xl p-5 border border-white/30 hover:bg-white/30 transition-all">
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-cyan-400 font-semibold text-lg">→ {msg.to}</span>
                        <div className="flex items-center gap-2 text-cyan-300 text-sm">
                          <Clock className="w-4 h-4" />
                          {msg.timestamp}
                        </div>
                      </div>
                      <p className="text-white whitespace-pre-wrap">{msg.content}</p>
                      <span className="inline-block mt-3 px-3 py-1 bg-green-500/30 text-green-200 rounded-full text-sm font-semibold">
                        {msg.status}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Server Tab */}
        {activeTab === 'server' && (
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Server className="w-7 h-7 text-cyan-400" />
              Server in Ascolto - Messaggi Ricevuti
            </h2>
            
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {receivedMessages.length === 0 ? (
                <div className="text-center py-16">
                  <Wifi className="w-20 h-20 text-cyan-400/50 mx-auto mb-4 animate-pulse" />
                  <p className="text-cyan-300/70 text-lg">In attesa di messaggi...</p>
                </div>
              ) : (
                receivedMessages.map(msg => (
                  <div key={msg.id} className="bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/30 hover:border-cyan-400/50 transition-all shadow-lg">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <User className="w-6 h-6 text-cyan-400" />
                        <span className="text-cyan-400 font-bold text-lg">Da: {msg.from}</span>
                      </div>
                      <div className="flex items-center gap-2 text-cyan-300 text-sm">
                        <Clock className="w-4 h-4" />
                        {msg.timestamp}
                      </div>
                    </div>
                    <div className="mb-3">
                      <span className="text-cyan-300/80 text-sm">Server: {msg.serverAddr}</span>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                      <p className="text-white whitespace-pre-wrap text-lg">{msg.content}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}