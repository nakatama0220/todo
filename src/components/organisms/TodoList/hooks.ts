import { isTypedArray } from 'util/types';
import React, { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';
import { getToday } from '../../../libs/dayjs';

export type Item = {
  id: string;
  time: string;
  value: string;
};

export type Hooks = {
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  list: Item[];
  handleClick: (value: string) => void;
  handleDelete: (id: string) => void;
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
    id: '',
    time: '',
    value: '',
  });
  const inputRef = useRef<HTMLInputElement | null>(null);
  const editInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const handleClick = useCallback(
    (value: string) => {
      if (value === '') return;
      const item = {
        id: String(list.length + 1),
        value: value,
        time: getToday(),
      };
      setList((prev) => [...prev, item]);
      setValue('');
      inputRef.current?.focus();
    },
    [list],
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
    (item: Item) => {
      if (editValue.length === 0) return;
      const result = [
        ...list.map((item1) => (item1.id === item.id ? { ...item1, value: editValue } : item1)),
      ];
      setList(result);
      handleClose();
    },
    [editValue, handleClose, list],
  );

  const handleDelete = useCallback((id: string) => {
    setList((prev) => [...prev.filter((item) => item.id !== id)]);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    editInputRef.current?.focus();
  }, [isOpen]);

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
