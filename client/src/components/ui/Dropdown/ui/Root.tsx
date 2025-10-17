'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
	DropdownContext,
	useDropdownRefs,
	useDropdownTimers,
	type DropdownContextValue,
} from './DropdownContext';
import type { DropdownProps } from '../types';

export function Root({
	children,
	open: controlledOpen,
	onOpenChange,
	initialOpen = false,
	openOnHover = true,
	hoverOpenDelay = 100,
	hoverCloseDelay = 150,
	closeOnEsc = true,
	closeOnClickOutside = true,
}: DropdownProps) {
	const isControlled = controlledOpen !== undefined;
	const [uncontrolledOpen, setUncontrolledOpen] =
		useState<boolean>(initialOpen);
	const open = isControlled ? (controlledOpen as boolean) : uncontrolledOpen;
	const setOpen = (next: boolean) => {
		if (isControlled) return onOpenChange?.(next);
		setUncontrolledOpen(next);
	};

	const { triggerRef, contentRef } = useDropdownRefs();
	const { openTimerRef, closeTimerRef } = useDropdownTimers();

	useEffect(() => {
		if (!closeOnClickOutside) return;
		function onDocClick(e: MouseEvent) {
			const t = e.target as Node;
			if (
				triggerRef.current &&
				!triggerRef.current.contains(t) &&
				contentRef.current &&
				!contentRef.current.contains(t)
			) {
				setOpen(false);
			}
		}
		if (open) document.addEventListener('mousedown', onDocClick);
		return () => document.removeEventListener('mousedown', onDocClick);
	}, [open, closeOnClickOutside]);

	useEffect(() => {
		if (!closeOnEsc || !open) return;
		function onKey(e: KeyboardEvent) {
			if (e.key === 'Escape') setOpen(false);
		}
		document.addEventListener('keydown', onKey);
		return () => document.removeEventListener('keydown', onKey);
	}, [open, closeOnEsc]);

	const value = useMemo<DropdownContextValue>(
		() => ({
			open,
			setOpen,
			triggerRef,
			contentRef,
			openTimerRef,
			closeTimerRef,
			openOnHover,
			hoverOpenDelay,
			hoverCloseDelay,
			closeOnEsc,
			closeOnClickOutside,
		}),
		[
			open,
			openOnHover,
			hoverOpenDelay,
			hoverCloseDelay,
			closeOnEsc,
			closeOnClickOutside,
		]
	);

	return (
		<DropdownContext.Provider value={value}>
			{children}
		</DropdownContext.Provider>
	);
}
