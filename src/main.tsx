import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { captureAttribution } from "./lib/attribution";

// Capture paid-search click ids (msclkid/gclid) synchronously BEFORE first render, so
// affiliate CTA hrefs built during render already carry the subid. (GoogleAnalytics also
// calls this in an effect to set the GA campaign once gtag has loaded — both are idempotent.)
captureAttribution();

createRoot(document.getElementById("root")!).render(<App />);
