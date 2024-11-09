import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Sparkles } from 'lucide-react';
import ChatMessage from './components/ChatMessage';
import { type Message } from './types';

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm AIOE Papaya. How can I assist you today?",
      type: 'bot'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      type: 'user'
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response (replace with actual N8N integration)
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm processing your request. This is a placeholder response that would normally come from the N8N AI agent.",
        type: 'bot'
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="min-h-screen bg-[#2F2F2F] text-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-[#252525] border-b border-[#33CCFF]/10 p-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Bot className="w-8 h-8 text-[#33CCFF]" />
            <h1 className="text-xl font-semibold">AIOE Papaya</h1>
          </div>
          <div className="flex items-center gap-2 bg-[#33CCFF]/10 px-3 py-1 rounded-full">
            <Sparkles className="w-4 h-4 text-[#33CCFF]" />
            <span className="text-sm text-[#33CCFF]">AI Agent</span>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <div className="flex-1 overflow-hidden bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center bg-fixed">
        <div className="h-full overflow-y-auto backdrop-blur-xl backdrop-brightness-[0.2] px-4">
          <div className="max-w-4xl mx-auto py-8 space-y-6">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 text-[#33CCFF] animate-pulse">
                <Bot className="w-5 h-5" />
                <span>AIOE Papaya is thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="bg-[#252525] border-t border-[#33CCFF]/10 p-4">
        <div className="max-w-4xl mx-auto flex gap-4">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Send a message..."
              className="w-full bg-[#2F2F2F] text-gray-100 rounded-xl px-4 py-3 pr-12 resize-none h-[52px] focus:outline-none focus:ring-2 focus:ring-[#33CCFF]/50 placeholder-gray-500"
              rows={1}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-[#33CCFF] text-[#2F2F2F] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:bg-[#66DDFF] focus:outline-none focus:ring-2 focus:ring-[#33CCFF]/50"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;