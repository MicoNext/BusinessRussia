import type { ReactNode, RefObject } from 'react';

export interface DropdownContextValue {
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
}

export interface DropdownBaseProps {
	className?: string;
	children: ReactNode;
}

export interface DropdownProps {
	children: ReactNode;
	open?: boolean;
	onOpenChange?: (next: boolean) => void;
	initialOpen?: boolean;
	openOnHover?: boolean;
	hoverOpenDelay?: number;
	hoverCloseDelay?: number;
	closeOnEsc?: boolean;
	closeOnClickOutside?: boolean;
}

export interface AsChildProps {
	asChild?: boolean;
	children: ReactNode;
}

export interface ContentProps {
	className?: string;
	children: ReactNode;
	tag?: 'ul' | 'div' | 'nav';
	offset?: number;
	avoidCollisions?: boolean;
}
