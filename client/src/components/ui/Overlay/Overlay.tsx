'use client';

import clsx from 'clsx';

interface IOverlayProps {
	className?: string;
	onClick?: () => void;
}

export function Overlay({ className, onClick }: IOverlayProps) {
	return (
		<div
			aria-hidden='true'
			onClick={() => onClick?.()}
			className={clsx('fixed inset-0 bg-black/50 backdrop-blur-sm', className)}
		/>
	);
}
