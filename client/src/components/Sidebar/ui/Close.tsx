'use client';

import { cloneElement, isValidElement, MouseEventHandler } from 'react';
import { useSidebarContext } from '../context/SidebarContext';
import type { AsChildProps } from '../types';

export function Close({ asChild, children }: AsChildProps) {
	const { setOpen } = useSidebarContext();
	if (asChild && isValidElement<{ onClick?: MouseEventHandler }>(children)) {
		const handleClick: MouseEventHandler = e => {
			children.props.onClick?.(e);
			setOpen(false);
		};
		return cloneElement(children, { onClick: handleClick });
	}
	return (
		<button
			type='button'
			onClick={() => setOpen(false)}
		>
			{children}
		</button>
	);
}
