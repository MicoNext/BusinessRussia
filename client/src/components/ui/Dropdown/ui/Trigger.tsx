'use client';

import { cloneElement, isValidElement, MouseEventHandler } from 'react';
import { useDropdownContext } from '../context/DropdownContext';
import type { AsChildProps } from '@/components/ui/Dropdown/base';
import { Button } from '@/components/ui/buttons';

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

	const handleMouseEnter = (e: React.MouseEvent<Element>) => {
		const target = e.currentTarget;
		if (target instanceof HTMLElement) triggerRef.current = target;
		if (!openOnHover) return;
		if (closeTimerRef.current != null)
			window.clearTimeout(closeTimerRef.current);
		openTimerRef.current = window.setTimeout(
			() => setOpen(true),
			hoverOpenDelay
		);
	};

	const handleMouseLeave = (e: React.MouseEvent<Element>) => {
		const target = e.currentTarget;
		if (target instanceof HTMLElement) triggerRef.current = target;
		if (!openOnHover) return;
		if (openTimerRef.current != null) window.clearTimeout(openTimerRef.current);
		closeTimerRef.current = window.setTimeout(
			() => setOpen(false),
			hoverCloseDelay
		);
	};

	const handleClick = (e: React.MouseEvent<Element>) => {
		const target = e.currentTarget;
		if (target instanceof HTMLElement) triggerRef.current = target;
		setOpen(true);
	};

	if (
		asChild &&
		isValidElement<{
			onClick?: MouseEventHandler;
			onMouseEnter?: React.MouseEventHandler;
			onMouseLeave?: React.MouseEventHandler;
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
		});
	}

	return (
		<Button
			type='button'
			onClick={handleClick}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			{children}
		</Button>
	);
}
