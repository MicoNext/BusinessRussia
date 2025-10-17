'use client';

import { createContext, useContext, useRef, type RefObject } from 'react';

export type DropdownContextValue = {
	open: boolean;
	setOpen: (next: boolean) => void;
	triggerRef: RefObject<HTMLElement | null>;
	contentRef: RefObject<HTMLElement | null>;
	openOnHover: boolean;
	hoverOpenDelay: number;
	hoverCloseDelay: number;
	closeOnEsc: boolean;
	closeOnClickOutside: boolean;
	openTimerRef: RefObject<number | null>;
	closeTimerRef: RefObject<number | null>;
};

export const DropdownContext = createContext<DropdownContextValue | null>(null);

export function useDropdownContext(): DropdownContextValue {
	const ctx = useContext(DropdownContext);
	if (!ctx) throw new Error('Dropdown.* must be used within <Dropdown.Root>');
	return ctx;
}

export function useDropdownRefs(): {
	triggerRef: RefObject<HTMLElement | null>;
	contentRef: RefObject<HTMLElement | null>;
} {
	const triggerRef = useRef<HTMLElement | null>(null);
	const contentRef = useRef<HTMLElement | null>(null);
	return { triggerRef, contentRef };
}

export function useDropdownTimers(): {
	openTimerRef: RefObject<number | null>;
	closeTimerRef: RefObject<number | null>;
} {
	const openTimerRef = useRef<number | null>(null);
	const closeTimerRef = useRef<number | null>(null);
	return { openTimerRef, closeTimerRef };
}
