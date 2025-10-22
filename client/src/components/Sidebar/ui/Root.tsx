'use client';

import React, { useMemo, useState } from 'react';
import {
	SidebarContext,
	type SidebarContextValue,
} from '../context/SidebarContext';
import type { SidebarProps } from '../types';

export function Root({
	children,
	open: controlledOpen,
	onOpenChange,
	initialOpen = false,
}: SidebarProps) {
	const isControlled = controlledOpen !== undefined;
	const [uncontrolledOpen, setUncontrolledOpen] =
		useState<boolean>(initialOpen);
	const open = isControlled ? controlledOpen : uncontrolledOpen;
	const setOpen = (next: boolean) => {
		if (isControlled) {
			onOpenChange?.(next);
			return;
		}
		setUncontrolledOpen(next);
	};

	const value = useMemo<SidebarContextValue>(() => ({ open, setOpen }), [open]);

	return (
		<SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
	);
}
