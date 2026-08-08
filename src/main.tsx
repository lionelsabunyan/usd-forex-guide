import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { captureAttribution } from "./lib/attribution";

// Capture paid-search click ids (msclkid/gclid) synchronously BEFORE first render, so
// affiliate CTA hrefs built during render already carry the subid. (GoogleAnalytics also
// calls this in an effect to set the GA campaign once gtag has loaded — both are idempotent.)
captureAttribution();

// Every page is a lazy chunk, and a single failed chunk fetch leaves Suspense hanging on a
// blank screen forever — a real loss on the flaky mobile connections most of our paid traffic
// arrives on. Vite fires this event when a dynamic import fails; reload once to recover.
// The sessionStorage flag stops it from becoming a reload loop when the chunk is truly gone.
// A deploy renames every chunk, so an HTML page cached from an earlier deploy asks for a
// chunk that no longer exists; the SPA fallback then returns index.html for it and the
// module fails its MIME check, leaving a permanently blank page. A plain reload can be
// served the same stale HTML, so bust the cache with a one-shot query param instead.
const recoverFromChunkError = () => {
  if (sessionStorage.getItem("chunk_reloaded")) return;
  sessionStorage.setItem("chunk_reloaded", "1");
  const url = new URL(window.location.href);
  url.searchParams.set("_cb", String(Date.now()));
  window.location.replace(url.toString());
};
window.addEventListener("vite:preloadError", recoverFromChunkError);
// vite:preloadError only covers the preload path; a failed import() surfaces as an
// unhandled rejection instead, which is what we actually saw in production.
window.addEventListener("unhandledrejection", (e) => {
  if (/dynamically imported module|Importing a module script failed/i.test(String(e.reason?.message ?? e.reason))) {
    recoverFromChunkError();
  }
});

createRoot(document.getElementById("root")!).render(<App />);
