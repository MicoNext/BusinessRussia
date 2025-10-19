import { RefObject, useRef } from 'react';

export function useModalRefs(): {
	triggerRef: RefObject<HTMLElement | null>;
	contentRef: RefObject<HTMLElement | null>;
} {
	const triggerRef = useRef<HTMLElement | null>(null);
	const contentRef = useRef<HTMLElement | null>(null);
	return { triggerRef, contentRef };
}
