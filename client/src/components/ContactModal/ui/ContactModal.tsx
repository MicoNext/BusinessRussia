'use client';

import { Form } from '@/components/Form';
import { Button } from '@/components/ui/buttons';
import { Headline } from '@/components/ui/Headline';
import Modal from '@/components/ui/Modal';
import { X } from 'lucide-react';

export function ContactModal({ trigger }: { trigger: React.ReactNode }) {
	return (
		<Modal initialOpen={false}>
			<Modal.Trigger asChild>{trigger}</Modal.Trigger>

			<Modal.Portal>
				<Modal.Content className='w-full max-w-md p-6'>
					<Form
						header={
							<>
								<Headline
									title='Вступить'
									order={4}
									variant='dark'
								/>
								<Modal.Close asChild>
									<Button
										variant='ghost'
										className='w-8 h-8 p-0 items-center justify-center'
									>
										<X
											size={24}
											strokeWidth={1}
										/>
									</Button>
								</Modal.Close>
							</>
						}
					/>
				</Modal.Content>
			</Modal.Portal>
		</Modal>
	);
}
