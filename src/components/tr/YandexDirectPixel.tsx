import { useEffect } from 'react';

/**
 * Yandex Direct Conversion Pixel
 *
 * KULLANIM:
 * 1. Yandex Direct'te kampanya oluştur
 * 2. "Counter" menüsünden conversion goal oluştur
 * 3. Pixel kodunu buraya ekle
 * 4. TRLayout'a bu component'i ekle
 *
 * CONVERSION GOALS:
 * - Hesap Aç Tıklama (Primary Goal)
 * - Bonus Sayfası Görüntüleme
 * - 30 Saniye Site'de Kalma
 * - %50 Scroll
 */

interface YandexDirectPixelProps {
  // Yandex Direct Conversion ID (kampanya oluşturduktan sonra buraya ekle)
  conversionId?: string;
  goalId?: string;
}

const YandexDirectPixel = ({ conversionId, goalId }: YandexDirectPixelProps) => {
  useEffect(() => {
    // Yandex Direct pixel henüz kurulmadı
    // Kampanya aktif olduğunda pixel kodu buraya eklenecek

    if (!conversionId) {
      if (import.meta.env.DEV) {
        console.log('📊 Yandex Direct Pixel: Not configured yet. Add conversion ID after campaign setup.');
      }
      return;
    }

    // Örnek Yandex Direct Pixel Kodu (kampanya sonrası aktif olacak):
    /*
    (function(m,e,t,r,i,k,a){
      m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();
      k=e.createElement(t),a=e.getElementsByTagName(t)[0],
      k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
    })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

    ym(COUNTER_ID, "init", {
      clickmap:true,
      trackLinks:true,
      accurateTrackBounce:true
    });
    */

    if (import.meta.env.DEV) {
      console.log('📊 Yandex Direct Pixel: Loaded with conversion ID:', conversionId);
    }
  }, [conversionId, goalId]);

  return (
    <>
      {/* Yandex Direct Pixel burada render edilecek */}
      {conversionId && (
        <noscript>
          <div>
            <img
              src={`https://mc.yandex.ru/watch/${conversionId}`}
              style={{ position: 'absolute', left: '-9999px' }}
              alt=""
            />
          </div>
        </noscript>
      )}
    </>
  );
};

export default YandexDirectPixel;
