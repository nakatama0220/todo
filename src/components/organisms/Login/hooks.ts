import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { ChangeEvent, useCallback, useState } from 'react';

export type Hooks = {
  handleChangePassword: (e: ChangeEvent<HTMLInputElement>) => void;
  handleChangeEmail: (e: ChangeEvent<HTMLInputElement>) => void;
  email: string;
  password: string;
  handleLogin: () => void;
};

export const useHooks = (): Hooks => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const supabase = useSupabaseClient();

  const handleChangePassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);

  const handleChangeEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const handleLogin = useCallback(async () => {
    await supabase.auth.signUp({ email, password });
  }, [email, password, supabase.auth]);

  return {
    email,
    handleChangeEmail,
    handleChangePassword,
    password,
    handleLogin,
  };
};
