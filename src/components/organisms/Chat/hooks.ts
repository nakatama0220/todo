import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useCallback, useEffect, useState } from 'react';
import { useUserId } from '../../../libs/hooks/useUserId';

type Item = {
  id: string;
  userId: string;
  chat: string;
};
export type Hooks = {
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  list: Item[];
  handleClick: (text: string) => void;
};

export const useHooks = (): Hooks => {
  const [list, setList] = useState<Item[]>([]);
  const { userId } = useUserId();
  const [value, setValue] = useState<string>('');
  const supabase = useSupabaseClient();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const fetchList = useCallback(async () => {
    const datas = (await supabase.from('chat').select('*')).data;
    if (!datas) return;
    setList(datas);
  }, [supabase]);

  const handleClick = useCallback(
    async (text: string) => {
      if (text === '') return;
      await supabase.from('chat').insert({
        chat: text,
        userid: userId,
      });
      fetchList();
      setValue('');
    },
    [fetchList, supabase, userId],
  );

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  return {
    handleChange,
    list,
    value,
    handleClick,
  };
};
