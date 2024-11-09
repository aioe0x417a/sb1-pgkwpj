import React from 'react';
import { Bot, User } from 'lucide-react';
import { type Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.type === 'bot';

  return (
    <div className={`flex gap-4 items-start ${isBot ? '' : 'flex-row-reverse'}`}>
      <div className={`flex-shrink-0 rounded-lg p-2 ${isBot ? 'bg-[#33CCFF]/10' : 'bg-[#33CCFF]'}`}>
        {isBot ? (
          <Bot className="w-6 h-6 text-[#33CCFF]" />
        ) : (
          <User className="w-6 h-6 text-[#2F2F2F]" />
        )}
      </div>
      <div
        className={`flex-1 rounded-2xl px-6 py-4 ${
          isBot
            ? 'bg-[#252525]/80 backdrop-blur-sm'
            : 'bg-[#33CCFF] text-[#2F2F2F]'
        } shadow-lg max-w-[80%]`}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
}

export default ChatMessage;