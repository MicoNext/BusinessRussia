import { InputSize, InputVariant } from './inputs.interface';

export const baseSizes: Record<InputSize, string> = {
	sm: 'h-9 px-3 text-sm',
	md: 'h-10 px-3 text-sm',
	lg: 'h-11 px-4 text-base',
};

export const variants: Record<InputVariant, string> = {
	dark: 'rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary',
	light:
		'rounded-lg border border-white/20 bg-white/10 text-white placeholder-white/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60',
};
