# Sales Funnel Integration Guide

## 🎯 Overview
The sales funnels automatically detect whether to use **Stripe checkout** (for paid products) or **MailerLite forms** (for free lead magnets) based on the CTA text.

## 💳 Stripe Integration (Paid Products)

### How it works:
- Detects paid products by CTA text containing: `$`, `MONTH`, or `PAY`
- Pre-fills customer email and tracks funnel source
- Currently configured for:
  - **Upwork Proposal Mastery** ($79/month)
  - **Digital Products Empire** ($27 one-time)

### Setup Steps:
1. Create your Stripe products/prices in Stripe Dashboard
2. Generate Stripe Checkout links 
3. Update the `stripeUrls` object in `SalesFunnel.vue`:

```javascript
const stripeUrls = {
  'upwork-proposal-mastery': 'https://buy.stripe.com/your-actual-upwork-link',
  'digital-products-empire-27': 'https://buy.stripe.com/your-actual-digital-link'
}
```

### Stripe Benefits:
✅ **No API keys needed** - Just redirect to Stripe Checkout
✅ **Pre-filled email** - Better user experience  
✅ **Source tracking** - Know which funnel converted
✅ **Secure payments** - Stripe handles everything

## 📧 MailerLite Integration (Free Lead Magnets)

### How it works:
- Uses MailerLite's direct form submission (no API keys required)
- Each funnel maps to a specific MailerLite form
- Tracks source for segmentation

### Setup Steps:

1. **Create MailerLite Forms:**
   - Go to MailerLite → Forms → Create new form
   - Add fields: `email`, `name`, `source`
   - Get the form ID from the form URL

2. **Update Form IDs in code:**
   ```javascript
   const mailerLiteFormIds = {
     'reddit-ranking-2025': 'your-actual-reddit-form-id',
     'instagram-growth-masterclass': 'your-actual-instagram-form-id', 
     'supplement-brand-igniter': 'your-actual-supplement-form-id',
     'cybersecurity-cheat-sheet': 'your-actual-cybersecurity-form-id',
     'ai-jobs-guide-2025': 'your-actual-ai-jobs-form-id'
   }
   ```

3. **Find Your Form ID:**
   - In MailerLite, edit your form
   - Look at the URL: `https://dashboard.mailerlite.com/forms/123456789/edit`
   - The number `123456789` is your form ID

### MailerLite Benefits:
✅ **No API keys needed** - Direct form submission
✅ **Custom styling preserved** - Uses your funnel design
✅ **Source tracking** - Know which funnel the lead came from
✅ **Automatic segmentation** - Different forms for different funnels

## 🔄 Automatic Detection Logic

The system automatically chooses the right integration:

```javascript
const isPaidProduct = this.funnelData.ctaText.includes('$') || 
                     this.funnelData.ctaText.includes('MONTH') ||
                     this.funnelData.ctaText.includes('PAY')

if (isPaidProduct) {
  // → Stripe Checkout
} else {
  // → MailerLite Submission
}
```

## 🛠 Alternative Solutions (If Needed)

### Option 1: Serverless Functions
If your hosting supports it (Netlify/Vercel):
- Create serverless function with API keys
- Call function from frontend
- More complex but allows custom logic

### Option 2: Third-party Tools
- **Zapier/Make.com**: Webhook → MailerLite
- **ConvertKit**: Similar to MailerLite
- **Typeform**: Direct integration options

## 🚀 Deployment Notes

### For Static Hosting (Recommended):
- ✅ No environment variables needed
- ✅ No backend required
- ✅ Works on Netlify, Vercel, GitHub Pages, etc.

### Current Funnel Types:
- **Free Lead Magnets**: Reddit, Instagram, Supplements, Cybersecurity, AI Jobs
- **Paid Products**: Upwork Mastery, Digital Products Bundle

## 📝 Testing

### Development:
- Form submissions show alerts with the data
- Check browser console for logs
- Test with real email addresses

### Production:
- Replace form IDs with real MailerLite form IDs
- Replace Stripe URLs with real checkout links
- Test end-to-end flow

## 🎨 Customization

### Adding New Funnels:
1. Add to `salesFunnels.json`
2. Add MailerLite form ID (if free) or Stripe URL (if paid)
3. CTA text determines which integration is used

### Custom Thank You Pages:
Uncomment this line in the success handler:
```javascript
// this.$router.push('/thank-you')
```

This approach gives you a professional sales funnel system without the complexity of managing API keys or backend infrastructure! 