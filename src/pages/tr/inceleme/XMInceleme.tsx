import TRLayout from "@/components/tr/TRLayout";
import HesapAcmaRehberi from "@/components/tr/HesapAcmaRehberi";
import { Star, ExternalLink, Check, X, Gift, CreditCard, Clock, Wallet, Zap, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { brokers } from "@/lib/brokers";
import { trBrokerInfo } from "@/lib/brokersTR";
import { trackAffiliateClick } from "@/lib/tracking";
import { trackTRBrokerClick, trackTRPageView } from "@/lib/trackingTR";
import BrokerLogo from "@/components/BrokerLogo";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const XMInceleme = () => {
  const broker = brokers.xm;
  const trInfo = trBrokerInfo.xm;
  const affiliateUrl = trInfo?.affiliateUrl || broker.siteUrl;
  const overallRating = 4.5;

  // Track page view on mount
  useEffect(() => {
    trackTRPageView("xm", "review");
  }, []);

  // Schema.org Review data
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "FinancialService",
      "name": "XM",
      "image": "https://beginnerfxguide.com/brokers/xm.svg",
      "url": affiliateUrl,
      "priceRange": "$5 minimum depozito",
      "description": "Forex broker, 2009'dan beri 10M+ müşteri"
    },
    "author": {
      "@type": "Organization",
      "name": "Beginner FX Guide TR"
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": overallRating.toString(),
      "bestRating": "5",
      "worstRating": "1"
    },
    "datePublished": "2026-02-05",
    "reviewBody": "XM, 2009'dan bu yana dünya genelinde 10 milyondan fazla müşteriye hizmet veren köklü bir forex brokeridir. $30 yatırımsız hoşgeldin bonusu, sadece $5 minimum depozito ve 7/24 Türkçe destek ile Türk yatırımcılar arasında en popüler brokerlardan biridir."
  };

  const ratings = [
    { label: "İşlem Koşulları", score: 4.3 },
    { label: "Platform ve Araçlar", score: 4.4 },
    { label: "Müşteri Desteği", score: 4.8 },
    { label: "Para Yatırma/Çekme", score: 4.5 },
    { label: "Eğitim ve Araştırma", score: 4.7 },
    { label: "Güvenilirlik", score: 4.2 },
  ];

  const accountTypes = [
    { name: "Micro", minDeposit: "$5", leverage: "1:1000", spread: "1.0 pip'ten", commission: "Yok", lotSize: "1,000 birim" },
    { name: "Standard", minDeposit: "$5", leverage: "1:1000", spread: "1.0 pip'ten", commission: "Yok", lotSize: "100,000 birim", popular: true },
    { name: "XM Ultra Low", minDeposit: "$5", leverage: "1:1000", spread: "0.6 pip'ten", commission: "Yok", lotSize: "100,000 birim" },
    { name: "Shares", minDeposit: "$10,000", leverage: "1:1", spread: "Değişken", commission: "Var", lotSize: "1 hisse" },
  ];

  const pros = [
    "Çoklu regülasyon (CySEC, ASIC, FSC, DFSA)",
    "Çok düşük minimum depozito ($5)",
    "Komisyon ve gizli ücret YOK",
    "$30 yatırımsız hoşgeldin bonusu",
    "%100 + %50 + %20 kademeli yatırım bonusu",
    "7/24 Türkçe müşteri desteği",
    "Copy trade özelliği",
    "Demo yarışmaları (para ödüllü)",
    "İslami hesap (swap-free) seçeneği",
    "1000+ işlem enstrümanı",
    "Negatif bakiye koruması",
  ];

  const cons = [
    "Spread'ler ECN brokerlardan geniş",
    "Hisse senedi CFD spread'leri yüksek",
    "90 gün sonra inaktivite ücreti ($15/ay)",
    "Kripto para seçenekleri sınırlı",
  ];

  // Hesap açma adımları
  const hesapAcmaAdimlari = [
    {
      title: "Hesap Aç Butonuna Tıklayın",
      description: "XM ana sayfasından yeşil 'Hesap Aç' butonuna tıklayın. Türkçe dil seçeneği mevcuttur.",
      tips: [
        "www.xm.com adresinden giriş yapın",
        "Sağ üstten Türkçe dil seçebilirsiniz",
        "Mobil veya desktop'tan açabilirsiniz",
      ],
    },
    {
      title: "Kişisel Bilgilerinizi Girin",
      description: "Ad, soyad, ülke (Turkey), telefon numarası ve e-posta adresinizi girin. Bilgiler kimlik belgenizle eşleşmelidir.",
      tips: [
        "Gerçek bilgilerinizi girin, KYC'de kontrol edilecek",
        "E-posta adresinize doğrulama linki gönderilecek",
        "+90 ile başlayan telefon numaranızı girin",
      ],
    },
    {
      title: "Hesap Türünü Seçin",
      description: "Standard veya Micro hesap seçin. Yeni başlayanlar için Standard hesap önerilir. MT4 veya MT5 platformunu tercih edin.",
      tips: [
        "Standard hesap en popüler seçenektir",
        "MT5 daha fazla özellik sunar",
        "Kaldıraç oranını seçebilirsiniz (maks 1:1000)",
      ],
    },
    {
      title: "E-posta Doğrulaması",
      description: "E-posta adresinize gelen doğrulama linkine tıklayın. Link 24 saat geçerlidir.",
      tips: [
        "Spam klasörünü kontrol edin",
        "Link gelmezse 'Tekrar Gönder' butonunu kullanın",
        "Doğrulama sonrası otomatik giriş yapılır",
      ],
    },
    {
      title: "Kimlik Doğrulama (KYC)",
      description: "Hesabınızı aktif etmek için kimlik belgesi (TC kimlik kartı veya pasaport) ve adres belgesi (fatura veya banka ekstresi) yükleyin.",
      tips: [
        "Belgelerin net fotoğrafını çekin",
        "Kimlik kartının ön ve arka yüzü gerekli",
        "Adres belgesi son 6 ay içinde olmalı",
      ],
      warning: "KYC tamamlanmadan para yatırabilir ama çekemezsiniz. $30 bonus için KYC zorunludur.",
    },
    {
      title: "$30 Bonusunuzu Alın",
      description: "KYC onaylandıktan sonra hesabınıza otomatik olarak $30 yatırımsız bonus tanımlanır. Bu bonus ile gerçek işlem yapabilirsiniz!",
      tips: [
        "Bonus sadece yeni müşteriler için geçerli",
        "5 lot işlem sonrası karlar çekilebilir",
        "Bonus 30 gün içinde kullanılmalı",
      ],
    },
  ];

  return (
    <TRLayout
      title="XM İnceleme 2026 - Türk Yatırımcılar İçin Detaylı Rehber"
      description="XM broker detaylı inceleme. $5 minimum depozito, $30 yatırımsız bonus, 1:1000 kaldıraç, 7/24 Türkçe destek. CySEC ve ASIC regülasyonlu güvenilir broker."
      keywords="xm broker, xm inceleme, xm türkiye, forex broker türkiye, xm bonus, xm minimum depozito"
    >
      {/* Schema.org Review Markup */}
      <script type="application/ld+json">
        {JSON.stringify(reviewSchema)}
      </script>
      {/* Hero Section */}
      <section className="pt-12 pb-12 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col lg:flex-row items-start gap-8">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 mb-4">
                  <Gift className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="text-sm text-green-700 dark:text-green-300 font-medium">$30 Yatırımsız Bonus!</span>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <BrokerLogo broker={broker} className="w-20 h-20 rounded-2xl" imgClassName="p-2" />
                  <div>
                    <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">XM İnceleme</h1>
                    <p className="text-muted-foreground mt-1">2009'dan beri 10M+ müşteri</p>
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
                  XM, 2009'dan bu yana dünya genelinde <strong>10 milyondan fazla müşteriye</strong> hizmet veren köklü bir forex brokeridir.
                  <strong> $30 yatırımsız hoşgeldin bonusu</strong>, sadece $5 minimum depozito ve <strong>7/24 Türkçe destek</strong> ile
                  Türk yatırımcılar arasında en popüler brokerlardan biridir.
                </p>

                <div className="flex flex-wrap gap-3">
                  <Button size="lg" asChild className="bg-green-600 hover:bg-green-700">
                    <a href={affiliateUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackTRBrokerClick("xm", "tr_review_hero", "hesap_ac")}>
                      $30 Bonus Al <Gift className="w-4 h-4 ml-2" />
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
                      <span className="font-semibold text-foreground">2009</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground text-sm">Regülasyon</span>
                      <span className="font-semibold text-foreground">CySEC, ASIC, FSC</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground text-sm">Min Depozito</span>
                      <span className="font-semibold text-green-600">$5</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground text-sm">Max Kaldıraç</span>
                      <span className="font-semibold text-primary">1:1000</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground text-sm">Platformlar</span>
                      <span className="font-semibold text-foreground">MT4, MT5</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-muted-foreground text-sm">TR Destek</span>
                      <span className="font-semibold text-green-600">7/24 ✓</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Komisyon YOK Banner */}
      <section className="py-8 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <img src="/brokers/xm.svg" alt="XM" className="h-10" />
              <span className="text-white/60 text-sm">15 YEARS</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Komisyon <span className="text-red-500">YOK!</span>
            </h2>
            <p className="text-xl text-white mb-4">
              Masraf & Gizli Ücret <span className="text-red-500">YOK!</span>
            </p>
            <div className="inline-flex items-center gap-2 bg-amber-500 text-slate-900 font-bold px-6 py-2 rounded-full">
              XM'i Seçin!
            </div>
            <p className="text-xs text-white/50 mt-4">
              Sermayeniz risk altındadır. *Şartlar ve Koşullar geçerlidir.
            </p>
          </div>
        </div>
      </section>

      {/* Bonus Detayları */}
      <section className="py-10 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-y border-green-200 dark:border-green-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Gift className="w-6 h-6 text-green-600" />
              XM Bonus ve Promosyonlar
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border-green-200 dark:border-green-800 bg-white dark:bg-card">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-green-600 mb-2">$30</div>
                  <h3 className="font-semibold text-foreground mb-2">Yatırımsız Bonus</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Hesap açın, KYC tamamlayın ve $30 bonus kazanın. Para yatırmadan işlem yapın!
                  </p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• KYC onayı sonrası otomatik</li>
                    <li>• 5 lot işlem ile kar çekilebilir</li>
                    <li>• 30 gün geçerlilik</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-green-200 dark:border-green-800 bg-white dark:bg-card">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">%100</div>
                  <h3 className="font-semibold text-foreground mb-2">İlk Yatırım Bonusu</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    500$'a varan %100 bonus! İlk yatırımınızı ikiye katlayın.
                  </p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Min $5 yatırım</li>
                    <li>• Maksimum $500 bonus</li>
                    <li>• Anında hesaba tanımlanır</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-green-200 dark:border-green-800 bg-white dark:bg-card">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-purple-600 mb-2">%50</div>
                  <h3 className="font-semibold text-foreground mb-2">Ek Yatırım Bonusu</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    2000$'a varan %50 bonus. Bakiyenizi büyütün!
                  </p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• $500 sonrası geçerli</li>
                    <li>• Maks $1000 bonus</li>
                    <li>• İşlem hacmine göre çekilebilir</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-green-200 dark:border-green-800 bg-white dark:bg-card">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-amber-600 mb-2">%20</div>
                  <h3 className="font-semibold text-foreground mb-2">Sadakat Bonusu</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    8000$'a varan %20 bonus. Yatırdıkça kazan!
                  </p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• $2500 sonrası geçerli</li>
                    <li>• Maks $1600 bonus</li>
                    <li>• Sadakat puanları kazanın</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            {/* Bonus Şeması Görseli */}
            <div className="mt-6 p-6 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-4 text-center">Bonusunuzu Alın</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-amber-400 font-semibold">500$'a varan %100 bonus</span>
                    <span className="text-white/60">0$ aldınız</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-amber-400 to-amber-500 h-2 rounded-full w-0"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-amber-400 font-semibold">2000$'a varan %50 bonus</span>
                    <span className="text-white/60">0$ aldınız</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-amber-400 to-amber-500 h-2 rounded-full w-0"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-amber-400 font-semibold">8000$'a varan %20 bonus</span>
                    <span className="text-white/60">0$ aldınız</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-amber-400 to-amber-500 h-2 rounded-full w-0"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Button size="lg" asChild className="bg-green-600 hover:bg-green-700">
                <a href={affiliateUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackTRBrokerClick("xm", "tr_review_bonus", "bonus")}>
                  Şimdi $30 Bonus Al <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Hesap Açma Rehberi */}
      <HesapAcmaRehberi
        brokerName="XM"
        brokerId="xm"
        affiliateUrl={affiliateUrl}
        steps={hesapAcmaAdimlari}
        estimatedTime="5-10 dakika"
        requirements={[
          "Geçerli e-posta adresi",
          "Cep telefonu numarası",
          "TC Kimlik veya Pasaport",
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
                      <span className="text-green-600 font-semibold">$5</span>
                    </li>
                    <li className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Ücret</span>
                      <span className="text-green-600 font-semibold">Ücretsiz</span>
                    </li>
                    <li className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">İşlem Süresi</span>
                      <span className="text-foreground">Anında</span>
                    </li>
                  </ul>
                  <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                    <p className="text-xs text-blue-700 dark:text-blue-300">
                      💡 <strong>İpucu:</strong> Kredi/banka kartı ile anında yatırım yapabilirsiniz. Banka havalesi 1-3 gün sürebilir.
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
                      <span className="text-foreground">$5</span>
                    </li>
                    <li className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Ücret</span>
                      <span className="text-green-600 font-semibold">Ücretsiz</span>
                    </li>
                    <li className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">İşlem Süresi</span>
                      <span className="text-foreground">24 saat içinde</span>
                    </li>
                  </ul>
                  <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg">
                    <p className="text-xs text-amber-700 dark:text-amber-300">
                      ⚠️ İlk çekim için KYC doğrulaması gereklidir. Para yatırdığınız yöntemle çekmeniz gerekir.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Neden XM Infografik */}
      <section className="py-12 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-8 text-center">Neden XM?</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-card rounded-xl border border-border">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-foreground">10M+</div>
                <div className="text-sm text-muted-foreground">Müşteri</div>
              </div>
              <div className="text-center p-4 bg-card rounded-xl border border-border">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-foreground">1000+</div>
                <div className="text-sm text-muted-foreground">Enstrüman</div>
              </div>
              <div className="text-center p-4 bg-card rounded-xl border border-border">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-foreground">%99.35</div>
                <div className="text-sm text-muted-foreground">Emir Yürütme</div>
              </div>
              <div className="text-center p-4 bg-card rounded-xl border border-border">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <Gift className="w-6 h-6 text-amber-600" />
                </div>
                <div className="text-2xl font-bold text-foreground">$3,100+</div>
                <div className="text-sm text-muted-foreground">Maks Bonus</div>
              </div>
            </div>
          </div>
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
                    <th className="px-4 py-3 text-center text-sm font-semibold text-foreground">Lot Büyüklüğü</th>
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
                      <td className="px-4 py-3 text-center text-muted-foreground">{account.lotSize}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              💡 <strong>Tavsiye:</strong> Yeni başlayanlar için Standard hesap, düşük lot ile işlem yapmak isteyenler için Micro hesap önerilir.
            </p>
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
                XM, <strong>Türkiye'den en çok tercih edilen forex brokerlarından biri</strong>dir. $30 yatırımsız bonus ile
                para yatırmadan gerçek işlem yapabilir, sadece $5 ile hesabınızı fonlayabilirsiniz.
              </p>
              <p>
                <strong>7/24 Türkçe destek</strong>, düzenli eğitim webinarları ve 1000'den fazla işlem enstrümanı ile
                hem yeni başlayanlar hem de deneyimli trader'lar için uygundur. CySEC ve ASIC regülasyonları güvenilirlik sağlar.
              </p>
              <p>
                Spread'ler ECN brokerlardan biraz geniş olsa da, bonus avantajları ve düşük minimum depozito ile
                bu dezavantaj dengelenmektedir.
              </p>
              <p className="font-semibold text-green-700 dark:text-green-400">
                ✅ Tavsiye: Düşük sermaye ile başlamak isteyen, Türkçe destek arayan ve bonus fırsatlarından yararlanmak isteyen tüm yatırımcılar için mükemmel bir seçim.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button size="lg" asChild className="bg-green-600 hover:bg-green-700">
                <a href={affiliateUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackTRBrokerClick("xm", "tr_review_bottom", "hesap_ac")}>
                  $30 Bonus ile Hesap Aç <Gift className="w-4 h-4 ml-2" />
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

export default XMInceleme;
