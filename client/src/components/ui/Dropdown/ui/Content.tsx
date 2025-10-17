'use client';

import clsx from 'clsx';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDropdownContext } from './DropdownContext';
import type { ContentProps } from '../types';
import { Portal } from './Portal';

export function Content({
	className,
	children,
	Element = 'ul',
	offset = 4,
	avoidCollisions = true,
}: ContentProps) {
	const {
		open,
		setOpen,
		contentRef,
		triggerRef,
		closeTimerRef,
		hoverCloseDelay,
	} = useDropdownContext();
	const [style, setStyle] = useState<React.CSSProperties>({});
	const [align, setAlign] = useState<'left' | 'right'>('left');
	const [present, setPresent] = useState<boolean>(open);
	const [entered, setEntered] = useState<boolean>(false);

	useEffect(() => {
		if (open) {
			setPresent(true);
			setEntered(false);
			requestAnimationFrame(() => setEntered(true));
		} else {
			setEntered(false);
		}
	}, [open]);

	useLayoutEffect(() => {
		if (!present) return;
		const trigger = triggerRef.current;
		const content = contentRef.current;
		if (!trigger || !content) return;

		const tRect = trigger.getBoundingClientRect();
		content.style.visibility = 'hidden';
		content.style.maxHeight = '384px';
		content.style.overflowY = 'auto';

		let left = tRect.left;
		let top = tRect.bottom + offset;
		setAlign('left');

		const cWidth = content.offsetWidth;
		const vw = window.innerWidth;
		if (avoidCollisions && left + cWidth > vw - 8) {
			left = Math.max(8, vw - 8 - cWidth);
			setAlign('right');
		}

		const cHeight = content.offsetHeight;
		const vh = window.innerHeight;
		if (avoidCollisions && top + cHeight > vh - 8) {
			const upTop = tRect.top - offset - cHeight;
			if (upTop >= 8) top = upTop;
		}

		setStyle({ position: 'fixed', left, top, zIndex: 50 });
		content.style.visibility = '';
	}, [present, offset, avoidCollisions]);

	useEffect(() => {
		if (!present) return;
		let raf: number | null = null;
		const recompute = () => {
			const trigger = triggerRef.current;
			const content = contentRef.current;
			if (!trigger || !content) return;
			const tRect = trigger.getBoundingClientRect();
			let left = tRect.left;
			let top = tRect.bottom + offset;
			let nextAlign: 'left' | 'right' = 'left';
			const cWidth = content.offsetWidth;
			const vw = window.innerWidth;
			if (avoidCollisions && left + cWidth > vw - 8) {
				left = Math.max(8, vw - 8 - cWidth);
				nextAlign = 'right';
			}
			const cHeight = content.offsetHeight;
			const vh = window.innerHeight;
			if (avoidCollisions && top + cHeight > vh - 8) {
				const upTop = tRect.top - offset - cHeight;
				if (upTop >= 8) top = upTop;
			}
			setAlign(nextAlign);
			setStyle(prev => ({ ...prev, left, top }));
		};
		const schedule = () => {
			if (raf) cancelAnimationFrame(raf);
			raf = requestAnimationFrame(recompute);
		};
		window.addEventListener('scroll', schedule, true);
		window.addEventListener('resize', schedule);
		schedule();
		return () => {
			if (raf) cancelAnimationFrame(raf);
			window.removeEventListener('scroll', schedule, true);
			window.removeEventListener('resize', schedule);
		};
	}, [present, offset, avoidCollisions]);

	if (!present) return null;

	const classes = clsx(
		'max-h-96 max-w-64 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-lg p-2',
		'transform transition',
		'data-[state=open]:duration-220 data-[state=open]:ease-out',
		'data-[state=closed]:duration-140 data-[state=closed]:ease-in',
		'data-[state=open]:opacity-100 data-[state=open]:translate-y-0',
		'data-[state=closed]:opacity-0 data-[state=closed]:translate-y-1',
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
				onTransitionEnd={() => {
					if (!open) setPresent(false);
				}}
				onMouseEnter={() => {
					if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
				}}
				onMouseLeave={() => {
					closeTimerRef.current = window.setTimeout(() => {
						setOpen(false);
					}, hoverCloseDelay);
				}}
			>
				{children}
			</Element>
		</Portal>
	);
}
