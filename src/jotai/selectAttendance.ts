import { atom } from 'jotai';
export type Select = 'attendance' | 'breaking' | 'breakingOut' | 'worked';

export const selectAttendance = atom<Select | null>(null);
