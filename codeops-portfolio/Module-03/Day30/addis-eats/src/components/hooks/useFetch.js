import { useState, useEffect } from "react";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    let isMounted = true;

    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, { signal: abortController.signal });

        if (!response.ok) {
          throw new Error(`Failed to load: ${response.status}`);
        }

        const result = await response.json();
        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        if (isMounted && err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, [url]);

  return { data, loading, error };
}
