/**
 * API Configuration Utility
 * 
 * Determines the correct backend API base URL dynamically.
 * 
 * Behavior:
 * - On Localhost (development):
 *     Defaults to 'http://localhost:5000' (or VITE_API_URL if specified).
 * 
 * - On Hosted / Production website (Vercel, custom domain, etc.):
 *     - If VITE_API_URL is configured to a valid remote URL (e.g. 'https://nidhi-backend.vercel.app'), it uses that.
 *     - If VITE_API_URL is unset, empty, or mistakenly points to 'localhost', it safely falls back to '' (empty string).
 *       This allows relative requests like '/api/auth/login' to route to the same origin (Vercel serverless functions / rewrites)
 *       without ever attempting to contact port 5000 on the visitor's local machine.
 */

export function getApiBaseUrl() {
  const envUrl = (import.meta.env?.VITE_API_URL || '').trim();

  const isBrowser = typeof window !== 'undefined';
  const isLocalhost = isBrowser && (
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname === '0.0.0.0'
  );

  // If running in browser on a production/hosted website
  if (isBrowser && !isLocalhost) {
    // If a valid remote URL is provided (not localhost)
    if (envUrl && !envUrl.includes('localhost') && !envUrl.includes('127.0.0.1')) {
      return envUrl.replace(/\/+$/, '');
    }
    // Fall back to same-origin relative path (e.g. '/api/...')
    return '';
  }

  // Local development
  if (envUrl) {
    return envUrl.replace(/\/+$/, '');
  }
  return 'http://localhost:5000';
}

export const API_BASE = getApiBaseUrl();

/**
 * Returns a friendly, context-aware error message when connection to backend fails.
 */
export function getBackendConnectionErrorMessage() {
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    return 'Cannot connect to backend server. Please verify backend deployment and environment configuration.';
  }
  return 'Cannot connect to backend server. Please ensure backend is running on port 5000.';
}
