import { useCallback, useMemo, useState } from 'react';

export function useControllableOpen(args: {
	controlledOpen?: boolean;
	onOpenChange?: (next: boolean) => void;
	initialOpen?: boolean;
}) {
	const { controlledOpen, onOpenChange, initialOpen = false } = args;
	const isControlled = controlledOpen !== undefined;
	const [uncontrolledOpen, setUncontrolledOpen] =
		useState<boolean>(initialOpen);
	const open = isControlled ? (controlledOpen as boolean) : uncontrolledOpen;
	const setOpen = useCallback(
		(next: boolean) =>
			isControlled ? onOpenChange?.(next) : setUncontrolledOpen(next),
		[isControlled, onOpenChange]
	);

	return useMemo(() => ({ open, setOpen }), [open, setOpen]);
}
