import Link from 'next/link';
import { ENTITIES, type EntitySlug } from '@/shared/constants/entities';
import { newsMock } from '@/shared/data/news.mock';
import { eventsMock } from '@/shared/data/events.mock';
import { projectsMock } from '@/shared/data/projects.mock';
import { Grid } from '@/components/ui/Grid';
import { Card } from '@/components/ui/Card';
import { notFound } from 'next/navigation';
import { TParams, TSearchParams } from './types';
import { Headline } from '@/components/ui/Headline';

const PAGE_SIZE = 9;

function formatEventDateRange(startDate: Date, endDate?: Date): string {
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

function getData(entity: EntitySlug) {
	if (entity === 'news')
		return newsMock.map(n => ({
			id: n._id,
			title: n.title,
			subtitle: n.category,
			time: n.createdAt,
			image: n.media?.imagesUrl?.[0],
			href: `/news/${n.slug}`,
		}));
	if (entity === 'events')
		return eventsMock.map(e => ({
			id: e._id,
			title: e.title,
			subtitle: formatEventDateRange(e.startDate, e.endDate),
			time: undefined as string | Date | undefined,
			image: undefined as string | undefined,
			href: e.url || `/events/${e.slug}`,
		}));
	if (entity === 'projects')
		return projectsMock.map(p => ({
			id: p._id,
			title: p.title,
			subtitle: p.category,
			time: p.createdAt,
			image: p.media?.imagesUrl?.[0],
			href: p.url?.startsWith('http') ? p.url : `/projects/${p.slug}`,
		}));
	return [];
}

export default async function EntityListPage({
	params,
	searchParams,
}: {
	params: Promise<TParams>;
	searchParams: Promise<TSearchParams>;
}) {
	const { entity } = await params;
	const { page } = await searchParams;
	if (!ENTITIES[entity]) notFound();

	const currentPage = Math.max(1, Number(page ?? 1));
	const all = getData(entity);
	const total = all.length;
	const start = (currentPage - 1) * PAGE_SIZE;
	const items = all.slice(start, start + PAGE_SIZE);
	const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

	return (
		<div className='space-y-8'>
			<Headline
				title={ENTITIES[entity].title}
				order={2}
				classNames={{ container: 'mb-6' }}
			/>

			<Grid
				cols={1}
				gap={8}
				classNames={{ root: 'md:grid-cols-2 lg:grid-cols-3' }}
			>
				{items.map(item => (
					<Grid.Col key={item.id}>
						<Card
							link={item.href}
							image={item.image}
							subtitle={item.subtitle}
							title={item.title}
							time={item.time}
						/>
					</Grid.Col>
				))}
			</Grid>

			{totalPages > 1 && (
				<div className='flex items-center justify-center gap-2'>
					{Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
						<Link
							key={p}
							href={`/${entity}?page=${p}`}
							className={
								'px-3 py-1.5 rounded border text-sm ' +
								(p === currentPage
									? 'border-gray-900 text-gray-900'
									: 'border-gray-200 text-gray-600 hover:border-gray-300')
							}
						>
							{p}
						</Link>
					))}
				</div>
			)}
		</div>
	);
}
