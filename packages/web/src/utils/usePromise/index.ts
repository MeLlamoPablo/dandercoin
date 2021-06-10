import { useEffect, useState } from 'react';

export default function usePromise<T>(
  promiseCreator: () => Promise<T>,
): T | undefined {
  const [result, setResult] = useState<T | undefined>(undefined);

  useEffect(() => {
    promiseCreator()
      .then((it) => {
        setResult(it);
      })
      .catch((error) => {
        throw error;
      });
  }, [promiseCreator]);

  return result;
}
