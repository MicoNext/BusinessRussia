'use client';

import clsx from 'clsx';
import type { ReactNode } from 'react';

export function Footer({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<div className={clsx('mt-auto px-4 py-3 border-t', className)}>
			{children}
		</div>
	);
}
