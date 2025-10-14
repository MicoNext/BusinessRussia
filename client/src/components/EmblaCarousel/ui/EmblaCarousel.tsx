import React from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';

interface IPropType {
	options?: EmblaOptionsType;
	plugins?: any[];
	children: React.ReactNode;
	className?: string;
	viewportClassName?: string;
	containerClassName?: string;
}

function EmblaCarousel({
	options,
	plugins = [],
	children,
	className,
	viewportClassName = 'embla__viewport overflow-hidden',
	containerClassName = 'embla__container flex',
}: IPropType) {
	const [emblaRef] = useEmblaCarousel(options, plugins);
	return (
		<section className={className}>
			<div
				className={viewportClassName}
				ref={emblaRef}
			>
				<div className={containerClassName}>{children}</div>
			</div>
		</section>
	);
}

export default EmblaCarousel;
