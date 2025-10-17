'use client';

import { cloneElement, isValidElement, MouseEventHandler } from 'react';
import { useDropdownContext } from './DropdownContext';
import type { AsChildProps } from '../types';

export function Trigger({ asChild, children }: AsChildProps) {
	const {
		setOpen,
		openOnHover,
		hoverOpenDelay,
		hoverCloseDelay,
		triggerRef,
		openTimerRef,
		closeTimerRef,
	} = useDropdownContext();

	const handleMouseEnter: React.MouseEventHandler = () => {
		if (!openOnHover) return;
		if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
		openTimerRef.current = window.setTimeout(
			() => setOpen(true),
			hoverOpenDelay
		);
	};

	const handleMouseLeave: React.MouseEventHandler = () => {
		if (!openOnHover) return;
		if (openTimerRef.current) window.clearTimeout(openTimerRef.current);
		closeTimerRef.current = window.setTimeout(
			() => setOpen(false),
			hoverCloseDelay
		);
	};

	const handleClick: MouseEventHandler = () => setOpen(true);

	if (
		asChild &&
		isValidElement<{
			onClick?: MouseEventHandler;
			onMouseEnter?: React.MouseEventHandler;
			onMouseLeave?: React.MouseEventHandler;
			ref?: any;
		}>(children)
	) {
		return cloneElement(children, {
			onClick: e => {
				children.props.onClick?.(e);
				handleClick(e);
			},
			onMouseEnter: e => {
				children.props.onMouseEnter?.(e);
				handleMouseEnter(e);
			},
			onMouseLeave: e => {
				children.props.onMouseLeave?.(e);
				handleMouseLeave(e);
			},
			ref: triggerRef,
		});
	}

	return (
		<button
			ref={triggerRef as any}
			type='button'
			onClick={handleClick}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			{children}
		</button>
	);
}
