import type React from 'react';
import type { IEvent } from '@/../../package/types/models/events';

function toIso(date: Date | undefined): string | undefined {
	if (!date) return undefined;
	return new Date(date).toISOString();
}

interface EventsJsonLdProps {
	events: IEvent[];
}

export const EventsJsonLd: React.FC<EventsJsonLdProps> = ({ events }) => {
	const items = events.map(e => ({
		'@context': 'https://schema.org',
		'@type': 'Event',
		name: e.title,
		description: e.html,
		url: `/events/${e._id}`,
		startDate: toIso(e.startDate),
		endDate: toIso(e.endDate),
		location: e.location
			? {
					'@type': 'Place',
					name: e.location,
			  }
			: undefined,
	}));

	return (
		<script
			type='application/ld+json'
			suppressHydrationWarning
			dangerouslySetInnerHTML={{ __html: JSON.stringify(items) }}
		/>
	);
};
