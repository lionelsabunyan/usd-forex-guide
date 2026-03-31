import TRLayout from "@/components/tr/TRLayout";
import { Star, ExternalLink, Check, X, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { brokers } from "@/lib/brokers";
import { trackAffiliateClick } from "@/lib/tracking";
import { trackTRBrokerClick, trackTRPageView } from "@/lib/trackingTR";
import BrokerLogo from "@/components/BrokerLogo";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const IGInceleme = () => {
  const broker = brokers.ig;
  const overallRating = 3.6;

  useEffect(() => {
    trackTRPageView("ig", "review");
  }, []);

  const ratings = [
    { label: "İşlem Koşulları", score: 4.0 },
    { label: "Platform ve Araçlar", score: 4.5 },
    { label: "Müşteri Desteği", score: 4.0 },
    { label: "Para Yatırma/Çekme", score: 3.8 },
    { label: "Güvenilirlik", score: 5.0 },
  ];

  const accountTypes = [
    { name: "Standard Account", minDeposit: "$250", leverage: "1:50", spread: "0.6 pip'ten", commission: "Yok", popular: true },
  ];

  const pros = [
    "50+ yıllık deneyim (1974'ten beri)",
    "CFTC/NFA ve FCA regülasyonlu",
    "Mükemmel araştırma ve analiz araçları",
    "Rekabetçi spread'ler (0.6 pip'ten)",
    "ProRealTime dahil çoklu platform",
    "Geniş enstrüman yelpazesi",
    "Negatif bakiye koruması",
    "Güçlü eğitim içerikleri",
  ];

  const cons = [
    "Yüksek minimum depozito ($250)",
    "Kaldıraç sınırlı (maks 1:50, CFTC kuralı)",
    "Türkçe destek yok",
    "Kripto para ile yatırım yok",
  ];

  return (
    <TRLayout
      title="IG Markets İnceleme 2026 - 50 Yıllık Deneyim"
      description="IG Markets broker detaylı inceleme. 1974'ten beri faaliyet, CFTC/NFA ve FCA regülasyonlu, gelişmiş araştırma araçları ve rekabetçi spread'ler."
      keywords="ig markets broker, ig inceleme, ig türkiye, ig markets spread, fca regülasyonlu broker"
    >
      {/* Hero Section */}
      <section className="pt-12 pb-12 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col lg:flex-row items-start gap-8">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
                  <Shield className="w-4 h-4 text-primary" />
                  <span className="text-sm text-primary font-medium">50+ Yıllık Deneyim</span>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <BrokerLogo broker={broker} className="w-20 h-20 rounded-2xl" imgClassName="p-2" />
                  <div>
                    <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">IG Markets İnceleme</h1>
                    <p className="text-muted-foreground mt-1">1974'ten beri piyasanın devlerinden</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-5 h-5 ${i < Math.floor(overallRating) ? 'fill-primary text-primary' : 'text-muted'}`} />
                    ))}
                  </div>
                  <span className="text-xl font-bold text-foreground">{overallRating}/5</span>
                </div>

                <p className="text-muted-foreground mb-6">
                  IG Markets, 1974'te kurulan ve Londra Borsası'nda işlem gören dünyanın en büyük
                  forex ve CFD brokerlarından biridir. CFTC/NFA ve FCA çift regülasyonuyla en
                  güvenilir brokerlar arasında yer alır. Gelişmiş araştırma araçları ve 17.000+ enstrüman sunar.
                </p>

                <div className="flex flex-wrap gap-3">
                  <Button size="lg" asChild>
                    <a href={broker.siteUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackAffiliateClick("ig", "tr_review_hero", "visit_site")}>
                      IG Markets'i Ziyaret Et <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/tr">Brokerları Karşılaştır</Link>
                  </Button>
                </div>
              </div>

              <div className="lg:w-72 w-full">
                <Card className="bg-card border-border">
                  <CardHeader className="pb-2"><CardTitle className="text-lg">Hızlı Bilgiler</CardTitle></CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground text-sm">Kuruluş</span>
                      <span className="font-semibold text-foreground">1974</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground text-sm">Regülasyon</span>
                      <span className="font-semibold text-foreground">CFTC/NFA, FCA</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground text-sm">Min Depozito</span>
                      <span className="font-semibold text-foreground">$250</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground text-sm">Max Kaldıraç</span>
                      <span className="font-semibold text-primary">1:50</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-muted-foreground text-sm">Platformlar</span>
                      <span className="font-semibold text-foreground">IG, MT4, PRT</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commission Banner */}
      <section className="py-8 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-4">
          <a
            href={broker.siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackTRBrokerClick("ig", "tr_review_commission_banner", "click")}
            className="block max-w-4xl mx-auto text-center hover:opacity-90 transition-opacity cursor-pointer"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <img src="/images/brokers/ig.svg" alt="IG Markets" className="h-10" width={120} height={40} loading="lazy" />
              <span className="text-white/60 text-sm">50+ YILLIK DENEYİM</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              <span className="text-yellow-400">17,000+</span> Enstrüman
            </h2>
            <p className="text-xl text-white mb-4">
              0.6 pip Spread + <span className="text-yellow-400">Gelişmiş Araçlar</span>
            </p>
            <div className="inline-flex items-center gap-2 bg-amber-500 text-slate-900 font-bold px-6 py-2 rounded-full hover:bg-amber-400 transition-colors">
              IG Markets'i Keşfedin!
            </div>
            <p className="text-xs text-white/50 mt-4">
              Sermayeniz risk altındadır. *Şartlar ve Koşullar geçerlidir.
            </p>
          </a>
        </div>
      </section>

      {/* Ratings */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Detaylı Puanlama</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ratings.map((rating) => (
                <div key={rating.label} className="bg-card border border-border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-foreground font-medium">{rating.label}</span>
                    <span className="font-bold text-primary">{rating.score}/5</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: `${(rating.score / 5) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pros & Cons */}
      <section className="py-12 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Artılar ve Eksiler</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-green-200 dark:border-green-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-green-700 dark:text-green-400 flex items-center gap-2">
                    <Check className="w-5 h-5" /> Artılar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-red-200 dark:border-red-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-red-700 dark:text-red-400 flex items-center gap-2">
                    <X className="w-5 h-5" /> Eksiler
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <X className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                        {con}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-6 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="p-6 bg-primary/5 border border-primary/20 rounded-2xl text-center">
              <p className="text-foreground font-semibold mb-2">
                IG Markets, 50 yılı aşkın deneyimiyle sektörün en güvenilir brokerı
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                $250 minimum depozito · CFTC/NFA + FCA regülasyonlu · 17,000+ enstrüman
              </p>
              <Button size="lg" asChild>
                <a href={broker.siteUrl} target="_blank" rel="noopener noreferrer"
                   onClick={() => trackTRBrokerClick("ig", "tr_review_pros_cons", "hesap_ac")}>
                  IG'de Hesap Aç <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Account Types */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Hesap Türleri</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-secondary">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Hesap</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-foreground">Min. Depozito</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-foreground">Kaldıraç</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-foreground">Spread</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-foreground">Komisyon</th>
                  </tr>
                </thead>
                <tbody>
                  {accountTypes.map((account) => (
                    <tr key={account.name} className={`border-t border-border ${account.popular ? 'bg-primary/5' : ''}`}>
                      <td className="px-4 py-3 font-medium text-foreground">
                        {account.name}
                        {account.popular && <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">Popüler</span>}
                      </td>
                      <td className="px-4 py-3 text-center text-muted-foreground">{account.minDeposit}</td>
                      <td className="px-4 py-3 text-center text-muted-foreground">{account.leverage}</td>
                      <td className="px-4 py-3 text-center text-muted-foreground">{account.spread}</td>
                      <td className="px-4 py-3 text-center text-muted-foreground">{account.commission}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="py-12 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Sonuç</h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p>
                IG Markets, 1974'ten beri faaliyet gösteren dünyanın en eski ve en saygın forex
                brokerlarından biridir. Londra Borsası'nda işlem görmesi ve çift regülasyonu
                (CFTC/NFA + FCA) güvenilirliğini kanıtlar.
              </p>
              <p>
                Gelişmiş araştırma araçları, ProRealTime platformu ve 17.000'den fazla enstrüman
                ile özellikle deneyimli yatırımcılara hitap eder. Ancak $250 minimum depozito
                yeni başlayanlar için engelleyici olabilir.
              </p>
              <p className="font-semibold">
                Tavsiye: Güvenilirlik ve gelişmiş araçlar arayan orta-ileri seviye yatırımcılar için idealdir.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-6 mb-6">
              <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                <p className="text-xs font-semibold text-green-700 dark:text-green-400 mb-1">Uygun</p>
                <p className="text-xs text-green-600 dark:text-green-500">Deneyimli işlemciler<br/>Araştırma odaklı</p>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-1">İdeal</p>
                <p className="text-xs text-blue-600 dark:text-blue-500">ABD yatırımcıları<br/>Çoklu varlık işlemcileri</p>
              </div>
              <div className="p-3 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-800">
                <p className="text-xs font-semibold text-red-700 dark:text-red-400 mb-1">Uygun Değil</p>
                <p className="text-xs text-red-600 dark:text-red-500">Düşük bütçeli<br/>Yüksek kaldıraç arayanlar</p>
              </div>
            </div>

            <div className="mt-2">
              <Button size="lg" asChild>
                <a href={broker.siteUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackTRBrokerClick("ig", "tr_review_bottom", "hesap_ac")}>
                  IG Markets'te Hesap Aç <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </TRLayout>
  );
};

export default IGInceleme;
