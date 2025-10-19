import { useCallback, useMemo, useState } from 'react';

interface UseControllableOpenArgs {
	controlledOpen?: boolean;
	onOpenChange?: (next: boolean) => void;
	initialOpen?: boolean;
}

export function useControllableOpen({
	controlledOpen,
	onOpenChange,
	initialOpen = false,
}: UseControllableOpenArgs) {
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
