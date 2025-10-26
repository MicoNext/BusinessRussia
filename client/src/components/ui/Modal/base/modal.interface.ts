import type { ReactNode, RefObject } from 'react';

export interface IModalProps {
	children: React.ReactNode;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	initialOpen?: boolean;
	openDelay?: number;
	closeDelay?: number;
	closeOnEsc?: boolean;
	closeOnClickOutside?: boolean;
	centered?: boolean;
}

export interface IModalContextValue {
	open: boolean;
	setOpen: (next: boolean) => void;
	triggerRef: RefObject<HTMLElement | null>;
	contentRef: RefObject<HTMLElement | null>;
	openDelay: number;
	closeDelay: number;
	closeOnEsc: boolean;
	closeOnClickOutside: boolean;
	openTimerRef: RefObject<number | null>;
	closeTimerRef: RefObject<number | null>;
}
