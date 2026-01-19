import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import FXGloryReview from "./pages/FXGloryReview";
import N1CMReview from "./pages/N1CMReview";
import EToroReview from "./pages/EToroReview";
import FAQPage from "./pages/FAQPage";
import GuidesPage from "./pages/GuidesPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/review/fxglory" element={<FXGloryReview />} />
          <Route path="/review/n1cm" element={<N1CMReview />} />
          <Route path="/review/etoro" element={<EToroReview />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/guides" element={<GuidesPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
