/**
 * Centralized runtime configuration.
 * CRA exposes only variables prefixed with REACT_APP_.
 */

// PUBLIC_INTERFACE
export function getConfig() {
  /** This is a public function. Returns normalized config values with safe fallbacks. */
  const apiBase = (process.env.REACT_APP_API_BASE || '').trim();
  const stripeDonationUrl = (process.env.REACT_APP_STRIPE_DONATION_URL || '').trim();

  return {
    apiBase: apiBase || null,
    frontendUrl: (process.env.REACT_APP_FRONTEND_URL || '').trim() || null,
    backendUrl: (process.env.REACT_APP_BACKEND_URL || '').trim() || null,
    stripeDonationUrl: stripeDonationUrl || null,
    nodeEnv: (process.env.REACT_APP_NODE_ENV || process.env.NODE_ENV || '').trim() || 'development'
  };
}
