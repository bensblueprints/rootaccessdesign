// Simple Node.js Discord webhook proxy server
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Your Discord webhook URL (keep this secret!)
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

// Middleware
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || 'http://localhost:8000' // Only allow your website
}));
app.use(bodyParser.json());

// Endpoint for sending messages to Discord
app.post('/api/send-to-discord', async (req, res) => {
  try {
    const { name, message, avatar } = req.body;
    
    if (!name || !message) {
      return res.status(400).json({ error: 'Name and message are required' });
    }
    
    // Format according to Discord webhook API specifications
    // https://discord.com/developers/docs/resources/webhook#execute-webhook
    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: `${name} (via website)`,
        avatar_url: avatar || 'https://rootaccess.design/assets/default-avatar.png', // Default avatar
        content: message,
        // You can also use embeds for richer messages
        embeds: [{
          title: 'Message from Website',
          description: message,
          color: 65535, // Cyan color in decimal
          timestamp: new Date().toISOString(),
          footer: {
            text: 'Root Access Website Chat',
            icon_url: 'https://rootaccess.design/assets/logo-small.png' // Optional logo
          },
          author: {
            name: name,
            icon_url: avatar || 'https://rootaccess.design/assets/default-avatar.png'
          }
        }],
        // Set flags if needed
        // flags: 4, // SUPPRESS_EMBEDS = 4
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.text();
      console.error('Discord API error:', errorData);
      return res.status(response.status).json({ error: 'Failed to send message to Discord' });
    }
    
    // Check if wait parameter was used and we got a message back
    let responseData = {};
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      responseData = await response.json();
    }
    
    console.log(`Message sent to Discord: "${message}" from ${name}`);
    return res.status(200).json({ 
      success: true,
      message: responseData
    });
    
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Add an endpoint to get webhook info (without exposing token)
app.get('/api/webhook-info', (req, res) => {
  return res.json({
    connected: !!DISCORD_WEBHOOK_URL,
    status: DISCORD_WEBHOOK_URL ? 'connected' : 'not_configured'
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Discord proxy server running on port ${PORT}`);
  if (!DISCORD_WEBHOOK_URL) {
    console.warn('WARNING: DISCORD_WEBHOOK_URL is not set in .env file');
  }
}); 