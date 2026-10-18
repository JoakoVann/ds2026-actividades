const API_URL = import.meta.env.VITE_API_URL.replace(/\/$/, '');

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const body: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const errorBody = body as { error?: string; message?: string } | null;
    throw new Error(errorBody?.error ?? errorBody?.message ?? `Error ${response.status}`);
  }

  return body as T;
}
