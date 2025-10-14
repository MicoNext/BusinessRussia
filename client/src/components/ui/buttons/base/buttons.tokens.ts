export const baseSizes = {
	sm: 'h-9 px-3 text-sm',
	md: 'h-10 px-4 text-sm',
	lg: 'h-11 px-5 text-base',
} as const;

export const variants = {
	primary:
		'bg-brand-primary text-white hover:brightness-95 focus-visible:ring-brand-primary',
	accent:
		'bg-brand-accent text-white hover:brightness-95 focus-visible:ring-brand-accent',
	outline:
		'border border-gray-300 text-gray-800 hover:bg-gray-50 focus-visible:ring-gray-300',
	ghost: 'text-gray-800 hover:bg-gray-50 focus-visible:ring-gray-300',
} as const;

export type TButtonSize = keyof typeof baseSizes;
export type TButtonVariant = keyof typeof variants;
