'use client';

import clsx from 'clsx';
import { useSidebarContext } from '../context/SidebarContext';
import type { ContentProps } from '../types';

export function Content({
	side = 'right',
	size = 'md',
	className,
	children,
}: ContentProps) {
	const { open, setOpen } = useSidebarContext();
	if (!open) return null;

	const horizontal = side === 'left' || side === 'right';
	const sideClass =
		side === 'left'
			? 'left-0 top-0 h-full'
			: side === 'right'
			? 'right-0 top-0 h-full'
			: side === 'top'
			? 'top-0 left-0 w-full'
			: 'bottom-0 left-0 w-full';

	let sizeClass: string;
	if (typeof size === 'number')
		sizeClass = horizontal ? `w-[${size}px]` : `h-[${size}px]`;
	else if (typeof size === 'string' && /^(w|h)-/.test(size)) sizeClass = size;
	else {
		sizeClass =
			size === 'sm'
				? horizontal
					? 'w-64'
					: 'h-64'
				: size === 'lg'
				? horizontal
					? 'w-[480px]'
					: 'h-[480px]'
				: horizontal
				? 'w-96'
				: 'h-96';
	}

	return (
		<div
			role='dialog'
			aria-modal='true'
			tabIndex={-1}
			onKeyDown={e => e.key === 'Escape' && setOpen(false)}
			className={clsx(
				'fixed bg-white shadow-xl outline-none',
				sideClass,
				sizeClass,
				className
			)}
		>
			{children}
		</div>
	);
}
