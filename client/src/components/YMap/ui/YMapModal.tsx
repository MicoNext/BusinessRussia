'use client';

import Modal from '@/components/ui/Modal';
import { YMapWidget } from './YMapWidget';

interface YMapModalProps {
	trigger: React.ReactNode;
	width?: string | number;
	height?: string | number;
}

export function YMapModal({ trigger, width, height }: YMapModalProps) {
	return (
		<Modal initialOpen={false}>
			<Modal.Trigger asChild>{trigger}</Modal.Trigger>
			<Modal.Portal>
				<Modal.Content className='w-full max-w-3xl p-0'>
					<YMapWidget />
				</Modal.Content>
			</Modal.Portal>
		</Modal>
	);
}
