import TRLayout from "@/components/tr/TRLayout";
import { AlertTriangle, Info, Shield, Ban } from "lucide-react";

const YasalUyari = () => {
  return (
    <TRLayout
      title="Yasal Uyarı"
      description="Beginner FX Guide yasal uyarı ve sorumluluk reddi. Forex işlemlerinin riskleri hakkında önemli bilgiler."
    >
      {/* Hero Section */}
      <section className="pt-12 pb-10 bg-gradient-hero border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
              Yasal Uyarı
            </h1>
            <p className="text-muted-foreground">Son güncelleme: Şubat 2026</p>
          </div>
        </div>
      </section>

      {/* Risk Warning Banner */}
      <section className="py-8 bg-red-50 dark:bg-red-950/30 border-b border-red-200 dark:border-red-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto flex items-start gap-4">
            <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
            <div>
              <h2 className="font-bold text-red-900 dark:text-red-100 text-lg mb-2">
                ÖNEMLİ RİSK UYARISI
              </h2>
              <p className="text-red-800 dark:text-red-200">
                Forex ve CFD işlemleri yüksek risk taşır ve tüm yatırımcılar için uygun
                olmayabilir. Kaldıraçlı ürünlerde işlem yapmak, yatırdığınız sermayenin
                tamamını kaybetmenize neden olabilir. İstatistiklere göre, perakende
                yatırımcıların <strong>%74-89'u</strong> kaldıraçlı ürünlerde para
                kaybetmektedir.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Yatırım Tavsiyesi Değildir */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-start gap-4">
                <Info className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground text-lg mb-2">
                    Yatırım Tavsiyesi Değildir
                  </h3>
                  <p className="text-muted-foreground">
                    Bu web sitesinde yer alan tüm içerikler yalnızca bilgilendirme
                    amaçlıdır ve yatırım tavsiyesi niteliği taşımaz. Sunulan bilgiler,
                    herhangi bir finansal ürünün alım veya satımına yönelik tavsiye
                    veya teklif olarak değerlendirilmemelidir.
                  </p>
                  <p className="text-muted-foreground mt-2">
                    Herhangi bir yatırım kararı almadan önce, bağımsız ve lisanslı
                    bir finansal danışmana başvurmanızı şiddetle tavsiye ederiz.
                  </p>
                </div>
              </div>
            </div>

            {/* Risk Açıklaması */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground text-lg mb-2">
                    Forex ve CFD İşlemlerinin Riskleri
                  </h3>
                  <ul className="text-muted-foreground space-y-2">
                    <li>
                      • <strong>Kaldıraç riski:</strong> Kaldıraç, potansiyel
                      kazançları artırdığı gibi kayıpları da aynı oranda artırır.
                    </li>
                    <li>
                      • <strong>Piyasa riski:</strong> Döviz kurları hızla ve
                      beklenmedik şekilde değişebilir.
                    </li>
                    <li>
                      • <strong>Likidite riski:</strong> Bazı piyasa koşullarında
                      pozisyonları kapatmak zorlaşabilir.
                    </li>
                    <li>
                      • <strong>Karşı taraf riski:</strong> Broker'ın mali
                      durumu işlemlerinizi etkileyebilir.
                    </li>
                    <li>
                      • <strong>Teknik risk:</strong> İnternet bağlantısı veya
                      platform sorunları işlemlerinizi etkileyebilir.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Sorumluluk Reddi */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-start gap-4">
                <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground text-lg mb-2">
                    Sorumluluk Reddi
                  </h3>
                  <p className="text-muted-foreground">
                    Beginner FX Guide, bu sitede sunulan bilgilerin doğruluğu,
                    eksiksizliği veya güncelliği konusunda herhangi bir garanti
                    vermez. Site içeriğine dayanarak yapılan yatırımlardan doğan
                    kayıplardan sorumlu tutulamaz.
                  </p>
                  <p className="text-muted-foreground mt-2">
                    Broker incelemeleri ve karşılaştırmaları, yayın tarihindeki
                    bilgilere dayanmaktadır. Koşullar değişebilir; güncel bilgiler
                    için ilgili broker'ın resmi web sitesini ziyaret edin.
                  </p>
                </div>
              </div>
            </div>

            {/* Affiliate Açıklaması */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-start gap-4">
                <Info className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground text-lg mb-2">
                    Affiliate Açıklaması
                  </h3>
                  <p className="text-muted-foreground">
                    Bu sitede yer alan bazı bağlantılar affiliate (ortaklık)
                    bağlantılarıdır. Bu bağlantılar aracılığıyla broker hesabı
                    açtığınızda, biz komisyon alabiliriz. Bu durum sizin için
                    ek bir maliyet oluşturmaz.
                  </p>
                  <p className="text-muted-foreground mt-2">
                    Affiliate ilişkilerimiz, incelemelerimizin bağımsızlığını
                    etkilemez. Tüm değerlendirmeler objektif kriterlere
                    dayanmaktadır.
                  </p>
                </div>
              </div>
            </div>

            {/* Yaş Sınırı */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-start gap-4">
                <Ban className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground text-lg mb-2">
                    Yaş Sınırlaması
                  </h3>
                  <p className="text-muted-foreground">
                    Forex ve CFD işlemleri yalnızca 18 yaşından büyük bireyler
                    tarafından yapılabilir. Bu sitede sunulan bilgiler, 18 yaşından
                    küçük bireylere yönelik değildir.
                  </p>
                </div>
              </div>
            </div>

            {/* Geçmiş Performans */}
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
              <h3 className="font-semibold text-amber-900 dark:text-amber-100 text-lg mb-2">
                Geçmiş Performans Garantisi Değildir
              </h3>
              <p className="text-amber-800 dark:text-amber-200">
                Geçmiş performans, gelecekteki sonuçların garantisi veya güvenilir
                bir göstergesi değildir. Herhangi bir yatırım stratejisinin veya
                broker'ın geçmişte elde ettiği sonuçlar, gelecekte aynı sonuçları
                elde edeceği anlamına gelmez.
              </p>
            </div>

            {/* Sonuç */}
            <div className="prose prose-slate dark:prose-invert">
              <h2>Sonuç</h2>
              <p>
                Forex ve CFD işlemlerine başlamadan önce, riskleri tam olarak
                anladığınızdan emin olun. Sadece kaybetmeyi göze alabileceğiniz
                miktarla işlem yapın. Şüpheniz varsa, profesyonel finansal
                danışmanlık alın.
              </p>
              <p>
                Bu siteyi kullanarak, yukarıdaki uyarı ve koşulları okuduğunuzu
                ve kabul ettiğinizi beyan etmiş olursunuz.
              </p>
            </div>

            {/* İletişim */}
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <h3 className="font-semibold text-foreground mb-2">
                Sorularınız mı var?
              </h3>
              <p className="text-muted-foreground">
                Yasal uyarımız hakkında sorularınız için:{" "}
                <a
                  href="mailto:info@beginnerfxguide.com"
                  className="text-primary hover:underline"
                >
                  info@beginnerfxguide.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </TRLayout>
  );
};

export default YasalUyari;
