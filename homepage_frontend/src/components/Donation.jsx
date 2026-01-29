import React, { useEffect, useMemo, useState } from "react";
import { getConfig } from "../utils/config";

const PRESETS = [10, 25, 50, 100];

function clampMoney(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.round(n * 100) / 100);
}

// PUBLIC_INTERFACE
export default function Donation({ stripeDonationUrl: stripeDonationUrlProp = null }) {
  /** This is a public function. Renders donation UI and triggers redirect to configured Stripe URL. */
  const { stripeDonationUrl: stripeDonationUrlFromEnv } = useMemo(() => getConfig(), []);
  const stripeDonationUrl = stripeDonationUrlProp || stripeDonationUrlFromEnv;

  const [selectedPreset, setSelectedPreset] = useState(25);
  const [customAmount, setCustomAmount] = useState("");
  const [useCustom, setUseCustom] = useState(false);

  const effectiveAmount = useMemo(() => {
    return useCustom ? clampMoney(customAmount) : selectedPreset;
  }, [customAmount, selectedPreset, useCustom]);

  useEffect(() => {
    if (!stripeDonationUrl) {
      // eslint-disable-next-line no-console
      console.warn(
        "[Donation] REACT_APP_STRIPE_DONATION_URL is not set. Donate flow will be disabled."
      );
    }
  }, [stripeDonationUrl]);

  const disabled = !stripeDonationUrl;

  const helperText = disabled
    ? "Donation link is not configured yet. Please set REACT_APP_STRIPE_DONATION_URL."
    : "You’ll be redirected to a secure Stripe checkout.";

  const handleDonate = () => {
    if (!stripeDonationUrl) return;

    // Payment Links generally don't accept arbitrary amounts via querystring reliably.
    // We still keep amount selection for UX now and for future server-side Checkout Session support.
    window.location.assign(stripeDonationUrl);
  };

  return (
    <section id="donate" className="section section--tinted" aria-label="Donate">
      <div className="container donation">
        <div className="section__header donation__header">
          <h2 className="section__title">Fuel ocean restoration</h2>
          <p className="section__subtitle">
            Choose a monthly or one-time gift amount. Every contribution supports reef recovery,
            plastic removal, and coastal resilience.
          </p>
        </div>

        <div className="donation__panel card">
          <fieldset className="donation__fieldset" aria-label="Donation amount">
            <legend className="sr-only">Select a donation amount</legend>

            <div className="donation__row donation__presets" role="radiogroup" aria-label="Presets">
              {PRESETS.map((amt) => {
                const active = !useCustom && selectedPreset === amt;
                return (
                  <button
                    key={amt}
                    type="button"
                    className={`chip ${active ? "chip--active" : ""}`}
                    onClick={() => {
                      setUseCustom(false);
                      setSelectedPreset(amt);
                    }}
                    aria-pressed={active}
                  >
                    ${amt}
                  </button>
                );
              })}

              <button
                type="button"
                className={`chip ${useCustom ? "chip--active" : ""}`}
                onClick={() => setUseCustom(true)}
                aria-pressed={useCustom}
              >
                Custom
              </button>
            </div>

            <div className="donation__row donation__custom">
              <label className="label" htmlFor="customAmount">
                Custom amount
              </label>
              <div className="input-wrap">
                <span className="input-prefix" aria-hidden="true">
                  $
                </span>
                <input
                  id="customAmount"
                  name="customAmount"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="1"
                  className="input"
                  placeholder="Enter amount"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setUseCustom(true);
                  }}
                  aria-label="Custom donation amount"
                />
              </div>
              <p className="hint">
                {useCustom && effectiveAmount > 0
                  ? `Selected: $${effectiveAmount}`
                  : "Or choose a preset amount above."}
              </p>
            </div>
          </fieldset>

          <div className="donation__actions">
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={handleDonate}
              disabled={disabled}
              aria-disabled={disabled}
              aria-describedby="donation-helper"
              title={disabled ? helperText : "Continue to secure checkout"}
            >
              Donate Now
            </button>
            <p
              id="donation-helper"
              className={`note ${disabled ? "note--warn" : ""}`}
              role="note"
            >
              {helperText}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
