import { useRouter } from 'next/router';
import { useCallback } from 'react';

export type Hooks = {
  handleClick: () => void;
};

export const useHooks = (): Hooks => {
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push('.');
  }, [router]);

  return {
    handleClick,
  };
};
