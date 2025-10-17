'use client';

import clsx from 'clsx';
import { useDropdownContext } from '@/components/ui/Dropdown/context/DropdownContext';
import type { ContentProps } from '@/components/ui/Dropdown/types';
import { Portal } from './Portal';
import { dropdownTokens } from '@/components/ui/Dropdown/base';
import { useDropdownContent } from '@/components/ui/Dropdown/lib/hooks';

export function Content({
	className,
	children,
	Element = 'ul',
	offset = 4,
	avoidCollisions = true,
}: ContentProps) {
	const { open, contentRef } = useDropdownContext();
	const { style, align, classesState, handlers } = useDropdownContent({
		offset,
		avoidCollisions,
	});
	const { present, entered } = classesState;

	if (!present) return null;

	const classes = clsx(
		dropdownTokens.maxHeight,
		dropdownTokens.maxWidth,
		dropdownTokens.container,
		dropdownTokens.animationBase,
		dropdownTokens.enter,
		dropdownTokens.exit,
		open && !entered && 'opacity-0 translate-y-1',
		align === 'left' ? 'origin-top-left' : 'origin-top-right',
		className
	);

	return (
		<Portal>
			<Element
				ref={contentRef as any}
				className={classes}
				style={style}
				role='menu'
				data-state={open ? 'open' : 'closed'}
				onTransitionEnd={handlers.onTransitionEnd}
				onMouseEnter={handlers.onMouseEnter}
				onMouseLeave={handlers.onMouseLeave}
			>
				{children}
			</Element>
		</Portal>
	);
}
