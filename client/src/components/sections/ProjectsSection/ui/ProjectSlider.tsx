'use client';

import EmblaCarousel from '@/components/EmblaCarousel';
import { EmblaOptionsType } from 'embla-carousel';
import { Card } from '@/components/ui/Card';
import type { IProject } from '@/../../package/types/models/projects';

export function ProjectSlider({
	items,
	options,
}: {
	items: IProject[];
	options?: EmblaOptionsType;
}) {
	return (
		<EmblaCarousel
			options={{ align: 'start', loop: false, ...options }}
			containerClassName='embla__container flex gap-4 md:gap-6'
			className='relative w-full'
		>
			{items.map(p => (
				<div
					key={p._id}
					className='embla__slide basis-full md:basis-1/2 lg:basis-1/3 shrink-0 min-w-0'
				>
					<Card
						link={p.url}
						image={p.media.imagesUrl[0]}
						subtitle={p.category}
						title={p.header.title}
						time={p.createdAt}
						direction='column'
					/>
				</div>
			))}
		</EmblaCarousel>
	);
}

export default ProjectSlider;
