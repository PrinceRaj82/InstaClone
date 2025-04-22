import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import useGetAllMessage from '@/hooks/useGetAllMessage';
import useGetRTM from '@/hooks/useGetRTM';

const Messages = () => {
  useGetRTM();
  useGetAllMessage();

  const { messages } = useSelector((store) => store.chat);
  const { user } = useSelector((store) => store.auth);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="flex flex-col min-h-full p-4 space-y-4 ">
        {messages?.map((msg) => (
          <div
            key={msg._id}
            className={`flex ${msg.senderId === user?._id ? 'justify-end' : 'justify-start '}`}
          >
            <div
              className={`p-3 rounded-3xl max-w-[70%] break-words  ${
                msg.senderId === user?._id
                  ? 'bg-purple-600 text-white'
                  : 'bg-zinc-800 text-white'
              }`}
            >
              {msg.message}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default Messages;
