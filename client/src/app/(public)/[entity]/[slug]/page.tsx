import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SectionBar } from '@/components/ui/SectionBar/SectionBar';
import { Headline } from '@/components/ui/Headline';
import { Badge } from '@/components/ui/Badge';
import { HtmlContent } from '@/components/ui/HtmlContent';
import { type EntitySlug } from '@/shared/constants/entities';
import { newsMock } from '@/shared/data/news.mock';
import { eventsMock } from '@/shared/data/events.mock';
import { projectsMock } from '@/shared/data/projects.mock';
import { Button } from '@/components/ui/buttons/Button';

type TParams = { entity: EntitySlug; slug: string };

function getEntityItem(entity: EntitySlug, slug: string) {
	if (entity === 'news') return newsMock.find(n => n.slug === slug);
	if (entity === 'events') return eventsMock.find(e => e.slug === slug);
	if (entity === 'projects') return projectsMock.find(p => p.slug === slug);
	return undefined;
}

export default async function EntityDetailsPage({
	params,
}: {
	params: Promise<TParams>;
}) {
	const { entity, slug } = await params;

	const item = getEntityItem(entity, slug);
	if (!item) return null;

	const title: string = item.title;
	const html: string | undefined = item.html;
	const tags: string[] = Array.isArray(item.tags)
		? (item.tags as string[])
		: ['#Инвестицииврегион', '#Комитетпофинансамиинвестициям'];

	return (
		<section className='flex-1'>
			<div className='container mx-auto space-y-6'>
				<SectionBar
					leftSection={
						<Headline
							title={title}
							description={
								<>
									{tags.map((tag, index) => (
										<Badge key={`${index}${tag}`}>#{tag}</Badge>
									))}
								</>
							}
							classNames={{
								container: 'space-y-3',
								description: 'flex flex-wrap gap-2',
							}}
						/>
					}
				/>

				{html ? <HtmlContent html={html} /> : null}

				<div>
					<Link href={`/${entity}`}>
						<Button
							variant='ghost'
							leftSection={<ArrowLeft size={16} />}
						>
							Назад к списку
						</Button>
					</Link>
				</div>
			</div>
		</section>
	);
}
