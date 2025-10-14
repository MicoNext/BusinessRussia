'use client';

import { EmblaOptionsType } from 'embla-carousel';
import { sliderMainMock } from '@/shared/data/hero.mock';
import { HeroSlider } from './HeroSlider';

const OPTIONS: EmblaOptionsType = { align: 'start', loop: true };

function HeroSection() {
	return (
		<section className='w-full'>
			<HeroSlider
				slides={sliderMainMock}
				options={OPTIONS}
			/>
		</section>
	);
}

export default HeroSection;
