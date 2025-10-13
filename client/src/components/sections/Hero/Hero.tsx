'use client';

import { EmblaOptionsType } from '@/components/embla';
import EmblaCarousel from '@/components/embla/ui/EmblaCarousel';
import { sliderMainMock } from '@/shared/data/hero.mock';

const OPTIONS: EmblaOptionsType = { align: 'start', loop: true };

function Hero() {
	return (
		<section className='w-full'>
			<EmblaCarousel
				slides={sliderMainMock}
				options={OPTIONS}
			/>
		</section>
	);
}

export default Hero;
