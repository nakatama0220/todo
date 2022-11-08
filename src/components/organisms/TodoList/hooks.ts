import { useRouter } from 'next/router';
import React, { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';
import supabase from '../../../../utils/supabase';
import { getToday } from '../../../libs/dayjs';

export type CompleteItem = {
  id: number;
  value: string;
  time: string;
};

export type Item = {
  id: number;
  value: string;
  time: string;
  scheduledTime: string;
};

export type Hooks = {
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  list: Item[];
  handleClick: (value: string) => void;
  handleDelete: (id: number) => void;
  inputRef: MutableRefObject<HTMLInputElement | null>;
  editInputRef: MutableRefObject<HTMLInputElement | null>;
  handleOpen: (item: Item) => void;
  handleClose: () => void;
  isOpen: boolean;
  edit: Item;
  handleEdit: (item: Item) => void;
  handleEditChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  editValue: string;
  handleComplete: (item: Item) => void;
  completeList: CompleteItem[];
  handleCompleteDelete: (id: number) => void;
  handleReset: (item: CompleteItem) => void;
  handleChangeTime: (e: React.ChangeEvent<HTMLInputElement>) => void;
  scheduledTime: string;
  handleTopPage: () => void;
};

export const useHooks = (): Hooks => {
  const [value, setValue] = useState<string>('');
  const [editValue, setEditValue] = useState<string>('');
  const [list, setList] = useState<Item[]>([]);
  const [completeList, setCompleteList] = useState<CompleteItem[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [edit, setEdit] = useState<Item>({
    id: 0,
    time: '',
    value: '',
    scheduledTime: '',
  });
  const inputRef = useRef<HTMLInputElement | null>(null);
  const editInputRef = useRef<HTMLInputElement | null>(null);
  const [scheduledTime, setScheduledTime] = useState<string>('');
  const router = useRouter();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const fetchTodo = useCallback(async () => {
    const datas = (await supabase.from('todos').select('*')).data;
    if (!datas) return;
    setList(datas);
  }, []);

  const fetchCompleteList = useCallback(async () => {
    const datas = (await supabase.from('complete').select('*')).data;
    if (!datas) return;
    setCompleteList(datas);
  }, []);

  const handleClick = useCallback(
    async (value: string) => {
      if (value === '' || scheduledTime === '') return;
      await supabase
        .from('todos')
        .insert({ value, time: getToday('YYYY-MM-DDTHH:mm'), scheduledTime: scheduledTime });
      fetchTodo();
      setValue('');
      setScheduledTime('');
      inputRef.current?.focus();
    },
    [fetchTodo, scheduledTime],
  );

  const handleEditChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value);
  }, []);

  const handleOpen = useCallback((item: Item) => {
    setIsOpen(true);
    setEdit(item);
    setEditValue(item.value);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleEdit = useCallback(
    async (item: Item) => {
      if (editValue.length === 0) return;
      await supabase.from('todos').update({ value: editValue }).eq('id', item.id);
      fetchTodo();
      handleClose();
    },
    [editValue, fetchTodo, handleClose],
  );

  const handleDelete = useCallback(
    async (id: number) => {
      await supabase.from('todos').delete().eq('id', id);
      fetchTodo();
    },
    [fetchTodo],
  );

  const handleComplete = useCallback(
    async (item: Item) => {
      await supabase
        .from('complete')
        .insert({ value: item.value, time: getToday('YYYY-MM-DDTHH:mm') });
      handleDelete(item.id);
      fetchCompleteList();
    },
    [fetchCompleteList, handleDelete],
  );

  const handleCompleteDelete = useCallback(
    async (id: number) => {
      await supabase.from('complete').delete().eq('id', id);
      fetchCompleteList();
    },
    [fetchCompleteList],
  );

  const handleChangeTime = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setScheduledTime(e.target.value);
  }, []);

  const handleReset = useCallback(
    async (item: CompleteItem) => {
      await supabase.from('complete').delete().eq('id', item.id);
      fetchCompleteList();
      await supabase
        .from('todos')
        .insert({ value: item.value, time: getToday('YYYY-MM-DDTHH:mm') });
      fetchTodo();
    },
    [fetchCompleteList, fetchTodo],
  );

  const handleTopPage = useCallback(() => {
    router.push('.');
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    editInputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    fetchTodo();
    fetchCompleteList();
  }, [fetchCompleteList, fetchTodo]);

  return {
    edit,
    editInputRef,
    editValue,
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
    scheduledTime,
    handleTopPage,
  };
};
