import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "./components/ScrollToTop";
import GoogleAnalytics from "./components/GoogleAnalytics";
import MobileStickyFooter from "./components/MobileStickyFooter";
import { ThemeProvider } from "./components/ThemeProvider";

// Loading component for Suspense fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

// Lazy load all pages
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Broker Reviews - Lazy loaded
const FXGloryReview = lazy(() => import("./pages/FXGloryReview"));
const HankotradeReview = lazy(() => import("./pages/HankotradeReview"));
const MidasFXReview = lazy(() => import("./pages/MidasFXReview"));
const N1CMReview = lazy(() => import("./pages/N1CMReview"));
const EToroReview = lazy(() => import("./pages/EToroReview"));
const FXProReview = lazy(() => import("./pages/FXProReview"));
const ForexComReview = lazy(() => import("./pages/ForexComReview"));
const InteractiveBrokersReview = lazy(() => import("./pages/InteractiveBrokersReview"));
const AvaTradeReview = lazy(() => import("./pages/AvaTradeReview"));
const OANDAReview = lazy(() => import("./pages/OANDAReview"));
const IGMarketsReview = lazy(() => import("./pages/IGMarketsReview"));
const CharlesSchwabReview = lazy(() => import("./pages/CharlesSchwabReview"));
const TastyfxReview = lazy(() => import("./pages/TastyfxReview"));
const HFMReview = lazy(() => import("./pages/HFMReview"));
const LMFXReview = lazy(() => import("./pages/LMFXReview"));
const CoinexxReview = lazy(() => import("./pages/CoinexxReview"));
const PlexyTradeReview = lazy(() => import("./pages/PlexyTradeReview"));
const ExnessReview = lazy(() => import("./pages/ExnessReview"));
const PepperstoneReview = lazy(() => import("./pages/PepperstoneReview"));
const XMReview = lazy(() => import("./pages/XMReview"));
const FXTMReview = lazy(() => import("./pages/FXTMReview"));
const FBSReview = lazy(() => import("./pages/FBSReview"));

// Main Pages - Lazy loaded
const FAQPage = lazy(() => import("./pages/FAQPage"));
const GuidesPage = lazy(() => import("./pages/GuidesPage"));
const BrokersPage = lazy(() => import("./pages/BrokersPage"));
const ComparePage = lazy(() => import("./pages/ComparePage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const GlossaryPage = lazy(() => import("./pages/GlossaryPage"));

// Guides - Lazy loaded
const BeginnersGuide = lazy(() => import("./pages/guides/BeginnersGuide"));
const USForexRegulations = lazy(() => import("./pages/guides/USForexRegulations"));
const BrokerComparisonGuide = lazy(() => import("./pages/guides/BrokerComparisonGuide"));
const RiskManagement = lazy(() => import("./pages/guides/RiskManagement"));
const TechnicalAnalysis = lazy(() => import("./pages/guides/TechnicalAnalysis"));
const FundamentalAnalysis = lazy(() => import("./pages/guides/FundamentalAnalysis"));
const HowWeReview = lazy(() => import("./pages/guides/HowWeReview"));
const USForexTradingGuide = lazy(() => import("./pages/guides/USForexTradingGuide"));

// Tools - Lazy loaded
const ToolsPage = lazy(() => import("./pages/tools/ToolsPage"));
const PipCalculator = lazy(() => import("./pages/tools/PipCalculator"));
const PositionSizeCalculator = lazy(() => import("./pages/tools/PositionSizeCalculator"));
const ForexTaxCalculator = lazy(() => import("./pages/tools/ForexTaxCalculator"));
const MarginCalculator = lazy(() => import("./pages/tools/MarginCalculator"));
const ProfitLossCalculator = lazy(() => import("./pages/tools/ProfitLossCalculator"));
const EconomicCalendar = lazy(() => import("./pages/tools/EconomicCalendar"));

// Legal Pages - Lazy loaded
const PrivacyPolicy = lazy(() => import("./pages/legal/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/legal/TermsOfService"));
const Disclaimer = lazy(() => import("./pages/legal/Disclaimer"));
const AffiliateDisclosure = lazy(() => import("./pages/legal/AffiliateDisclosure"));

// Blog - Lazy loaded
const BlogPage = lazy(() => import("./pages/blog/BlogPage"));
const BlogPostPage = lazy(() => import("./pages/blog/BlogPostPage"));

// Compare Pages - Lazy loaded
const MidasFXvsHankotrade = lazy(() => import("./pages/compare/MidasFXvsHankotrade"));
const BestBrokersAustralia = lazy(() => import("./pages/BestBrokersAustralia"));
const BestBrokersUK = lazy(() => import("./pages/BestBrokersUK"));

// Resources - Lazy loaded
const USForexChecklist = lazy(() => import("./pages/resources/USForexChecklist"));
const InfographicsPage = lazy(() => import("./pages/resources/InfographicsPage"));

// Turkish (TR) Pages - Lazy loaded
const AnaSayfa = lazy(() => import("./pages/tr/AnaSayfa"));
const Hakkimizda = lazy(() => import("./pages/tr/Hakkimizda"));
const Iletisim = lazy(() => import("./pages/tr/Iletisim"));
const GizlilikPolitikasi = lazy(() => import("./pages/tr/GizlilikPolitikasi"));
const YasalUyari = lazy(() => import("./pages/tr/YasalUyari"));

// Turkish (TR) Review Pages - Lazy loaded
const FxProInceleme = lazy(() => import("./pages/tr/inceleme/FxProInceleme"));
const HFMInceleme = lazy(() => import("./pages/tr/inceleme/HFMInceleme"));
const XMInceleme = lazy(() => import("./pages/tr/inceleme/XMInceleme"));
const ExnessInceleme = lazy(() => import("./pages/tr/inceleme/ExnessInceleme"));
const FBSInceleme = lazy(() => import("./pages/tr/inceleme/FBSInceleme"));
const PepperstoneInceleme = lazy(() => import("./pages/tr/inceleme/PepperstoneInceleme"));
const FXTMInceleme = lazy(() => import("./pages/tr/inceleme/FXTMInceleme"));

// Admin Pages - Lazy loaded
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminMessages = lazy(() => import("./pages/admin/AdminMessages"));
const AdminSubscribers = lazy(() => import("./pages/admin/AdminSubscribers"));
const AdminReviews = lazy(() => import("./pages/admin/AdminReviews"));
const AdminAnalytics = lazy(() => import("./pages/admin/AdminAnalytics"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));

const queryClient = new QueryClient();

// Analytics IDs
const GA_ID = import.meta.env.VITE_GA_ID || "G-P860PCCF1T";
const GTM_ID = import.meta.env.VITE_GTM_ID || "";
const UET_ID = import.meta.env.VITE_UET_ID || "187233174"; // Bing UET Tag
const YM_ID = import.meta.env.VITE_YM_ID || "106629069"; // Yandex.Metrica Counter

const App = () => (
  <HelmetProvider>
    <ThemeProvider defaultTheme="system" storageKey="bfxg-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <GoogleAnalytics gaId={GA_ID} gtmId={GTM_ID} uetId={UET_ID} ymId={YM_ID} />
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <MobileStickyFooter />
            <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />

            {/* Broker Reviews */}
            <Route path="/review/fxglory" element={<FXGloryReview />} />
            <Route path="/review/hankotrade" element={<HankotradeReview />} />
            <Route path="/review/midasfx" element={<MidasFXReview />} />
            <Route path="/review/n1cm" element={<N1CMReview />} />
            <Route path="/review/etoro" element={<EToroReview />} />
            <Route path="/review/fxpro" element={<FXProReview />} />
            <Route path="/review/oanda" element={<OANDAReview />} />
            <Route path="/review/ig-markets" element={<IGMarketsReview />} />
            <Route path="/review/forexcom" element={<ForexComReview />} />
            <Route path="/review/interactive-brokers" element={<InteractiveBrokersReview />} />
            <Route path="/review/avatrade" element={<AvaTradeReview />} />
            <Route path="/review/charles-schwab" element={<CharlesSchwabReview />} />
            <Route path="/review/tastyfx" element={<TastyfxReview />} />
            <Route path="/review/hfm" element={<HFMReview />} />
            <Route path="/review/lmfx" element={<LMFXReview />} />
            <Route path="/review/coinexx" element={<CoinexxReview />} />
            <Route path="/review/plexytrade" element={<PlexyTradeReview />} />
            <Route path="/review/exness" element={<ExnessReview />} />
            <Route path="/review/pepperstone" element={<PepperstoneReview />} />
            <Route path="/review/xm" element={<XMReview />} />
            <Route path="/review/fxtm" element={<FXTMReview />} />
            <Route path="/review/fbs" element={<FBSReview />} />

            {/* Main Pages */}
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/brokers" element={<BrokersPage />} />
            <Route path="/brokers/australia" element={<BestBrokersAustralia />} />
            <Route path="/brokers/uk" element={<BestBrokersUK />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/compare/midasfx-vs-hankotrade" element={<MidasFXvsHankotrade />} />
            <Route path="/guides" element={<GuidesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/glossary" element={<GlossaryPage />} />

            {/* Guides */}
            <Route path="/guides/beginners-guide" element={<BeginnersGuide />} />
            <Route path="/guides/us-forex-regulations" element={<USForexRegulations />} />
            <Route path="/guides/broker-comparison" element={<BrokerComparisonGuide />} />
            <Route path="/guides/risk-management" element={<RiskManagement />} />
            <Route path="/guides/technical-analysis" element={<TechnicalAnalysis />} />
            <Route path="/guides/fundamental-analysis" element={<FundamentalAnalysis />} />
            <Route path="/guides/how-we-review" element={<HowWeReview />} />
            <Route path="/guides/forex-trading-usa" element={<USForexTradingGuide />} />

            {/* Tools */}
            <Route path="/tools" element={<ToolsPage />} />
            <Route path="/tools/pip-calculator" element={<PipCalculator />} />
            <Route path="/tools/position-size-calculator" element={<PositionSizeCalculator />} />
            <Route path="/tools/forex-tax-calculator" element={<ForexTaxCalculator />} />
            <Route path="/tools/margin-calculator" element={<MarginCalculator />} />
            <Route path="/tools/profit-loss-calculator" element={<ProfitLossCalculator />} />
            <Route path="/tools/economic-calendar" element={<EconomicCalendar />} />

            {/* Legal */}
            <Route path="/legal/privacy" element={<PrivacyPolicy />} />
            <Route path="/legal/terms" element={<TermsOfService />} />
            <Route path="/legal/disclaimer" element={<Disclaimer />} />
            <Route path="/legal/affiliate-disclosure" element={<AffiliateDisclosure />} />

            {/* Blog */}
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />

            {/* Resources */}
            <Route path="/resources/us-forex-checklist" element={<USForexChecklist />} />
            <Route path="/resources/infographics" element={<InfographicsPage />} />

            {/* Turkish (TR) Routes */}
            <Route path="/tr" element={<AnaSayfa />} />
            <Route path="/tr/hakkimizda" element={<Hakkimizda />} />
            <Route path="/tr/iletisim" element={<Iletisim />} />
            <Route path="/tr/gizlilik-politikasi" element={<GizlilikPolitikasi />} />
            <Route path="/tr/yasal-uyari" element={<YasalUyari />} />

            {/* Turkish (TR) Review Routes */}
            <Route path="/tr/inceleme/fxpro" element={<FxProInceleme />} />
            <Route path="/tr/inceleme/hfm" element={<HFMInceleme />} />
            <Route path="/tr/inceleme/xm" element={<XMInceleme />} />
            <Route path="/tr/inceleme/exness" element={<ExnessInceleme />} />
            <Route path="/tr/inceleme/fbs" element={<FBSInceleme />} />
            <Route path="/tr/inceleme/pepperstone" element={<PepperstoneInceleme />} />
            <Route path="/tr/inceleme/fxtm" element={<FXTMInceleme />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="messages" element={<AdminMessages />} />
              <Route path="subscribers" element={<AdminSubscribers />} />
              <Route path="reviews" element={<AdminReviews />} />
              <Route path="analytics" element={<AdminAnalytics />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            {/* Catch-all 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </ThemeProvider>
  </HelmetProvider>
);

export default App;
