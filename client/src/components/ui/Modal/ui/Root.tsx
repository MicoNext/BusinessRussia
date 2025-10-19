import { useClose, useControllableOpen } from '@/shared/lib/hooks';
import { useMemo } from 'react';
import { ModalContext } from '../context/ModalContext';
import { useModalRefs, useModalTimers } from '../lib/hooks';
import { IModalContextValue, IModalProps } from '../base';

export function Root({
	children,
	open: controlledOpen = false,
	onOpenChange,
	initialOpen = false,
	openDelay = 100,
	closeDelay = 100,
	closeOnEsc = true,
	closeOnClickOutside = true,
}: IModalProps) {
	const { open, setOpen } = useControllableOpen({
		controlledOpen,
		onOpenChange,
		initialOpen,
	});

	const { triggerRef, contentRef } = useModalRefs();
	const { openTimerRef, closeTimerRef } = useModalTimers();

	useClose({ enabled: closeOnEsc, open, setOpen, triggerRef, contentRef });

	const value = useMemo<IModalContextValue>(
		() => ({
			open,
			setOpen,
			triggerRef,
			contentRef,
			openTimerRef,
			closeTimerRef,
			openDelay,
			closeDelay,
			closeOnEsc,
			closeOnClickOutside,
		}),
		[open, openDelay, closeDelay, closeOnEsc, closeOnClickOutside]
	);

	return (
		<ModalContext.Provider value={value}>{children}</ModalContext.Provider>
	);
}
