import clsx from 'clsx';
import { СontactusCard } from './СontactusCard';
import { Contacts } from '@/components/Сontactus/types';

interface ContactusCardGridProps {
	items: Contacts[];
	classNames?: {
		container?: string;
	};
}

export function ContactusCardGrid({
	items,
	classNames,
}: ContactusCardGridProps) {
	return (
		<div
			className={clsx(
				'grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
				'auto-rows-[90px] [grid-auto-flow:dense]',
				classNames?.container
			)}
		>
			{items.slice(0, 4).map((contact, index) => {
				const isLarge = index < 2;

				return (
					<СontactusCard
						key={contact.title}
						href={contact.href}
						icon={contact.icon}
						title={contact.title}
						classNames={{
							container: clsx(
								'text-sm flex flex-col justify-between gap-2 border p-3 rounded-2xl',
								'bg-white/10 border-white/10 text-white hover:bg-white/20 hover:border-white/20 transition-all duration-300',
								isLarge
									? 'sm:col-span-2 sm:row-span-2'
									: 'sm:col-span-1 sm:row-span-1',
								'h-full'
							),
						}}
					/>
				);
			})}
		</div>
	);
}
