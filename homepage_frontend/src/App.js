import React, { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import Hero from "./components/Hero";
import NewsList from "./components/NewsList";
import Donation from "./components/Donation";
import { getConfig } from "./utils/config";

// PUBLIC_INTERFACE
function App() {
  /** This is a public function. Renders the ocean conservation single-page homepage. */
  const [theme, setTheme] = useState("light");
  const donateRef = useRef(null);
  const config = useMemo(() => getConfig(), []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    /** This is a public function. Toggles between light and dark theme. */
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const scrollToDonate = () => {
    const el = donateRef.current || document.getElementById("donate");
    if (el && typeof el.scrollIntoView === "function") {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="App">
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="topbar" aria-label="Site header">
        <div className="container topbar__inner">
          <div className="brand" aria-label="Organization name">
            <span className="brand__mark" aria-hidden="true" />
            <span className="brand__name">BlueCurrent</span>
          </div>

          <nav className="nav" aria-label="Primary">
            <a className="nav__link" href="#mission">
              Mission
            </a>
            <a className="nav__link" href="#news">
              News
            </a>
            <a className="nav__link" href="#donate">
              Donate
            </a>
          </nav>

          <div className="topbar__actions">
            <button
              className="btn btn-ghost btn-sm"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              type="button"
            >
              {theme === "light" ? "Dark mode" : "Light mode"}
            </button>
          </div>
        </div>
      </header>

      <main id="main">
        <Hero onDonateClick={scrollToDonate} stripeDonationUrl={config.stripeDonationUrl} />
        <NewsList />
        <div ref={donateRef}>
          <Donation stripeDonationUrl={config.stripeDonationUrl} />
        </div>
      </main>

      <footer className="footer" aria-label="Site footer">
        <div className="container footer__inner">
          <p className="footer__title">BlueCurrent Ocean Conservation</p>
          <p className="footer__meta">
            {config.apiBase ? (
              <span className="footer__pill">API base: {config.apiBase}</span>
            ) : (
              <span className="footer__pill">Offline mode: using local news</span>
            )}
            {config.stripeDonationUrl ? (
              <span className="footer__pill">Donations enabled</span>
            ) : (
              <span className="footer__pill">Donations disabled (missing Stripe URL)</span>
            )}
          </p>
          <p className="footer__fineprint">
            © {new Date().getFullYear()} BlueCurrent. Built for education and demonstration.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
