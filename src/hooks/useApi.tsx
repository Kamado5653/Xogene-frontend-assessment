import { useEffect, useState } from "react";

type AsyncFn = () => Promise<any>;

const useApi = <T = any,>(fn: AsyncFn) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const refetch = async () => {
    setLoading(true);
    fn()
      .then((resp) => {
        setData(resp);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    refetch();
  }, []);

  return { data, loading, error, refetch } as const;
};

export default useApi;
