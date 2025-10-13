import React, {
	ComponentPropsWithRef,
	useCallback,
	useEffect,
	useState,
} from 'react';
import { EmblaCarouselType } from 'embla-carousel';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { IconButton } from '@/components/ui/buttons/IconButton';

type UsePrevNextButtonsType = {
	prevBtnDisabled: boolean;
	nextBtnDisabled: boolean;
	onPrevButtonClick: () => void;
	onNextButtonClick: () => void;
};

export const usePrevNextButtons = (
	emblaApi: EmblaCarouselType | undefined,
	onButtonClick?: (emblaApi: EmblaCarouselType) => void
): UsePrevNextButtonsType => {
	const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
	const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

	const onPrevButtonClick = useCallback(() => {
		if (!emblaApi) return;
		emblaApi.scrollPrev();
		if (onButtonClick) onButtonClick(emblaApi);
	}, [emblaApi, onButtonClick]);

	const onNextButtonClick = useCallback(() => {
		if (!emblaApi) return;
		emblaApi.scrollNext();
		if (onButtonClick) onButtonClick(emblaApi);
	}, [emblaApi, onButtonClick]);

	const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
		setPrevBtnDisabled(!emblaApi.canScrollPrev());
		setNextBtnDisabled(!emblaApi.canScrollNext());
	}, []);

	useEffect(() => {
		if (!emblaApi) return;

		onSelect(emblaApi);
		emblaApi.on('reInit', onSelect).on('select', onSelect);
	}, [emblaApi, onSelect]);

	return {
		prevBtnDisabled,
		nextBtnDisabled,
		onPrevButtonClick,
		onNextButtonClick,
	};
};

type PropType = ComponentPropsWithRef<'button'>;

export const PrevButton: React.FC<PropType> = props => {
	const { children, className, ...restProps } = props;

	return (
		<IconButton
			icon={<ChevronLeft className='w-6 h-6' />}
			aria-label='Предыдущий слайд'
			{...restProps}
			className={className}
		>
			{children}
		</IconButton>
	);
};

export const NextButton: React.FC<PropType> = props => {
	const { children, className, ...restProps } = props;

	return (
		<IconButton
			icon={<ChevronRight className='w-6 h-6' />}
			aria-label='Следующий слайд'
			{...restProps}
			className={className}
		>
			{children}
		</IconButton>
	);
};
