import { useRouter } from 'next/router';
import { ChangeEvent, useCallback } from 'react';

export type Hooks = {
  handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

export const useHooks = (): Hooks => {
  const router = useRouter();

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      router.push(e.target.value);
    },
    [router],
  );

  return {
    handleChange,
  };
};
