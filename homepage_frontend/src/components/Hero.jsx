import React from "react";

/**
 * Hero / Mission section.
 * Uses the configured Elegant theme colors + subtle gradient background.
 */
// PUBLIC_INTERFACE
export default function Hero({ onDonateClick }) {
  /** This is a public function. Renders mission hero with a prominent CTA. */
  return (
    <section className="hero" aria-label="Mission">
      <div className="container hero__inner">
        <div className="hero__content">
          <p className="hero__eyebrow">Ocean Conservation</p>
          <h1 className="hero__headline">
            Protecting life below water—through science, community, and action.
          </h1>
          <p className="hero__subhead">
            We restore reefs, remove ocean plastic, and support coastal communities so future
            generations inherit thriving seas. Your support powers on-the-ground projects and
            long-term ecosystem protection.
          </p>

          <div className="hero__actions">
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={onDonateClick}
              aria-label="Donate Now"
            >
              Donate Now
            </button>
            <a className="btn btn-ghost btn-lg" href="#news">
              Latest updates
            </a>
          </div>
        </div>

        <div className="hero__card" aria-label="Impact summary">
          <div className="stat-grid">
            <div className="stat">
              <div className="stat__value">120+</div>
              <div className="stat__label">Cleanup events supported</div>
            </div>
            <div className="stat">
              <div className="stat__value">35</div>
              <div className="stat__label">Reef sites monitored</div>
            </div>
            <div className="stat">
              <div className="stat__value">8k</div>
              <div className="stat__label">Community volunteer hours</div>
            </div>
            <div className="stat">
              <div className="stat__value">24</div>
              <div className="stat__label">Partner organizations</div>
            </div>
          </div>
          <p className="hero__note">
            Transparent reporting and measurable outcomes—because every dollar should move the
            needle.
          </p>
        </div>
      </div>
    </section>
  );
}
