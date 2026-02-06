/**
 * Cloudflare Pages Middleware for Prerender.io Integration
 * Detects bot traffic and serves prerendered HTML for SEO
 */

const BOT_AGENTS = [
  'googlebot',
  'yahoo! slurp',
  'bingbot',
  'yandex',
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

// File extensions to ignore
const IGNORED_EXTENSIONS = [
  '.js', '.css', '.xml', '.less', '.png', '.jpg', '.jpeg', '.gif', '.pdf',
  '.doc', '.txt', '.ico', '.rss', '.zip', '.mp3', '.rar', '.exe', '.wmv',
  '.avi', '.ppt', '.mpg', '.mpeg', '.tif', '.wav', '.mov', '.psd',
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
  return isBot(userAgent);
}

export async function onRequest(context) {
  const { request, next } = context;

  // Get user's country from Cloudflare (available in request.cf)
  const country = request.cf?.country || 'US';
  const isUS = country === 'US';
  const userRegion = isUS ? 'US' : 'INTL';

  // Check if we should prerender this request (for bot traffic)
  if (shouldPrerender(request)) {
    try {
      const url = new URL(request.url);

      // Build prerender URL
      const prerenderUrl = `https://service.prerender.io/${url.href}`;

      // Fetch from prerender.io
      const prerenderResponse = await fetch(prerenderUrl, {
        headers: {
          'X-Prerender-Token': PRERENDER_TOKEN,
          'X-Prerender-Int-Type': 'cloudflare-pages',
        },
        cf: {
          cacheTtl: 86400, // Cache for 24 hours
          cacheEverything: true,
        },
      });

      // If prerender.io returns success, return the prerendered HTML
      if (prerenderResponse.ok) {
        const html = await prerenderResponse.text();

        return new Response(html, {
          status: 200,
          headers: {
            'Content-Type': 'text/html;charset=UTF-8',
            'X-Prerendered': 'true',
            'Cache-Control': 'public, max-age=86400',
            'X-User-Region': userRegion,
            'X-User-Country': country,
          },
        });
      }

      // If prerender.io fails, continue to origin
      console.log(`Prerender.io returned ${prerenderResponse.status}`);
    } catch (error) {
      console.error('Prerender.io error:', error.message);
    }
  }

  // For non-bot requests or if prerender fails, continue to origin
  const response = await next();

  // Clone response to add geolocation headers and cookie
  const newResponse = new Response(response.body, response);

  // Set region cookie (7 days expiry = 604800 seconds)
  newResponse.headers.append(
    'Set-Cookie',
    `user_region=${userRegion}; Path=/; Max-Age=604800; SameSite=Lax`
  );

  // Add headers for client-side detection (optional, for debugging)
  newResponse.headers.set('X-User-Region', userRegion);
  newResponse.headers.set('X-User-Country', country);

  return newResponse;
}
