import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useRegion, UserRegion } from '@/hooks/useRegion';

export function RegionSwitcher() {
  const detectedRegion = useRegion();
  const [preferredRegion, setPreferredRegion] = useLocalStorage<UserRegion | null>('preferred_region', null);

  // Use preferred region if set, otherwise use detected region
  const activeRegion = preferredRegion || detectedRegion;

  const handleRegionChange = (region: UserRegion) => {
    console.log('[RegionSwitcher] Changing region to:', region);
    console.log('[RegionSwitcher] Current preferredRegion:', preferredRegion);
    console.log('[RegionSwitcher] Current detectedRegion:', detectedRegion);
    setPreferredRegion(region);
    console.log('[RegionSwitcher] Set preferredRegion, reloading...');
    // Force page reload to apply new region filter
    window.location.reload();
  };

  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
      <span className="text-sm font-medium text-gray-700">
        Show brokers for:
      </span>
      <div className="flex gap-2">
        <button
          onClick={() => handleRegionChange('US')}
          className={`
            px-4 py-2 rounded-md text-sm font-medium transition-all
            ${activeRegion === 'US'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }
          `}
        >
          🇺🇸 United States
        </button>
        <button
          onClick={() => handleRegionChange('INTL')}
          className={`
            px-4 py-2 rounded-md text-sm font-medium transition-all
            ${activeRegion === 'INTL'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }
          `}
        >
          🌍 International
        </button>
      </div>
    </div>
  );
}
