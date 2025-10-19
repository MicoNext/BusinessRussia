import { useEffect, useLayoutEffect, useState } from 'react';
import { useDropdownContext } from '@/components/ui/Dropdown/context/DropdownContext';
import {
	computePosition,
	scheduleRecompute,
} from '@/components/ui/Dropdown/lib/helpers';
import { usePresence } from '@/shared/lib/hooks';

export function useDropdownContent(options: {
	offset: number;
	avoidCollisions: boolean;
}) {
	const { offset, avoidCollisions } = options;
	const {
		open,
		setOpen,
		contentRef,
		triggerRef,
		closeTimerRef,
		hoverCloseDelay,
	} = useDropdownContext();
	const { present, setPresent, entered } = usePresence(open);
	const [style, setStyle] = useState<React.CSSProperties>({});
	const [align, setAlign] = useState<'left' | 'right'>('left');

	useLayoutEffect(() => {
		if (!present) return;
		const trigger = triggerRef.current;
		const content = contentRef.current;
		if (!trigger || !content) return;
		const tRect = trigger.getBoundingClientRect();

		const { left, top, align } = computePosition({
			triggerRect: tRect,
			contentEl: content,
			offset,
			avoidCollisions,
		});
		setAlign(align);
		setStyle({ position: 'fixed', left, top, zIndex: 50 });
	}, [present, offset, avoidCollisions]);

	useEffect(() => {
		if (!present) return;
		const dispose = scheduleRecompute(() => {
			const trigger = triggerRef.current;
			const content = contentRef.current;
			if (!trigger || !content) return;
			const tRect = trigger.getBoundingClientRect();
			const { left, top, align } = computePosition({
				triggerRect: tRect,
				contentEl: content,
				offset,
				avoidCollisions,
			});
			setAlign(align);
			setStyle(prev => ({ ...prev, left, top }));
		});
		return dispose;
	}, [present, offset, avoidCollisions]);

	const classesState = { present, entered };

	const handlers = {
		onTransitionEnd: () => {
			if (!open) setPresent(false);
		},
		onMouseEnter: () => {
			if (closeTimerRef.current != null)
				window.clearTimeout(closeTimerRef.current);
		},
		onMouseLeave: () => {
			closeTimerRef.current = window.setTimeout(() => {
				setOpen(false);
			}, hoverCloseDelay);
		},
	};

	return { open, style, align, classesState, handlers } as const;
}
