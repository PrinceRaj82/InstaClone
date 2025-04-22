import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { setSelectedUser } from '@/redux/authSlice'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { MessageCircle } from 'lucide-react'
import Messages from './Messages'
import axios from 'axios'
import { setMessages } from '@/redux/chatSlice'

const ChatPage = () => {
    const [textMessage, setTextMessage] = useState("")
    const { user, suggestedUsers, selectedUser } = useSelector(store => store.auth)
    const { onlineUsers, messages } = useSelector(store => store.chat)
    const dispatch = useDispatch()

    const sendMessageHandler = async (receiverId) => {
        try {
            const res = await axios.post(
                `http://localhost:8000/api/v1/message/send/${receiverId}`,
                { textMessage },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )
            if (res.data.success) {
                dispatch(setMessages([...messages, res.data.newMessage]))
                setTextMessage("")
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        return () => {
            dispatch(setSelectedUser(null))
        }
    }, [])

    return (
        <div className="grid md:grid-cols-[350px,1fr] h-screen bg-black">
            {/* Left Sidebar */}
            <div className="border-r border-zinc-800">
                <div className="p-4 border-b border-zinc-800">
                    <h2 className="text-xl font-semibold text-white">{user?.username}</h2>
                </div>
                <div className="overflow-y-auto h-[calc(100vh-73px)]">
                    {suggestedUsers.map((suggestedUser) => {
                        const isOnline = onlineUsers.includes(suggestedUser?._id)
                        return (
                            <div
                                key={suggestedUser?._id}
                                onClick={() => dispatch(setSelectedUser(suggestedUser))}
                                className="flex items-center gap-3 p-4 hover:bg-zinc-900 cursor-pointer border-b border-zinc-800"
                            >
                                <div className="relative">
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage src={suggestedUser?.profilePicture} />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    {isOnline && (
                                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-black"></span>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <p className="text-white font-medium">{suggestedUser?.username}</p>
                                    <p className="text-zinc-400 text-sm">
                                        {isOnline ? 'Active now' : 'Offline'}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Chat Area */}
            {selectedUser ? (
                <div className="flex flex-col h-full">
                    {/* Chat Header */}
                    <div className="flex items-center gap-3 p-4 border-b border-zinc-800">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={selectedUser?.profilePicture} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="font-semibold text-white">{selectedUser?.username}</h3>
                            <p className="text-sm text-zinc-400">Active now</p>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-hidden">
                        <Messages selectedUser={selectedUser} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 border-t border-zinc-800">
                        <div className="flex gap-2">
                            <Input
                                value={textMessage}
                                onChange={(e) => setTextMessage(e.target.value)}
                                placeholder="Message..."
                                className="flex-1 bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-400"
                            />
                            <Button
                                onClick={() => sendMessageHandler(selectedUser?._id)}
                                className="bg-purple-600 hover:bg-purple-700 text-white"
                            >
                                Send
                            </Button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-4">
                    <MessageCircle className="h-16 w-16 text-zinc-600 mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Your Messages</h3>
                    <p className="text-zinc-400">Send private photos and messages to a friend</p>
                </div>
            )}
        </div>
    )
}

export default ChatPage
