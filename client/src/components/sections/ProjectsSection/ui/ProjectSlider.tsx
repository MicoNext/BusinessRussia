'use client';

import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { Card } from '@/components/ui/Card';
import type { IProject } from '@/../../package/types/models/projects';
import { useEffect } from 'react';

export function ProjectSlider({
	items,
	options,
	onApi,
}: {
	items: IProject[];
	options?: EmblaOptionsType;
	onApi?: (api: EmblaCarouselType | undefined) => void;
}) {
	const [emblaRef, emblaApi] = useEmblaCarousel({
		align: 'start',
		loop: true,
		...options,
	});

	useEffect(() => {
		if (onApi) onApi(emblaApi);
	}, [emblaApi, onApi]);

	return (
		<div className='embla relative w-full'>
			<div
				className='embla__viewport overflow-hidden'
				ref={emblaRef}
			>
				<div className='embla__container flex gap-4 md:gap-6'>
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
				</div>
			</div>
		</div>
	);
}

export default ProjectSlider;
