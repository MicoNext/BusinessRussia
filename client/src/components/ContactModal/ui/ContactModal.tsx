'use client';

import Modal from '@/components/ui/Modal';

export function ContactModal({ trigger }: { trigger: React.ReactNode }) {
	return (
		<Modal initialOpen={false}>
			<Modal.Trigger asChild>{trigger}</Modal.Trigger>

			<Modal.Portal>
				<Modal.Content className='w-full max-w-md p-6'>
					<h2 className='text-lg font-semibold mb-3'>Заголовок</h2>
					<p className='mb-4'>Тело модального окна</p>
					<button
						type='button'
						className='btn'
						onClick={() => {
							/* внутри контента можно управлять */
						}}
					>
						Действие
					</button>
				</Modal.Content>
			</Modal.Portal>
		</Modal>
	);
}
