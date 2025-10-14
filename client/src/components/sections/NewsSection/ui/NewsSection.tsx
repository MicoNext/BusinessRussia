import { ArrowRight } from 'lucide-react';
import { SectionBar } from '@/components/ui/SectionBar/SectionBar';
import { Headline } from '@/components/ui/Headline';
import { Button, LinkButton } from '@/components/ui/buttons';
import { MailCheck } from 'lucide-react';
import { NewsGrid } from './NewsGrid';

import { newsMock } from '@/shared/data/news.mock';

export default function NewsSection() {
	return (
		<section
			className='container mx-auto flex flex-col gap-4 md:gap-8 px-4'
			aria-label='Новости'
		>
			<SectionBar
				leftSection={<Headline title='Новости' />}
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
						Подписаться <span className='hidden md:inline'>на рассылку</span>
					</Button>
				}
			/>
			<NewsGrid items={newsMock} />
			<footer className='flex md:justify-end'>
				<LinkButton
					className='group text-gray-500 justify-center w-full md:w-auto text-center md:text-left gap-0'
					href='/news'
					rightSection={
						<span className='inline-flex w-0 overflow-hidden mr-0 transition-all duration-200 group-hover:w-4 group-hover:mr-1'>
							<ArrowRight className='w-4 h-4 opacity-0 translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0' />
						</span>
					}
				>
					Все новости
				</LinkButton>
			</footer>
		</section>
	);
}
