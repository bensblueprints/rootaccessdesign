# Root Access Website

A cyberpunk-themed product agency website with Discord integration, audio players, and interactive features.

![Root Access Screenshot](screenshot.png)

## Features

- **Cyberpunk Design**: Modern, neon-themed visuals with futuristic elements
- **Audio Descriptions**: Each project includes an audio description player
- **Discord Chat Integration**: Real-time communication with Discord
- **Mobile Responsive**: Optimized for all device sizes

## Quick Start

1. Clone the repository:
```bash
git clone https://github.com/yourusername/root-access-site.git
cd root-access-site
```

2. Set up the Discord webhook:
   - Create a webhook in your Discord server
   - Create a `.env` file with your webhook URL:
   ```
   DISCORD_WEBHOOK_URL=your_webhook_url_here
   ALLOWED_ORIGIN=http://localhost:8000
   PORT=3000
   ```

3. Install dependencies:
```bash
npm install
```

4. Start the Discord proxy server:
```bash
node discord-proxy.js
```

5. In a separate terminal, serve the website:
```bash
python -m http.server 8000
```

6. Open your browser to [http://localhost:8000](http://localhost:8000)

## Project Structure

```
root-access-site/
├── css/               # Stylesheet files
│   └── style.css
├── js/                # JavaScript files
│   └── script.js
├── assets/            # Images and media files (create this directory)
├── .env               # Environment variables (create this file)
├── .gitignore         # Git ignore file
├── discord-api-docs.md # API documentation
├── discord-proxy.js   # Node.js proxy server for Discord integration
├── index.html         # Main HTML file
├── package.json       # Node.js dependencies
└── README.md          # This file
```

## Discord Integration

This project includes a real-time chat that connects your website visitors with your Discord server. See [discord-api-docs.md](discord-api-docs.md) for complete documentation on the Discord webhook integration.

## Development

### Audio Player

The audio player component allows embedding audio descriptions for each project:

```html
<div class="audio-player">
  <button class="play-button"><i class="fas fa-play"></i><i class="fas fa-pause"></i></button>
  <div class="progress-container">
    <div class="progress-bar"></div>
  </div>
  <audio src="URL_TO_AUDIO_FILE" preload="metadata"></audio>
</div>
```

### Discord Chat

The Discord chat component connects your website to a Discord channel:

```html
<div class="discord-chat-interface">
  <div class="chat-header">
    <i class="fab fa-discord"></i>
    <h4>Root Access Chat</h4>
    <div class="chat-status online"><span></span> Connected</div>
  </div>
  <div class="chat-messages" id="chatMessages">
    <!-- Messages appear here -->
  </div>
  <form id="chatForm" class="chat-input">
    <input type="text" id="userName" placeholder="Your name" required>
    <textarea id="messageContent" placeholder="Type your message here..." required></textarea>
    <button type="submit" class="send-button">
      <i class="fas fa-paper-plane"></i>
    </button>
  </form>
</div>
```

## Production Deployment

For production deployment:

1. Host the Discord proxy server on a service like Heroku, Vercel, or DigitalOcean
2. Update the webhook URL in the frontend code to point to your hosted server
3. Implement proper rate limiting and security measures
4. Set up appropriate CORS headers for your production domain

## License

MIT License

## Credits

- Font Awesome for icons
- JetBrains Mono font
- Discord for webhook integration 

## Security Notes

⚠️ **Important**: Never commit your Discord webhook URL or any API keys to your repository. Always use environment variables stored in:
- A local `.env` file (already in `.gitignore`)
- Your hosting platform's environment variables section (Netlify, Vercel, etc.)

## After every push you will comit to git and netlify
