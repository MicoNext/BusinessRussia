import HeroSection from '@/components/sections/HeroSection';
import { NewsSection } from '@/components/sections/NewsSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';

export default function HomePage() {
	return (
		<main className='text-gray-900 flex flex-col gap-8 md:gap-14 flex-1 relative overflow-hidden'>
			<HeroSection />
			<NewsSection />
			<ProjectsSection />
		</main>
	);
}
