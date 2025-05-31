# Sales Funnel System

This Vue.js application now includes a dynamic sales funnel system that allows you to create multiple customizable landing pages through JSON configuration.

## Quick Start

### Viewing Sales Funnels

1. **Demo Page**: Visit `/funnels` to see all available sales funnels
2. **Individual Funnel**: Visit `/funnel/{funnelId}` to view a specific funnel

### Example URLs

- Demo page: `http://localhost:5173/funnels`
- Reddit funnel: `http://localhost:5173/funnel/reddit-ranking-2025`
- Instagram funnel: `http://localhost:5173/funnel/instagram-growth-masterclass`

## How It Works

### 1. JSON Configuration

All sales funnels are configured in `/public/salesFunnels.json`. Each funnel is a JSON object with the following structure:

```json
{
  "id": "unique-funnel-id",
  "title": "Main Headline",
  "subtitle": "Subtitle Text",
  "description": "Lead description",
  "content": "Main content paragraph",
  "videoUrl": "https://example.com/video.mp4",
  "ctaText": "Call to Action Button Text",
  "formFields": [
    {
      "type": "text|email|tel|etc",
      "placeholder": "Placeholder text",
      "required": true|false,
      "name": "field_name"
    }
  ],
  "benefits": [
    {
      "title": "Benefit Title",
      "description": "Benefit description",
      "icon": "icon_name"
    }
  ],
  "testimonials": [
    {
      "initials": "JD",
      "name": "John Doe",
      "title": "Customer Title",
      "quote": "Customer testimonial"
    }
  ],
  "socialProofTitle": "Social proof section title",
  "backToHomeText": "Back button text"
}
```

### 2. Components

- **`SalesFunnel.vue`**: Main funnel component that renders the landing page
- **`SalesFunnelView.vue`**: View wrapper that passes route parameters
- **`SalesFunnelDemo.vue`**: Demo page listing all available funnels

### 3. Features

#### ✅ Responsive Design
- Mobile-first approach
- Adaptive layouts for all screen sizes
- Optimized mobile preview section

#### ✅ Video Integration
- Supports any video URL
- Fallback placeholder with play button
- Responsive video player

#### ✅ Dynamic Forms
- Configurable form fields via JSON
- Support for text, email, tel, and other input types
- Required/optional field validation
- Form submission handling

#### ✅ Benefits Grid
- 2-column grid layout (1-column on mobile)
- Hover effects and animations
- Customizable benefits per funnel

#### ✅ Testimonials
- Avatar with initials
- Full testimonials with attribution
- Responsive grid layout

#### ✅ Mobile App Preview
- Realistic mobile device mockup
- Status bar simulation
- App-like interface preview

## Adding New Funnels

### Step 1: Add to JSON

Edit `/public/salesFunnels.json` and add a new funnel object:

```json
{
  "salesFunnels": [
    // ... existing funnels
    {
      "id": "your-new-funnel",
      "title": "Your Funnel Title",
      "subtitle": "Your Subtitle",
      // ... rest of configuration
    }
  ]
}
```

### Step 2: Access Your Funnel

Visit: `http://localhost:5173/funnel/your-new-funnel`

## Customization

### Styling

The sales funnel uses a dark theme with orange/red accents by default. To customize:

1. **Colors**: Edit the CSS variables in `SalesFunnel.vue`
2. **Layout**: Modify the grid systems and spacing
3. **Typography**: Update font families and sizes

### Functionality

#### Form Handling

Currently, form submission shows an alert. To integrate with your backend:

```javascript
// In SalesFunnel.vue, modify the submitForm method
async submitForm() {
  try {
    const response = await fetch('/api/submit-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        funnelId: this.funnelId,
        formData: this.formData
      })
    });
    // Handle response
  } catch (error) {
    console.error('Submission error:', error);
  }
}
```

#### Analytics Integration

Add tracking to key events:

```javascript
// Track funnel views
gtag('event', 'funnel_view', {
  funnel_id: this.funnelId
});

// Track form submissions
gtag('event', 'lead_capture', {
  funnel_id: this.funnelId
});
```

### Video Integration

#### Supported Formats
- Direct video URLs (.mp4, .webm, .ogg)
- YouTube embed URLs
- Vimeo embed URLs

#### Custom Video Player

To use a custom video player (like YouTube):

```vue
<div v-if="isYouTubeVideo(funnelData.videoUrl)" class="youtube-container">
  <iframe 
    :src="getYouTubeEmbedUrl(funnelData.videoUrl)" 
    frameborder="0" 
    allowfullscreen>
  </iframe>
</div>
```

## Architecture

### File Structure

```
src/
├── components/
│   └── SalesFunnel.vue          # Main funnel component
├── views/
│   ├── SalesFunnelView.vue      # Route wrapper
│   └── SalesFunnelDemo.vue      # Demo listing page
└── router.js                    # Route definitions

public/
└── salesFunnels.json           # Funnel configurations
```

### Routing

- `/funnels` → `SalesFunnelDemo.vue` (shows all funnels)
- `/funnel/:funnelId` → `SalesFunnelView.vue` → `SalesFunnel.vue`

### State Management

- No external state management required
- Each funnel loads its own data from JSON
- Form state managed locally in component

## Best Practices

### 1. Funnel IDs
- Use kebab-case: `my-awesome-funnel`
- Keep them descriptive and unique
- Avoid special characters

### 2. Content Writing
- Keep headlines punchy and benefit-focused
- Use social proof effectively
- Include clear calls-to-action

### 3. Images and Media
- Store videos in `/public` for local files
- Use CDN URLs for external media
- Optimize images for web (WebP format recommended)

### 4. Performance
- Lazy load videos when possible
- Compress images
- Test on mobile devices

## Troubleshooting

### Common Issues

#### Funnel Not Loading
- Check that the `funnelId` in URL matches JSON
- Verify JSON syntax is valid
- Check browser console for errors

#### Video Not Playing
- Ensure video URL is accessible
- Check CORS headers for external videos
- Test video URL directly in browser

#### Form Not Submitting
- Check form validation requirements
- Verify all required fields are filled
- Check browser console for JavaScript errors

### Development

#### Running the Project
```bash
cd vue-frontend
npm run dev
```

#### Building for Production
```bash
npm run build
```

#### Linting
```bash
npm run lint
```

## Advanced Features

### A/B Testing

To implement A/B testing:

1. Create multiple versions of the same funnel with different IDs
2. Use a routing function to randomly assign users
3. Track conversion rates per variant

### Multi-language Support

Add language variants:

```json
{
  "id": "funnel-en",
  "language": "en",
  "title": "English Title",
  // ...
},
{
  "id": "funnel-es", 
  "language": "es",
  "title": "Título en Español",
  // ...
}
```

### Dynamic Content

Load content based on URL parameters:

```javascript
// In SalesFunnel.vue
computed: {
  dynamicContent() {
    const variant = this.$route.query.variant;
    return this.funnelData.variants?.[variant] || this.funnelData;
  }
}
```

## Support

For questions or issues with the sales funnel system:
1. Check this README first
2. Review the example funnels in the JSON file
3. Test on the demo page (`/funnels`)
4. Check browser console for errors

Happy funnel building! 🚀 