import type { Config } from 'tailwindcss';

export default {
	content: [
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/componnects/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./componnects/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',
				brand: {
					primary: '#2b7de0',
					accent: '#e5020b',
					grayText: '#333333',
					gray: '#2f3338',
				},
			},
			keyframes: {
				'slide-in-left': {
					from: { transform: 'translateX(-100%)' },
					to: { transform: 'translateX(0)' },
				},
				'slide-in-right': {
					from: { transform: 'translateX(100%)' },
					to: { transform: 'translateX(0)' },
				},
				'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
			},
			animation: {
				'slide-in-left': 'slide-in-left 300ms ease-out',
				'slide-in-right': 'slide-in-right 300ms ease-out',
				'fade-in': 'fade-in 200ms ease-out',
			},
		},
	},
	plugins: [],
} satisfies Config;
