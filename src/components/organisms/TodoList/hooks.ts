import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';
import { getToday } from '../../../libs/dayjs';
import { useUserId } from '../../../libs/hooks/useUserId';

export type Item = {
  id: number;
  value: string;
  time: string;
  scheduledTime: string;
};
type FormValue = {
  text: string;
  scheduledTime: string;
};
const initialFormValue: FormValue = {
  text: '',
  scheduledTime: '',
};
export type Hooks = {
  value: FormValue;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  list: Item[];
  handleClick: (value: string) => void;
  handleDelete: (id: number) => void;
  inputRef: MutableRefObject<HTMLInputElement | null>;
  handleOpen: (item: Item) => void;
  handleClose: () => void;
  isOpen: boolean;
  edit: Item;
  handleEdit: (item: Item) => void;
  handleEditChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleComplete: (item: Item) => void;
  completeList: Item[];
  handleCompleteDelete: (id: number) => void;
  handleReset: (item: Item) => void;
  handleChangeTime: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchValue: string;
  searchCompleteValue: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCompleteSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEditChangeTime: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const useHooks = (): Hooks => {
  const [list, setList] = useState<Item[]>([]);
  const [completeList, setCompleteList] = useState<Item[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [edit, setEdit] = useState<Item>({
    id: 0,
    time: '',
    value: '',
    scheduledTime: '',
  });
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchCompleteValue, setSearchCompleteValue] = useState<string>('');
  const supabase = useSupabaseClient();
  const { userId } = useUserId();
  const [value, setValue] = useState<FormValue>(initialFormValue);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue((prev) => ({ ...prev, text: e.target.value }));
  }, []);

  const handleChangeTime = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue((prev) => ({ ...prev, scheduledTime: e.target.value }));
  }, []);

  const fetchTodo = useCallback(async () => {
    const datas = (await supabase.from('todos').select('*')).data;
    if (!datas) return;
    setList(datas);
  }, [supabase]);

  const handleClick = useCallback(
    async (text: string) => {
      if (text === '' || value.scheduledTime === '') return;
      await supabase.from('todos').insert({
        value: text,
        time: getToday('YYYY-MM-DDTHH:mm'),
        scheduledTime: value.scheduledTime,
        userid: userId,
      });
      fetchTodo();
      setValue(initialFormValue);
      inputRef.current?.focus();
    },
    [fetchTodo, supabase, userId, value.scheduledTime],
  );

  const handleSearch = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
      const { data } = await supabase.from('todos').select().textSearch('value', e.target.value);
      if (!data || data.length === 0) {
        fetchTodo();
        return;
      }
      setList(data);
    },
    [fetchTodo, supabase],
  );

  const handleOpen = useCallback((item: Item) => {
    setIsOpen(true);
    setEdit(item);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleEditChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEdit((prev) => ({
      ...prev,
      value: e.target.value,
    }));
  }, []);

  const handleEditChangeTime = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEdit((prev) => ({
      ...prev,
      scheduledTime: e.target.value,
    }));
  }, []);

  const handleDelete = useCallback(
    async (id: number) => {
      await supabase.from('todos').delete().eq('id', id);
      fetchTodo();
    },
    [fetchTodo, supabase],
  );

  const handleEdit = useCallback(
    async (item: Item) => {
      if (item.value.length === 0) return;
      await supabase
        .from('todos')
        .update({ value: item.value, scheduledTime: item.scheduledTime })
        .eq('id', item.id);
      fetchTodo();
      handleClose();
    },
    [fetchTodo, handleClose, supabase],
  );

  const fetchCompleteList = useCallback(async () => {
    const datas = (await supabase.from('complete').select('*')).data;
    if (!datas) return;
    setCompleteList(datas);
  }, [supabase]);

  const handleCompleteSearch = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchCompleteValue(e.target.value);
      const { data } = await supabase.from('complete').select().textSearch('value', e.target.value);
      if (!data || data.length === 0) {
        fetchCompleteList();
        return;
      }
      setCompleteList(data);
    },
    [fetchCompleteList, supabase],
  );

  const handleComplete = useCallback(
    async (item: Item) => {
      await supabase.from('complete').insert({
        value: item.value,
        time: getToday('YYYY-MM-DDTHH:mm'),
        userid: userId,
        scheduledTime: item.scheduledTime,
      });
      handleDelete(item.id);
      fetchCompleteList();
    },
    [fetchCompleteList, handleDelete, supabase, userId],
  );

  const handleCompleteDelete = useCallback(
    async (id: number) => {
      await supabase.from('complete').delete().eq('id', id);
      fetchCompleteList();
    },
    [fetchCompleteList, supabase],
  );

  const handleReset = useCallback(
    async (item: Item) => {
      await supabase.from('complete').delete().eq('id', item.id);
      fetchCompleteList();
      await supabase.from('todos').insert({
        value: item.value,
        time: item.time,
        scheduledTime: item.scheduledTime,
        userid: userId,
      });
      fetchTodo();
    },
    [fetchCompleteList, fetchTodo, supabase, userId],
  );

  useEffect(() => {
    fetchTodo();
    fetchCompleteList();
  }, [fetchCompleteList, fetchTodo]);

  return {
    edit,
    handleChange,
    handleClick,
    handleClose,
    handleDelete,
    handleEdit,
    handleEditChange,
    handleOpen,
    inputRef,
    isOpen,
    list,
    value,
    handleComplete,
    completeList,
    handleCompleteDelete,
    handleReset,
    handleChangeTime,
    handleCompleteSearch,
    handleSearch,
    searchCompleteValue,
    searchValue,
    handleEditChangeTime,
  };
};
