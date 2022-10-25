import { isTypedArray } from 'util/types';
import React, { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';
import supabase from '../../../../utils/supabase';
import { getToday } from '../../../libs/dayjs';

export type Item = {
  id: number;
  value: string;
  time: string;
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
};

export const useHooks = (): Hooks => {
  const [value, setValue] = useState<string>('');
  const [editValue, setEditValue] = useState<string>('');
  const [list, setList] = useState<Item[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [edit, setEdit] = useState<Item>({
    id: 0,
    time: '',
    value: '',
  });
  const inputRef = useRef<HTMLInputElement | null>(null);
  const editInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const fetchTodo = useCallback(async () => {
    const datas = (await supabase.from('todos').select('*')).data;
    if (!datas) return;
    setList(datas);
  }, []);

  const handleClick = useCallback(
    async (value: string) => {
      if (value === '') return;
      await supabase.from('todos').insert({ value, time: getToday() });
      fetchTodo();
      setValue('');
      inputRef.current?.focus();
    },
    [fetchTodo],
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

  useEffect(() => {
    if (!isOpen) return;
    editInputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    fetchTodo();
  }, [fetchTodo]);

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
  };
};
