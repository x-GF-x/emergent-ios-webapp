import { writable, type Writable } from 'svelte/store';
import { default_value } from '$lib/data/default_value';

export const dataStorageAccessor: Writable<PersonStorage> = writable(default_value);
