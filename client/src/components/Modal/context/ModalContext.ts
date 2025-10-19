import { createContext, useContext } from 'react';
import type { IModalContextValue } from '@/components/Modal/base';

export const ModalContext = createContext<IModalContextValue | null>(null);

export function useModalContext(): IModalContextValue {
	const ctx = useContext(ModalContext);
	if (!ctx) throw new Error('Modal.* must be used within <Modal.Root>');
	return ctx;
}
