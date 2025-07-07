import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Send, Phone, Video, MoreHorizontal, ArrowLeft } from 'lucide-react';
import { sendMessage, createChat, setActiveChat } from '../features/chat/chatSlice';
import { useAuth } from '../contexts/AuthContext';

const Chat = () => {
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  const { activeChat, messages } = useSelector((state) => state.chat);
  const [newMessage, setNewMessage] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);
  const messagesEndRef = useRef(null);

  // Mock chat data for demonstration
  const mockChats = [
    {
      id: 'user1',
      name: 'Sarah Johnson',
      avatar: null,
      lastMessage: 'Hey! How are you doing?',
      lastMessageTime: '2 min ago',
      unread: 2,
      isOnline: true,
    },
    {
      id: 'user2',
      name: 'Emma Wilson',
      avatar: null,
      lastMessage: 'That sounds great!',
      lastMessageTime: '1 hour ago',
      unread: 0,
      isOnline: false,
    },
    {
      id: 'user3',
      name: 'Lisa Chen',
      avatar: null,
      lastMessage: 'Looking forward to meeting you',
      lastMessageTime: '3 hours ago',
      unread: 1,
      isOnline: true,
    },
  ];

  const mockMessages = [
    {
      id: 1,
      senderId: 'user1',
      text: 'Hi there! I saw your profile and thought we might have a lot in common.',
      timestamp: new Date(Date.now() - 3600000),
      read: true,
    },
    {
      id: 2,
      senderId: currentUser?.uid,
      text: 'Hey! Thanks for reaching out. I\'d love to get to know you better.',
      timestamp: new Date(Date.now() - 3000000),
      read: true,
    },
    {
      id: 3,
      senderId: 'user1',
      text: 'That\'s great! What do you like to do in your free time?',
      timestamp: new Date(Date.now() - 1800000),
      read: true,
    },
    {
      id: 4,
      senderId: currentUser?.uid,
      text: 'I love reading, hiking, and trying new restaurants. How about you?',
      timestamp: new Date(Date.now() - 900000),
      read: true,
    },
    {
      id: 5,
      senderId: 'user1',
      text: 'We definitely have similar interests! I\'m also into hiking and food adventures.',
      timestamp: new Date(Date.now() - 120000),
      read: false,
    },
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat) return;

    try {
      await dispatch(sendMessage({
        chatId: selectedChat.id,
        message: newMessage,
        senderId: currentUser.uid,
      }));
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
    dispatch(setActiveChat(chat.id));
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden" style={{ height: '600px' }}>
          <div className="flex h-full">
            {/* Chat List */}
            <div className={`${selectedChat ? 'hidden md:block' : 'block'} w-full md:w-1/3 border-r border-gray-200`}>
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Messages</h2>
              </div>
              <div className="overflow-y-auto h-full">
                {mockChats.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => handleChatSelect(chat)}
                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedChat?.id === chat.id ? 'bg-pink-50 border-pink-200' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {chat.avatar ? (
                            <img src={chat.avatar} alt={chat.name} className="w-full h-full rounded-full object-cover" />
                          ) : (
                            chat.name.charAt(0)
                          )}
                        </div>
                        {chat.isOnline && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {chat.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {chat.lastMessageTime}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-600 truncate">
                            {chat.lastMessage}
                          </p>
                          {chat.unread > 0 && (
                            <span className="inline-flex items-center justify-center w-5 h-5 bg-pink-500 text-white text-xs rounded-full">
                              {chat.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Window */}
            <div className={`${selectedChat ? 'block' : 'hidden md:block'} flex-1 flex flex-col`}>
              {selectedChat ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setSelectedChat(null)}
                        className="md:hidden text-gray-500 hover:text-gray-700"
                      >
                        <ArrowLeft className="h-5 w-5" />
                      </button>
                      <div className="relative">
                        <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {selectedChat.avatar ? (
                            <img src={selectedChat.avatar} alt={selectedChat.name} className="w-full h-full rounded-full object-cover" />
                          ) : (
                            selectedChat.name.charAt(0)
                          )}
                        </div>
                        {selectedChat.isOnline && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{selectedChat.name}</h3>
                        <p className="text-sm text-gray-600">
                          {selectedChat.isOnline ? 'Online' : 'Last seen 2 hours ago'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
                        <Phone className="h-5 w-5" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
                        <Video className="h-5 w-5" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {mockMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.senderId === currentUser?.uid ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.senderId === currentUser?.uid
                              ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <p className={`text-xs mt-1 ${
                            message.senderId === currentUser?.uid ? 'text-pink-100' : 'text-gray-500'
                          }`}>
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200">
                    <form onSubmit={handleSendMessage} className="flex space-x-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                      />
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-2 rounded-lg hover:shadow-lg transition-all duration-200"
                      >
                        <Send className="h-5 w-5" />
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <div className="text-6xl mb-4">💬</div>
                    <p className="text-lg">Select a chat to start messaging</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;