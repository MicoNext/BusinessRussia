import type { ReactNode } from 'react';

export interface SidebarProps {
	children: ReactNode;
	open?: boolean;
	onOpenChange?: (next: boolean) => void;
	initialOpen?: boolean;
}

export interface AsChildProps {
	asChild?: boolean;
	children: ReactNode;
}

export type SidebarSide = 'left' | 'right' | 'top' | 'bottom';

export type SidebarSize = 'sm' | 'md' | 'lg' | number | string;

export interface ContentProps {
	side?: SidebarSide;
	size?: SidebarSize;
	className?: string;
	children: ReactNode;
}
