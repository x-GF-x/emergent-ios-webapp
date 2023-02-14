import { writable, type Writable } from 'svelte/store';

export const theme: Writable<'light' | 'dark'> = writable('light');
