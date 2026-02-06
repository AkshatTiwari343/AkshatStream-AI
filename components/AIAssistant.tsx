
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from '../types';

export const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hello! I am your NovaStream AI Assistant. Ask me anything about videos, creators, or trending tech.' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: userMsg,
        config: {
          tools: [{ googleSearch: {} }],
          systemInstruction: "You are a helpful video streaming expert assistant. Provide concise, helpful answers about media, technology, and creators."
        },
      });

      const text = response.text || "I couldn't process that request.";
      const links = response.candidates?.[0]?.groundingMetadata?.groundingChunks
        ?.filter(chunk => chunk.web)
        .map(chunk => ({ title: chunk.web!.title, uri: chunk.web!.uri })) || [];

      setMessages(prev => [...prev, { role: 'model', text, links }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I'm having trouble connecting to my brain right now." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 md:bottom-8 right-6 w-14 h-14 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full shadow-2xl flex items-center justify-center z-50 transition-all active:scale-90"
      >
        <svg className={`w-7 h-7 transition-transform ${isOpen ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          )}
        </svg>
      </button>

      {isOpen && (
        <div className="fixed bottom-36 md:bottom-24 right-6 w-[calc(100vw-3rem)] md:w-96 h-[500px] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col z-50 overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          <div className="p-4 bg-indigo-600 flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
            </div>
            <h3 className="font-bold text-white">AI Backend Concierge</h3>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-200'
                }`}>
                  <p>{msg.text}</p>
                  {msg.links && msg.links.length > 0 && (
                    <div className="mt-3 pt-2 border-t border-slate-700">
                      <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Sources</p>
                      <div className="flex flex-wrap gap-2">
                        {msg.links.slice(0, 2).map((link, li) => (
                          <a 
                            key={li} 
                            href={link.uri} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[10px] bg-slate-900 text-indigo-400 px-2 py-1 rounded-md hover:text-white truncate max-w-full"
                          >
                            {link.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-800 p-3 rounded-2xl flex gap-1">
                  <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-75"></div>
                  <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-slate-800 bg-slate-900/50">
            <div className="flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask your assistant..."
                className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button 
                onClick={handleSend}
                className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
