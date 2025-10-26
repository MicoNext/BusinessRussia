import Link from 'next/link';
import { participantsMock } from '@/shared/data/participant.mock';
import { Grid } from '@/components/ui/Grid/Grid';
import { Card } from '@/components/ui/Card/Card';
import { Headline } from '@/components/ui/Headline';

const PAGE_SIZE = 9;

export default async function TeamPage({
	searchParams,
}: {
	searchParams: Promise<{ page?: string }>;
}) {
	const { page } = await searchParams;
	const currentPage = Math.max(1, Number(page ?? 1));

	const all = participantsMock.map(p => ({
		id: p._id,
		href: `/organization/team/${encodeURIComponent(
			p.name.toLowerCase().replace(/\s+/g, '-')
		)}/`,
		image: p.media.imagesUrl?.[0],
		subtitle: p.jobTitle,
		title: p.name,
	}));

	const total = all.length;
	const start = (currentPage - 1) * PAGE_SIZE;
	const items = all.slice(start, start + PAGE_SIZE);
	const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

	return (
		<main>
			<Headline
				title={'Лица регионального отделения'}
				order={1}
				classNames={{ container: 'mb-6' }}
			/>
			<div className='space-y-8'>
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
							/>
						</Grid.Col>
					))}
				</Grid>

				{totalPages > 1 && (
					<div className='flex items-center justify-center gap-2'>
						{Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
							<Link
								key={p}
								href={`/organization/team?page=${p}`}
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
		</main>
	);
}
