import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Rocket } from 'lucide-react';

import EmptyState from './components/EmptyState';
import MessageBubble from './components/MessageBubble';
import ChatInput from './components/ChatInput';
import TypingIndicator from './components/TypingIndicator';
import { generateBotResponse } from './services/api';

function App() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (text) => {
    // Add user message
    const userMsg = { id: Date.now().toString(), text, isBot: false };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      // Simulate API call
      const botResponse = await generateBotResponse(text);

      // Add bot message
      setMessages(prev => [
        ...prev,
        { id: (Date.now() + 1).toString(), text: botResponse, isBot: true }
      ]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [
        ...prev,
        { id: (Date.now() + 1).toString(), text: "Transmission failed. The communication relay is currently down.", isBot: true }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-screen px-4 py-6 md:py-12 overflow-hidden bg-space-gradient text-gray-100">

      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cosmic-glow/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="flex flex-col w-full h-full max-w-4xl max-h-[90vh] glass-panel rounded-3xl overflow-hidden relative z-10 mx-auto shadow-2xl ring-1 ring-white/10">

        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/20 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cosmic-glow/20">
              <Rocket className="text-cosmic-glow" size={20} />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                Cosmic Companion
              </h1>
              <p className="text-xs text-green-400 flex items-center gap-1.5 opacity-90">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                Systems Operational
              </p>
            </div>
          </div>
        </header>

        {/* Chat Area */}
        <div className="flex-1 p-4 overflow-y-auto md:p-6 scroll-smooth">
          {messages.length === 0 ? (
            <EmptyState onSuggestionClick={handleSendMessage} />
          ) : (
            <div className="flex flex-col max-w-3xl mx-auto w-full">
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <MessageBubble key={msg.id} message={msg.text} isBot={msg.isBot} />
                ))}
              </AnimatePresence>

              <AnimatePresence>
                {isTyping && <TypingIndicator />}
              </AnimatePresence>

              <div ref={messagesEndRef} className="h-4" />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-black/30 border-t border-white/5 backdrop-blur-md">
          <div className="max-w-3xl mx-auto">
            <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
