import { useEffect } from 'react';
import type { RefObject } from 'react';

export function useCloseOnOutsideClick(params: {
	enabled: boolean;
	open: boolean;
	setOpen: (next: boolean) => void;
	triggerRef: RefObject<HTMLElement | null>;
	contentRef: RefObject<HTMLElement | null>;
}) {
	const { enabled, open, setOpen, triggerRef, contentRef } = params;

	useEffect(() => {
		if (!enabled) return;
		function onDocClick(e: MouseEvent) {
			const target = e.target;
			if (!(target instanceof Node)) return;
			if (
				triggerRef.current &&
				!triggerRef.current.contains(target) &&
				contentRef.current &&
				!contentRef.current.contains(target)
			) {
				setOpen(false);
			}
		}
		if (open) document.addEventListener('mousedown', onDocClick);
		return () => document.removeEventListener('mousedown', onDocClick);
	}, [enabled, open, setOpen, triggerRef, contentRef]);
}
