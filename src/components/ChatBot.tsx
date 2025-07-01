import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Bot, User, ExternalLink, AlertCircle } from 'lucide-react';
import { ChatMessage, Game } from '../types/Game';
import { boardGames } from '../data/games';

interface ChatBotProps {
  isVisible: boolean;
  onClose: () => void;
  onGameSelect: (game: Game) => void;
}

const ChatBot: React.FC<ChatBotProps> = ({ isVisible, onClose, onGameSelect }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Hello! I'm your AI-powered Game Guru! I can help you find the perfect board game based on your preferences, group size, time constraints, and more. What kind of gaming experience are you looking for today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Updated API URL function for both local development and Vercel deployment
  const getApiUrl = () => {
    if (typeof window !== 'undefined') {
      // In production (Vercel), use the same domain
      if (window.location.hostname.includes('vercel.app') || 
          (!window.location.hostname.includes('localhost') && !window.location.hostname.includes('127.0.0.1'))) {
        return window.location.origin;
      }
      // For local development, Vite proxy will handle /api routes
      return ''; // Empty string means relative URL, Vite proxy will handle it
    }
    return '';
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findGamesByName = (text: string): Game[] => {
    const foundGames: Game[] = [];
    const usedGameIds = new Set<string>();
    
    // Look for exact game name matches (case insensitive)
    boardGames.forEach(game => {
      const gameName = game.name.toLowerCase();
      const textLower = text.toLowerCase();
      
      // Check for exact name match or if the game name appears as a complete word
      const nameRegex = new RegExp(`\\b${gameName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      
      if (nameRegex.test(textLower) && !usedGameIds.has(game.id)) {
        foundGames.push(game);
        usedGameIds.add(game.id);
      }
    });

    return foundGames;
  };

  const callBackendAPI = async (userMessage: string, conversationHistory: ChatMessage[]): Promise<string> => {
    try {
      const apiUrl = getApiUrl();
      const response = await fetch(`${apiUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory: conversationHistory.slice(-6).map(msg => ({
            role: msg.isUser ? 'user' : 'assistant',
            content: msg.text
          }))
        })
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error?.error || `Request failed with status ${response.status}`);
      }

      const data = await response.json();
      return data.response;
    } catch (err) {
      console.error('API error:', err);
      throw new Error('Sorry, something went wrong while contacting the assistant.');
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || isTyping) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputText;
    setInputText('');
    setIsTyping(true);
    setError(null);

    try {
      const aiResponse = await callBackendAPI(currentInput, messages);
      
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);

      // Find games mentioned in the AI response and add them as clickable cards
      const mentionedGames = findGamesByName(aiResponse);
      
      if (mentionedGames.length > 0) {
        // Add a follow-up message with game cards
        const gameCardsMessage: ChatMessage = {
          id: (Date.now() + 2).toString(),
          text: `Here ${mentionedGames.length === 1 ? 'is the game' : 'are the games'} I mentioned:`,
          isUser: false,
          timestamp: new Date(),
          recommendedGames: mentionedGames // Add the games to the message
        };
        
        setTimeout(() => {
          setMessages(prev => [...prev, gameCardsMessage]);
        }, 500);
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Something went wrong. Please try again.';
      setError(errorMessage);
      
      // Add fallback response
      const fallbackResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: "I'm having trouble connecting to my AI brain right now. Let me give you some popular recommendations while I recover:",
        isUser: false,
        timestamp: new Date(),
        recommendedGames: [
          boardGames.find(g => g.name.toLowerCase().includes('ticket to ride')),
          boardGames.find(g => g.name.toLowerCase().includes('azul')),
          boardGames.find(g => g.name.toLowerCase().includes('codenames'))
        ].filter(Boolean) as Game[]
      };
      setMessages(prev => [...prev, fallbackResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleGameClick = (game: Game) => {
    onGameSelect(game);
    onClose();
  };

  const clearError = () => setError(null);

  // Component for rendering game cards in chat
  const GameCard: React.FC<{ game: Game }> = ({ game }) => (
    <div 
      onClick={() => handleGameClick(game)}
      className="bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-lg p-3 cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-105"
    >
      <div className="flex items-start space-x-3">
        <img 
          src={game.image} 
          alt={game.name}
          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-amber-900 text-sm truncate">{game.name}</h4>
          <div className="flex items-center space-x-2 text-xs text-gray-600 mt-1">
            <span>{game.players} players</span>
            <span>•</span>
            <span>{game.playTime}</span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center space-x-1">
              <span className="text-yellow-500">★</span>
              <span className="text-xs text-gray-600">{game.rating}</span>
            </div>
            <button className="text-xs text-green-600 hover:text-green-700 font-medium flex items-center space-x-1">
              <span>View Details</span>
              <ExternalLink size={10} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end justify-end p-4">
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-2xl w-full max-w-md h-[600px] border-4 border-green-200 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-green-200 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bot size={20} />
            </div>
            <div>
              <h3 className="font-bold">AI Game Guru</h3>
              <p className="text-xs opacity-80">Powered by OpenAI</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {error && (
          <div className="mx-4 mt-2 p-3 bg-red-100 border border-red-300 rounded-lg flex items-start space-x-2">
            <AlertCircle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-red-700">{error}</p>
              <button
                onClick={clearError}
                className="text-xs text-red-600 hover:text-red-800 underline mt-1"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id}>
              <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start space-x-2 max-w-[85%] ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.isUser ? 'bg-blue-500' : 'bg-green-500'
                  }`}>
                    {message.isUser ? <User size={16} className="text-white" /> : <Bot size={16} className="text-white" />}
                  </div>
                  <div className={`p-3 rounded-xl ${
                    message.isUser 
                      ? 'bg-blue-500 text-white rounded-br-sm' 
                      : 'bg-white border-2 border-green-100 text-gray-800 rounded-bl-sm shadow-sm'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.text}</p>
                  </div>
                </div>
              </div>
              
              {/* Render game cards if this message has recommended games */}
              {message.recommendedGames && message.recommendedGames.length > 0 && (
                <div className="mt-3 ml-10 space-y-2">
                  {message.recommendedGames.map((game) => (
                    <GameCard key={game.id} game={game} />
                  ))}
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Bot size={16} className="text-white" />
                </div>
                <div className="bg-white border-2 border-green-100 p-3 rounded-xl rounded-bl-sm shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-green-200">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me about board games..."
              className="flex-1 p-3 border-2 border-green-200 rounded-lg focus:border-green-400 focus:outline-none bg-white/80 text-sm"
              disabled={isTyping}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isTyping}
              className="p-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white rounded-lg transition-colors"
            >
              <Send size={20} />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Powered by OpenAI • Be specific for better recommendations!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;