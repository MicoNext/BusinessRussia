export const titleSizes = {
	1: 'text-4xl md:text-5xl font-bold tracking-tight',
	2: 'text-3xl md:text-4xl font-semibold tracking-tight',
	3: 'text-2xl md:text-3xl font-semibold',
	4: 'text-xl md:text-2xl font-semibold',
	5: 'text-lg font-medium',
	6: 'text-base font-medium',
} as const;

export const subtitleStyles = {
	light: 'text-sm uppercase tracking-wide text-white/80',
	dark: 'text-sm uppercase tracking-wide text-brand-primary',
} as const;

export const titleColors = {
	light: 'text-white',
	dark: 'text-gray-900',
} as const;

export const descriptionStyles = {
	light: 'text-sm md:text-base text-white/90',
	dark: 'text-sm md:text-base text-brand-grayText/80',
} as const;
