import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import eventsource from 'eventsource';

global.EventSource = eventsource;


export default defineConfig({
	plugins: [sveltekit(), purgeCss()]
});