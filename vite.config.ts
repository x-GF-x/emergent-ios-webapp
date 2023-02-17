import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

interface TestUserConfig extends UserConfig {
	test: { include: string[] };
}

const config: TestUserConfig = {
	plugins: [sveltekit()],
	test: {
		include: ['vitest/**/*.{test,spec}.{js,ts}']
	}
};

export default config;
