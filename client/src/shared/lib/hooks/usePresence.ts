import { useEffect, useState } from 'react';

export function usePresence(open: boolean) {
	const [present, setPresent] = useState<boolean>(open);
	const [entered, setEntered] = useState<boolean>(false);

	useEffect(() => {
		if (open) {
			setPresent(true);
			setEntered(false);
			requestAnimationFrame(() => setEntered(true));
		} else {
			setEntered(false);
		}
	}, [open]);

	return { present, setPresent, entered } as const;
}
