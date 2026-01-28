# US Forex Guide

A comprehensive forex broker review and comparison website for US traders. Built with React, TypeScript, and Tailwind CSS.

## Features

- **Broker Reviews**: Detailed reviews of top forex brokers for US traders
- **Comparison Tools**: Side-by-side comparison of broker features, spreads, and leverage
- **Trading Guides**: Educational content for beginners and advanced traders
- **Blog**: Latest insights and trading strategies
- **SEO Optimized**: Full SEO implementation with meta tags and structured data
- **Contact Form**: Get in touch with questions or feedback
- **Review System**: Users can submit reviews for brokers

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui (Radix UI)
- **SEO**: react-helmet-async
- **Build Tool**: Vite
- **Deployment**: Netlify (via GitHub)

## Getting Started

### Prerequisites

- Node.js 18+ and npm (or bun)

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Variables

Create a `.env` file in the root directory:

```env
# Google Analytics
VITE_GA_ID=G-XXXXXXXXXX
VITE_GTM_ID=GTM-XXXXXXX

# Affiliate Links (Optional - defaults are in brokers.ts)
VITE_FXGLORY_AFFILIATE_URL=https://app.fxglory.com/auth/register?ib=82027
VITE_N1CM_AFFILIATE_URL=https://register.n1cmpro.com/en?partner_id=250473
```

## Project Structure

```
src/
├── components/       # Reusable React components
│   ├── ui/          # shadcn/ui components
│   ├── Header.tsx   # Navigation header
│   ├── Footer.tsx   # Site footer
│   ├── SEO.tsx      # SEO component
│   └── ...
├── pages/           # Page components
│   ├── Index.tsx    # Homepage
│   ├── BrokersPage.tsx
│   ├── ContactPage.tsx
│   ├── review/      # Broker review pages
│   ├── guides/      # Trading guide pages
│   ├── blog/        # Blog pages
│   └── legal/       # Legal pages
├── lib/             # Utilities and data
│   ├── brokers.ts   # Broker data and affiliate links
│   ├── blog.ts      # Blog post data
│   └── utils.ts     # Helper functions
└── hooks/           # Custom React hooks
```

## Deployment

### Netlify (via GitHub)

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Netlify will automatically detect the build settings from `netlify.toml`
4. Set environment variables in Netlify dashboard:
   - `VITE_GA_ID`
   - `VITE_GTM_ID`
   - Any affiliate link variables if needed

### Build Settings

- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: 18

## SEO

The site includes comprehensive SEO:

- Meta tags (title, description, Open Graph, Twitter Cards)
- Canonical URLs
- JSON-LD structured data
- Sitemap.xml
- Robots.txt

## Google Analytics

Google Analytics and Tag Manager are integrated via environment variables. Set `VITE_GA_ID` and `VITE_GTM_ID` in your environment to enable tracking.

## Contributing

1. Create a feature branch
2. Make your changes
3. Test locally
4. Submit a pull request

## License

© 2026 US Forex Guide. All rights reserved.

## Affiliate Disclosure

This website contains affiliate links. We may receive compensation when you click on links to products we review. This does not affect our editorial independence or the accuracy of our reviews.
