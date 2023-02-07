import { writable, type Writable } from 'svelte/store';

export const dataStorageAccessor: Writable<DataStorage | Record<string, never>> = writable({});
