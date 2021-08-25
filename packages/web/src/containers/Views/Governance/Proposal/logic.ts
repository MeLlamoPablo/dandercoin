import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function useNotFoundHandler(isNotFound: boolean) {
  const { replace } = useRouter();

  useEffect(() => {
    if (isNotFound) {
      void replace('/404');
    }
  }, [isNotFound, replace]);
}
