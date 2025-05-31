# Sales Funnel Integration Guide

## Overview
The Vue.js sales funnel system now supports both **Stripe checkout** for paid products and **MailerLite** for free lead magnets, with automatic form prefilling.

## How It Works

### 1. **Paid Products → Stripe Checkout**
Funnels with a `stripeUrl` in the JSON automatically redirect to Stripe with prefilled customer data.

### 2. **Free Lead Magnets → MailerLite + Thank You Page**
Funnels without a `stripeUrl` collect emails via MailerLite and redirect to a custom thank you page.

## JSON Configuration

### Paid Product Example:
```json
{
  "id": "digital-products-empire-27",
  "primaryColor": "#A855F7",
  "title": "LAST CHANCE! Get 30 MILLION+ Resellable Digital Products",
  "ctaText": "GET INSTANT ACCESS - PAY ONLY $27!",
  "stripeUrl": "https://buy.stripe.com/7sYfZh9Txc0J6xlabScjS03",
  "formFields": [
    {
      "type": "email",
      "placeholder": "Your Email",
      "required": true,
      "name": "email"
    }
  ]
}
```

### Free Lead Magnet Example:
```json
{
  "id": "reddit-ranking-2025",
  "primaryColor": "#ff4444",
  "title": "Rank On Reddit in 2025:",
  "ctaText": "UNLOCK REDDIT SECRETS (FREE GUIDE)",
  "formFields": [
    {
      "type": "email",
      "placeholder": "Your Email",
      "required": true,
      "name": "email"
    }
  ],
  "nextSteps": [
    {
      "title": "Check Your Email",
      "description": "We've sent you important information..."
    }
  ]
}
```

## Current Stripe Links

From `THE_STRIPE_MAILERLITE_LINK.md`:

| Product | Stripe URL |
|---------|------------|
| 30M+ Digital Products Bundle | `https://buy.stripe.com/7sYfZh9Txc0J6xlabScjS03` |
| Upwork Proposal Mastery | `https://buy.stripe.com/5kQ4gzaXB8Ox6xlbfWcjS04` |
| Cybersecurity Cheat Sheet | `https://buy.stripe.com/5kQ3cv8Pt3udcVJ3NucjS05` |

## Stripe Prefilling

When users submit the form on a paid funnel, they're redirected to Stripe with:

```
https://buy.stripe.com/PRODUCT_ID?prefilled_email=user@email.com&client_reference_id=FUNNEL_ID
```

### Parameters:
- `prefilled_email`: User's email from the form
- `client_reference_id`: Funnel ID to track which funnel they came from

## Form Simplification

All forms now only collect **email addresses** to:
- ✅ Reduce friction and increase conversions
- ✅ Let Stripe handle customer data collection during checkout
- ✅ Simplify MailerLite integration (email is primary field)
- ✅ Eliminate form validation complexity

### Updated Form Configuration:
```json
"formFields": [
  {
    "type": "email",
    "placeholder": "Your Email",
    "required": true,
    "name": "email"
  }
]
```

## MailerLite Integration

For free lead magnets, the system now uses **MailerLite embedded forms** for better reliability and user experience.

### Setup Process:

1. **Universal Script**: Added to `vue-frontend/index.html` (✅ **Complete**)
```html
<!-- MailerLite Universal -->
<script>
    (function(w,d,e,u,f,l,n){w[f]=w[f]||function(){(w[f].q=w[f].q||[])
    .push(arguments);},l=d.createElement(e),l.async=1,l.src=u,
    n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n);})
    (window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');
    ml('account', '1312118');
</script>
<!-- End MailerLite Universal -->
```

2. **Embedded Forms**: Each free funnel gets a `mailerLiteEmbedId`

### MailerLite Configuration:
```json
{
  "id": "reddit-ranking-2025",
  "mailerLiteEmbedId": "iT7u28",
  "formFields": [], // Not needed for embedded forms
  "nextSteps": [...]
}
```

### Implementation:
- **Free Funnels**: Show MailerLite embedded form `<div class="ml-embedded" data-form="iT7u28"></div>`
- **Paid Funnels**: Show custom form that redirects to Stripe
- **Styling**: Dark theme styling applied with `:deep()` CSS selectors
- **Responsive**: Forms adapt to mobile screens

### Current Forms:
- **Reddit Marketing Guide**: Embed ID `iT7u28` ✅ **Implemented**

### Benefits:
✅ **No CORS issues** - MailerLite handles everything  
✅ **Reliable submission** - Uses MailerLite's proven system  
✅ **Better UX** - Forms integrate seamlessly  
✅ **Analytics** - Full MailerLite analytics and automation  
✅ **Success handling** - MailerLite manages thank you messages

## Thank You Page Features

The thank you page (`/thank-you?funnel=FUNNEL_ID`) dynamically loads:

### Content from JSON:
- **Next Steps**: Customized action items
- **Bonuses**: Exclusive content for paid customers
- **Download Links**: For digital products with file sizes
- **Dynamic Colors**: Matches the funnel's primary color

### Examples:

**Paid Product Thank You:**
- Purchase confirmation
- Download links with file sizes
- Bonus content access
- Community access instructions

**Free Lead Magnet Thank You:**
- Email confirmation message
- Guide download instructions
- Follow-up sequence preview
- Implementation tips

## File Structure

```
vue-frontend/
├── public/
│   └── salesFunnels.json          # Funnel configurations
├── src/
│   ├── components/
│   │   └── SalesFunnel.vue        # Main funnel component
│   │   └── ThankYou.vue           # Dynamic thank you page
│   └── router/
│       └── index.js               # Routes configuration
```

## Adding New Funnels

### For Paid Products:
1. Add funnel to `salesFunnels.json`
2. Include `stripeUrl` field
3. Set up Stripe product link
4. Add `bonuses` and `downloadLinks` arrays

### For Free Lead Magnets:
1. Add funnel to `salesFunnels.json`
2. Omit `stripeUrl` field
3. Add MailerLite form ID (when ready)
4. Add `nextSteps` array

## Routes

- `/funnel/:funnelId` - Individual funnel page
- `/funnels` - Funnel overview/demo page
- `/thank-you?funnel=:funnelId` - Dynamic thank you page

## Dynamic Theming

All funnels support dynamic theming via `primaryColor` in JSON:
- Automatic color variations (dark, light, alpha, shadow)
- Consistent branding across funnel → thank you → downloads
- CSS custom properties for easy theming

## Next Steps

1. **MailerLite Integration**: Add actual form submission
2. **Analytics**: Track conversion rates by funnel
3. **A/B Testing**: Test different headlines, colors, CTAs
4. **Email Sequences**: Automated follow-ups by funnel type
5. **Customer Dashboard**: Post-purchase content access 