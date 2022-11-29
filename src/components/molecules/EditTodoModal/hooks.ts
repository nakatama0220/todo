import { MutableRefObject, useEffect, useRef } from 'react';

export type Hooks = {
  inputRef: MutableRefObject<HTMLInputElement | null>;
};

export const useHooks = (): Hooks => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return {
    inputRef,
  };
};
