import TRLayout from "@/components/tr/TRLayout";
import HesapAcmaRehberi from "@/components/tr/HesapAcmaRehberi";
import { Star, ExternalLink, Check, X, Award, CreditCard, Clock, Wallet, Shield, Zap, Globe, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { brokers } from "@/lib/brokers";
import { trBrokerInfo } from "@/lib/brokersTR";
import { trackAffiliateClick } from "@/lib/tracking";
import { trackTRBrokerClick, trackTRPageView } from "@/lib/trackingTR";
import BrokerLogo from "@/components/BrokerLogo";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const FxProInceleme = () => {
  const broker = brokers.fxpro;
  const trInfo = trBrokerInfo.fxpro;
  const affiliateUrl = trInfo?.affiliateUrl || broker.siteUrl;
  const overallRating = 4.6;

  // Track page view on mount
  useEffect(() => {
    trackTRPageView("fxpro", "review");
  }, []);


  const ratings = [
    { label: "İşlem Koşulları", score: 4.5 },
    { label: "Platform ve Araçlar", score: 4.8 },
    { label: "Müşteri Desteği", score: 4.4 },
    { label: "Para Yatırma/Çekme", score: 4.5 },
    { label: "Eğitim ve Araştırma", score: 4.3 },
    { label: "Güvenilirlik", score: 4.9 },
  ];

  const accountTypes = [
    { name: "Standard", minDeposit: "$100", leverage: "1:200", spread: "1.2 pip'ten", commission: "Yok", platform: "MT4, MT5" },
    { name: "Raw+", minDeposit: "$1,000", leverage: "1:200", spread: "0.0 pip'ten", commission: "$3.50/lot", platform: "MT4, MT5", popular: true },
    { name: "Elite", minDeposit: "$30,000", leverage: "1:200", spread: "0.0 pip'ten", commission: "$3.00/lot", platform: "MT4, MT5" },
    { name: "cTrader", minDeposit: "$100", leverage: "1:200", spread: "0.3 pip'ten", commission: "$3.50/lot", platform: "cTrader" },
  ];

  const pros = [
    "Tier-1 regülasyonlar (FCA, CySEC, FSCA, SCB)",
    "20 yıllık sektör deneyimi (2006)",
    "MT4, MT5 ve cTrader platformları",
    "Sıfır spread hesap seçenekleri (Raw+)",
    "Hızlı emir yürütme (<13ms)",
    "Negatif bakiye koruması",
    "Ücretsiz VPS hizmeti",
    "7/24 çok dilli müşteri desteği",
    "2100+ işlem enstrümanı",
    "Gelişmiş trading araçları",
  ];

  const cons = [
    "Minimum depozito bazı hesaplarda yüksek ($1,000 - $30,000)",
    "Bonus kampanyaları yok",
    "12 ay inaktivite sonrası $15/ay ücret",
    "Kripto CFD seçenekleri sınırlı",
  ];

  // Hesap açma adımları
  const hesapAcmaAdimlari = [
    {
      title: "FxPro Hesap Aç Sayfasına Gidin",
      description: "FxPro ana sayfasından 'Hesap Aç' butonuna tıklayın veya doğrudan kayıt sayfasına gidin.",
      tips: [
        "direct.fxpro.com adresinden kayıt olun",
        "Türkçe dil desteği mevcuttur",
        "Mobil veya masaüstünden kayıt yapılabilir",
      ],
    },
    {
      title: "E-posta ve Şifre Oluşturun",
      description: "Geçerli bir e-posta adresi girin ve güçlü bir şifre oluşturun. E-posta doğrulaması için link gönderilecektir.",
      tips: [
        "Aktif kullandığınız e-posta adresini girin",
        "Şifre en az 8 karakter, büyük/küçük harf ve rakam içermeli",
        "Spam klasörünü kontrol etmeyi unutmayın",
      ],
    },
    {
      title: "Kişisel Bilgilerinizi Doldurun",
      description: "Ad, soyad, doğum tarihi, adres ve telefon numaranızı girin. Bu bilgiler kimlik belgenizle eşleşmelidir.",
      tips: [
        "Bilgilerinizi İngilizce karakterlerle yazın",
        "Telefon numaranızı +90 ile başlatın",
        "Adres bilgisi fatura ile doğrulanacak",
      ],
    },
    {
      title: "Hesap Türü ve Platform Seçin",
      description: "Standard, Raw+ veya cTrader hesap türlerinden birini seçin. Yeni başlayanlar için Standard hesap önerilir.",
      tips: [
        "Standard: Komisyonsuz, 1.2 pip spread",
        "Raw+: Sıfır spread, $3.50/lot komisyon (aktif trader'lar için)",
        "cTrader: Gelişmiş platform arayanlar için",
      ],
    },
    {
      title: "Kimlik Doğrulama (KYC)",
      description: "Hesabınızı aktif etmek için kimlik belgesi (TC kimlik kartı, ehliyet veya pasaport) ve adres belgesi yükleyin.",
      tips: [
        "Belgelerin tüm köşeleri görünür olmalı",
        "Fotoğraf net ve okunabilir olmalı",
        "Adres belgesi son 3 ay içinde olmalı",
      ],
      warning: "KYC onaylanmadan para yatırabilirsiniz ancak çekemezsiniz. Onay genellikle 24 saat içinde tamamlanır.",
    },
    {
      title: "Para Yatırın ve İşleme Başlayın",
      description: "Hesabınıza minimum $100 yatırarak işlem yapmaya başlayabilirsiniz. Banka kartı ile anında yatırım mümkündür.",
      tips: [
        "Kredi/banka kartı ile anında yatırım",
        "Banka havalesi 1-3 iş günü sürebilir",
        "Tüm yatırımlar ücretsizdir",
      ],
    },
  ];

  return (
    <TRLayout
      title="FxPro İnceleme 2026 - Türk Yatırımcılar İçin Detaylı Rehber"
      description="FxPro broker detaylı inceleme. FCA ve CySEC regülasyonlu, MT4/MT5/cTrader platformları, sıfır spread hesapları. 2006'dan beri güvenilir broker."
      >
      {/* Hero Section */}
      <section className="pt-12 pb-12 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col lg:flex-row items-start gap-8">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 mb-4">
                  <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm text-blue-700 dark:text-blue-300 font-medium">FCA & CySEC Regülasyonlu</span>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <BrokerLogo broker={broker} className="w-20 h-20 rounded-2xl" imgClassName="p-2" />
                  <div>
                    <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">FxPro İnceleme</h1>
                    <p className="text-muted-foreground mt-1">2006'dan beri profesyonel trading</p>
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
                  FxPro, <strong>2006'dan bu yana</strong> dünya genelinde faaliyet gösteren, <strong>FCA ve CySEC</strong> gibi
                  Tier-1 regülatörler tarafından denetlenen profesyonel bir forex brokeridir. MT4, MT5 ve cTrader
                  platformları ile <strong>2100+ enstrümanda</strong> işlem imkanı sunar.
                </p>

                <div className="flex flex-wrap gap-3">
                  <Button size="lg" asChild>
                    <a href={affiliateUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackAffiliateClick("fxpro", "tr_review_hero", "hesap_ac")}>
                      FxPro'da Hesap Aç <ExternalLink className="w-4 h-4 ml-2" />
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
                      <span className="font-semibold text-foreground">2006</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground text-sm">Regülasyon</span>
                      <span className="font-semibold text-foreground">FCA, CySEC, FSCA</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground text-sm">Min Depozito</span>
                      <span className="font-semibold text-foreground">$100</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground text-sm">Max Kaldıraç</span>
                      <span className="font-semibold text-primary">1:200</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground text-sm">Platformlar</span>
                      <span className="font-semibold text-foreground">MT4, MT5, cTrader</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-muted-foreground text-sm">TR Destek</span>
                      <span className="font-semibold text-green-600">Var ✓</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Neden FxPro - Infografik */}
      <section className="py-10 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-y border-blue-200 dark:border-blue-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-8 text-center">Neden FxPro?</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-card rounded-xl border border-border">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-foreground">4</div>
                <div className="text-sm text-muted-foreground">Tier-1 Regülasyon</div>
              </div>
              <div className="text-center p-4 bg-card rounded-xl border border-border">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-foreground">2100+</div>
                <div className="text-sm text-muted-foreground">Enstrüman</div>
              </div>
              <div className="text-center p-4 bg-card rounded-xl border border-border">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-foreground">&lt;13ms</div>
                <div className="text-sm text-muted-foreground">Emir Yürütme</div>
              </div>
              <div className="text-center p-4 bg-card rounded-xl border border-border">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <Monitor className="w-6 h-6 text-amber-600" />
                </div>
                <div className="text-2xl font-bold text-foreground">3</div>
                <div className="text-sm text-muted-foreground">Platform Seçeneği</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hesap Açma Rehberi */}
      <HesapAcmaRehberi
        brokerName="FxPro"
        brokerId="fxpro"
        affiliateUrl={affiliateUrl}
        steps={hesapAcmaAdimlari}
        estimatedTime="10-15 dakika"
        requirements={[
          "Geçerli e-posta adresi",
          "Cep telefonu numarası",
          "TC Kimlik, Ehliyet veya Pasaport",
          "Adres belgesi (fatura/ekstre)",
        ]}
      />

      {/* Para Yatırma/Çekme */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Wallet className="w-6 h-6 text-primary" />
              Para Yatırma ve Çekme
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-green-600" />
                    Para Yatırma
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Yöntemler</span>
                      <span className="text-foreground text-right">Banka, Kart, Skrill, Neteller</span>
                    </li>
                    <li className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Minimum</span>
                      <span className="text-foreground">$100</span>
                    </li>
                    <li className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Ücret</span>
                      <span className="text-green-600 font-semibold">Ücretsiz</span>
                    </li>
                    <li className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">İşlem Süresi</span>
                      <span className="text-foreground">Anında - 1 iş günü</span>
                    </li>
                  </ul>
                  <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                    <p className="text-xs text-blue-700 dark:text-blue-300">
                      💡 <strong>İpucu:</strong> Visa/Mastercard ile anında yatırım yapabilirsiniz. Banka havalesi 1-3 iş günü sürebilir.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    Para Çekme
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Yöntemler</span>
                      <span className="text-foreground text-right">Banka, Skrill, Neteller</span>
                    </li>
                    <li className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Minimum</span>
                      <span className="text-foreground">$50</span>
                    </li>
                    <li className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Ücret</span>
                      <span className="text-green-600 font-semibold">Ücretsiz</span>
                    </li>
                    <li className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">İşlem Süresi</span>
                      <span className="text-foreground">1-3 iş günü</span>
                    </li>
                  </ul>
                  <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg">
                    <p className="text-xs text-amber-700 dark:text-amber-300">
                      ⚠️ İlk çekim için KYC doğrulaması gereklidir. Para yatırdığınız yöntemle çekmeniz önerilir.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Ratings */}
      <section className="py-12 bg-secondary/50">
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
      <section className="py-12 bg-background">
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
      <section className="py-12 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Hesap Türleri</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-secondary">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Hesap</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-foreground">Min. Depozito</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-foreground">Spread</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-foreground">Komisyon</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-foreground">Platform</th>
                  </tr>
                </thead>
                <tbody>
                  {accountTypes.map((account) => (
                    <tr key={account.name} className={`border-t border-border ${account.popular ? 'bg-primary/5' : ''}`}>
                      <td className="px-4 py-3 font-medium text-foreground">
                        {account.name}
                        {account.popular && <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">Önerilen</span>}
                      </td>
                      <td className="px-4 py-3 text-center text-muted-foreground">{account.minDeposit}</td>
                      <td className="px-4 py-3 text-center text-muted-foreground">{account.spread}</td>
                      <td className="px-4 py-3 text-center text-muted-foreground">{account.commission}</td>
                      <td className="px-4 py-3 text-center text-muted-foreground">{account.platform}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">📊 Standard Hesap</h4>
                <p className="text-sm text-muted-foreground">
                  Komisyonsuz işlem. Yeni başlayanlar ve orta seviye trader'lar için ideal. $100 ile başlayın.
                </p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">⚡ Raw+ Hesap</h4>
                <p className="text-sm text-muted-foreground">
                  Sıfır spread, düşük komisyon. Scalper ve aktif trader'lar için ideal. Profesyonel koşullar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Sonuç</h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p>
                FxPro, <strong>Tier-1 regülasyonları</strong> (FCA, CySEC) ve <strong>20 yıllık deneyimi</strong> ile
                güvenilirlik arayanlar için en iyi seçeneklerden biridir. Bonus kampanyası olmasa da,
                profesyonel işlem koşulları ve platform çeşitliliği ile öne çıkar.
              </p>
              <p>
                <strong>Raw+ hesabı</strong> ile sıfır spread'den işlem yapabilir, <strong>cTrader</strong> platformu ile
                gelişmiş analiz araçlarına erişebilirsiniz. 13ms altı emir yürütme hızı, aktif trader'lar için büyük avantaj.
              </p>
              <p>
                Ancak minimum depozito bazı hesaplarda yüksek ($1,000 - $30,000) ve bonus kampanyası bulunmuyor.
                Bu nedenle düşük sermayeli veya bonus arayan yatırımcılar için XM veya HFM daha uygun olabilir.
              </p>
              <p className="font-semibold text-blue-700 dark:text-blue-400">
                ✅ Tavsiye: Profesyonel işlem koşulları arayan, güvenilirliğe öncelik veren ve orta-yüksek sermayeli yatırımcılar için mükemmel bir seçim.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <a href={affiliateUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackAffiliateClick("fxpro", "tr_review_bottom", "hesap_ac")}>
                  FxPro'da Hesap Aç <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href={affiliateUrl} target="_blank" rel="noopener noreferrer">
                  Demo Hesap Aç
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </TRLayout>
  );
};

export default FxProInceleme;
