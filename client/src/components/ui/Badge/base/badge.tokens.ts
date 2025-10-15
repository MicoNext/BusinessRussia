export const badgeSizes = {
	sx: 'text-[10px] h-5 px-1.5',
	sm: 'text-xs h-6 px-2',
	md: 'text-sm h-7 px-2.5',
	lg: 'text-sm h-8 px-3',
} as const;

export const badgeRadii = {
	none: 'rounded-none',
	sm: 'rounded',
	md: 'rounded-md',
	lg: 'rounded-lg',
	xl: 'rounded-xl',
	full: 'rounded-full',
} as const;

export const badgeVariants = {
	light: 'bg-brand-primary/10 text-brand-primary',
	filled: 'bg-brand-primary text-white',
	outlinesoft:
		'border border-brand-primary/30 text-brand-primary bg-transparent',
	outline: 'border border-current bg-transparent',
	gradient: '',
} as const;

export type BadgeSize = keyof typeof badgeSizes;
export type BadgeRadius = keyof typeof badgeRadii;
export type BadgeVariant = keyof typeof badgeVariants;
