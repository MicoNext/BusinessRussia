'use client';

import { EmblaOptionsType } from 'embla-carousel';
import { sliderMainMock } from '@/shared/data/hero.mock';
import { HeroSlider } from './HeroSlider';

const OPTIONS: EmblaOptionsType = { align: 'start', loop: true };

function HeroSection() {
	return (
		<section className='w-full'>
			<div className=''>
				<HeroSlider
					slides={sliderMainMock}
					options={OPTIONS}
				/>
			</div>
		</section>
	);
}

export default HeroSection;
