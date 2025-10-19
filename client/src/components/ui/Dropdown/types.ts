import type { ReactNode } from 'react';

export interface DropdownProps {
	children: ReactNode;
	open?: boolean;
	onOpenChange?: (next: boolean) => void;
	initialOpen?: boolean;
	openOnHover?: boolean; // default: true
	hoverOpenDelay?: number; // ms, default: 100
	hoverCloseDelay?: number; // ms, default: 150
	closeOnEsc?: boolean; // default: true
	closeOnClickOutside?: boolean; // default: true
}

export interface AsChildProps {
	asChild?: boolean;
	children: ReactNode;
}

export interface ContentProps {
	className?: string;
	children: ReactNode;
	tag?: 'ul' | 'div' | 'nav';
	offset?: number; // px, default: 4
	avoidCollisions?: boolean; // default: true
}
