import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Bot, User, ExternalLink, AlertCircle, RefreshCw } from 'lucide-react';
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
  const [isBackendOnline, setIsBackendOnline] = useState<boolean | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const API_BASE_URL = 'http://localhost:5000';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Check backend connectivity when component mounts
  useEffect(() => {
    if (isVisible) {
      checkBackendHealth();
    }
  }, [isVisible]);

  const checkBackendHealth = async () => {
    try {
      console.log('🔍 Checking backend health...');
      const response = await fetch(`${API_BASE_URL}/api/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Backend health check passed:', data);
        setIsBackendOnline(true);
        setError(null);
      } else {
        throw new Error(`Backend returned status ${response.status}`);
      }
    } catch (err) {
      console.error('❌ Backend health check failed:', err);
      setIsBackendOnline(false);
      setError('Cannot connect to backend server. Make sure it\'s running on localhost:5000');
    }
  };

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
    console.log('🚀 Calling backend API...');
    console.log('- Message:', userMessage.substring(0, 50) + '...');
    console.log('- History length:', conversationHistory.length);
    console.log('- API URL:', `${API_BASE_URL}/api/chat`);

    try {
      const requestBody = {
        message: userMessage,
        conversationHistory: conversationHistory.slice(-6).map(msg => ({
          role: msg.isUser ? 'user' : 'assistant',
          content: msg.text
        }))
      };

      console.log('📤 Request body:', JSON.stringify(requestBody, null, 2));

      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      console.log('📥 Response status:', response.status);
      console.log('📥 Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ API Error Response:', errorText);
        
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { error: errorText };
        }

        // Handle specific error cases
        if (response.status === 500 && errorData.error?.includes('API key')) {
          throw new Error('OpenAI API key is not configured correctly. Please check your backend setup.');
        } else if (response.status === 500 && errorData.error?.includes('rate limit')) {
          throw new Error('API rate limit exceeded. Please wait a moment and try again.');
        } else if (response.status === 400) {
          throw new Error('Invalid request format. Please try rephrasing your message.');
        }

        throw new Error(errorData?.error || `Server error: ${response.status}`);
      }

      const responseText = await response.text();
      console.log('📥 Raw response:', responseText.substring(0, 200) + '...');

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('❌ JSON parse error:', parseError);
        throw new Error('Invalid response format from server');
      }

      if (!data.response) {
        console.error('❌ Missing response field:', data);
        throw new Error('Invalid response structure from server');
      }

      console.log('✅ API call successful');
      return data.response;

    } catch (err) {
      console.error('❌ API call failed:', err);
      
      if (err instanceof TypeError && err.message.includes('fetch')) {
        throw new Error('Cannot connect to backend server. Please make sure it\'s running on localhost:5000');
      }
      
      throw err;
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || isTyping) return;

    // Check backend connectivity first
    if (isBackendOnline === false) {
      setError('Backend server is not running. Please start the server and try again.');
      return;
    }

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
          recommendedGames: mentionedGames
        };
        
        setTimeout(() => {
          setMessages(prev => [...prev, gameCardsMessage]);
        }, 500);
      }

      // Update backend status on successful call
      if (isBackendOnline !== true) {
        setIsBackendOnline(true);
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Something went wrong. Please try again.';
      console.error('💥 Message handling error:', errorMessage);
      setError(errorMessage);
      
      // Update backend status if it's a connectivity issue
      if (errorMessage.includes('Cannot connect to backend')) {
        setIsBackendOnline(false);
      }
      
      // Add fallback response for certain errors
      if (errorMessage.includes('API key') || errorMessage.includes('backend')) {
        const fallbackResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: "I'm having trouble connecting to my AI brain right now. Let me give you some popular recommendations while we work on fixing this:",
          isUser: false,
          timestamp: new Date(),
          recommendedGames: [
            boardGames.find(g => g.name.toLowerCase().includes('ticket to ride')),
            boardGames.find(g => g.name.toLowerCase().includes('azul')),
            boardGames.find(g => g.name.toLowerCase().includes('codenames'))
          ].filter(Boolean) as Game[]
        };
        setMessages(prev => [...prev, fallbackResponse]);
      }
    } finally {
      setIsTyping(false);
    }
  };

  const handleGameClick = (game: Game) => {
    onGameSelect(game);
    onClose();
  };

  const clearError = () => setError(null);

  const handleRetryConnection = () => {
    setError(null);
    setIsBackendOnline(null);
    checkBackendHealth();
  };

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
              <div className="flex items-center space-x-2">
                <p className="text-xs opacity-80">Powered by OpenAI</p>
                {isBackendOnline !== null && (
                  <div className={`w-2 h-2 rounded-full ${isBackendOnline ? 'bg-green-400' : 'bg-red-400'}`} 
                       title={isBackendOnline ? 'Connected' : 'Disconnected'} />
                )}
              </div>
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
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={clearError}
                  className="text-xs text-red-600 hover:text-red-800 underline"
                >
                  Dismiss
                </button>
                {error.includes('backend') && (
                  <button
                    onClick={handleRetryConnection}
                    className="text-xs text-blue-600 hover:text-blue-800 underline flex items-center space-x-1"
                  >
                    <RefreshCw size={10} />
                    <span>Retry</span>
                  </button>
                )}
              </div>
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
              disabled={isTyping || isBackendOnline === false}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isTyping || isBackendOnline === false}
              className="p-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white rounded-lg transition-colors"
            >
              <Send size={20} />
            </button>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-gray-500">
              Powered by OpenAI • Be specific for better recommendations!
            </p>
            {isBackendOnline === false && (
              <p className="text-xs text-red-500">Backend offline</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;