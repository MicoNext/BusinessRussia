'use client';

import { cloneElement, isValidElement, MouseEventHandler } from 'react';
import { useSidebarContext } from '../context/SidebarContext';
import type { AsChildProps } from '../types';

export function Trigger({ asChild, children }: AsChildProps) {
	const { setOpen } = useSidebarContext();
	if (asChild && isValidElement<{ onClick?: MouseEventHandler }>(children)) {
		const handleClick: MouseEventHandler = e => {
			children.props.onClick?.(e);
			setOpen(true);
		};
		return cloneElement(children, { onClick: handleClick });
	}
	return (
		<button
			type='button'
			onClick={() => setOpen(true)}
		>
			{children}
		</button>
	);
}
