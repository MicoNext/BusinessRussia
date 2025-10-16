import clsx from 'clsx';
import {
	titleSizes,
	subtitleStyles,
	descriptionStyles,
	titleColors,
} from './headline.tokens';

type Order = 1 | 2 | 3 | 4 | 5 | 6;

export function composeTitleClasses(
	order: Order,
	extra?: string,
	variant: 'light' | 'dark' = 'dark'
): string {
	return clsx(titleSizes[order], titleColors[variant], extra);
}

export function composeSubtitleClasses(
	extra?: string,
	variant: 'light' | 'dark' = 'dark'
): string {
	return clsx(subtitleStyles[variant], extra);
}

export function composeDescriptionClasses(
	extra?: string,
	variant: 'light' | 'dark' = 'dark'
): string {
	return clsx(descriptionStyles[variant], extra);
}
