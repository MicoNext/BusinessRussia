import clsx from 'clsx';
import { ContactusCards } from './ContactusCards';
import { ContactusActions } from './ContactusActions';

export function Сontactus() {
	return (
		<section className='flex bg-[#08041a] text-white/80 px-4 md:px-8 lg:px-12 border-b border-white/10 min-h-[600px]'>
			<div className='container mx-auto flex flex-col md:flex-row gap-4 md:gap-8'>
				<div
					className={clsx(
						'flex-1 flex flex-col justify-between gap-8 py-6 border-b border-white/10 pb-6',
						'md:border-r md:border-white/10 md:pr-14 md:border-b-0 md:py-14'
					)}
				>
					<ContactusCards />
				</div>
				<div className='flex-1 flex flex-col gap-4 md:gap-8 py-2 md:py-8 pb-12 md:pb-8'>
					<ContactusActions />
				</div>
			</div>
		</section>
	);
}
