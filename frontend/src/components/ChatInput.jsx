import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ChatInputProps {
  textMessage: string;
  setTextMessage: (message: string) => void;
  sendMessage: () => void;
}

const ChatInput = ({ textMessage, setTextMessage, sendMessage }: ChatInputProps) => {
  return (
    <div className="flex items-center gap-2 p-4 border-t border-zinc-800">
      <Input
        value={textMessage}
        onChange={(e) => setTextMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400"
      />
      <Button 
        onClick={sendMessage}
        className="bg-purple-600 hover:bg-purple-700 text-white"
      >
        Send
      </Button>
    </div>
  );
};

export default ChatInput;