import TRLayout from "@/components/tr/TRLayout";
import BrokerTableTR from "@/components/tr/BrokerTableTR";
import BonusSectionTR from "@/components/tr/BonusSectionTR";
import { Shield, TrendingUp, Users, Globe, CheckCircle2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackTRPageView } from "@/lib/trackingTR";
import { useEffect } from "react";

// TR Broker logoları - Güncelleme: Pepperstone (mavi) ve Exness (siyah-sarı) yeni logolar
const TR_BROKER_LOGOS = [
  { id: "hfm", name: "HFM", logo: "/brokers/hfm-banner.jpg" },
  { id: "xm", name: "XM", logo: "/brokers/xm-banner.jpg" },
  { id: "fxpro", name: "FxPro", logo: "/brokers/fxpro-logo.png" },
  { id: "exness", name: "Exness", logo: "/brokers/exness-banner.jpg" },
  { id: "pepperstone", name: "Pepperstone", logo: "/brokers/pepperstone-banner.jpg" },
  { id: "fbs", name: "FBS", logo: "/brokers/fbs.svg" },
  { id: "fxtm", name: "FXTM", logo: "/brokers/fxtm.svg" },
];

const AnaSayfa = () => {
  // Track homepage view
  useEffect(() => {
    trackTRPageView("xm", "home"); // xm parametresi sadece placeholder, home için broker_id optional
  }, []);

  // Schema.org FAQPage data
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Forex broker seçerken nelere dikkat etmeliyim?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Broker'ın hangi düzenleyici kurum tarafından lisanslandığını kontrol edin. FCA (İngiltere), CySEC (Kıbrıs), ASIC (Avustralya) gibi saygın kurumlar yatırımcı koruması sağlar. İşlem maliyetleri, spread ve komisyon oranlarını karşılaştırın."
        }
      },
      {
        "@type": "Question",
        "name": "Türkiye'den forex işlemi yapabilir miyim?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Evet, Türkiye'den uluslararası forex brokerlar üzerinden işlem yapabilirsiniz. Türkçe destek veren, lisanslı brokerları tercih edin. Bazı broker siteleri engellenmiş olabilir, VPN kullanarak erişebilirsiniz."
        }
      },
      {
        "@type": "Question",
        "name": "En düşük minimum depozito ne kadar?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "XM, HFM ve Exness gibi brokerlar $5 minimum depozito ile hesap açmanıza izin verir. Bu, yeni başlayanlar için düşük riskli bir başlangıç sağlar."
        }
      },
      {
        "@type": "Question",
        "name": "Hangi broker'lar Türkçe destek veriyor?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "XM, HFM, FxPro, Exness, Pepperstone, FBS ve FXTM 7/24 Türkçe müşteri desteği sunmaktadır. Hem canlı sohbet hem de telefon desteği mevcuttur."
        }
      }
    ]
  };

  return (
    <TRLayout
      title="Türkiye'den Erişilebilen Forex Brokerları 2026"
      description="2026'nın en iyi forex broker'larını karşılaştırın. FCA, CySEC lisanslı, Türkçe destekli broker incelemeleri. Spread analizi ve bonus kampanyaları."
      keywords="forex türkiye, forex broker, türkçe destek forex, forex karşılaştırma, en iyi forex broker 2026"
    >
      {/* Schema.org FAQPage Markup */}
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
      {/* Hero Section - Lacivert Tema */}
      <section className="pt-8 pb-10 md:pt-16 md:pb-20 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* Subtle Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        </div>

        {/* Accent Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/10 blur-[100px] rounded-full"></div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto">
            {/* Badge - Desktop only */}
            <div className="hidden md:flex justify-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-sm font-medium text-amber-300">Şubat 2026 Güncel</span>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-center mb-4 md:mb-6 tracking-tight">
              <span className="text-white">Güvenilir Forex Şirketleri</span>
              <br />
              <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 bg-clip-text text-transparent">İncelemeleri</span>
            </h1>

            {/* Subheading */}
            <p className="text-base md:text-xl text-center text-slate-300 mb-6 md:mb-10 max-w-2xl mx-auto leading-relaxed">
              Türkçe destek veren, lisanslı ve test edilmiş broker'lar.
              <span className="hidden md:inline text-slate-400"> Daha fazlasına ihtiyacınız yok.</span>
            </p>

            {/* Key Features - Pill Style - Desktop only */}
            <div className="hidden md:flex flex-wrap justify-center gap-3 mb-12">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-700/50 border border-slate-600">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-slate-200">Türkçe Destek</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-700/50 border border-slate-600">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-slate-200">Lisanslı Kurumlar</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-700/50 border border-slate-600">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-slate-200">Bonus Kampanyaları</span>
              </div>
            </div>

            {/* Broker Logos - Desktop only */}
            <div className="hidden md:block bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 mb-8 shadow-lg">
              <p className="text-xs text-center text-slate-500 dark:text-slate-400 mb-5 uppercase tracking-wider font-medium">
                İncelediğimiz Brokerlar
              </p>
              <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
                {TR_BROKER_LOGOS.map((broker) => (
                  <a
                    key={broker.id}
                    href={`/tr/inceleme/${broker.id}`}
                    className="hover:scale-105 transition-transform hover:opacity-80 bg-white dark:bg-slate-900 rounded-lg p-2 shadow-sm"
                    title={`${broker.name} İncelemesi`}
                  >
                    <img
                      src={broker.logo}
                      alt={`${broker.name} Logo`}
                      className="h-10 md:h-12 w-auto object-contain"
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-900 px-8 py-5 md:px-10 md:py-6 text-base md:text-lg font-bold shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/30 transition-all rounded-xl"
                onClick={() => document.getElementById('karsilastirma')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Broker'ları Karşılaştır
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals - Desktop only */}
      <section className="hidden md:block py-16 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="text-center p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-slate-900 dark:bg-slate-700 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">Lisanslı Kurumlar</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                FCA, CySEC, ASIC regülasyonlu, güvenilir broker'lar
              </p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-slate-900 dark:bg-slate-700 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">Detaylı Karşılaştırma</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Spread, komisyon, bonus ve para çekme süreleri
              </p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-slate-900 dark:bg-slate-700 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-sky-400" />
              </div>
              <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">Türkçe Destek</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                7/24 Türkçe müşteri hizmetleri
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Broker Comparison Table */}
      <BrokerTableTR />

      {/* Bonus Section */}
      <BonusSectionTR />

      {/* VPN Notu - Soft */}
      <div className="container mx-auto px-4 py-4">
        <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1.5">
          <Globe className="w-3.5 h-3.5 flex-shrink-0" />
          Bazı broker siteleri Türkiye'den engellenmiş olabilir. VPN ile erişebilirsiniz.
        </p>
      </div>

      {/* Info Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-slate dark:prose-invert">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-center mb-8">
              Forex Broker Seçerken Nelere Dikkat Etmelisiniz?
            </h2>

            <div className="space-y-6 text-muted-foreground">
              <div>
                <h3 className="text-foreground font-semibold">Lisans ve Düzenleme</h3>
                <p>
                  Broker'ın hangi düzenleyici kurum tarafından lisanslandığını kontrol edin.
                  FCA (İngiltere), CySEC (Kıbrıs), ASIC (Avustralya) gibi saygın kurumlar
                  yatırımcı koruması sağlar.
                </p>
              </div>

              <div>
                <h3 className="text-foreground font-semibold">İşlem Maliyetleri</h3>
                <p>
                  Spread ve komisyon oranlarını karşılaştırın. Düşük spread'ler özellikle
                  kısa vadeli işlemciler için önemlidir. Gizli ücretlere dikkat edin.
                </p>
              </div>

              <div>
                <h3 className="text-foreground font-semibold">Platform ve Araçlar</h3>
                <p>
                  MetaTrader 4, MetaTrader 5 veya özel platformlar arasından size uygun
                  olanı seçin. Mobil uygulama kalitesi de önemli bir faktördür.
                </p>
              </div>

              <div>
                <h3 className="text-foreground font-semibold">Müşteri Desteği</h3>
                <p>
                  Türkçe destek sunup sunmadığını, destek saatlerini ve iletişim
                  kanallarını kontrol edin.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </TRLayout>
  );
};

export default AnaSayfa;
