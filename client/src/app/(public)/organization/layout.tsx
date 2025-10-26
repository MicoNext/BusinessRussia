import type { ReactNode } from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Сontactus } from '@/components/Сontactus';

export default function OrganizationLayout({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<>
			<section className='flex-1 px-4 md:px-8 lg:px-12 py-6'>
				<div className='container mx-auto'>
					<Breadcrumbs className='mb-4' />
					{children}
				</div>
			</section>
			<Сontactus />
		</>
	);
}
