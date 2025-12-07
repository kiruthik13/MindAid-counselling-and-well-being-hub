/**
 * Premium Chat Page
 * Secure messaging interface with sidebar and chat bubbles
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Phone, Video, MoreVertical, Search, Paperclip, Smile } from 'lucide-react';
import { DashboardLayout } from '../layouts';
import { mockCounsellors, mockChatThreads, mockMessages } from '../utils/mockData';
import { useAuth } from '../hooks';
import { format } from 'date-fns';

export const Chat = () => {
    const { user } = useAuth();
    const [activeThreadId, setActiveThreadId] = useState(mockChatThreads[0]?.id);
    const [newMessage, setNewMessage] = useState('');

    const activeThread = mockChatThreads.find((t) => t.id === activeThreadId);
    const activeCounsellor = mockCounsellors.find((c) => c.id === activeThread?.participants.find(p => p !== user?.id));
    const messages = mockMessages.filter((m) => m.threadId === activeThreadId);

    const handleSend = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;
        // Mock send logic would go here
        setNewMessage('');
    };

    return (
        <DashboardLayout>
            <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden h-[calc(100vh-140px)] flex">
                {/* Sidebar */}
                <div className="w-80 border-r border-gray-200/50 flex flex-col bg-gradient-to-b from-gray-50/80 to-white/80 backdrop-blur-sm">
                    <div className="p-4 border-b border-gray-200">
                        <h2 className="text-xl font-bold mb-4">Messages</h2>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search conversations..."
                                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none text-sm"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {mockChatThreads.map((thread) => {
                            const otherUserId = thread.participants.find((p) => p !== user?.id);
                            const otherUser = mockCounsellors.find((c) => c.id === otherUserId);
                            const isActive = thread.id === activeThreadId;

                            return (
                                <motion.div
                                    key={thread.id}
                                    whileHover={{ backgroundColor: isActive ? '' : 'rgba(0,0,0,0.02)' }}
                                    onClick={() => setActiveThreadId(thread.id)}
                                    className={`p-4 cursor-pointer transition-colors border-b border-gray-100 ${isActive ? 'bg-white border-l-4 border-l-primary-600 shadow-sm' : 'border-l-4 border-l-transparent'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <img
                                                src={otherUser?.avatar}
                                                alt={otherUser?.name}
                                                className="w-12 h-12 rounded-full object-cover"
                                            />
                                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-baseline mb-1">
                                                <h3 className={`font-semibold truncate ${isActive ? 'text-primary-900' : 'text-gray-900'}`}>
                                                    {otherUser?.name}
                                                </h3>
                                                <span className="text-xs text-gray-400">10:30 AM</span>
                                            </div>
                                            <p className={`text-sm truncate ${isActive ? 'text-gray-600' : 'text-gray-500'}`}>
                                                {thread.lastMessage}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col bg-white">
                    {/* Header */}
                    <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-white/80 backdrop-blur-sm z-10">
                        <div className="flex items-center gap-3">
                            <img
                                src={activeCounsellor?.avatar}
                                alt={activeCounsellor?.name}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                                <h3 className="font-bold text-gray-900">{activeCounsellor?.name}</h3>
                                <p className="text-xs text-green-600 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Online
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors">
                                <Phone className="w-5 h-5" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors">
                                <Video className="w-5 h-5" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors">
                                <MoreVertical className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/30">
                        {messages.map((msg) => {
                            const isMe = msg.senderId === user?.id;
                            return (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[70%] p-4 rounded-2xl shadow-sm ${isMe
                                                ? 'bg-primary-600 text-white rounded-tr-none'
                                                : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                                            }`}
                                    >
                                        <p className="text-sm leading-relaxed">{msg.content}</p>
                                        <p
                                            className={`text-[10px] mt-1 text-right ${isMe ? 'text-primary-100' : 'text-gray-400'
                                                }`}
                                        >
                                            {format(new Date(msg.timestamp), 'h:mm a')}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-gray-200 bg-white">
                        <form onSubmit={handleSend} className="flex items-center gap-2">
                            <button type="button" className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                                <Paperclip className="w-5 h-5" />
                            </button>
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Type your message..."
                                    className="w-full pl-4 pr-10 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                                />
                                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                    <Smile className="w-5 h-5" />
                                </button>
                            </div>
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                disabled={!newMessage.trim()}
                                className="p-3 bg-primary-600 text-white rounded-xl shadow-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:shadow-none"
                            >
                                <Send className="w-5 h-5" />
                            </motion.button>
                        </form>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};
