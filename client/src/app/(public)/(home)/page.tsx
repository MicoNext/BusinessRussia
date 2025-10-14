import type { ISliderMain } from '@/../../package/types/models/sliderMain';
import Hero from '@/components/sections/Hero';
import { NewsGrid } from '@/components/sections/News';
import { newsMock } from '@/shared/data/news.mock';

interface IProps {
	sliderMain: ISliderMain[];
}

export default function HomePage() {
	return (
		<main className='text-gray-900 flex flex-col gap-8 md:gap-14 flex-1 relative overflow-hidden'>
			<Hero />
			<NewsGrid items={newsMock} />
		</main>
	);
}
