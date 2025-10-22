'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import clsx from 'clsx';

const LABELS: Record<string, string> = {
	'': 'Главная',
	news: 'Новости',
	events: 'Мероприятия',
	projects: 'Проекты',
	contacts: 'Контакты',
	organization: '«Деловая Россия»',
	services: 'Возможности',
	commissions: 'Комитеты',
	clubs: 'Клубы',
	boards: 'Советы и рабочие группы',
};

export interface BreadcrumbsProps {
	className?: string;
}

export function Breadcrumbs({ className }: BreadcrumbsProps) {
	const pathname = usePathname() || '/';

	const segments = useMemo(() => {
		const parts = pathname.split('/').filter(Boolean);
		const acc: { href: string; label: string }[] = [];
		let href = '';
		acc.push({ href: '/', label: LABELS[''] });
		for (const part of parts) {
			href += `/${part}`;
			const label = LABELS[part] || decodeURIComponent(part);
			acc.push({ href, label });
		}
		return acc;
	}, [pathname]);

	return (
		<nav
			aria-label='Хлебные крошки'
			className={clsx('text-sm', className)}
		>
			<ol className='flex items-center flex-wrap gap-1 text-gray-500'>
				{segments.map((seg, idx) => {
					const isLast = idx === segments.length - 1;
					return (
						<li
							key={seg.href}
							className='inline-flex items-center gap-1'
						>
							{idx > 0 && (
								<span
									aria-hidden
									className='mx-0.5 text-gray-400'
								>
									<ChevronRight className='h-4 w-4' />
								</span>
							)}
							{isLast ? (
								<span
									aria-current='page'
									className='text-gray-900'
								>
									{seg.label}
								</span>
							) : (
								<Link
									href={seg.href}
									className='hover:text-gray-700 hover:underline'
								>
									{seg.label}
								</Link>
							)}
						</li>
					);
				})}
			</ol>
		</nav>
	);
}
