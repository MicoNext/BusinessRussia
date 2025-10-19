import type { ReactNode } from 'react';
import type { RefObject } from 'react';

export interface DropdownBaseProps {
	className?: string;
	children: ReactNode;
}

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
