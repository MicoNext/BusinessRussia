'use client';

import { EmblaOptionsType } from '@/components/EmblaCarousel';
import EmblaCarousel from '@/components/EmblaCarousel';
import { sliderMainMock } from '@/shared/data/hero.mock';

const OPTIONS: EmblaOptionsType = { align: 'start', loop: true };

function HeroSection() {
	return (
		<section className='w-full'>
			<EmblaCarousel
				slides={sliderMainMock}
				options={OPTIONS}
			/>
		</section>
	);
}

export default HeroSection;
