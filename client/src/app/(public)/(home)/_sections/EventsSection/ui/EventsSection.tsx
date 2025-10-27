import type React from 'react';
import { EventsCalendar } from './EventsCalendar';
import { EventsJsonLd } from './EventsJsonLd';
import { Headline } from '@/components/ui/Headline/Headline';
import { SectionBar } from '@/components/ui/SectionBar/SectionBar';
import { ArrowRight } from 'lucide-react';
import { LinkButton } from '@/components/ui/buttons';
import { IEvent } from '../../../../../../../../package/types/models/events';

type PropsType = {
	events: IEvent[]
}

export const EventsSection: React.FC<PropsType> = ({ events }) => {
	return (
		<section
			aria-label='Календарь событий'
			className='px-4 md:px-8 lg:px-12'
		>
			<div className='container mx-auto flex flex-col gap-4 md:gap-8'>
				<EventsJsonLd events={ events } />
				<SectionBar
					leftSection={
						<Headline
							title='Календарь событий'
							order={2}
						/>
					}
					rightSection={
						<LinkButton
							className='group'
							variant='primary'
							href='/events'
							rightSection={
								<span className='inline-flex w-0 overflow-hidden ml-0 transition-all duration-200 group-hover:w-4 group-hover:ml-1'>
									<ArrowRight className='w-4 h-4 opacity-0 translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0' />
								</span>
							}
						>
							Все события
						</LinkButton>
					}
				/>
				<EventsCalendar events={events} />
			</div>
		</section>
	);
};
