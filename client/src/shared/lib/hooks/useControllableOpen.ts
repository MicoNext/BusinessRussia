import { useCallback, useState } from 'react';

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
	const [uncontrolledOpen, setUncontrolledOpen] =
		useState<boolean>(initialOpen);

	const isControlled = controlledOpen !== undefined;

	const open = isControlled ? controlledOpen : uncontrolledOpen;

	const setOpen = useCallback(
		(next: boolean) =>
			isControlled ? onOpenChange?.(next) : setUncontrolledOpen(next),
		[isControlled, onOpenChange]
	);

	return { open, setOpen };
}
