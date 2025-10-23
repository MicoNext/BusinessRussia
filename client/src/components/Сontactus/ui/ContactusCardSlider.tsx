'use client';

import clsx from 'clsx';
import dynamic from 'next/dynamic';
import type React from 'react';
import { СontactusCard } from './СontactusCard';
import { Contacts } from '../types';

const EmblaCarousel = dynamic(
	() => import('@/components/EmblaCarousel/ui/EmblaCarousel')
);

export function ContactusCardSlider({
	items,
	classNames,
}: {
	items: Contacts[];
	classNames?: { container?: string };
}) {
	return (
		<>
			<div className={clsx('embla relative w-full', classNames?.container)}>
				<EmblaCarousel
					options={{
						align: 'start',
						loop: false,
						dragFree: true,
					}}
					classNames={{
						root: '-mx-4 px-4',
						viewport: 'embla__viewport',
						container: 'embla__container flex gap-2 md:gap-6',
					}}
				>
					{items.slice(0, 4).map(contact => {
						return (
							<div
								key={contact.title}
								className='embla__slide basis-1/2 shrink-0 min-w-0'
							>
								<СontactusCard
									href={contact.href}
									icon={contact.icon}
									title={contact.title}
									classNames={{
										container: clsx(
											'text-sm',
											'flex flex-col justify-between gap-4 border p-3 rounded-2xl',
											'bg-white/10 border-white/10 text-white hover:bg-white/20 hover:border-white/20',
											'transition-all duration-300'
										),
									}}
								/>
							</div>
						);
					})}
				</EmblaCarousel>
			</div>
		</>
	);
}
