import { useState, useEffect } from 'react';

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ac = new AbortController();
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(url, { signal: ac.signal });
        if (!res.ok) throw new Error(res.statusText || 'Error fetching');
        const json = await res.json();
        setData(json);
      } catch (err: any) {
        if (err.name !== 'AbortError') setError(err.message || 'Error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => ac.abort();
  }, [url]);

  return { data, loading, error } as { data: T | null; loading: boolean; error: string | null };
}
