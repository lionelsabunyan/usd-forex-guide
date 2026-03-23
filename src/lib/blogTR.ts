export type BlogCategoryTR =
  | "baslangic"
  | "egitim"
  | "strateji"
  | "mevzuat"
  | "risk-yonetimi";

export const blogCategoriesTR: Record<BlogCategoryTR, { label: string; description: string; color: string }> = {
  "baslangic": {
    label: "Başlangıç",
    description: "Yeni başlayanlar için forex rehberleri",
    color: "bg-green-500/10 text-green-500 border-green-500/20"
  },
  "egitim": {
    label: "Eğitim",
    description: "Forex kavramları ve terminoloji",
    color: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20"
  },
  "strateji": {
    label: "Strateji",
    description: "İşlem stratejileri ve teknikleri",
    color: "bg-purple-500/10 text-purple-500 border-purple-500/20"
  },
  "mevzuat": {
    label: "Mevzuat",
    description: "Türkiye forex düzenlemeleri ve vergi",
    color: "bg-orange-500/10 text-orange-500 border-orange-500/20"
  },
  "risk-yonetimi": {
    label: "Risk Yönetimi",
    description: "Sermaye koruma ve risk kontrolü",
    color: "bg-red-500/10 text-red-500 border-red-500/20"
  },
};

export type BlogPostTR = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  content: string;
  category: BlogCategoryTR;
  tags?: string[];
};

export const blogPostsTR: BlogPostTR[] = [
  {
    slug: "forex-baslangic-rehberi-turkiye",
    title: "Forex'e Nasıl Başlanır? Türkiye'den Adım Adım Rehber (2026)",
    excerpt: "Türkiye'den forex piyasasına giriş yapmak isteyenler için kapsamlı başlangıç rehberi. Broker seçimi, hesap açma, demo işlem ve ilk gerçek trade'inize kadar her adım.",
    date: "22 Mart 2026",
    readTime: "15 dk okuma",
    category: "baslangic",
    tags: ["başlangıç", "türkiye", "rehber", "2026"],
    content: `
# Forex'e Nasıl Başlanır? Türkiye'den Adım Adım Rehber (2026)

Forex piyasası günlük 7,5 trilyon doların üzerinde işlem hacmiyle dünyanın en büyük ve en likit finansal piyasasıdır. Türkiye'den bu piyasaya katılmak isteyen yatırımcı sayısı her geçen yıl artıyor. Ancak doğru bilgi ve hazırlık olmadan başlamak, ciddi kayıplara yol açabilir.

Bu rehberde, forex'e sıfırdan başlamak isteyen Türk yatırımcılar için ihtiyaç duyacağınız her şeyi anlatacağız.

## Forex Nedir?

Forex (Foreign Exchange), farklı ülkelerin para birimlerinin birbirine karşı alınıp satıldığı küresel bir piyasadır. EUR/USD paritesinde Euro alıp Dolar satarsınız — veya tam tersini yaparsınız. Amaç, döviz kurlarındaki değişimlerden kar elde etmektir.

**Forex piyasasının özellikleri:**

- Haftanın 5 günü, günün 24 saati açık
- Yüksek likidite — büyük pozisyonlar bile kolayca açılıp kapatılabilir
- Kaldıraç sayesinde küçük sermayeyle büyük pozisyonlar kontrol edilebilir
- Hem yükselen hem düşen piyasalardan kar elde etme imkanı

## 1. Adım: Temel Kavramları Öğrenin

İşlem yapmaya başlamadan önce bu temel kavramları mutlaka anlayın:

**Pip:** Bir döviz çiftindeki en küçük fiyat hareketi. EUR/USD için 0.0001'dir (dördüncü ondalık basamak). JPY çiftlerinde ise 0.01'dir.

**Lot:** İşlem birimi. Standart lot 100.000 birim, mini lot 10.000, mikro lot 1.000 birimdir. Yeni başlayanlar mikro lot ile başlamalıdır.

**Spread:** Alış ve satış fiyatı arasındaki fark. Bu, broker'ın kazancıdır ve sizin işlem maliyetinizdir. Dar spread = düşük maliyet.

**Kaldıraç (Leverage):** Sahip olduğunuz sermayenin katlarıyla işlem yapmanızı sağlar. 1:100 kaldıraçla 100 dolarınızla 10.000 dolarlık pozisyon açabilirsiniz. Dikkat: kaldıraç hem karı hem zararı büyütür.

**Margin (Teminat):** Kaldıraçlı bir pozisyon açmak için hesabınızda bulunması gereken minimum tutar.

## 2. Adım: Güvenilir Bir Broker Seçin

Broker seçimi forex yolculuğunuzun en kritik adımıdır. Dikkat etmeniz gerekenler:

**Lisans ve Düzenleme:** FCA (İngiltere), CySEC (Kıbrıs), ASIC (Avustralya) veya CFTC/NFA (ABD) lisanslı broker'lar tercih edin. Lisanssız broker'lardan uzak durun.

**Türkçe Destek:** Türkçe müşteri hizmeti ve Türkçe platform desteği işlerinizi kolaylaştırır.

**Spread ve Komisyon:** İşlem maliyetlerinizi doğrudan etkiler. Farklı broker'ları karşılaştırın.

**Platform:** MetaTrader 4 (MT4) veya MetaTrader 5 (MT5) en popüler platformlardır. Kullanım kolaylığı ve araç çeşitliliği açısından mükemmeldir.

**Para Yatırma/Çekme:** Türkiye'den kolay para transferi yapabilmeniz önemlidir. Banka havalesi, kredi kartı ve e-cüzdan seçeneklerini kontrol edin.

## 3. Adım: Demo Hesap ile Pratik Yapın

**Gerçek para yatırmadan önce mutlaka demo hesap kullanın.** Demo hesap, sanal parayla gerçek piyasa koşullarında işlem yapmanızı sağlar.

Demo hesapta yapmanız gerekenler:

- Platformu tanıyın (grafik okuma, emir türleri, gösterge ekleme)
- En az 1 ay boyunca düzenli işlem yapın
- Bir işlem günlüğü tutun — her işlemi neden açtığınızı ve kapattığınızı yazın
- Farklı stratejiler deneyin
- Kendinizi duygusal olarak gözlemleyin

**Demo hesapta karlı olana kadar gerçek hesaba geçmeyin.**

## 4. Adım: Risk Yönetimi Planı Oluşturun

Forex'te başarılı olmanın anahtarı kar yapmak değil, **zararı kontrol etmektir.**

**Altın kurallar:**

- Her işlemde hesabınızın en fazla %1-2'sini riske atın
- Her zaman stop loss kullanın — istisnasız
- Risk/ödül oranınız en az 1:2 olsun (1 dolar risk alıyorsanız, 2 dolar kar hedefi koyun)
- Asla kaybetmeyi göze alamayacağınız parayı yatırmayın
- Günlük veya haftalık maksimum kayıp limiti belirleyin

## 5. Adım: İlk Gerçek İşleminizi Yapın

Demo hesapta yeterli deneyim kazandıktan sonra:

1. **Küçük başlayın** — minimum yatırımla başlayın, mikro lotlarla işlem yapın
2. **Tek bir strateji seçin** ve ona sadık kalın
3. **En likit paritelerde işlem yapın** — EUR/USD, GBP/USD, USD/JPY
4. **İşlem saatlerine dikkat edin** — Londra ve New York seansları en yüksek likiditeli dönemlerdir
5. **Duygularınızı kontrol edin** — açgözlülük ve korku en büyük düşmanlarınızdır

## Sık Yapılan Hatalar

- **Eğitimsiz başlamak** — Temel bilgileri öğrenmeden gerçek parayla işlem yapmak
- **Aşırı kaldıraç kullanmak** — Yüksek kaldıraç hızlı kayıplara yol açar
- **Stop loss kullanmamak** — Tek bir kötü işlem hesabınızı sıfırlayabilir
- **İntikam işlemi** — Kaybettikten sonra zararı telafi etmek için acele etmek
- **Çok fazla parite izlemek** — Başlangıçta 2-3 parite ile sınırlı kalın

## Sonuç

Forex'e başlamak sabır, disiplin ve sürekli öğrenme gerektirir. Demo hesapta pratik yapın, risk yönetimi kurallarına sıkı sıkıya bağlı kalın ve duygusal kararlar vermekten kaçının. Doğru hazırlıkla forex piyasası, portföyünüzü çeşitlendirmek için güçlü bir araç olabilir.
`
  },
  {
    slug: "pip-lot-spread-nedir",
    title: "Pip, Lot ve Spread Nedir? Forex Terimlerini Türkçe Öğrenin",
    excerpt: "Forex'in temel taşları olan pip, lot, spread, kaldıraç ve margin kavramlarını Türkçe olarak basit ve anlaşılır örneklerle açıklıyoruz.",
    date: "22 Mart 2026",
    readTime: "10 dk okuma",
    category: "egitim",
    tags: ["eğitim", "pip", "lot", "spread", "terimler"],
    content: `
# Pip, Lot ve Spread Nedir? Forex Terimlerini Türkçe Öğrenin

Forex dünyasına adım attığınızda karşınıza çıkan ilk engel, piyasanın kendine özgü terminolojisidir. Pip, lot, spread, kaldıraç gibi terimler başlangıçta kafa karıştırıcı olabilir. Bu yazıda en önemli forex terimlerini Türkçe olarak, pratik örneklerle açıklıyoruz.

## Pip Nedir?

**Pip** (Percentage in Point), bir döviz çiftindeki en küçük standart fiyat hareketidir.

- Çoğu parite için: **0.0001** (dördüncü ondalık basamak)
- JPY paritelerinde: **0.01** (ikinci ondalık basamak)

**Örnek:** EUR/USD 1.1050'den 1.1055'e hareket ederse, bu 5 pip'lik bir yükseliştir.

**Pipette:** Bazı broker'lar 5 ondalık basamak gösterir (örn: 1.10505). Beşinci basamak bir pipette'tir ve bir pipin onda birine eşittir.

### 1 Pip Ne Kadar Eder?

1 pip'in değeri lot büyüklüğüne göre değişir:

- **Standart lot** (100.000 birim): 1 pip ≈ 10 USD
- **Mini lot** (10.000 birim): 1 pip ≈ 1 USD
- **Mikro lot** (1.000 birim): 1 pip ≈ 0,10 USD

## Lot Nedir?

**Lot**, forex'te işlem büyüklüğünü belirleyen birimdir.

| Lot Türü | Birim | 1 Pip Değeri (USD çiftleri) |
|----------|-------|---------------------------|
| Standart | 100.000 | ~10 USD |
| Mini | 10.000 | ~1 USD |
| Mikro | 1.000 | ~0,10 USD |

**Örnek:** EUR/USD'de 1 standart lot alırsanız ve fiyat 50 pip yükselirse: 50 × 10 USD = **500 USD** kar elde edersiniz.

**Yeni başlayanlar için tavsiye:** Mikro lot ile başlayın. Riski düşük tutar ve piyasayı öğrenirken büyük kayıplar yaşamanızı engeller.

## Spread Nedir?

**Spread**, bir döviz çiftinin alış (ask) ve satış (bid) fiyatı arasındaki farktır. Bu fark, broker'ın kazanç kaynağıdır ve sizin işlem maliyetinizdir.

**Örnek:**
- EUR/USD Bid: 1.1050
- EUR/USD Ask: 1.1052
- Spread: **2 pip**

Bir işlem açtığınız anda, spread kadar zararla başlarsınız. Bu yüzden düşük spread sunan broker'lar tercih edilmelidir.

### Spread Türleri

- **Sabit spread:** Piyasa koşullarından bağımsız olarak sabit kalır
- **Değişken spread:** Piyasa likiditesine göre darılır veya genişler. Genellikle daha dar başlar ama haber zamanlarında genişleyebilir

## Kaldıraç (Leverage) Nedir?

**Kaldıraç**, sahip olduğunuz sermayenin katlarıyla işlem yapmanızı sağlayan bir mekanizmadır.

**Örnek:** 1:100 kaldıraçla:
- 100 USD sermayenizle 10.000 USD'lik pozisyon açabilirsiniz
- 1.000 USD sermayenizle 100.000 USD'lik (1 standart lot) pozisyon açabilirsiniz

**Dikkat:** Kaldıraç iki ucu keskin bir kılıçtır. Karınızı büyüttüğü gibi zararınızı da aynı oranda büyütür.

| Kaldıraç | Gerekli Teminat (1 lot için) |
|----------|------------------------------|
| 1:50 | 2.000 USD |
| 1:100 | 1.000 USD |
| 1:200 | 500 USD |
| 1:500 | 200 USD |

**Yeni başlayanlar için tavsiye:** 1:50 veya daha düşük kaldıraç kullanın. Yüksek kaldıraç cazip görünür ama hesabınızı hızla eritebilir.

## Margin (Teminat) Nedir?

**Margin**, kaldıraçlı bir pozisyon açmak için hesabınızda bulunması gereken minimum tutardır. Margin bir maliyet değildir — pozisyonunuzu sürdürebilmeniz için broker tarafından bloke edilen tutardır.

**Temel margin kavramları:**

- **Kullanılan margin:** Açık pozisyonlarınız için bloke edilen tutar
- **Serbest margin:** Yeni pozisyon açmak için kullanılabilir tutar
- **Margin seviyesi:** (Özkaynak / Kullanılan Margin) × 100
- **Margin call:** Margin seviyeniz belirli bir eşiğin altına düştüğünde broker'ın uyarı vermesi
- **Stop out:** Margin seviyeniz kritik seviyeye düştüğünde pozisyonların otomatik kapatılması

## Bid ve Ask Fiyatı Nedir?

- **Bid (Satış):** Broker'ın sizden alacağı fiyat — yani sizin satabileceğiniz fiyat
- **Ask (Alış):** Broker'ın size satacağı fiyat — yani sizin satın alabileceğiniz fiyat

Ask her zaman Bid'den yüksektir. Aradaki fark spread'dir.

## Emir Türleri

| Emir Türü | Açıklama |
|-----------|----------|
| Market Order | Anlık mevcut fiyattan işlem |
| Limit Order | Belirlediğiniz fiyata ulaşınca işlem |
| Stop Loss | Zarar durdurma emri — belirlenen seviyede pozisyonu kapatır |
| Take Profit | Kar alma emri — hedefe ulaşınca pozisyonu kapatır |

## Özet

Bu temel kavramları anlamak, forex yolculuğunuzun ilk ve en önemli adımıdır. Demo hesapta bu kavramları pratikte uygulayarak pekiştirebilirsiniz. Unutmayın: bilgi güçtür, özellikle finansal piyasalarda.
`
  },
  {
    slug: "en-iyi-forex-stratejileri-yeni-baslayanlar",
    title: "Yeni Başlayanlar İçin En İyi 5 Forex Stratejisi (2026)",
    excerpt: "Forex'te ilk adımlarınızı atarken kullanabileceğiniz kanıtlanmış 5 strateji. Her strateji için giriş/çıkış kuralları, risk yönetimi ve pratik örnekler.",
    date: "22 Mart 2026",
    readTime: "12 dk okuma",
    category: "strateji",
    tags: ["strateji", "başlangıç", "teknik-analiz", "2026"],
    content: `
# Yeni Başlayanlar İçin En İyi 5 Forex Stratejisi (2026)

Forex piyasasında başarılı olmak için bir işlem planına ve stratejiye ihtiyacınız var. Rastgele işlem açmak, kumarhane oynamaktan farksızdır. Bu yazıda yeni başlayanlar için uygun, basit ama etkili 5 forex stratejisini inceliyoruz.

## Strateji Seçmeden Önce

Her strateji herkese uygun değildir. Seçiminizi yaparken şunları düşünün:

- **Zaman:** Günde kaç saat ekran başında olabilirsiniz?
- **Sabır:** Günlerce pozisyon taşıyabilir misiniz, yoksa hızlı sonuç mu istiyorsunuz?
- **Sermaye:** Küçük hesaplar bazı stratejiler için uygun değildir
- **Kişilik:** Stres altında nasıl karar verirsiniz?

## 1. Trend Takip Stratejisi

**En basit ve etkili strateji:** Piyasanın yönünü belirleyin ve o yönde işlem açın.

**Nasıl çalışır:**

1. 200 periyotluk hareketli ortalamayı (MA200) grafiye ekleyin
2. Fiyat MA200'ün **üzerindeyse** — yalnızca alış (long) pozisyonları arayın
3. Fiyat MA200'ün **altındaysa** — yalnızca satış (short) pozisyonları arayın
4. Giriş sinyali: Fiyat trendin yönünde bir geri çekilme (pullback) yaptıktan sonra devam ettiğinde girin

**Giriş kuralları:**
- Yükselen trendde: Fiyat 50 MA'ya dokunup yukarı döndüğünde alış
- Düşen trendde: Fiyat 50 MA'ya dokunup aşağı döndüğünde satış

**Stop loss:** Son swing düşüğü/yükseğinin birkaç pip altına/üstüne
**Take profit:** Risk miktarının 2 katı (1:2 risk/ödül)

**Uygun zaman dilimi:** 4 saatlik veya günlük grafik
**Uygun pariteler:** EUR/USD, GBP/USD, USD/JPY

## 2. Destek ve Direnç Stratejisi

**Mantığı:** Fiyatlar belirli seviyelerde tekrar tekrar döner. Bu seviyeleri tespit edip onlara göre işlem yaparsınız.

**Destek:** Fiyatın düşmeyi durdurup yukarı döndüğü seviye (taban)
**Direnç:** Fiyatın yükselmeyi durdurup aşağı döndüğü seviye (tavan)

**Nasıl uygulanır:**

1. Günlük grafikte en az 2-3 kez test edilmiş destek/direnç seviyelerini çizin
2. Fiyat destek seviyesine yaklaştığında **alış** sinyali arayın
3. Fiyat direnç seviyesine yaklaştığında **satış** sinyali arayın
4. Mum çubuğu onayı bekleyin (pin bar, engulfing pattern gibi)

**Stop loss:** Destek/direncin birkaç pip ötesine
**Take profit:** Bir sonraki destek/direnç seviyesine

**İpucu:** Bir seviye ne kadar çok test edilmişse, o kadar güçlüdür. Ancak çok test edilen seviyeler sonunda kırılır — kırılmalarda dikkatli olun.

## 3. Breakout (Kırılım) Stratejisi

**Mantığı:** Fiyat bir süre dar bir aralıkta sıkıştığında, kırılım genellikle güçlü bir hareket başlatır.

**Nasıl uygulanır:**

1. Fiyatın daralan bir üçgen veya yatay bir aralıkta sıkıştığını tespit edin
2. Aralığın üst sınırı kırılırsa **alış**, alt sınırı kırılırsa **satış**
3. Kırılımın gerçek olduğunu onaylamak için hacim artışını ve kapanışı bekleyin
4. Sahte kırılımlara dikkat — kapanışı beklemeden girmeyin

**Stop loss:** Kırılım noktasının diğer tarafına
**Take profit:** Sıkışma aralığının genişliği kadar

**Uygun durumlar:** Önemli ekonomik verilerin açıklanmasından önce oluşan sıkışmalar (örn: NFP, faiz kararları)

## 4. Hareketli Ortalama Kesişimi

**En popüler teknik analiz stratejilerinden biri.** İki farklı dönemli hareketli ortalamanın kesişimini sinyal olarak kullanır.

**Ayarlar:**
- Hızlı MA: 10 veya 20 periyot (EMA tercih edilir)
- Yavaş MA: 50 periyot (EMA)

**Sinyaller:**
- **Alış:** Hızlı MA, yavaş MA'yı **aşağıdan yukarı** kesiyor
- **Satış:** Hızlı MA, yavaş MA'yı **yukarıdan aşağı** kesiyor

**Stop loss:** Son swing noktasının ötesine
**Take profit:** 1:2 risk/ödül oranı veya ters sinyal gelene kadar

**Uyarı:** Bu strateji trend piyasalarında çok iyi çalışır ama yatay piyasalarda sahte sinyaller üretir. 200 MA ile trend filtrelemesi ekleyin.

## 5. Pin Bar (Reddiye Mumu) Stratejisi

**Fiyat aksiyonu (price action) stratejisi.** Grafikte belirli mum çubuğu formasyonlarını arayarak işlem yaparsınız.

**Pin Bar nedir?** Uzun bir fitili ve küçük bir gövdesi olan mum çubuğu. Fiyatın belirli bir seviyeyi reddetti anlamına gelir.

**Alış Pin Bar:** Uzun alt fitil + küçük gövde üstte → fiyat aşağı yönü reddetti
**Satış Pin Bar:** Uzun üst fitil + küçük gövde altta → fiyat yukarı yönü reddetti

**Nasıl uygulanır:**

1. Önemli destek/direnç seviyelerinde pin bar arayın
2. Pin bar'ın fitili seviyeyi delip geri dönmüş olmalı
3. Trendin yönündeki pin bar'lar daha güvenilirdir
4. Pin bar kapandıktan sonra, gövdenin kırılmasıyla giriş yapın

**Stop loss:** Pin bar'ın fitilinin ucunun birkaç pip ötesine
**Take profit:** 1:2 veya 1:3 risk/ödül

## Genel İpuçları

- **Her zaman demo hesapta test edin** — en az 50 işlem yapın
- **Tek bir strateji seçin ve uzmanlaşın** — sürekli strateji değiştirmeyin
- **İşlem günlüğü tutun** — her işlemi kaydedin ve haftalık analiz yapın
- **Haber saatlerinde dikkatli olun** — yüksek volatilite tahmin edilemeyen hareketlere yol açar
- **Sabırlı olun** — her gün işlem açmak zorunda değilsiniz

## Sonuç

Bu 5 strateji yeni başlayanlar için iyi bir temel oluşturur. Hangisinin size uygun olduğunu bulmak için demo hesapta her birini deneyin. Unutmayın: en iyi strateji, tutarlı bir şekilde uygulayabildiğiniz stratejidir.
`
  },
  {
    slug: "turkiye-forex-vergilendirme-rehberi",
    title: "Türkiye'de Forex Vergilendirmesi: Bilmeniz Gereken Her Şey (2026)",
    excerpt: "Forex kazançları Türkiye'de nasıl vergilendirilir? Gelir vergisi, beyanname, stopaj ve yurt dışı broker kullanımının vergisel yükümlülükleri hakkında kapsamlı rehber.",
    date: "22 Mart 2026",
    readTime: "11 dk okuma",
    category: "mevzuat",
    tags: ["vergi", "türkiye", "mevzuat", "2026"],
    content: `
# Türkiye'de Forex Vergilendirmesi: Bilmeniz Gereken Her Şey (2026)

Forex işlemlerinden elde edilen kazançların vergisel durumu, birçok Türk yatırımcının kafasını karıştıran bir konudur. Bu rehberde, Türkiye'de forex gelirlerinin nasıl vergilendirildiğini, beyanname yükümlülüklerinizi ve dikkat etmeniz gereken noktaları açıklıyoruz.

**Önemli uyarı:** Bu yazı genel bilgi amaçlıdır ve vergi danışmanlığı yerine geçmez. Kendi durumunuz için mutlaka bir mali müşavire danışın.

## Türkiye'de Forex Vergi Çerçevesi

Türkiye'de forex işlemlerinden elde edilen gelirler, **Gelir Vergisi Kanunu** kapsamında "diğer kazanç ve iratlar" veya "menkul sermaye iradı" olarak değerlendirilir.

### SPK Lisanslı Broker Üzerinden İşlem

Türkiye'de SPK (Sermaye Piyasası Kurulu) lisanslı aracı kurumlar üzerinden yapılan forex işlemlerinden elde edilen kazançlardan **stopaj (tevkifat)** kesilir.

**Stopaj oranı:** Kazanç üzerinden %10 (güncel oran — mali müşavirinizle doğrulayın)

Stopaj, broker tarafından otomatik olarak kesilir ve vergi dairesine yatırılır. Yatırımcının ekstra beyanname vermesine genellikle gerek kalmaz.

### Yurt Dışı Broker Üzerinden İşlem

Yurt dışında lisanslı bir broker kullanıyorsanız (CySEC, FCA, ASIC vb.), durum farklıdır:

- Stopaj otomatik olarak kesilmez
- Kazançlarınızı **yıllık gelir vergisi beyannamesi** ile beyan etmeniz gerekir
- Beyanname dönemi: Mart ayı (bir önceki yılın gelirleri için)
- Gelir vergisi tarifesine göre artan oranlı vergi uygulanır

### Gelir Vergisi Tarifesi (2026 Referans)

| Gelir Dilimi | Vergi Oranı |
|-------------|-------------|
| İlk dilim | %15 |
| İkinci dilim | %20 |
| Üçüncü dilim | %27 |
| Dördüncü dilim | %35 |
| Beşinci dilim | %40 |

**Not:** Dilim sınırları her yıl güncellenir. Güncel tutarlar için Gelir İdaresi Başkanlığı (GİB) web sitesini kontrol edin.

## Beyanname Verme Yükümlülüğü

### Ne Zaman Beyanname Vermelisiniz?

- Yurt dışı broker'da kazanç elde ettiyseniz → **Evet**
- SPK lisanslı broker'da stopaj kesildiyse → **Genellikle hayır** (belirli tutarların üzerinde istisna olabilir)
- Forex dışında başka geliriniz varsa ve toplam gelir beyanname sınırını aşıyorsa → **Evet**

### Beyanname Nasıl Verilir?

1. **Hazır Beyan Sistemi:** GİB'in online portalı üzerinden (hazirbeyan.gib.gov.tr)
2. **e-Beyanname:** Mali müşaviriniz aracılığıyla elektronik ortamda
3. Beyan dönemi: Her yılın **Mart ayı** (1-31 Mart arası)

## Zarar Mahsubu

Forex işlemlerinden elde edilen zararlar, **aynı yıl içindeki diğer forex kazançlarından** mahsup edilebilir. Ancak:

- Zararın bir sonraki yıla devri konusunda sınırlamalar olabilir
- Farklı gelir türleri arasında zarar mahsubu genellikle yapılamaz
- Tüm işlem kayıtlarınızı saklayın — broker ekstreleri, hesap özetleri

## Dikkat Edilmesi Gerekenler

### Kayıt Tutma

- Tüm işlem geçmişinizi düzenli olarak indirin ve saklayın
- Yatırma ve çekme işlemlerinin banka dekontlarını saklayın
- Yıl sonu hesap özeti raporu alın
- Bu kayıtları en az **5 yıl** boyunca muhafaza edin

### Döviz Kuru Farkları

Yurt dışı broker kullanıyorsanız, kazançlarınız genellikle döviz (USD, EUR) cinsindendir. Beyannamede **Türk Lirası'na çevrilmesi** gerekir. Çevirme hangi kur üzerinden yapılacak konusunda mali müşavirinize danışın.

### Kripto ve CFD İşlemleri

Forex broker'lar üzerinden yapılan kripto para veya CFD işlemlerinin vergisel durumu farklılık gösterebilir. Bu konuda özel danışmanlık alın.

## SPK Düzenlemeleri

Türkiye'de forex işlemleri SPK tarafından düzenlenmektedir. Bazı önemli kurallar:

- **Kaldıraç sınırı:** SPK, Türkiye'de faaliyet gösteren lisanslı broker'lar için kaldıraç sınırları belirlemiştir
- **Minimum teminat:** Belirli minimum yatırım tutarları uygulanmaktadır
- **Lisans zorunluluğu:** Türkiye'de forex hizmeti sunmak için SPK lisansı zorunludur

Yurt dışı broker'lar bu düzenlemelere tabi değildir, ancak yurt dışı broker kullanımı yasal olarak yasak değildir — yatırımcının kendi tercihidir.

## Sıkça Sorulan Sorular

**Forex kazançlarımı beyan etmezsem ne olur?**
Vergi kaçakçılığı suç kapsamındadır. GİB'in uluslararası bilgi paylaşım anlaşmaları kapsamında yurt dışı hesap bilgilerine erişimi bulunmaktadır. Cezai yaptırımlar ağır olabilir.

**Demo hesap kazançları vergiye tabi mi?**
Hayır. Demo hesaplar sanal para kullanır ve gerçek bir gelir elde edilmez.

**Forex zararlarını diğer gelirlerimden düşebilir miyim?**
Genel kural olarak hayır. Forex zararları sadece aynı tür kazançlardan mahsup edilebilir.

## Sonuç

Forex vergilendirmesi karmaşık bir konu olabilir, özellikle yurt dışı broker kullanıyorsanız. En önemli adımlar:

1. Tüm işlem kayıtlarınızı düzenli tutun
2. Yıllık beyanname yükümlülüğünüzü kontrol edin
3. Bir mali müşavire danışarak kendi durumunuza özel rehberlik alın
4. Vergi yükümlülüklerinizi zamanında yerine getirin

Vergisel yükümlülüklerinizi ihmal etmek, forex'te elde ettiğiniz kazançlardan çok daha büyük sorunlara yol açabilir.
`
  },
  {
    slug: "forex-risk-yonetimi-rehberi",
    title: "Forex Risk Yönetimi: Sermayenizi Korumanın 7 Altın Kuralı",
    excerpt: "Forex'te uzun vadeli başarının sırrı risk yönetimidir. Position sizing, stop loss stratejileri, günlük kayıp limiti ve psikolojik kontrol teknikleri.",
    date: "22 Mart 2026",
    readTime: "13 dk okuma",
    category: "risk-yonetimi",
    tags: ["risk-yönetimi", "sermaye", "stop-loss", "psikoloji"],
    content: `
# Forex Risk Yönetimi: Sermayenizi Korumanın 7 Altın Kuralı

Forex piyasasında başarılı traderların ortak noktası nedir? Süper bir strateji veya özel bir gösterge değil — **disiplinli risk yönetimidir.** Piyasada uzun süre kalabilmek, her şeyden önce sermayenizi korumaya bağlıdır.

Bu rehberde, forex risk yönetiminin 7 altın kuralını pratik örneklerle açıklıyoruz.

## Neden Risk Yönetimi Bu Kadar Önemli?

Şu basit gerçeği düşünün:

- Hesabınızın **%10'unu** kaybederseniz, toparlanmak için **%11** kazanmanız gerekir
- Hesabınızın **%50'sini** kaybederseniz, toparlanmak için **%100** kazanmanız gerekir
- Hesabınızın **%90'ını** kaybederseniz, toparlanmak için **%900** kazanmanız gerekir

Kayıplar büyüdükçe toparlanmak katlanarak zorlaşır. Bu yüzden sermaye koruma, kar yapmaktan bile önemlidir.

## Kural 1: %1-2 Kuralı — Her İşlemde Riski Sınırlayın

**Her işlemde toplam hesabınızın en fazla %1-2'sini riske atın.** Bu, forex risk yönetiminin en temel kuralıdır.

**Örnek:** 10.000 USD hesabınız varsa:
- %1 risk = İşlem başına maksimum 100 USD kayıp
- %2 risk = İşlem başına maksimum 200 USD kayıp

Bu kural sayesinde 10 ardışık kayıp yaşasanız bile hesabınızın %80-90'ı sağlam kalır ve toparlanma şansınız vardır.

### Position Sizing Nasıl Hesaplanır?

**Formül:**
Position Büyüklüğü = (Hesap × Risk %) / (Stop Loss × Pip Değeri)

**Örnek:**
- Hesap: 5.000 USD
- Risk: %1 = 50 USD
- Stop loss: 30 pip
- EUR/USD pip değeri (mini lot): 1 USD
- Position büyüklüğü: 50 / (30 × 1) = 1,67 mini lot → **1,5 mini lot** kullanın

## Kural 2: Her Zaman Stop Loss Kullanın

**Stop loss olmadan işlem açmak, emniyet kemeri takmadan araba sürmektir.**

Stop loss, pozisyonunuzu belirli bir fiyat seviyesinde otomatik olarak kapatır ve zararınızı sınırlar.

**Stop loss yerleştirme stratejileri:**

- **Teknik seviye bazlı:** Destek/direnç seviyelerinin ötesine
- **ATR bazlı:** Son X periyodun ortalama oynaklığının 1,5-2 katı
- **Yüzde bazlı:** Giriş fiyatının belirli bir yüzdesi

**Yapmamanız gereken:**
- Stop loss'u çok dar koymak (normal piyasa gürültüsünde tetiklenir)
- Stop loss'u geniş koymak (tek işlemde çok kayıp)
- "Biraz daha bekleyeyim" diye stop loss'u geriye çekmek — **asla yapmayın**

## Kural 3: Risk/Ödül Oranını Koruyun

Minimum **1:2 risk/ödül oranı** hedefleyin. Bu şu anlama gelir: 1 dolar riske giriyorsanız, en az 2 dolar kar hedeflemelisiniz.

**Bu neden önemli?**

1:2 oranıyla, işlemlerinizin sadece %40'ında karlı olsanız bile genel olarak kar edersiniz:

- 10 işlem, %40 kazanma oranı, 1:2 R/R
- 4 karlı × 200 USD = 800 USD kar
- 6 zararlı × 100 USD = 600 USD zarar
- **Net: +200 USD kar**

## Kural 4: Günlük ve Haftalık Kayıp Limiti Belirleyin

Tek bir kötü günün tüm aylık kazancınızı silmesini engellemek için:

- **Günlük kayıp limiti:** Hesabın %3-5'i
- **Haftalık kayıp limiti:** Hesabın %5-10'u

Bu limite ulaştığınızda o gün veya hafta **işlem yapmayı bırakın.** Platformu kapatın ve uzaklaşın. Ekrana bakmaya devam etmek intikam işlemi yapma dürtüsünü artırır.

## Kural 5: Korelasyonu Göz Ardı Etmeyin

Aynı anda birden fazla pozisyon açtığınızda, **korelasyona** dikkat etmelisiniz.

**Yüksek pozitif korelasyon örneği:**
- EUR/USD long + GBP/USD long → Aslında dolara karşı **çift pozisyon** almış olursunuz
- USD güçlenirse ikisi de aynı anda zarar eder

Bu durumda %2 + %2 risk almıyorsunuz — fiilen **%4 risk** alıyorsunuz çünkü her iki pozisyon da aynı yönde hareket edecektir.

**Çözüm:** Korelasyonu yüksek paritelerde aynı anda aynı yönde pozisyon açmayın veya her birindeki riski yarıya indirin.

## Kural 6: Kaldıracı Kontrol Altında Tutun

Yüksek kaldıraç, yüksek risk demektir. Broker'ınız 1:500 kaldıraç sunuyor diye bunu kullanmak zorunda değilsiniz.

**Tavsiye edilen efektif kaldıraç:**
- Yeni başlayanlar: **1:10 — 1:20**
- Orta düzey: **1:20 — 1:50**
- İleri düzey: **1:50 — 1:100**

**Efektif kaldıraç** = Toplam pozisyon büyüklüğü / Hesap büyüklüğü

Eğer 5.000 USD hesabınızda 50.000 USD'lik toplam pozisyon varsa, efektif kaldıracınız 1:10'dur.

## Kural 7: İşlem Psikolojinizi Yönetin

Risk yönetiminin en zor kısmı teknik değil, **psikolojiktir.**

### Kaçınmanız Gereken Duygusal Tuzaklar

**İntikam işlemi (Revenge Trading):**
Kaybettikten sonra "geri almak" için aceleyle yeni işlem açmak. Bu genellikle daha büyük kayıplara yol açar.

**FOMO (Kaçırma Korkusu):**
"Bu fırsatı kaçırıyorum!" düşüncesiyle plansız işlem açmak. Piyasada her zaman yeni fırsat olacaktır.

**Aşırı güven:**
Birkaç başarılı işlemden sonra "ben artık bu işi çözdüm" duygusuyla risk kurallarını gevşetmek. Piyasa herkesi cezalandırabilir.

### Psikolojik Kontrol İçin İpuçları

1. **İşlem planı yazın** ve her işlemde buna uyun
2. **İşlem günlüğü tutun** — hangi duygularla işlem açtığınızı kaydedin
3. **Düzenli mola verin** — günde X saat ekran başında oturmak zorunlu değil
4. **Fiziksel sağlığınıza önem verin** — uyku, beslenme ve egzersiz karar kalitenizi etkiler
5. **Beklentilerinizi gerçekçi tutun** — ayda %5-10 karlılık mükemmel bir performanstır

## Pratik Risk Yönetimi Kontrol Listesi

İşlem açmadan önce bu soruları cevaplayın:

- [ ] Stop loss seviyemi belirlediim mi?
- [ ] Position büyüklüğünü hesapladım mı?
- [ ] Bu işlemdeki riskinm hesabımın %1-2'sinden fazla değil mi?
- [ ] Günlük kayıp limitime yakın mıyım?
- [ ] Açık pozisyonlarımla korelasyon var mı?
- [ ] Bu işlemi duygusal değil, stratejik bir nedenle mi açıyorum?
- [ ] Risk/ödül oranım en az 1:2 mi?

Tüm cevaplar "evet" değilse, **o işlemi açmayın.**

## Sonuç

Risk yönetimi forex'te hayatta kalmanın ve uzun vadede karlı olmanın anahtarıdır. Bu 7 kuralı ezbere bilin ve istisnasız uygulayın. En iyi stratejiler bile kötü risk yönetimi ile başarısız olur, ancak ortalama bir strateji bile iyi risk yönetimiyle karlı hale gelebilir.

Unutmayın: **Önce sermayenizi koruyun, kar zaten gelecektir.**
`
  }
];

export function getBlogPostTR(slug: string): BlogPostTR | undefined {
  return blogPostsTR.find(post => post.slug === slug);
}

export function getBlogPostsByCategoryTR(category: BlogCategoryTR): BlogPostTR[] {
  return blogPostsTR.filter(post => post.category === category);
}

export function getRelatedPostsTR(currentSlug: string, limit: number = 3): BlogPostTR[] {
  const currentPost = getBlogPostTR(currentSlug);
  if (!currentPost) return blogPostsTR.slice(0, limit);

  return blogPostsTR
    .filter(post => post.slug !== currentSlug)
    .sort((a, b) => {
      if (a.category === currentPost.category && b.category !== currentPost.category) return -1;
      if (b.category === currentPost.category && a.category !== currentPost.category) return 1;
      return 0;
    })
    .slice(0, limit);
}
