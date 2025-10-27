'use client';
import { SectionBar } from '@/components/ui/SectionBar/SectionBar';
import { Headline } from '@/components/ui/Headline';
import { IconButton } from '@/components/ui/buttons';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProjectSlider from './ProjectSlider';
import { useState } from 'react';
import type { EmblaCarouselType } from 'embla-carousel';
import { IProject } from '../../../../../../../../package/types/models/projects';

type PropsType = {
	projects: IProject[]
}

export default function ProjectsSection({ projects }: PropsType) {
	const [emblaApi, setEmblaApi] = useState<EmblaCarouselType | undefined>(
		undefined
	);
	return (
		<section
			className='px-4 md:px-8 lg:px-12'
			aria-label='Проекты'
		>
			<div className='container mx-auto flex flex-col gap-4 md:gap-8 '>
				<SectionBar
					leftSection={<Headline title='Проекты' />}
					rightSection={
						<div className='flex gap-2'>
							<IconButton
								component='button'
								onClick={() => emblaApi?.scrollPrev()}
								aria-label='Предыдущие проекты'
								icon={<ChevronLeft className='w-5 h-5' />}
								className='items-center justify-center bg-white border border-gray-200 rounded-full shadow hover:bg-brand-primary hover:text-white'
							/>
							<IconButton
								component='button'
								onClick={() => emblaApi?.scrollNext()}
								aria-label='Следующие проекты'
								icon={<ChevronRight className='w-5 h-5' />}
								className='items-center justify-center bg-white border border-gray-200 rounded-full shadow hover:bg-brand-primary hover:text-white'
							/>
						</div>
					}
				/>
				<ProjectSlider
					items={projects.slice(0, 9)}
					onApi={api => setEmblaApi(api)}
				/>
			</div>
		</section>
	);
}
