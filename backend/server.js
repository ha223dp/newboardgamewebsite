const express = require('express');
const cors = require('cors');
require('dotenv').config();

console.log('🔍 Debug Info:');
console.log('- OpenAI API Key exists:', !!process.env.OPENAI_API_KEY);
console.log('- Key starts with sk-:', process.env.OPENAI_API_KEY?.startsWith('sk-'));
console.log('- Key length:', process.env.OPENAI_API_KEY?.length || 0);
console.log('- Working directory:', process.cwd());

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS middleware — configure it BEFORE any routes
app.use(cors({
  origin: [
    'http://localhost:3000', 
    'http://localhost:5173', 
    'http://localhost:5174',
    /^https:\/\/.*\.vercel\.app$/, // Allow all Vercel preview deployments
    'https://boardgamewebsite.vercel.app/' // Replace with your actual Vercel domain
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  if (req.method === 'POST') {
    console.log('Request body keys:', Object.keys(req.body || {}));
  }
  next();
});

app.use(express.json());

// ✅ Root endpoint for testing
app.get('/', (req, res) => {
  res.json({ 
    message: 'Board Game Chatbot Backend is running!',
    endpoints: [
      'GET /api/health',
      'POST /api/chat'
    ]
  });
});

// ✅ Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Backend is running!', 
    timestamp: new Date().toISOString(),
    port: PORT,
    openaiConfigured: !!process.env.OPENAI_API_KEY
  });
});

// ✅ Chat endpoint with enhanced error handling
app.post('/api/chat', async (req, res) => {
  console.log('📨 Chat request received:', { 
    hasMessage: !!req.body.message, 
    messageLength: req.body.message?.length || 0,
    historyLength: req.body.conversationHistory?.length || 0,
    headers: {
      'content-type': req.headers['content-type'],
      'origin': req.headers.origin
    }
  });

  try {
    const { message, conversationHistory } = req.body;

    // Validate input
    if (!message || typeof message !== 'string' || !message.trim()) {
      console.error('❌ Invalid message received:', message);
      return res.status(400).json({ error: 'Valid message is required' });
    }

    // Check API key
    if (!process.env.OPENAI_API_KEY) {
      console.error('❌ OPENAI_API_KEY not found in environment variables');
      return res.status(500).json({ error: 'OpenAI API key not configured. Please check your .env file.' });
    }

    if (!process.env.OPENAI_API_KEY.startsWith('sk-')) {
      console.error('❌ Invalid OpenAI API key format');
      return res.status(500).json({ error: 'Invalid OpenAI API key format' });
    }

    const systemPrompt = `You are an expert board game recommendation assistant for a web application. 

Your role is to:
1. Recommend games based on user preferences (player count, time, complexity, theme, etc.)
2. Explain WHY each game fits their criteria
3. Provide helpful details about gameplay, mechanics, and what makes each game special
4. Be conversational and enthusiastic about board games
5. When recommending games, mention their exact names clearly so users can learn more
6. Keep responses concise but informative (aim for 2-4 sentences per game)

Available games in the database include popular titles like:
- Ticket to Ride, Azul, Codenames, Splendor, King of Tokyo
- Catan, Pandemic, Wingspan, Terraforming Mars
- And many more modern and classic board games

Be helpful, knowledgeable, and passionate about board games!`;

    // Prepare conversation history
    const validHistory = Array.isArray(conversationHistory) ? 
      conversationHistory.filter(msg => msg && msg.role && msg.content) : [];

    const messages = [
      { role: 'system', content: systemPrompt },
      ...validHistory.slice(-10), // Keep last 10 messages to avoid token limits
      { role: 'user', content: message.trim() }
    ];

    console.log('🤖 Calling OpenAI API with', messages.length, 'messages...');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages,
        max_tokens: 800,
        temperature: 0.7,
        presence_penalty: 0.1,
        frequency_penalty: 0.1,
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('❌ OpenAI API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });

      // Handle specific error types
      if (response.status === 401) {
        return res.status(500).json({ error: 'Invalid OpenAI API key. Please check your configuration.' });
      } else if (response.status === 429) {
        return res.status(500).json({ error: 'OpenAI API rate limit exceeded. Please try again in a moment.' });
      } else if (response.status === 500) {
        return res.status(500).json({ error: 'OpenAI service is temporarily unavailable. Please try again.' });
      }

      throw new Error(`OpenAI API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('❌ Invalid OpenAI response structure:', data);
      throw new Error('Invalid response from OpenAI API');
    }

    const aiResponse = data.choices[0].message.content;
    console.log('✅ OpenAI response received successfully, length:', aiResponse.length);
    
    res.json({ 
      response: aiResponse,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Backend API Error:', {
      name: error.name,
      message: error.message,
      stack: error.stack?.split('\n')[0] // Just the first line of stack
    });

    if (error.name === 'AbortError') {
      return res.status(500).json({ error: 'Request timeout. Please try again.' });
    }

    if (error.message.includes('fetch')) {
      return res.status(500).json({ error: 'Network error connecting to OpenAI. Please check your internet connection.' });
    }

    res.status(500).json({ 
      error: error.message || 'Failed to get AI response. Please try again.',
      timestamp: new Date().toISOString()
    });
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Handle 404s
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(PORT, () => {
  console.log(`✅ Backend server running on http://localhost:${PORT}`);
  console.log(`✅ Health check: http://localhost:${PORT}/api/health`);
  console.log(`✅ Chat endpoint: http://localhost:${PORT}/api/chat`);
  console.log(`✅ OpenAI configured: ${!!process.env.OPENAI_API_KEY}`);
  
  if (!process.env.OPENAI_API_KEY) {
    console.log('⚠️  WARNING: OPENAI_API_KEY not found. Please create a .env file with your API key.');
  }
});