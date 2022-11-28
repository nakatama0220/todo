import { KeyboardEvent, useCallback } from 'react';

type Hooks = {
  handleKeyDown: (e: KeyboardEvent<HTMLDivElement>) => void;
};
export const useHooks = (handleClose: () => void): Hooks => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Escape') handleClose();
    },
    [handleClose],
  );

  return {
    handleKeyDown,
  };
};
