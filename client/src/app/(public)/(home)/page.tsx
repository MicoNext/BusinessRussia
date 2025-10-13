import type { ISliderMain } from '@/../../package/types/models/sliderMain';
import Hero from '@/components/sections/Hero';

interface IProps {
	sliderMain: ISliderMain[];
}

export default function HomePage() {
	return (
		<main className='text-gray-900 flex-1 relative overflow-hidden'>
			<Hero />
		</main>
	);
}
