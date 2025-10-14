import type { INews } from '@/../../package/types/models/news';
import { SectionBar } from '@/components/ui/SectionBar/SectionBar';
import { Headline } from '@/components/ui/Headline';
import { Button } from '@/components/ui/buttons';
import { MailCheck } from 'lucide-react';
import { ProjectSlider } from './ProjectSlider';

import { projectsMock } from '@/shared/data/projects.mock';

export default function ProjectsSection() {
	return (
		<section
			className='container mx-auto flex flex-col gap-8 px-4'
			aria-label='Проекты'
		>
			<SectionBar
				leftSection={<Headline title='Проекты' />}
				rightSection={
					<Button
						variant='ghost'
						leftSection={
							<MailCheck
								width={18}
								height={18}
							/>
						}
						className='gap-1 hover:bg-brand-primary/10'
					>
						Подписаться на рассылку
					</Button>
				}
			/>
			<ProjectSlider items={projectsMock} />
		</section>
	);
}
