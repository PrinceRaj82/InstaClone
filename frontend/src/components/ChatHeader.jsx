
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ChatHeaderProps {
  selectedUser: {
    profilePicture?: string;
    username?: string;
  };
}

const ChatHeader = ({ selectedUser }: ChatHeaderProps) => {
  return (
    <div className="flex items-center gap-3 p-4 border-b border-zinc-800">
      <Avatar>
        <AvatarImage src={selectedUser?.profilePicture} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="font-semibold text-white">{selectedUser?.username}</span>
        <span className="text-sm text-zinc-400">Active now</span>
      </div>
    </div>
  );
};

export default ChatHeader;