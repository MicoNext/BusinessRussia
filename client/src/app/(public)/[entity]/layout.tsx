import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Headline } from '@/components/ui/Headline/Headline';
import { ENTITIES, type EntitySlug } from '@/shared/constants/entities';

export const dynamicParams = false;

export function generateStaticParams() {
	return Object.keys(ENTITIES).map(entity => ({ entity }));
}

export default function EntityLayout({
	children,
	params,
}: {
	children: ReactNode;
	params: { entity: EntitySlug };
}) {
	const meta = ENTITIES[params.entity as EntitySlug];
	if (!meta) notFound();

	return (
		<section className='flex-1 px-4 md:px-8 lg:px-12 py-6'>
			<div className='container mx-auto'>
				<Breadcrumbs className='mb-4' />
				<Headline
					title={meta.title}
					order={2}
					classNames={{ container: 'mb-6' }}
				/>
				{children}
			</div>
		</section>
	);
}
