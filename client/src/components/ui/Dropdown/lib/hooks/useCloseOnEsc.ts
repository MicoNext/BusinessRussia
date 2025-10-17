import { useEffect } from 'react';

export function useCloseOnEsc(params: {
	enabled: boolean;
	open: boolean;
	setOpen: (next: boolean) => void;
}) {
	const { enabled, open, setOpen } = params;

	useEffect(() => {
		if (!enabled || !open) return;
		function onKey(e: KeyboardEvent) {
			if (e.key === 'Escape') setOpen(false);
		}
		document.addEventListener('keydown', onKey);
		return () => document.removeEventListener('keydown', onKey);
	}, [enabled, open, setOpen]);
}
