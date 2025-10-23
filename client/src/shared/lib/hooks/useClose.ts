import { RefObject, useEffect } from 'react';

interface UseCloseParams {
	enabled: boolean;
	open: boolean;
	setOpen: (next: boolean) => void;
	triggerRef: RefObject<HTMLElement | null>;
	contentRef: RefObject<HTMLElement | null>;
}

export function useClose({
	enabled,
	open,
	setOpen,
	triggerRef,
	contentRef,
}: UseCloseParams) {
	useEffect(() => {
		if (!enabled || !open) return;

		function onClose(e: KeyboardEvent | MouseEvent) {
			onCloseHandler(e, setOpen, triggerRef, contentRef);
		}

		document.addEventListener('keydown', onClose);
		document.addEventListener('mousedown', onClose);
		return () => {
			document.removeEventListener('keydown', onClose);
			document.removeEventListener('mousedown', onClose);
		};
	}, [enabled, open, setOpen]);
}

function onCloseHandler(
	e: KeyboardEvent | MouseEvent,
	setOpen: (next: boolean) => void,
	triggerRef: RefObject<HTMLElement | null>,
	contentRef: RefObject<HTMLElement | null>
) {
	if (e instanceof KeyboardEvent && e.key === 'Escape') setOpen(false);

	const target = e.target;
	if (!(target instanceof Node)) return;
	if (isOutsideClick(target, triggerRef, contentRef)) setOpen(false);
}

function isOutsideClick(
	target: Node,
	triggerRef: RefObject<HTMLElement | null>,
	contentRef: RefObject<HTMLElement | null>
) {
	if (
		triggerRef.current &&
		!triggerRef.current.contains(target) &&
		contentRef.current &&
		!contentRef.current.contains(target)
	) {
		return true;
	}
	return false;
}
