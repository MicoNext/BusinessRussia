'use client';

import React from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import clsx from 'clsx';

interface IPropType {
	options?: EmblaOptionsType;
	plugins?: any[];
	children: React.ReactNode;
	className?: string;
	viewportClassName?: string;
	containerClassName?: string;

	classNames?: {
		root?: string;
		container?: string;
		viewport?: string;
	};
}

function EmblaCarousel({
	options,
	plugins = [],
	children,
	classNames,
}: IPropType) {
	const [emblaRef] = useEmblaCarousel(options, plugins);
	return (
		<div className={clsx(classNames?.root)}>
			<div
				className={clsx(classNames?.viewport)}
				ref={emblaRef}
			>
				<div className={clsx(classNames?.container)}>{children}</div>
			</div>
		</div>
	);
}

export default EmblaCarousel;
