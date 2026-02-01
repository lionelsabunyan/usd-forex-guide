import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import FXGloryReview from "./pages/FXGloryReview";
import HankotradeReview from "./pages/HankotradeReview";
import MidasFXReview from "./pages/MidasFXReview";
import N1CMReview from "./pages/N1CMReview";
import EToroReview from "./pages/EToroReview";
import FXProReview from "./pages/FXProReview";
import ForexComReview from "./pages/ForexComReview";
import InteractiveBrokersReview from "./pages/InteractiveBrokersReview";
import AvaTradeReview from "./pages/AvaTradeReview";
import OANDAReview from "./pages/OANDAReview";
import IGMarketsReview from "./pages/IGMarketsReview";
import FAQPage from "./pages/FAQPage";
import GuidesPage from "./pages/GuidesPage";
import BrokersPage from "./pages/BrokersPage";
import BeginnersGuide from "./pages/guides/BeginnersGuide";
import USForexRegulations from "./pages/guides/USForexRegulations";
import BrokerComparisonGuide from "./pages/guides/BrokerComparisonGuide";
import RiskManagement from "./pages/guides/RiskManagement";
import TechnicalAnalysis from "./pages/guides/TechnicalAnalysis";
import FundamentalAnalysis from "./pages/guides/FundamentalAnalysis";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import TermsOfService from "./pages/legal/TermsOfService";
import Disclaimer from "./pages/legal/Disclaimer";
import AffiliateDisclosure from "./pages/legal/AffiliateDisclosure";
import BlogPage from "./pages/blog/BlogPage";
import BlogPostPage from "./pages/blog/BlogPostPage";
import ContactPage from "./pages/ContactPage";
import GoogleAnalytics from "./components/GoogleAnalytics";
import MobileStickyFooter from "./components/MobileStickyFooter";
import ExitIntentPopup from "./components/ExitIntentPopup";

// Admin Pages
import AdminLayout from "./pages/admin/AdminLayout";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminMessages from "./pages/admin/AdminMessages";
import AdminSubscribers from "./pages/admin/AdminSubscribers";
import AdminReviews from "./pages/admin/AdminReviews";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminSettings from "./pages/admin/AdminSettings";

const queryClient = new QueryClient();

// Google Analytics IDs - Set these in your environment variables or replace with actual IDs
const GA_ID = import.meta.env.VITE_GA_ID || "G-P860PCCF1T";
const GTM_ID = import.meta.env.VITE_GTM_ID || "";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <GoogleAnalytics gaId={GA_ID} gtmId={GTM_ID} />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <MobileStickyFooter />
        <ExitIntentPopup />
        <Routes>
          <Route path="/" element={<Index />} />
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
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/brokers" element={<BrokersPage />} />
          <Route path="/guides" element={<GuidesPage />} />
          <Route path="/guides/beginners-guide" element={<BeginnersGuide />} />
          <Route path="/guides/us-forex-regulations" element={<USForexRegulations />} />
          <Route path="/guides/broker-comparison" element={<BrokerComparisonGuide />} />
          <Route path="/guides/risk-management" element={<RiskManagement />} />
          <Route path="/guides/technical-analysis" element={<TechnicalAnalysis />} />
          <Route path="/guides/fundamental-analysis" element={<FundamentalAnalysis />} />
          <Route path="/legal/privacy" element={<PrivacyPolicy />} />
          <Route path="/legal/terms" element={<TermsOfService />} />
          <Route path="/legal/disclaimer" element={<Disclaimer />} />
          <Route path="/legal/affiliate-disclosure" element={<AffiliateDisclosure />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/contact" element={<ContactPage />} />

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

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
