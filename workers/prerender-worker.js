/**
 * Cloudflare Worker for Prerender.io Integration
 * Detects bot traffic and serves prerendered HTML for SEO
 * API Token: Configured via environment variable PRERENDER_TOKEN
 */

// Yandex excluded - they have issues with prerender.io, serve them directly
const BOT_AGENTS = [
  'googlebot',
  'yahoo! slurp',
  'bingbot',
  // 'yandex', // DISABLED: Yandex Direct moderation fails with prerender.io
  'baiduspider',
  'facebookexternalhit',
  'twitterbot',
  'rogerbot',
  'linkedinbot',
  'embedly',
  'quora link preview',
  'showyoubot',
  'outbrain',
  'pinterest/0.',
  'developers.google.com/+/web/snippet',
  'slackbot',
  'vkshare',
  'w3c_validator',
  'redditbot',
  'applebot',
  'whatsapp',
  'flipboard',
  'tumblr',
  'bitlybot',
  'skypeuripreview',
  'nuzzel',
  'discordbot',
  'google page speed',
  'qwantify',
  'pinterestbot',
  'bitrix link preview',
  'xing-contenttabreceiver',
  'chrome-lighthouse',
  'telegrambot',
  'google-inspectiontool',
];

const PRERENDER_TOKEN = '9QnsbRhcASrvUSJeQecS';

// File extensions to ignore (not prerender)
const IGNORED_EXTENSIONS = [
  '.js', '.css', '.xml', '.less', '.png', '.jpg', '.jpeg', '.gif', '.pdf',
  '.doc', '.txt', '.ico', '.rss', '.zip', '.mp3', '.rar', '.exe', '.wmv',
  '.doc', '.avi', '.ppt', '.mpg', '.mpeg', '.tif', '.wav', '.mov', '.psd',
  '.ai', '.xls', '.mp4', '.m4a', '.swf', '.dat', '.dmg', '.iso', '.flv',
  '.m4v', '.torrent', '.ttf', '.woff', '.woff2', '.svg', '.eot', '.webp',
  '.webm', '.json'
];

function isBot(userAgent) {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return BOT_AGENTS.some(bot => ua.includes(bot));
}

function shouldPrerender(request) {
  const url = new URL(request.url);
  const pathname = url.pathname.toLowerCase();

  // Check if it's a static file
  if (IGNORED_EXTENSIONS.some(ext => pathname.endsWith(ext))) {
    return false;
  }

  // Check if it's a bot
  const userAgent = request.headers.get('user-agent') || '';
  if (!isBot(userAgent)) {
    return false;
  }

  // Check for _escaped_fragment_ (old AJAX crawling scheme)
  if (url.searchParams.has('_escaped_fragment_')) {
    return true;
  }

  return true;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Check if we should prerender this request
    if (shouldPrerender(request)) {
      try {
        // Build prerender URL
        const prerenderUrl = `https://service.prerender.io/${url.href}`;

        // Fetch from prerender.io
        const prerenderResponse = await fetch(prerenderUrl, {
          headers: {
            'X-Prerender-Token': env.PRERENDER_TOKEN || PRERENDER_TOKEN,
            'X-Prerender-Int-Type': 'cloudflare-worker',
          },
          cf: {
            // Cache prerendered content for 1 hour
            cacheTtl: 3600,
            cacheEverything: true,
          },
        });

        // If prerender.io returns success, return the prerendered HTML
        if (prerenderResponse.ok) {
          const html = await prerenderResponse.text();

          return new Response(html, {
            status: prerenderResponse.status,
            headers: {
              'Content-Type': 'text/html;charset=UTF-8',
              'X-Prerendered': 'true',
              'Cache-Control': 'public, max-age=3600',
            },
          });
        }

        // If prerender.io fails, fall through to origin
        console.log(`Prerender.io returned ${prerenderResponse.status}, falling back to origin`);
      } catch (error) {
        // If prerender.io request fails, fall through to origin
        console.error('Prerender.io error:', error);
      }
    }

    // For non-bot requests or if prerender fails, fetch from origin
    return fetch(request);
  },
};
