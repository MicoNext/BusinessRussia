export const baseSizes = {
	sm: 'h-9 px-3 text-sm',
	md: 'h-10 px-4 text-sm',
	lg: 'h-11 px-5 text-base',
} as const;

export const squareSizes = {
	sm: 'w-8 h-8',
	md: 'w-10 h-10',
	lg: 'w-12 h-12',
} as const;

export const variants = {
	primary:
		'rounded-md bg-brand-primary text-white hover:brightness-95 focus-visible:ring-brand-primary',
	accent:
		'rounded-md bg-brand-accent text-white hover:brightness-95 focus-visible:ring-brand-accent',
	outline:
		'rounded-md border border-gray-300 text-gray-800 hover:bg-gray-50 focus-visible:ring-gray-300',
	ghost:
		'rounded-md text-gray-800 hover:bg-gray-50 focus-visible:ring-gray-300',
	circle:
		'rounded-full bg-white border border-gray-200 shadow hover:bg-brand-primary hover:text-white disabled:opacity-40 disabled:cursor-not-allowed',
} as const;

export type TButtonSize = keyof typeof baseSizes;
export type TSquareButtonSize = keyof typeof squareSizes;
export type TButtonVariant = keyof typeof variants;
