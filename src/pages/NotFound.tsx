import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import SEO from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Set document title for SEO and react-snap
    document.title = "404 - Page Not Found | Beginner FX Guide";
    // 404 tracking handled by Google Analytics automatically
  }, [location.pathname]);

  return (
    <>
      <SEO
        title="404 - Page Not Found | Beginner FX Guide"
        description="Sorry, the page you're looking for doesn't exist. Browse our forex broker reviews, guides, and trading tools."
        canonical={`https://beginnerfxguide.com${location.pathname}`}
      />
      <div className="flex min-h-screen items-center justify-center bg-muted">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">404</h1>
          <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
          <a href="/" className="text-primary underline hover:text-primary/90">
            Return to Home
          </a>
        </div>
      </div>
    </>
  );
};

export default NotFound;
