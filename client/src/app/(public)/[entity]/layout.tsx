import type { ReactNode } from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ENTITIES } from '@/shared/constants/entities';

export function generateStaticParams() {
	return Object.keys(ENTITIES).map(entity => ({ entity }));
}

export default async function EntityLayout({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<>
			<section className='flex-1 px-4 md:px-8 lg:px-12 py-6'>
				<div className='container mx-auto'>
					<Breadcrumbs className='mb-8' />
					{children}
				</div>
			</section>
		</>
	);
}
