import type React from 'react';
import type { IEvent } from '@/../../package/types/models/events';
import { EventCard } from '@/components/entityCards';
import { Grid } from '@/components/ui/Grid';

interface EventsCalendarProps {
	className?: string;
	events: IEvent[]
}

export const EventsCalendar: React.FC<EventsCalendarProps> = ({
	events,
	className,
}) => {
	return (
		<div className={className}>
			<Grid
				cols={1}
				gap={4}
				classNames={{
					root: 'sm:grid-cols-2 lg:grid-cols-3 md:gap-6',
				}}
			>
				{events.map((ev: IEvent) => (
					<Grid.Col key={ev._id}>
						<EventCard
							key={ev._id}
							event={ev}
							classNames={{
								container: 'h-full',
							}}
						/>
					</Grid.Col>
				))}
			</Grid>
		</div>
	);
};
