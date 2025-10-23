import Link from 'next/link';
import React from 'react';
import type { IEvent } from '@/../../package/types/models/events';
import clsx from 'clsx';
import { ArrowRight } from 'lucide-react';
import { LinkButton, UnstyledButton } from '@/components/ui/buttons';
import { Badge } from '@/components/ui/Badge';

interface EventCardProps {
	event: IEvent;
	classNames?: {
		container?: string;
	};
}

function formatDateRange(startDate: Date, endDate?: Date): string {
	const locale = 'ru-RU';
	const start = new Date(startDate);
	const end = endDate ? new Date(endDate) : undefined;
	const startFmt = start.toLocaleDateString(locale, {
		day: '2-digit',
		month: 'long',
	});
	if (!end) return startFmt;
	const sameMonth =
		start.getMonth() === end.getMonth() &&
		start.getFullYear() === end.getFullYear();
	const endFmt = end.toLocaleDateString(locale, {
		day: '2-digit',
		month: sameMonth ? undefined : 'long',
	});
	return `${startFmt} - ${endFmt}`;
}

export const EventCard: React.FC<EventCardProps> = ({ event, classNames }) => {
	const { url, title, startDate, endDate, location, time, slug } = event;
	const href = url || `/events/${slug}`;

	return (
		<article
			className={clsx(
				'group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md focus-within:shadow-md',
				classNames?.container
			)}
		>
			<Link
				href={href}
				className='absolute inset-0 z-10'
				aria-label={title}
			/>
			<div className='flex flex-col justify-between gap-3 p-4 h-full'>
				<div className='flex flex-col gap-2'>
					<div className='flex items-center gap-2'>
						<Badge
							size='sm'
							radius='sm'
						>
							{formatDateRange(startDate, endDate)}
						</Badge>
						{time ? (
							<span className='text-xs text-gray-500'>{time}</span>
						) : null}
					</div>
					<h3 className='text-base font-semibold text-gray-900 group-hover:text-brand-primary'>
						{title}
					</h3>
					{location ? (
						<p className='text-sm text-gray-600'>{location}</p>
					) : null}
				</div>

				<UnstyledButton
					classNames={{
						container:
							'mt-1 inline-flex items-center text-sm font-medium text-brand-primary',
						content: 'translate-x-0 transition group-hover:translate-x-0.5',
						rightSection:
							'ml-1 h-4 w-4 translate-x-0 opacity-80 transition group-hover:translate-x-1 group-hover:opacity-100',
					}}
					rightSection={
						<ArrowRight
							width={16}
							height={16}
						/>
					}
				>
					Подробнее
				</UnstyledButton>
			</div>
		</article>
	);
};
