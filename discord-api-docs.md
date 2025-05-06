# Root Access Discord Integration Documentation

This document outlines how the Root Access website integrates with Discord using webhooks, including the API structure and implementation details.

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Setup Instructions](#setup-instructions)
4. [Discord Webhook API Reference](#discord-webhook-api-reference)
5. [Implementation Details](#implementation-details)
6. [Troubleshooting](#troubleshooting)

## Overview

The Root Access website includes a chat interface that allows visitors to send messages directly to a Discord channel. This integration uses Discord's webhook API to post messages from the website to Discord without requiring a bot or authentication for website visitors.

Key features:
- Real-time communication between website visitors and Discord members
- Cyberpunk-themed chat interface that matches Root Access branding
- Secure proxy server to protect webhook credentials
- Support for formatted messages and rich embeds

## Architecture

The integration consists of three main components:

1. **Frontend Chat Interface**: HTML/CSS/JS interface embedded in the website
2. **Node.js Proxy Server**: Middleware that securely handles communication with Discord
3. **Discord Webhook**: Endpoint in a Discord channel that receives messages

Flow:
```
Website Visitor → Website Chat UI → Node.js Proxy → Discord Webhook → Discord Channel
```

## Setup Instructions

### 1. Create a Discord Webhook

1. Open your Discord server
2. Navigate to Server Settings → Integrations → Webhooks
3. Click "New Webhook"
4. Name it (e.g., "Root Access Website")
5. Choose the channel where messages should appear
6. Click "Copy Webhook URL" (keep this secret!)

### 2. Configure the Proxy Server

1. Create a `.env` file with your webhook URL:
```
DISCORD_WEBHOOK_URL=your_webhook_url_here
ALLOWED_ORIGIN=https://your-website-url.com
PORT=3000
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
node discord-proxy.js
```

### 3. Connect the Website

The frontend chat interface is already configured to communicate with the proxy server. Just ensure the fetch URL in `script.js` matches your proxy server URL.

## Discord Webhook API Reference

### Webhook Object Structure

```javascript
{
  "id": "223704706495545344",                         // webhook id (snowflake)
  "type": 1,                                          // webhook type (1 = Incoming)
  "guild_id": "199737254929760256",                   // guild id this webhook belongs to
  "channel_id": "199737254929760256",                 // channel id this webhook belongs to
  "user": {                                           // user object - webhook creator
    "username": "test",
    "discriminator": "7479",
    "id": "190320984123768832",
    "avatar": "b004ec1740a63ca06ae2e14c5cee11f3",
    "public_flags": 131328
  },
  "name": "test webhook",                             // default webhook name
  "avatar": null,                                     // default webhook avatar
  "token": "3d89bb7572e0fb30d8128367b3b1b44fecd...",  // webhook token
  "application_id": null                              // application id of webhook creator
}
```

### Webhook Types

| Value | Name             | Description                                                |
|-------|------------------|------------------------------------------------------------|
| 1     | Incoming         | Webhooks that post messages to channels with a token       |
| 2     | Channel Follower | Internal webhooks used with Channel Following              |
| 3     | Application      | Webhooks used with Interactions                            |

### Executing a Webhook

**Endpoint**: `POST /webhooks/{webhook.id}/{webhook.token}`

**Request Example**:
```javascript
// Basic message
{
  "content": "Hello, world!",
  "username": "Custom Username",
  "avatar_url": "https://example.com/avatar.png"
}

// Rich embed message
{
  "content": "Check out this embed!",
  "embeds": [{
    "title": "Embed Title",
    "description": "Embed description text",
    "color": 65535,  // Cyan in decimal
    "fields": [
      {
        "name": "Field Name",
        "value": "Field Value",
        "inline": true
      }
    ],
    "timestamp": "2025-05-06T23:53:08.000Z"
  }]
}
```

**Query Parameters**:

| Parameter     | Type    | Description                                                   |
|---------------|---------|---------------------------------------------------------------|
| wait          | boolean | Wait for server confirmation and return created message       |
| thread_id     | string  | Send to specific thread within webhook's channel              |
| with_components | boolean | Whether to respect the components field of the request       |

**Common Parameters**:

| Field           | Type   | Description                                      | Required |
|-----------------|--------|--------------------------------------------------|----------|
| content         | string | Message text (up to 2000 characters)             | One of content, file, embeds required |
| username        | string | Override default webhook username                | No       |
| avatar_url      | string | Override default webhook avatar                  | No       |
| tts             | boolean | Text-to-speech flag                             | No       |
| embeds          | array  | Array of rich embed objects (max 10)             | One of content, file, embeds required |
| allowed_mentions | object | Control mentions in the message                 | No       |
| components      | array  | UI components like buttons                       | No       |
| flags           | integer | Message flags as bitfield                       | No       |

## Implementation Details

### Proxy Server (discord-proxy.js)

Our Node.js proxy server handles secure communication with Discord:

```javascript
app.post('/api/send-to-discord', async (req, res) => {
  try {
    const { name, message, avatar } = req.body;
    
    // Format according to Discord webhook API
    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: `${name} (via website)`,
        avatar_url: avatar || 'https://rootaccess.design/assets/default-avatar.png',
        content: message,
        embeds: [{
          title: 'Message from Website',
          description: message,
          color: 65535, // Cyan color
          timestamp: new Date().toISOString(),
          footer: {
            text: 'Root Access Website Chat'
          }
        }]
      }),
    });
    
    // Handle response...
  } catch (error) {
    // Handle errors...
  }
});
```

### Frontend Integration (script.js)

The website sends messages to the proxy server:

```javascript
async function sendToDiscord(name, message) {
  try {
    const response = await fetch('http://localhost:3000/api/send-to-discord', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        message
      }),
    });
    
    // Handle response...
  } catch (error) {
    // Handle errors...
  }
}
```

## Troubleshooting

### Common Issues:

1. **CORS Errors**: Ensure the ALLOWED_ORIGIN in your .env file matches your website's URL.

2. **404 Not Found**: Check that your proxy server is running and the URL in script.js is correct.

3. **Webhook Unauthorized**: Verify your DISCORD_WEBHOOK_URL is correct and hasn't been regenerated.

4. **Rate Limiting**: Discord has rate limits for webhooks. Add error handling for 429 responses.

5. **Message Not Appearing**: Make sure your webhook is connected to the right channel and server.

### Debug Tips:

- Check the browser console for frontend errors
- Monitor the Node.js proxy server logs
- Verify webhook validity by testing with a curl command:

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"content": "Test message"}' \
  https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN
```

## Full Discord Webhook API Reference

For complete details about Discord's webhook API, refer to the official [Discord API Documentation](https://discord.com/developers/docs/resources/webhook).

### Key Endpoints

| Method | Endpoint                                    | Description                         |
|--------|---------------------------------------------|-------------------------------------|
| POST   | /webhooks/{webhook.id}/{webhook.token}      | Execute webhook                     |
| GET    | /webhooks/{webhook.id}/{webhook.token}      | Get webhook (no auth required)      |
| PATCH  | /webhooks/{webhook.id}/{webhook.token}      | Modify webhook (no auth required)   |
| DELETE | /webhooks/{webhook.id}/{webhook.token}      | Delete webhook (no auth required)   |
| POST   | /webhooks/{webhook.id}/{webhook.token}/slack| Execute webhook with Slack format   |
| POST   | /webhooks/{webhook.id}/{webhook.token}/github| Execute webhook with GitHub format |

### Embed Object Structure

Discord embed objects can contain rich content for more engaging messages:

```javascript
{
  "title": "Embed Title",
  "description": "Embed description text that can be up to 4096 characters",
  "url": "https://example.com",
  "timestamp": "2025-05-06T23:53:08.000Z",
  "color": 65535,  // Color in decimal (0x00FFFF in hex)
  "footer": {
    "text": "Footer text",
    "icon_url": "https://example.com/footer-icon.png"
  },
  "image": {
    "url": "https://example.com/image.png"
  },
  "thumbnail": {
    "url": "https://example.com/thumbnail.png"
  },
  "author": {
    "name": "Author Name",
    "url": "https://example.com/author",
    "icon_url": "https://example.com/author-icon.png"
  },
  "fields": [
    {
      "name": "Field Name",
      "value": "Field Value",
      "inline": true
    },
    {
      "name": "Another Field",
      "value": "Another value",
      "inline": true
    }
  ]
}
```

### Message Flags

Message flags can be combined as a bitfield:

| Value | Name                  | Description                                      |
|-------|----------------------|--------------------------------------------------|
| 4     | SUPPRESS_EMBEDS      | Do not include embeds when serializing this message |
| 4096  | SUPPRESS_NOTIFICATIONS | Do not send notifications for this message      |

---

This documentation was last updated: May 2025 