import type { PageLoad } from './$types';
import { example_cards } from '$lib/data/example_cards';
export const load = (async () => {
	return { ...example_cards };
}) satisfies PageLoad;
