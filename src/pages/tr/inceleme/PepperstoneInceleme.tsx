import TRLayout from "@/components/tr/TRLayout";
import { Star, ExternalLink, Check, X, Shield, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { brokers } from "@/lib/brokers";
import { trackAffiliateClick } from "@/lib/tracking";
import { trackTRBrokerClick, trackTRPageView } from "@/lib/trackingTR";
import BrokerLogo from "@/components/BrokerLogo";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const PepperstoneInceleme = () => {
  const broker = brokers.pepperstone;
  const overallRating = 4.3;

  // Track page view on mount
  useEffect(() => {
    trackTRPageView("pepperstone", "review");
  }, []);


  const ratings = [
    { label: "İşlem Koşulları", score: 4.3 },
    { label: "Platform ve Araçlar", score: 4.4 },
    { label: "Müşteri Desteği", score: 4.2 },
    { label: "Para Yatırma/Çekme", score: 4.3 },
    { label: "Güvenilirlik", score: 4.3 },
  ];

  const accountTypes = [
    { name: "Standard", minDeposit: "$0", leverage: "1:500", spread: "1.0 pip'ten", commission: "Yok", popular: true },
    { name: "Razor", minDeposit: "$0", leverage: "1:500", spread: "0.0 pip'ten", commission: "$3.50/lot" },
  ];

  const pros = [
    "Çoklu birinci sınıf regülasyon (FCA, ASIC, CySEC)",
    "Ultra düşük spread'ler (Razor hesabı)",
    "Minimum depozito yok",
    "MT4, MT5 ve cTrader platformları",
    "Hızlı emir yürütme",
    "Sosyal trading (Myfxbook, DupliTrade)",
    "VPS hizmeti mevcut",
    "Ödüllü müşteri hizmetleri",
  ];

  const cons = [
    "Bonus kampanyaları yok",
    "Kripto CFD seçenekleri sınırlı",
    "Türkçe site desteği sınırlı",
    "ABD müşterileri kabul edilmiyor",
  ];

  return (
    <TRLayout
      title="Pepperstone İnceleme 2026 - Türk Yatırımcılar İçin"
      description="Pepperstone broker detaylı inceleme. ASIC ve FCA regülasyonlu, ultra düşük spread'ler, MT4/MT5/cTrader platformları."
      >
      {/* Hero Section */}
      <section className="pt-12 pb-12 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col lg:flex-row items-start gap-8">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
                  <Award className="w-4 h-4 text-primary" />
                  <span className="text-sm text-primary font-medium">Çoklu Ödüllü Broker</span>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <BrokerLogo broker={broker} className="w-20 h-20 rounded-2xl" imgClassName="p-2" />
                  <div>
                    <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Pepperstone İnceleme</h1>
                    <p className="text-muted-foreground mt-1">2010'dan beri profesyonel broker</p>
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
                  Pepperstone, 2010 yılında Avustralya'da kurulan ve dünya genelinde saygın bir
                  konuma ulaşmış profesyonel bir forex brokeridir. ASIC (Avustralya) ve FCA (İngiltere)
                  gibi birinci sınıf regülasyonlara sahiptir. Ultra düşük spread'ler ve hızlı emir
                  yürütme ile özellikle aktif trader'lar arasında tercih edilmektedir.
                </p>

                <div className="flex flex-wrap gap-3">
                  <Button size="lg" asChild>
                    <a href={broker.siteUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackAffiliateClick("pepperstone", "tr_review_hero", "visit_site")}>
                      Pepperstone'u Ziyaret Et <ExternalLink className="w-4 h-4 ml-2" />
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
                      <span className="font-semibold text-foreground">2010</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground text-sm">Regülasyon</span>
                      <span className="font-semibold text-foreground">ASIC, FCA</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground text-sm">Min Depozito</span>
                      <span className="font-semibold text-green-600">$0</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground text-sm">Max Kaldıraç</span>
                      <span className="font-semibold text-primary">1:500</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-muted-foreground text-sm">Platformlar</span>
                      <span className="font-semibold text-foreground">MT4, MT5, cTrader</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commission Banner - Tıklanabilir */}
      <section className="py-8 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-4">
          <a
            href={broker.siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackTRBrokerClick("pepperstone", "tr_review_commission_banner", "click")}
            className="block max-w-4xl mx-auto text-center hover:opacity-90 transition-opacity cursor-pointer"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <img src="/brokers/pepperstone-logo.png" alt="Pepperstone" className="h-10" />
              <span className="text-white/60 text-sm">0.0 SPREAD</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              En Düşük <span className="text-red-400">SPREAD'LER!</span>
            </h2>
            <p className="text-xl text-white mb-4">
              TradingView Ücretsiz <span className="text-red-400">+ Active Trader Rebate</span>
            </p>
            <div className="inline-flex items-center gap-2 bg-amber-500 text-slate-900 font-bold px-6 py-2 rounded-full hover:bg-amber-400 transition-colors">
              Pepperstone'u Seçin!
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
                Pepperstone, özellikle profesyonel ve aktif trader'lar için mükemmel bir seçimdir.
                Birinci sınıf regülasyonlar (ASIC, FCA), ultra düşük spread'ler ve hızlı emir
                yürütme ile sektörün en iyi brokerleri arasında yer almaktadır.
              </p>
              <p>
                Razor hesabı ile 0.0 pip'ten başlayan spread'ler ve düşük komisyonlarla
                işlem yapabilirsiniz. Minimum depozito gerektirmemesi de büyük avantaj.
              </p>
              <p className="font-semibold">
                Tavsiye: Profesyonel işlem koşulları, düşük maliyetler ve güçlü regülasyon arayan orta-ileri seviye yatırımcılar için idealdir.
              </p>
            </div>
            <div className="mt-6">
              <Button size="lg" asChild>
                <a href={broker.siteUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackAffiliateClick("pepperstone", "tr_review_bottom", "visit_site")}>
                  Pepperstone'da Hesap Aç <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </TRLayout>
  );
};

export default PepperstoneInceleme;
