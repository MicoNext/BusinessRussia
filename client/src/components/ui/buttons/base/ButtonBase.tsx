import clsx from 'clsx';
import { baseSizes, squareSizes, variants } from './buttons.tokens';
import type { IButtonStyleProps, IIconButtonProps } from './buttons.interfaces';

export function composeClasses({
	size = 'md',
	variant = 'outline',
	fullWidth,
	textWrap,
	className,
}: IButtonStyleProps): string {
	return clsx(
		'flex font-medium focus:outline-none focus-visible:ring-2 transition active:translate-y-[1px]',
		variant === 'circle' ? squareSizes[size] : baseSizes[size],
		variants[variant],
		fullWidth && 'w-full',
		!textWrap && 'text-nowrap',
		className
	);
}
