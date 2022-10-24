import React, { forwardRef, memo } from 'react';
import { styles } from './styles';

export type Props = {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input = memo(
  forwardRef<HTMLInputElement, Props>(({ value, onChange, placeholder }, ref) => {
    return (
      <input
        type="text"
        onChange={onChange}
        value={value}
        css={styles.root}
        placeholder={placeholder}
        ref={ref}
      />
    );
  }),
);
