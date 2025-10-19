import { RefObject, useRef } from 'react';

export function useModalTimers(): {
	openTimerRef: RefObject<number | null>;
	closeTimerRef: RefObject<number | null>;
} {
	const openTimerRef = useRef<number | null>(null);
	const closeTimerRef = useRef<number | null>(null);
	return { openTimerRef, closeTimerRef };
}
