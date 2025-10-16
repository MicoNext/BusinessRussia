'use client';

import clsx from 'clsx';
import { useSidebarContext } from '../context/SidebarContext';

export function Overlay({ className }: { className?: string }) {
	const { open, setOpen } = useSidebarContext();
	if (!open) return null;
	return (
		<div
			aria-hidden='true'
			onClick={() => setOpen(false)}
			className={clsx('fixed inset-0 bg-black/50 backdrop-blur-sm', className)}
		/>
	);
}
