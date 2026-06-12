const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000').replace(/\/$/, '');
const APP_API_KEY = (import.meta.env.VITE_APP_API_KEY || '').trim();

export function apiUrl(path: string): string {
  return `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export function apiFetch(input: string, init: RequestInit = {}): Promise<Response> {
  const headers = new Headers(init.headers);
  if (APP_API_KEY) {
    headers.set('X-App-Key', APP_API_KEY);
  }
  return fetch(input, { ...init, headers });
}
