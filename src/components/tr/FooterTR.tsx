import { Link } from "react-router-dom";
import Logo from "../Logo";

const FooterTR = () => {
  return (
    <footer className="bg-background">
      {/* Main Footer Content */}
      <div className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            {/* Logo Column */}
            <div className="col-span-2 md:col-span-1">
              <Link to="/tr" className="inline-block mb-4">
                <Logo variant="default" size="lg" />
              </Link>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                Türkiye'den erişilebilen forex broker incelemeleri. Bağımsız ve tarafsız analizler.
              </p>
            </div>

            {/* Brokerlar Column */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Brokerlar</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/tr" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    Tüm Brokerlar
                  </Link>
                </li>
              </ul>
            </div>

            {/* Şirket Column */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Şirket</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/tr/hakkimizda" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    Hakkımızda
                  </Link>
                </li>
                <li>
                  <Link to="/tr/iletisim" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    İletişim
                  </Link>
                </li>
                <li>
                  <Link to="/tr/gizlilik-politikasi" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    Gizlilik Politikası
                  </Link>
                </li>
                <li>
                  <Link to="/tr/yasal-uyari" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    Yasal Uyarı
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Risk Disclaimer */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-6">
              <p className="text-xs text-amber-800 dark:text-amber-200 leading-relaxed">
                <strong className="text-amber-900 dark:text-amber-100">Risk Uyarısı:</strong> Forex ve CFD işlemleri önemli risk taşır ve tüm yatırımcılar için uygun olmayabilir. Kaldıraçlı işlemler, yatırımınızın üzerinde kayıplara yol açabilir. İşlem yapmadan önce, finansal durumunuzu, deneyim seviyenizi ve risk iştahınızı dikkatlice değerlendirin. Geçmiş performans, gelecekteki sonuçların garantisi değildir. Kaybetmeyi göze alabileceğiniz miktardan fazlasını yatırmayın.
              </p>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 mb-6">
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Affiliate Açıklaması:</strong> Bu sitede listelenen bazı brokerlardan affiliate komisyonu alabiliriz. Bu durum incelemelerimizin bağımsızlığını etkilemez. Tüm değerlendirmeler tarafsız kriterlere dayanmaktadır.
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
              <p>© 2026 Beginner FX Guide. Tüm hakları saklıdır.</p>
              <p className="text-xs">
                Bu site yatırım tavsiyesi vermez.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterTR;
