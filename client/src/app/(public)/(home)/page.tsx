import { EventsSection } from '@/components/sections/EventsSection';
import HeroSection from '@/components/sections/HeroSection';
import { NewsSection } from '@/components/sections/NewsSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
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
