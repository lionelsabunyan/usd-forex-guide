import TRLayout from "@/components/tr/TRLayout";
import { Target, Eye, Award, Users } from "lucide-react";

const Hakkimizda = () => {
  return (
    <TRLayout
      title="Hakkımızda"
      description="Beginner FX Guide hakkında bilgi edinin. Bağımsız forex broker incelemeleri ve karşılaştırmaları sunuyoruz."
    >
      {/* Hero Section */}
      <section className="pt-12 pb-16 bg-gradient-hero border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
              Hakkımızda
            </h1>
            <p className="text-lg text-muted-foreground">
              Forex piyasalarını anlamak isteyen yatırımcılara bağımsız bilgi ve
              karşılaştırma hizmeti sunuyoruz.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground text-lg mb-2">Misyonumuz</h3>
              <p className="text-muted-foreground">
                Forex piyasasına yeni başlayan ve deneyimli yatırımcılara güvenilir,
                tarafsız ve kapsamlı broker incelemeleri sunmak.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground text-lg mb-2">Vizyonumuz</h3>
              <p className="text-muted-foreground">
                Yatırımcıların bilinçli kararlar vermesine yardımcı olan, sektörün
                en güvenilir bilgi kaynağı olmak.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How We Review */}
      <section className="py-16 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-center text-foreground mb-8">
              Broker İncelemeleri Nasıl Yapılır?
            </h2>

            <div className="space-y-6">
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Lisans Doğrulama</h4>
                    <p className="text-muted-foreground text-sm">
                      Broker'ın düzenleyici kurumlar tarafından lisanslandığını doğrularız.
                      Lisans numaraları ve düzenleyici kayıtları kontrol edilir.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Hesap Açma ve Test</h4>
                    <p className="text-muted-foreground text-sm">
                      Her broker'da gerçek hesap açar ve platformlarını test ederiz.
                      Kayıt süreci, doğrulama ve kullanıcı deneyimi değerlendirilir.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">İşlem Koşulları Analizi</h4>
                    <p className="text-muted-foreground text-sm">
                      Spread'ler, komisyonlar, swap oranları ve işlem hızları detaylı olarak analiz edilir.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Müşteri Desteği Testi</h4>
                    <p className="text-muted-foreground text-sm">
                      Canlı destek, e-posta ve telefon desteği test edilir. Yanıt süreleri ve kalitesi değerlendirilir.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Independence */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <Award className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
                    Editoryal Bağımsızlık
                  </h3>
                  <p className="text-amber-800 dark:text-amber-200 text-sm">
                    Bu sitede listelenen bazı brokerlardan affiliate komisyonu alabiliriz.
                    Ancak bu durum incelemelerimizin bağımsızlığını etkilemez.
                    Tüm değerlendirmeler objektif kriterlere dayanmaktadır ve komisyon ilişkisi
                    puanlamayı veya sıralamayı doğrudan etkilemez.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
              İletişim
            </h2>
            <p className="text-muted-foreground mb-6">
              Sorularınız veya önerileriniz için bizimle iletişime geçebilirsiniz.
            </p>
            <div className="bg-card border border-border rounded-xl p-6">
              <p className="text-muted-foreground mb-2">
                <strong className="text-foreground">Editör:</strong> Lionel Sabunyan
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground">E-posta:</strong>{" "}
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

export default Hakkimizda;
