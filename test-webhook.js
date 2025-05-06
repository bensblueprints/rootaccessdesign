// Simple Node.js script to test Discord webhook directly
// Run this with: node test-webhook.js

const https = require('https');

// The Discord webhook URL
const webhookUrl = 'https://discordapp.com/api/webhooks/1369376321377013834/ptcUivXiiYSDRLIrqQuBnn1ctBC-o88lwsBxHJ_O7HpLLlnoK3w8ZQ3mLY-Yuq5JvvLV';

// Parse the URL to get hostname, path, etc.
const url = new URL(webhookUrl);

// Create a simple test message
const testMessage = {
  content: 'Test message from Node.js script at ' + new Date().toISOString(),
};

// Convert the message to a JSON string
const data = JSON.stringify(testMessage);

// Configure the HTTP request
const options = {
  hostname: url.hostname,
  path: url.pathname + url.search,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length,
  },
};

console.log('Sending test message to Discord webhook...');

// Send the request
const req = https.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode} ${res.statusMessage}`);
  
  let responseData = '';
  
  res.on('data', (chunk) => {
    responseData += chunk;
  });
  
  res.on('end', () => {
    if (responseData) {
      console.log('RESPONSE:', responseData);
    }
    
    if (res.statusCode === 204) {
      console.log('SUCCESS: Message sent to Discord webhook!');
    } else {
      console.log('ERROR: Failed to send message to Discord webhook');
    }
  });
});

req.on('error', (error) => {
  console.error('ERROR:', error.message);
});

// Write the data and end the request
req.write(data);
req.end();

console.log('Request sent, waiting for response...'); 