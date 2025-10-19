'use client';

import clsx from 'clsx';

interface IOverlayProps {
	className: string;
	open: boolean;
	onClick: () => void;
}

export function Overlay({ className, open, onClick }: IOverlayProps) {
	if (!open) return null;
	return (
		<div
			aria-hidden='true'
			onClick={() => onClick()}
			className={clsx('fixed inset-0 bg-black/50 backdrop-blur-sm', className)}
		/>
	);
}
