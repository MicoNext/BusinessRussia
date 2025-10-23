'use client';

import Autoplay from 'embla-carousel-autoplay';
import { EmblaOptionsType } from 'embla-carousel';
import { ISliderMain } from '@/../../package/types/models/sliderMain.d';
import { DotButton } from '@/components/EmblaCarousel';
import { PrevButton, NextButton } from '@/components/EmblaCarousel';
import { useDotButton } from '@/components/EmblaCarousel';
import { usePrevNextButtons } from '@/components/EmblaCarousel';
import useEmblaCarousel from 'embla-carousel-react';
import React, { useCallback } from 'react';
import { HeroSlide } from './HeroSlide';

export function HeroSlider({
	slides,
	options,
}: {
	slides: ISliderMain[];
	options?: EmblaOptionsType;
}) {
	const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);

	const onNavButtonClick = useCallback(() => {
		const autoplay = emblaApi?.plugins()?.autoplay;
		if (!autoplay) return;
		const resetOrStop =
			autoplay.options.stopOnInteraction === false
				? autoplay.reset
				: autoplay.stop;
		resetOrStop();
	}, [emblaApi]);

	const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
		emblaApi,
		onNavButtonClick
	);
	const {
		prevBtnDisabled,
		nextBtnDisabled,
		onPrevButtonClick,
		onNextButtonClick,
	} = usePrevNextButtons(emblaApi, onNavButtonClick);

	return (
		<div className='embla relative w-full mx-auto flex flex-col gap-4'>
			<div
				className='embla__viewport overflow-hidden'
				ref={emblaRef}
			>
				<div className='embla__container flex'>
					{slides.map(slide => (
						<HeroSlide
							key={slide._id}
							slide={slide}
						/>
					))}
				</div>
			</div>

			<div className='absolute px-4 md:px-8 lg:px-12 bottom-6 w-full flex justify-center'>
				<div className='embla__controls relative container flex flex-col justify-end items-center gap-4'>
					<div className='embla__buttons flex gap-2 absolute right-0'>
						<PrevButton
							onClick={onPrevButtonClick}
							disabled={prevBtnDisabled}
							className='embla__arrow items-center justify-center bg-white border border-gray-200 rounded-full shadow transition hover:bg-brand-primary hover:text-white disabled:opacity-40 disabled:cursor-not-allowed'
						/>
						<NextButton
							onClick={onNextButtonClick}
							disabled={nextBtnDisabled}
							className='embla__arrow items-center justify-center bg-white border border-gray-200 rounded-full shadow transition hover:bg-brand-primary hover:text-white disabled:opacity-40 disabled:cursor-not-allowed'
						/>
					</div>
					<div className='embla__dots flex gap-2'>
						{scrollSnaps.map((_, index) => (
							<DotButton
								key={index}
								onClick={() => onDotButtonClick(index)}
								className={
									'embla__dot h-1 rounded-full transition-all duration-200 cursor-pointer border-2 border-transparent ' +
									(index === selectedIndex
										? 'bg-brand-primary border-brand-primary scale-125 w-6'
										: 'bg-gray-300 hover:bg-brand-primary/60 w-4')
								}
								aria-label={`Перейти на слайд ${index + 1}`}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
