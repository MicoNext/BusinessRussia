'use client';
import { EmblaOptionsType } from 'embla-carousel';
import { HeroSlider } from './HeroSlider';
import type { ISliderMain } from '../../../../../../../../package/types/models/sliderMain';

type PropsType = {
	sliderMain: ISliderMain[]
}

const OPTIONS: EmblaOptionsType = { align: 'start', loop: true };

function HeroSection({ sliderMain }: PropsType) {
	return (
		<section className='w-full'>
			<div className=''>
				<HeroSlider
					slides={sliderMain}
					options={OPTIONS}
				/>
			</div>
		</section>
	);
}

export default HeroSection;
