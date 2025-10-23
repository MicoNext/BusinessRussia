'use client';

import { useMemo } from 'react';
import { DropdownContext } from '@/components/ui/Dropdown/context/DropdownContext';
import type { DropdownContextValue } from '@/components/ui/Dropdown/base';
import type { DropdownProps } from '@/components/ui/Dropdown/base';
import {
	useDropdownRefs,
	useDropdownTimers,
} from '@/components/ui/Dropdown/lib/hooks';

import { useControllableOpen, useClose } from '@/shared/lib/hooks';

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
	const { open, setOpen } = useControllableOpen({
		controlledOpen,
		onOpenChange,
		initialOpen,
	});

	const { triggerRef, contentRef } = useDropdownRefs();
	const { openTimerRef, closeTimerRef } = useDropdownTimers();

	useClose({ enabled: closeOnEsc, open, setOpen, triggerRef, contentRef });

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
