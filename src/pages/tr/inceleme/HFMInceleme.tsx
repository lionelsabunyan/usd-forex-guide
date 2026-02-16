import TRLayout from "@/components/tr/TRLayout";
import HesapAcmaRehberi from "@/components/tr/HesapAcmaRehberi";
import { Star, ExternalLink, Check, X, Zap, Gift, CreditCard, Clock, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { brokers } from "@/lib/brokers";
import { trBrokerInfo } from "@/lib/brokersTR";
import { trackAffiliateClick } from "@/lib/tracking";
import { trackTRBrokerClick, trackTRPageView } from "@/lib/trackingTR";
import BrokerLogo from "@/components/BrokerLogo";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const HFMInceleme = () => {
  const broker = brokers.hfm;
  const trInfo = trBrokerInfo.hfm;
  const affiliateUrl = trInfo.affiliateUrl;
  const overallRating = 4.7;

  // Track page view on mount
  useEffect(() => {
    trackTRPageView("hfm", "review");
  }, []);


  const ratings = [
    { label: "İşlem Koşulları", score: 4.8 },
    { label: "Platform ve Araçlar", score: 4.7 },
    { label: "Müşteri Desteği", score: 4.9 },
    { label: "Para Yatırma/Çekme", score: 4.8 },
    { label: "Güvenilirlik", score: 4.7 },
  ];

  const accountTypes = [
    { name: "Cent", minDeposit: "$0", leverage: "1:1000", spread: "1.2 pip'ten", commission: "Yok" },
    { name: "Premium", minDeposit: "$0", leverage: "1:500", spread: "1.2 pip'ten", commission: "Yok", popular: true },
    { name: "Pro", minDeposit: "$100", leverage: "1:500", spread: "0.5 pip'ten", commission: "Yok" },
    { name: "Zero", minDeposit: "$200", leverage: "1:500", spread: "0.0 pip'ten", commission: "$3/lot" },
  ];

  const pros = [
    "Minimum depozito yok (Cent ve Premium)",
    "Yüksek kaldıraç oranları (1:1000'e kadar)",
    "Çoklu regülasyon (CySEC, FCA, DFSA)",
    "Copy trading özelliği (HFcopy)",
    "Negatif bakiye koruması",
    "Hızlı para çekme işlemleri",
    "7/24 Türkçe müşteri desteği",
    "Mobil uygulama kaliteli",
    "%20 hoşgeldin bonusu",
    "Sadakat programı mevcut",
  ];

  const cons = [
    "Spread'ler bazı rakiplerden geniş olabilir",
    "Sınırlı araştırma materyalleri",
    "Demo hesap süresi sınırlı (14 gün)",
    "90 gün sonra inaktivite ücreti ($5/ay)",
  ];

  // Hesap açma adımları (ekran görüntüleri henüz eklenmedi)
  const hesapAcmaAdimlari = [
    {
      title: "Kayıt Formunu Doldurun",
      description: "HFM ana sayfasından 'Hesap Aç' butonuna tıklayın. Açılan formda ülke olarak 'Turkey' seçin, e-posta adresinizi veya telefon numaranızı girin ve güçlü bir şifre oluşturun. 'Continue' butonuna tıklayarak devam edin.",
      tips: [
        "Gerçek e-posta adresinizi kullanın, doğrulama maili gönderilecek",
        "Şifreniz en az 8 karakter, büyük/küçük harf ve rakam içermeli",
        "Telefon numaranızı +90 ile başlayacak şekilde girin",
      ],
    },
    {
      title: "Doğrulama Yöntemini Seçin",
      description: "Telefon numaranızı doğrulamak için WhatsApp veya SMS seçeneklerinden birini tercih edin. WhatsApp genellikle daha hızlı ve güvenilirdir.",
      tips: [
        "WhatsApp seçeneği genellikle daha hızlı kod gönderir",
        "SMS gelmezse 'Try another way' ile alternatif yöntemi deneyin",
        "Telefon numaranızın doğru olduğundan emin olun",
      ],
    },
    {
      title: "Doğrulama Kodunu Girin",
      description: "Telefonunuza gelen 6 haneli doğrulama kodunu girin. Kod 3 dakika içinde girilmelidir. Kod gelmezse 'Resend code' ile yeni kod isteyebilirsiniz.",
      tips: [
        "Kod genellikle 30 saniye içinde gelir",
        "Spam/gereksiz klasörünü kontrol edin",
        "3 dakika içinde kod gelmezse yeni kod isteyin",
      ],
      warning: "Yanlış kod 3 kez girilirse hesabınız geçici olarak kilitlenebilir.",
    },
    {
      title: "Profil Bilgilerinizi Tamamlayın",
      description: "Ad, soyad, doğum tarihi ve adres bilgilerinizi girin. Bilgiler kimlik belgenizle eşleşmelidir. Bu bilgiler para çekme işlemleri için gereklidir.",
      tips: [
        "Bilgileriniz kimlik belgenizle birebir aynı olmalı",
        "Adres bilgisi fatura/ekstre ile doğrulanacak",
        "Türkçe karakter kullanmayın (ö→o, ü→u, ş→s gibi)",
      ],
    },
    {
      title: "Hesap Türünü Seçin",
      description: "İşlem tarzınıza uygun hesap türünü seçin. Yeni başlayanlar için 'Cent' veya 'Premium' hesap önerilir. Daha sonra hesap türünü değiştirebilirsiniz.",
      tips: [
        "Cent hesap: Düşük riskle pratik yapmak için ideal",
        "Premium hesap: Standart lot büyüklükleri için",
        "Zero hesap: Düşük spread isteyenler için (komisyon var)",
      ],
    },
    {
      title: "Kimlik Doğrulaması (KYC)",
      description: "Para çekebilmek için kimlik ve adres doğrulaması gereklidir. Kimlik kartı/pasaport ve son 3 aylık fatura/banka ekstresi yükleyin.",
      tips: [
        "Belgelerin fotoğrafı net ve okunabilir olmalı",
        "Kimlik kartının ön ve arka yüzü gerekli",
        "Doğrulama genellikle 24 saat içinde tamamlanır",
      ],
      warning: "Doğrulama tamamlanmadan para çekemezsiniz. Demo hesap için doğrulama gerekmez.",
    },
  ];

  return (
    <TRLayout
      title="HFM (HotForex) İnceleme 2026 - Türk Yatırımcılar İçin"
      description="HFM broker detaylı inceleme. $0 minimum depozito, 1:1000 kaldıraç, %20 hoşgeldin bonusu, copy trading ve 7/24 Türkçe destek. CySEC ve FCA regülasyonlu."
      >
      {/* Hero Section */}
      <section className="pt-12 pb-12 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col lg:flex-row items-start gap-8">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 mb-4">
                  <Gift className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="text-sm text-green-700 dark:text-green-300 font-medium">%20 Hoşgeldin Bonusu</span>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <BrokerLogo broker={broker} className="w-20 h-20 rounded-2xl" imgClassName="p-2" />
                  <div>
                    <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">HFM İnceleme</h1>
                    <p className="text-muted-foreground mt-1">Eski adıyla HotForex • 2010'dan beri</p>
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
                  HFM (eski adıyla HotForex), 2010'dan bu yana hizmet veren global bir forex ve CFD brokeridir.
                  Minimum depozito gerektirmeyen hesapları, yüksek kaldıraç oranları, <strong>%20 hoşgeldin bonusu</strong> ve
                  HFcopy ile copy trading özelliği sayesinde özellikle yeni başlayanlar arasında popülerdir.
                  <strong> 7/24 Türkçe müşteri desteği</strong> sunmaktadır.
                </p>

                <div className="flex flex-wrap gap-3">
                  <Button size="lg" asChild>
                    <a href={trInfo.affiliateUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackAffiliateClick("hfm", "tr_review_hero", "visit_site")}>
                      HFM'de Hesap Aç <ExternalLink className="w-4 h-4 ml-2" />
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
                      <span className="font-semibold text-foreground">CySEC, FCA</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground text-sm">Min Depozito</span>
                      <span className="font-semibold text-green-600">$0</span>
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

      {/* Commission Banner - Tıklanabilir */}
      <section className="py-8 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-4">
          <a
            href={affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackTRBrokerClick("hfm", "tr_review_commission_banner", "click")}
            className="block max-w-4xl mx-auto text-center hover:opacity-90 transition-opacity cursor-pointer"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <img src="/brokers/hfm-banner.jpg" alt="HFM" className="h-10" />
              <span className="text-white/60 text-sm">14 YEARS</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              %100 <span className="text-green-500">SUPERCHARGED BONUS!</span>
            </h2>
            <p className="text-xl text-white mb-4">
              $50,000'a Varan Bonus <span className="text-green-500">+ Shield 500</span>
            </p>
            <div className="inline-flex items-center gap-2 bg-amber-500 text-slate-900 font-bold px-6 py-2 rounded-full hover:bg-amber-400 transition-colors">
              HFM'i Seçin!
            </div>
            <p className="text-xs text-white/50 mt-4">
              Sermayeniz risk altındadır. *Şartlar ve Koşullar geçerlidir.
            </p>
          </a>
        </div>
      </section>

      {/* Bonus Detayları */}
      <section className="py-10 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-y border-green-200 dark:border-green-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Gift className="w-6 h-6 text-green-600" />
              HFM Bonus ve Promosyonlar
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-green-200 dark:border-green-800">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-foreground mb-2">%20 Hoşgeldin Bonusu</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    İlk para yatırmanızda %20 bonus kazanın. Maksimum $5,000'a kadar bonus alabilirsiniz.
                  </p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Minimum $50 yatırım gerekli</li>
                    <li>• 5 lot işlem sonrası çekilebilir</li>
                    <li>• Tüm hesap türlerinde geçerli</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-green-200 dark:border-green-800">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-foreground mb-2">%100 Supercharged Bonus</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Her para yatırmada %100'e kadar bonus + işlem hacmine göre $2/lot nakit ödül.
                  </p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Bonus bakiyesi margin olarak kullanılabilir</li>
                    <li>• İşlem hacminize göre nakit dönüşür</li>
                    <li>• Premium ve Zero hesaplarda geçerli</li>
                  </ul>
                </CardContent>
              </Card>
              {/* HFM Banner */}
              <div className="flex items-center justify-center">
                <a
                  href="https://banner-api.hfm-trade.com/link/f85be0de?regulator=HFSV&refid=30503439"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackAffiliateClick("hfm", "tr_review_banner", "banner_click")}
                  className="block rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <img
                    src="https://banner-api.hfm-trade.com/banner/f85be0de?regulator=HFSV&refid=30503439"
                    width="300"
                    height="250"
                    alt="HFM - Ödüllü Bir Marka ile Yatırım Yapın"
                    className="w-full h-auto"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hesap Açma Rehberi - Bonus Bölümünün Altında */}
      <HesapAcmaRehberi
        brokerName="HFM"
        brokerId="hfm"
        affiliateUrl={trInfo.affiliateUrl}
        steps={hesapAcmaAdimlari}
        estimatedTime="5-10 dakika"
        requirements={[
          "Geçerli e-posta adresi",
          "Türkiye cep telefonu (+90)",
          "Kimlik belgesi (para çekme için)",
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
                      <span className="text-foreground">Banka, Kart, Skrill, Neteller, Kripto</span>
                    </li>
                    <li className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Minimum</span>
                      <span className="text-green-600 font-semibold">$0 (Cent/Premium)</span>
                    </li>
                    <li className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Ücret</span>
                      <span className="text-green-600 font-semibold">Ücretsiz</span>
                    </li>
                    <li className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">İşlem Süresi</span>
                      <span className="text-foreground">Anında - 1 saat</span>
                    </li>
                  </ul>
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
                      <span className="text-foreground">Banka, Skrill, Neteller, Kripto</span>
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
                      <span className="text-foreground">Aynı gün - 24 saat</span>
                    </li>
                  </ul>
                  <p className="text-xs text-muted-foreground mt-3">
                    ⚠️ İlk çekim için kimlik doğrulaması (KYC) gereklidir.
                  </p>
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
            <p className="text-xs text-muted-foreground mt-4">
              💡 <strong>Tavsiye:</strong> Yeni başlayanlar için Cent hesap, standart işlem için Premium hesap önerilir.
            </p>
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
                HFM, özellikle <strong>düşük sermaye ile başlamak isteyen</strong> ve <strong>copy trading</strong> özelliğinden
                faydalanmak isteyen Türk yatırımcılar için ideal bir seçenektir. Minimum depozito
                gerektirmeyen hesapları sayesinde forex dünyasına kolayca adım atabilirsiniz.
              </p>
              <p>
                <strong>%20 hoşgeldin bonusu</strong> ve sadakat programı ile ek avantajlar sunar.
                7/24 Türkçe müşteri desteği büyük bir artıdır. Çoklu regülasyon (CySEC, FCA) güvenilirlik sağlar.
              </p>
              <p>
                Ancak spread'ler bazı ECN brokerlardan daha geniş olabilir ve 90 gün sonra inaktivite ücreti uygulanır.
              </p>
              <p className="font-semibold">
                ✅ Tavsiye: Yeni başlayanlar, copy trading ile pasif gelir elde etmek isteyenler ve
                düşük sermaye ile işlem yapmak isteyenler için mükemmel bir seçim.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <a href={trInfo.affiliateUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackAffiliateClick("hfm", "tr_review_bottom", "visit_site")}>
                  HFM'de Hesap Aç <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href={trInfo.affiliateUrl} target="_blank" rel="noopener noreferrer">
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

export default HFMInceleme;
