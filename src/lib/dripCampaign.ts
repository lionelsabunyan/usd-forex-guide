/**
 * 7-Day Forex Beginner Email Drip Campaign
 *
 * Each email maps to existing blog posts and broker pages.
 * Content is designed for n8n/server-side email sending.
 * UTM params follow: utm_source=drip&utm_medium=email&utm_campaign=7day_beginner&utm_content=day{N}
 */

import type { BrokerId } from './brokers';

const SITE_URL = 'https://beginnerfxguide.com';

export interface DripEmail {
  day: number;
  subject: string;
  preheader: string;
  heading: string;
  bodyHtml: string;
  ctaText: string;
  ctaUrl: string;
  blogLinks: { title: string; slug: string }[];
  brokerCTAs: { brokerId: BrokerId; label: string }[];
}

function dripUrl(path: string, day: number): string {
  const sep = path.includes('?') ? '&' : '?';
  return `${SITE_URL}${path}${sep}utm_source=drip&utm_medium=email&utm_campaign=7day_beginner&utm_content=day${day}`;
}

function brokerDripUrl(brokerId: BrokerId, day: number): string {
  return `${SITE_URL}/go/${brokerId}?utm_source=drip&utm_medium=email&utm_campaign=7day_beginner&utm_content=day${day}`;
}

export const DRIP_CAMPAIGN_ID = '7day_beginner' as const;

export const dripEmails: DripEmail[] = [
  // ── Day 1: What is Forex? ──────────────────────────────────────────
  {
    day: 1,
    subject: 'Welcome! What Is Forex Trading & How Does It Work?',
    preheader: 'Your 7-day journey to understanding forex starts now.',
    heading: 'Day 1: What Is Forex Trading?',
    bodyHtml: `
      <p>Welcome to the <strong>7-Day Forex Beginner Series</strong>!</p>
      <p>Forex (foreign exchange) is the world's largest financial market, with over $7.5 trillion traded daily. Unlike stocks, forex operates 24 hours a day, 5 days a week across global time zones.</p>
      <p>In this series, we'll take you from zero to confident — one email per day. Today's focus: <strong>the fundamentals</strong>.</p>
      <h3>Key Concepts</h3>
      <ul>
        <li><strong>Currency pairs</strong> — You always trade one currency against another (e.g., EUR/USD)</li>
        <li><strong>Pips</strong> — The smallest price movement in a pair</li>
        <li><strong>Leverage</strong> — Trade larger positions with smaller capital</li>
        <li><strong>Spread</strong> — The difference between buy and sell price (your cost)</li>
      </ul>
      <p>Tomorrow, we'll help you pick the right broker — the single most important decision you'll make as a beginner.</p>
    `,
    ctaText: 'Read: How to Start Forex Trading in the USA',
    ctaUrl: '/blog/how-to-start-forex-trading-usa-2026/',
    blogLinks: [
      { title: 'How to Start Forex Trading in the USA (2026)', slug: 'how-to-start-forex-trading-usa-2026' },
      { title: 'Currency Pairs Explained for Beginners', slug: 'currency-pairs-explained-beginners' },
    ],
    brokerCTAs: [],
  },

  // ── Day 2: Choosing a Broker ───────────────────────────────────────
  {
    day: 2,
    subject: 'Day 2: How to Choose the Right Forex Broker',
    preheader: 'Regulation, fees, platforms — what to look for.',
    heading: 'Day 2: Broker Selection Guide',
    bodyHtml: `
      <p>Choosing the right broker is the <strong>most important decision</strong> you'll make. A bad broker can cost you money through high spreads, slow execution, or worse — fraud.</p>
      <h3>What to Look For</h3>
      <ul>
        <li><strong>Regulation</strong> — NFA/CFTC for US, FCA/ASIC/CySEC internationally</li>
        <li><strong>Spreads & commissions</strong> — Lower is better; compare across brokers</li>
        <li><strong>Platform</strong> — MT4, MT5, or proprietary; choose what feels right</li>
        <li><strong>Minimum deposit</strong> — Start small while you learn ($50–$200)</li>
        <li><strong>Customer support</strong> — Test it before depositing</li>
      </ul>
      <h3>Our Top Picks for Beginners</h3>
      <p>We've reviewed 22+ brokers. Here are our top 3 for new traders:</p>
    `,
    ctaText: 'See Our Full Broker Rankings',
    ctaUrl: '/blog/best-forex-brokers-us-traders-2026/',
    blogLinks: [
      { title: 'Best Forex Brokers for US Traders (2026)', slug: 'best-forex-brokers-us-traders-2026' },
      { title: 'Best Forex Brokers for Beginners (2026)', slug: 'best-forex-brokers-beginners-2026' },
    ],
    brokerCTAs: [
      { brokerId: 'fxglory', label: 'FXGlory — Low Min Deposit, High Leverage' },
      { brokerId: 'hankotrade', label: 'HankoTrade — Fast Execution, Low Spreads' },
      { brokerId: 'exness', label: 'Exness — Trusted, Instant Withdrawals' },
    ],
  },

  // ── Day 3: Your First Trade ────────────────────────────────────────
  {
    day: 3,
    subject: 'Day 3: How to Place Your First Forex Trade',
    preheader: 'Step-by-step: from opening a chart to hitting "buy".',
    heading: 'Day 3: Placing Your First Trade',
    bodyHtml: `
      <p>Today we get practical. Here's how to place your first trade — step by step.</p>
      <h3>Step-by-Step</h3>
      <ol>
        <li><strong>Open a demo account</strong> — Practice with virtual money first (seriously, do this)</li>
        <li><strong>Pick a major pair</strong> — Start with EUR/USD or GBP/USD; they have the tightest spreads</li>
        <li><strong>Read the chart</strong> — Green candle = price went up, red = down</li>
        <li><strong>Set your position size</strong> — Risk no more than 1-2% of your account per trade</li>
        <li><strong>Place the trade</strong> — Buy if you think price goes up, sell if down</li>
        <li><strong>Set a stop-loss</strong> — ALWAYS. This limits your downside</li>
      </ol>
      <p><strong>Pro tip:</strong> Don't skip the demo phase. Trade for at least 2-4 weeks with virtual money before going live.</p>
    `,
    ctaText: 'Read: Currency Pairs Explained for Beginners',
    ctaUrl: '/blog/currency-pairs-explained-beginners/',
    blogLinks: [
      { title: 'Currency Pairs Explained for Beginners', slug: 'currency-pairs-explained-beginners' },
      { title: 'How to Read Forex Charts (Beginners)', slug: 'how-to-read-forex-charts-beginners' },
    ],
    brokerCTAs: [
      { brokerId: 'exness', label: 'Open Free Demo — Exness' },
      { brokerId: 'xm', label: 'Open Free Demo — XM ($100K Virtual)' },
    ],
  },

  // ── Day 4: Risk Management ─────────────────────────────────────────
  {
    day: 4,
    subject: 'Day 4: Risk Management — The #1 Skill of Profitable Traders',
    preheader: 'Most beginners fail because of poor risk management. Don\'t be one of them.',
    heading: 'Day 4: Risk Management Fundamentals',
    bodyHtml: `
      <p>Here's the truth: <strong>most beginner traders lose money</strong>. The #1 reason? Poor risk management.</p>
      <p>Good news: risk management is a learnable skill. Master these rules and you're already ahead of 80% of beginners.</p>
      <h3>The Golden Rules</h3>
      <ul>
        <li><strong>1-2% rule</strong> — Never risk more than 1-2% of your account on a single trade</li>
        <li><strong>Always use stop-losses</strong> — No exceptions. A trade without a stop-loss is gambling</li>
        <li><strong>Risk-reward ratio</strong> — Aim for at least 1:2 (risk $50 to make $100)</li>
        <li><strong>Don't over-leverage</strong> — Just because you CAN use 500:1 leverage doesn't mean you should</li>
        <li><strong>Position sizing</strong> — Calculate lot size based on your stop-loss distance, not your "feeling"</li>
      </ul>
      <h3>Quick Math</h3>
      <p>Account: $1,000 → Max risk per trade (2%): $20 → If stop-loss is 20 pips: trade 0.10 lots on EUR/USD.</p>
      <p>Use our pip calculator to get the exact position size for your trades.</p>
    `,
    ctaText: 'Read: Complete Risk Management Guide',
    ctaUrl: '/blog/forex-risk-management-guide/',
    blogLinks: [
      { title: 'Forex Risk Management Guide', slug: 'forex-risk-management-guide' },
      { title: 'Forex Leverage Explained', slug: 'forex-leverage-explained' },
    ],
    brokerCTAs: [
      { brokerId: 'midasfx', label: 'MidasFX — Negative Balance Protection' },
      { brokerId: 'hankotrade', label: 'HankoTrade — Tight Stops, Low Spreads' },
    ],
  },

  // ── Day 5: Technical Analysis Intro ────────────────────────────────
  {
    day: 5,
    subject: 'Day 5: Technical Analysis — Reading Charts Like a Pro',
    preheader: 'Support, resistance, trends — the building blocks of every trade decision.',
    heading: 'Day 5: Introduction to Technical Analysis',
    bodyHtml: `
      <p>Technical analysis is how traders read price charts to predict future movements. You don't need to be a math genius — just learn these basics.</p>
      <h3>The Big 3 Concepts</h3>
      <ul>
        <li><strong>Support & Resistance</strong> — Price levels where buying/selling pressure concentrates. Price "bounces" off these levels</li>
        <li><strong>Trend lines</strong> — Connect swing highs (downtrend) or swing lows (uptrend) to see the market direction</li>
        <li><strong>Candlestick patterns</strong> — Doji, hammer, engulfing — these signal potential reversals or continuations</li>
      </ul>
      <h3>Beginner-Friendly Indicators</h3>
      <ul>
        <li><strong>Moving Averages (MA)</strong> — 50 & 200 period MAs show long-term trend direction</li>
        <li><strong>RSI (Relative Strength Index)</strong> — Above 70 = overbought, below 30 = oversold</li>
        <li><strong>MACD</strong> — Shows momentum shifts; great for confirming trends</li>
      </ul>
      <p><strong>Platform tip:</strong> MT4 and MT5 come pre-loaded with all these indicators. Most brokers offer them free.</p>
    `,
    ctaText: 'Read: Best Forex Strategies for Beginners',
    ctaUrl: '/blog/best-forex-strategies-beginners/',
    blogLinks: [
      { title: 'Best Forex Strategies for Beginners', slug: 'best-forex-strategies-beginners' },
      { title: 'MT4 vs MT5: Which Platform?', slug: 'mt4-vs-mt5-which-platform' },
      { title: 'How to Read Forex Charts (Beginners)', slug: 'how-to-read-forex-charts-beginners' },
    ],
    brokerCTAs: [
      { brokerId: 'pepperstone', label: 'Pepperstone — Advanced Charting Tools' },
      { brokerId: 'fxglory', label: 'FXGlory — MT4 with Custom Indicators' },
    ],
  },

  // ── Day 6: Demo Account Experience ─────────────────────────────────
  {
    day: 6,
    subject: 'Day 6: Why You NEED a Demo Account (And How to Use It Right)',
    preheader: 'The secret weapon of every successful trader\'s journey.',
    heading: 'Day 6: Mastering the Demo Account',
    bodyHtml: `
      <p>If you haven't opened a demo account yet — <strong>today is the day</strong>.</p>
      <p>A demo account lets you trade with virtual money in real market conditions. It's free, risk-free, and the single best way to build confidence.</p>
      <h3>How to Get Maximum Value From Demo</h3>
      <ul>
        <li><strong>Treat it like real money</strong> — Set a realistic balance ($500–$1,000, not $100K)</li>
        <li><strong>Follow your rules</strong> — Use stop-losses, position sizing, and risk management as if it's real</li>
        <li><strong>Keep a journal</strong> — Write down every trade: why you entered, your target, what happened</li>
        <li><strong>Trade for 2-4 weeks minimum</strong> — Don't rush to real money</li>
        <li><strong>Test strategies</strong> — Try different approaches before picking one</li>
      </ul>
      <h3>When to Go Live</h3>
      <p>Move to a real account when you can show <strong>consistent profits for 2+ weeks</strong> on demo with proper risk management. Not before.</p>
      <p>Tomorrow is our final email — we'll walk you through going live and choosing the right account type.</p>
    `,
    ctaText: 'Read: Complete Demo Account Guide',
    ctaUrl: '/blog/forex-demo-account-guide/',
    blogLinks: [
      { title: 'Forex Demo Account Guide', slug: 'forex-demo-account-guide' },
      { title: 'Forex Trading Psychology & Emotions', slug: 'forex-trading-psychology-emotions' },
    ],
    brokerCTAs: [
      { brokerId: 'exness', label: 'Open Free Demo — Exness (Instant Setup)' },
      { brokerId: 'xm', label: 'Open Free Demo — XM ($100K Virtual)' },
      { brokerId: 'fxglory', label: 'Open Free Demo — FXGlory' },
    ],
  },

  // ── Day 7: Going Live ──────────────────────────────────────────────
  {
    day: 7,
    subject: 'Day 7: You\'re Ready — How to Open Your First Real Account',
    preheader: 'Final step: choosing the right account and funding it.',
    heading: 'Day 7: Going Live — Your First Real Account',
    bodyHtml: `
      <p>Congratulations — you've completed the 7-Day Forex Beginner Series! 🎉</p>
      <p>If you've been following along, you now understand the fundamentals, risk management, technical analysis, and how to use a demo account. Time to take the next step.</p>
      <h3>Going Live Checklist</h3>
      <ul>
        <li>✅ Practiced on demo for 2+ weeks with consistent results</li>
        <li>✅ Have a risk management plan (1-2% per trade, always use stop-losses)</li>
        <li>✅ Know which currency pairs you'll trade</li>
        <li>✅ Have a simple strategy you've tested</li>
        <li>✅ Only depositing money you can afford to lose</li>
      </ul>
      <h3>Choosing Your Account</h3>
      <ul>
        <li><strong>Start small</strong> — $100-$500 is plenty to start. You can always add more later</li>
        <li><strong>Micro/cent accounts</strong> — Some brokers offer accounts where you trade micro-lots (0.01). Perfect for beginners</li>
        <li><strong>Verify your broker</strong> — Make sure they're regulated and reputable</li>
      </ul>
      <h3>Our Top Picks for Your First Real Account</h3>
      <p>Based on low minimum deposits, beginner-friendly platforms, and strong regulation:</p>
    `,
    ctaText: 'Compare All Brokers for Beginners',
    ctaUrl: '/blog/best-forex-brokers-beginners-2026/',
    blogLinks: [
      { title: 'Best Forex Brokers for Beginners (2026)', slug: 'best-forex-brokers-beginners-2026' },
      { title: 'How to Start Forex Trading with $100', slug: 'how-to-start-forex-trading-100-dollars' },
      { title: 'Forex Spreads Explained', slug: 'forex-spreads-explained' },
    ],
    brokerCTAs: [
      { brokerId: 'fxglory', label: 'FXGlory — $1 Min Deposit, Up to 1:3000 Leverage' },
      { brokerId: 'hankotrade', label: 'HankoTrade — $10 Min Deposit, ECN Execution' },
      { brokerId: 'midasfx', label: 'MidasFX — $50 Min Deposit, STP/ECN' },
      { brokerId: 'exness', label: 'Exness — $1 Min Deposit, Instant Withdrawal' },
    ],
  },
];

/**
 * Get a specific drip email by day number (1-7)
 */
export function getDripEmail(day: number): DripEmail | undefined {
  return dripEmails.find(e => e.day === day);
}

/**
 * Generate full URLs for a drip email (resolves blog links and broker CTAs)
 */
export function resolveDripUrls(email: DripEmail): {
  ctaUrl: string;
  blogLinks: { title: string; url: string }[];
  brokerCTAs: { brokerId: BrokerId; label: string; url: string }[];
} {
  return {
    ctaUrl: dripUrl(email.ctaUrl, email.day),
    blogLinks: email.blogLinks.map(link => ({
      title: link.title,
      url: dripUrl(`/blog/${link.slug}/`, email.day),
    })),
    brokerCTAs: email.brokerCTAs.map(cta => ({
      brokerId: cta.brokerId,
      label: cta.label,
      url: brokerDripUrl(cta.brokerId, email.day),
    })),
  };
}

export const DRIP_TOTAL_DAYS = 7;
