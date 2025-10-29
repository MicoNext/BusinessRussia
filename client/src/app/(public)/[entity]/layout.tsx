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
	return  children 
}
