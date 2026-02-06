import { useState, useEffect } from 'react';

export type UserRegion = 'US' | 'INTL';

/**
 * Hook to detect user's region based on geolocation
 *
 * Detection strategy (in order):
 * 1. Check cookie set by Cloudflare Worker (_middleware.js)
 * 2. Fallback: Fetch from Cloudflare trace endpoint (/cdn-cgi/trace)
 * 3. Default: 'US' if all detection methods fail
 *
 * @returns UserRegion ('US' | 'INTL')
 */
export function useRegion(): UserRegion {
  const [region, setRegion] = useState<UserRegion>('US'); // Default to US for safety

  useEffect(() => {
    // 1. Check cookie first (set by Cloudflare Worker)
    const cookieRegion = document.cookie
      .split('; ')
      .find(row => row.startsWith('user_region='))
      ?.split('=')[1];

    if (cookieRegion === 'US' || cookieRegion === 'INTL') {
      setRegion(cookieRegion as UserRegion);
      return;
    }

    // 2. Fallback: Fetch from Cloudflare trace endpoint
    fetch('/cdn-cgi/trace')
      .then(res => res.text())
      .then(data => {
        // Parse Cloudflare trace response (format: key=value\n)
        const country = data.match(/loc=(.+)/)?.[1];
        const detected = country === 'US' ? 'US' : 'INTL';
        setRegion(detected);

        // Set cookie for future visits (client-side fallback)
        // Expires in 7 days (604800 seconds)
        document.cookie = `user_region=${detected}; Path=/; Max-Age=604800; SameSite=Lax`;
      })
      .catch((error) => {
        // If all detection fails, stay with default 'US'
        console.warn('Region detection failed, defaulting to US:', error);
      });
  }, []);

  return region;
}
