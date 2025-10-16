'use client';

import clsx from 'clsx';
import type { ReactNode } from 'react';

export function Header({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<div className={clsx('px-4 py-3 border-b', className)}>{children}</div>
	);
}
