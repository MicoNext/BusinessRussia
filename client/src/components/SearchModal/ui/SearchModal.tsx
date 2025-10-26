'use client';

import { Button } from '@/components/ui/buttons';
import { Headline } from '@/components/ui/Headline';
import { TextInput } from '@/components/ui/inputs';
import Modal from '@/components/ui/Modal';
import { X } from 'lucide-react';
import { useSearch } from '../lib/hooks';

export function SearchModal({ trigger }: { trigger: React.ReactNode }) {
	const { search, setSearch } = useSearch();
	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};
	return (
		<Modal initialOpen={false}>
			<Modal.Trigger asChild>{trigger}</Modal.Trigger>

			<Modal.Portal>
				<Modal.Content
					className='w-full md:max-w-2xl max-h-[80vh] p-6'
					classNames={{ panel: 'w-full' }}
					centered={false}
				>
					<div className='flex items-center justify-between'>
						<Headline
							title='Поиск'
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
					</div>
					<TextInput
						id='search'
						name='search'
						placeholder='Поиск'
						variant='dark'
						onChange={handleSearch}
						value={search}
						className='w-full'
					/>
					<div className='flex items-center justify-between'>
						{/* TODO: Add search results */}
					</div>
				</Modal.Content>
			</Modal.Portal>
		</Modal>
	);
}
