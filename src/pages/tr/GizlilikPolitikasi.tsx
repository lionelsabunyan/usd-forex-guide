import TRLayout from "@/components/tr/TRLayout";

const GizlilikPolitikasi = () => {
  return (
    <TRLayout
      title="Gizlilik Politikası"
      description="Beginner FX Guide gizlilik politikası. Kişisel verilerinizin nasıl toplandığı ve kullanıldığı hakkında bilgi."
    >
      {/* Hero Section */}
      <section className="pt-12 pb-10 bg-gradient-hero border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
              Gizlilik Politikası
            </h1>
            <p className="text-muted-foreground">Son güncelleme: Şubat 2026</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <article className="max-w-3xl mx-auto prose prose-slate dark:prose-invert">
            <h2>1. Veri Sorumlusu</h2>
            <p>
              Bu gizlilik politikası, Beginner FX Guide (beginnerfxguide.com) tarafından
              toplanan ve işlenen kişisel veriler hakkında bilgi vermektedir.
            </p>
            <p>
              <strong>İletişim:</strong> info@beginnerfxguide.com
            </p>

            <h2>2. Toplanan Veriler</h2>
            <p>Sitemizi kullandığınızda aşağıdaki veriler toplanabilir:</p>
            <ul>
              <li>
                <strong>İletişim bilgileri:</strong> İletişim formunu doldurduğunuzda
                ad, e-posta adresi ve mesaj içeriği
              </li>
              <li>
                <strong>Teknik veriler:</strong> IP adresi, tarayıcı türü, cihaz bilgileri,
                ziyaret edilen sayfalar, ziyaret süresi
              </li>
              <li>
                <strong>Çerez verileri:</strong> Site tercihlerinizi hatırlamak için
                kullanılan çerezler
              </li>
            </ul>

            <h2>3. Verilerin Kullanım Amaçları</h2>
            <p>Topladığımız veriler şu amaçlarla kullanılır:</p>
            <ul>
              <li>İletişim formlarına yanıt vermek</li>
              <li>Site kullanımını analiz etmek ve iyileştirmek</li>
              <li>Teknik sorunları tespit etmek ve çözmek</li>
              <li>Yasal yükümlülükleri yerine getirmek</li>
            </ul>

            <h2>4. Veri Paylaşımı</h2>
            <p>
              Kişisel verileriniz üçüncü taraflarla paylaşılmaz, satılmaz veya kiralanmaz.
              Ancak aşağıdaki durumlar istisnadır:
            </p>
            <ul>
              <li>Yasal zorunluluklar (mahkeme kararı, resmi talep)</li>
              <li>
                Hizmet sağlayıcılar (analiz araçları, hosting hizmeti) - bu sağlayıcılar
                verilerinizi yalnızca bizim adımıza işler
              </li>
            </ul>

            <h2>5. Çerezler (Cookies)</h2>
            <p>
              Sitemiz çerez kullanmaktadır. Çerezler, tarayıcınıza yerleştirilen küçük
              metin dosyalarıdır.
            </p>
            <h3>Kullandığımız çerez türleri:</h3>
            <ul>
              <li>
                <strong>Zorunlu çerezler:</strong> Sitenin düzgün çalışması için gerekli
              </li>
              <li>
                <strong>Analiz çerezleri:</strong> Site kullanımını anlamak için (Google Analytics)
              </li>
              <li>
                <strong>Tercih çerezleri:</strong> Dil ve tema gibi tercihlerinizi hatırlamak için
              </li>
            </ul>
            <p>
              Tarayıcı ayarlarınızdan çerezleri devre dışı bırakabilirsiniz. Ancak bu durumda
              sitenin bazı özellikleri düzgün çalışmayabilir.
            </p>

            <h2>6. Google Analytics</h2>
            <p>
              Sitemiz Google Analytics kullanmaktadır. Google Analytics, ziyaretçi
              davranışlarını analiz etmek için çerezler kullanır. Toplanan veriler
              anonimleştirilir ve istatistiksel amaçlarla kullanılır.
            </p>
            <p>
              Google'ın gizlilik politikası hakkında daha fazla bilgi için:
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}policies.google.com/privacy
              </a>
            </p>

            <h2>7. Veri Güvenliği</h2>
            <p>
              Kişisel verilerinizin güvenliğini sağlamak için uygun teknik ve
              organizasyonel önlemler alınmaktadır:
            </p>
            <ul>
              <li>SSL şifreleme (HTTPS)</li>
              <li>Güvenli sunucu altyapısı</li>
              <li>Düzenli güvenlik güncellemeleri</li>
            </ul>

            <h2>8. Haklarınız</h2>
            <p>
              Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında aşağıdaki haklara
              sahipsiniz:
            </p>
            <ul>
              <li>Verilerinizin işlenip işlenmediğini öğrenme</li>
              <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</li>
              <li>Verilerinizin düzeltilmesini isteme</li>
              <li>Verilerinizin silinmesini veya yok edilmesini isteme</li>
              <li>İşlenen verilerin aktarıldığı üçüncü kişileri bilme</li>
              <li>Otomatik sistemler aracılığıyla analiz sonuçlarına itiraz etme</li>
            </ul>
            <p>
              Bu haklarınızı kullanmak için info@beginnerfxguide.com adresine
              e-posta gönderebilirsiniz.
            </p>

            <h2>9. Veri Saklama Süresi</h2>
            <p>
              Kişisel verileriniz, toplama amacı için gerekli olan süre boyunca
              saklanır. İletişim formu verileri, talebiniz işlendikten sonra
              makul bir süre içinde silinir.
            </p>

            <h2>10. Üçüncü Taraf Bağlantıları</h2>
            <p>
              Sitemiz üçüncü taraf web sitelerine bağlantılar içerebilir. Bu sitelerin
              gizlilik politikalarından sorumlu değiliz. Ziyaret ettiğiniz her sitenin
              gizlilik politikasını okumanızı öneririz.
            </p>

            <h2>11. Değişiklikler</h2>
            <p>
              Bu gizlilik politikası zaman zaman güncellenebilir. Önemli değişiklikler
              yapıldığında sitemizde duyurulacaktır. Politikayı düzenli olarak
              kontrol etmenizi öneririz.
            </p>

            <h2>12. İletişim</h2>
            <p>
              Gizlilik politikamız hakkında sorularınız varsa, lütfen bizimle
              iletişime geçin:
            </p>
            <p>
              <strong>E-posta:</strong> info@beginnerfxguide.com
            </p>
          </article>
        </div>
      </section>
    </TRLayout>
  );
};

export default GizlilikPolitikasi;
