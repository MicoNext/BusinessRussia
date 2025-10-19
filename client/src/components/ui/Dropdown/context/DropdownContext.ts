import { createContext, useContext } from 'react';
import type { DropdownContextValue } from '@/components/ui/Dropdown/base';

export const DropdownContext = createContext<DropdownContextValue | null>(null);

export function useDropdownContext(): DropdownContextValue {
	const ctx = useContext(DropdownContext);
	if (!ctx) throw new Error('Dropdown.* must be used within <Dropdown.Root>');
	return ctx;
}
