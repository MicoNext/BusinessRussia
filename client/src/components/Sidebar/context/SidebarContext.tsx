'use client';

import { createContext, useContext } from 'react';

export type SidebarContextValue = {
	open: boolean;
	setOpen: (next: boolean) => void;
};

export const SidebarContext = createContext<SidebarContextValue | null>(null);

export function useSidebarContext(): SidebarContextValue {
	const ctx = useContext(SidebarContext);
	if (!ctx) throw new Error('Sidebar.* must be used within <Sidebar.Root>');
	return ctx;
}
