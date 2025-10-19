'use client';

import { Form } from '@/components/Form';
import Modal from '@/components/ui/Modal';

export function ContactModal({ trigger }: { trigger: React.ReactNode }) {
	return (
		<Modal initialOpen={false}>
			<Modal.Trigger asChild>{trigger}</Modal.Trigger>

			<Modal.Portal>
				<Modal.Content className='w-full max-w-md p-6'>
					<Form />
				</Modal.Content>
			</Modal.Portal>
		</Modal>
	);
}
