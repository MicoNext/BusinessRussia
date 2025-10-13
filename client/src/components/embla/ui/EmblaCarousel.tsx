import React, { useCallback } from 'react';
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel';
import { DotButton, useDotButton } from './EmblaCarouselDotButton';
import {
	PrevButton,
	NextButton,
	usePrevNextButtons,
} from './EmblaCarouselArrowButtons';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { ISliderMain } from '@/../../package/types/models/sliderMain.d';
import { EmblaSlide } from './EmblaSlide';

type PropType = {
	slides: ISliderMain[];
	options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = props => {
	const { slides, options } = props;
	const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);

	const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
		const autoplay = emblaApi?.plugins()?.autoplay;
		if (!autoplay) return;

		const resetOrStop =
			autoplay.options.stopOnInteraction === false
				? autoplay.reset
				: autoplay.stop;

		resetOrStop();
	}, []);

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
		<section className='embla w-full mx-auto flex flex-col gap-4'>
			<div
				className='embla__viewport overflow-hidden'
				ref={emblaRef}
			>
				<div className='embla__container flex gap-4'>
					{slides.map(slide => (
						<EmblaSlide
							key={slide._id}
							slide={slide}
						/>
					))}
				</div>
			</div>

			<div className='embla__controls flex justify-between items-center gap-4 container mx-auto px-4'>
				<div className='embla__buttons flex gap-2'>
					<PrevButton
						onClick={onPrevButtonClick}
						disabled={prevBtnDisabled}
						className='embla__arrow bg-white border border-gray-200 rounded-full p-2 shadow transition hover:bg-brand-primary hover:text-white disabled:opacity-40 disabled:cursor-not-allowed'
					/>
					<NextButton
						onClick={onNextButtonClick}
						disabled={nextBtnDisabled}
						className='embla__arrow bg-white border border-gray-200 rounded-full p-2 shadow transition hover:bg-brand-primary hover:text-white disabled:opacity-40 disabled:cursor-not-allowed'
					/>
				</div>

				<div className='embla__dots flex gap-2 mt-2'>
					{scrollSnaps.map((_, index) => (
						<DotButton
							key={index}
							onClick={() => onDotButtonClick(index)}
							className={
								'embla__dot w-3 h-3 rounded-full transition-all duration-200 cursor-pointer border-2 border-transparent ' +
								(index === selectedIndex
									? 'bg-brand-primary border-brand-primary scale-125'
									: 'bg-gray-300 hover:bg-brand-primary/60')
							}
							aria-label={`Перейти на слайд ${index + 1}`}
						/>
					))}
				</div>
			</div>
		</section>
	);
};

export default EmblaCarousel;
