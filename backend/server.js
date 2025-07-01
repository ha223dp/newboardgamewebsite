const express = require('express');
const cors = require('cors');
require('dotenv').config();

console.log('🔍 Debug Info:');
console.log('- OpenAI API Key exists:', !!process.env.OPENAI_API_KEY);
console.log('- Key starts with sk-:', process.env.OPENAI_API_KEY?.startsWith('sk-'));
console.log('- Working directory:', process.cwd());

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS middleware — configure it BEFORE any routes
app.use(cors({
  origin: '*', // or use your frontend URL for stricter security (e.g., 'http://localhost:5173')
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// ✅ Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Backend is running!', 
    timestamp: new Date().toISOString(),
    port: PORT 
  });
});

// ✅ Chat endpoint
app.post('/api/chat', async (req, res) => {
  console.log('Chat request received:', { 
    hasMessage: !!req.body.message, 
    historyLength: req.body.conversationHistory?.length || 0 
  });

  try {
    const { message, conversationHistory } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!process.env.OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY not found in environment variables');
      return res.status(500).json({ error: 'OpenAI API key not configured' });
    }

    const systemPrompt = `You are an expert board game recommendation assistant. 
    
Your role is to:
1. Recommend games based on user preferences (player count, time, complexity, theme, etc.)
2. Explain WHY each game fits their criteria
3. Provide helpful details about gameplay, mechanics, and what makes each game special
4. Be conversational and enthusiastic about board games
5. When recommending games, mention their exact names clearly so users can learn more

Be helpful, knowledgeable, and passionate about board games!`;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...(conversationHistory || []),
      { role: 'user', content: message }
    ];

    console.log('Calling OpenAI API...');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages,
        max_tokens: 500,
        temperature: 0.7,
        presence_penalty: 0.1,
        frequency_penalty: 0.1,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('OpenAI API error:', response.status, errorData);
      throw new Error(`OpenAI API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    console.log('OpenAI response received successfully');
    
    res.json({ response: data.choices[0].message.content });
  } catch (error) {
    console.error('Backend API Error:', error);
    res.status(500).json({ error: error.message || 'Failed to get AI response' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend server running on http://localhost:${PORT}`);
  console.log(`✅ Health check: http://localhost:${PORT}/api/health`);
  console.log(`✅ Chat endpoint: http://localhost:${PORT}/api/chat`);
});
