import clsx from 'clsx';
import { baseSizes, variants } from './inputs.tokens';
import { InputStyleProps } from './inputs.interface';

export function composeInputClasses({
	variant = 'dark',
	size = 'md',
	className,
}: InputStyleProps) {
	return clsx('block w-full', baseSizes[size], variants[variant], className);
}
