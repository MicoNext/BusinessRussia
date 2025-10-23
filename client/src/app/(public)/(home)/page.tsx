import { EventsSection } from './_sections/EventsSection';
import HeroSection from './_sections/HeroSection';
import { NewsSection } from './_sections/NewsSection';
import { ProjectsSection } from './_sections/ProjectsSection';
import { Сontactus } from '@/components/Сontactus';

export default function HomePage() {
	return (
		<main className='text-gray-900 flex flex-col gap-8 md:gap-14 lg:gap-16 xl:gap-20 flex-1 relative overflow-hidden'>
			<HeroSection />
			<NewsSection />
			<ProjectsSection />
			<EventsSection />
			<Сontactus />
		</main>
	);
}
