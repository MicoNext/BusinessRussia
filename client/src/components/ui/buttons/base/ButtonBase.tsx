import clsx from 'clsx';
import { baseSizes, variants } from './buttons.tokens';
import type { IButtonStyleProps } from './buttons.interfaces';

export function composeClasses({
	size = 'md',
	variant = 'outline',
	fullWidth,
	textWrap,
	className,
}: IButtonStyleProps): string {
	return clsx(
		'inline-flex rounded-md font-medium focus:outline-none focus-visible:ring-2 transition active:translate-y-[1px]',
		baseSizes[size],
		variants[variant],
		fullWidth && 'w-full',
		!textWrap && 'text-nowrap',
		className
	);
}
