import React from 'react';
import clsx from 'clsx';

interface IconButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	icon: React.ReactNode;
	className?: string;
	size?: 'sm' | 'md' | 'lg';
	disabled?: boolean;
}

const baseSizes: Record<'sm' | 'md' | 'lg', string> = {
	sm: 'w-8 h-8',
	md: 'w-10 h-10',
	lg: 'w-12 h-12',
};

export function IconButton({
	icon,
	className,
	size = 'md',
	disabled,
	...rest
}: IconButtonProps) {
	return (
		<button
			type='button'
			className={clsx(
				'inline-flex items-center justify-center rounded-full transition active:translate-y-[1px]',
				baseSizes[size],
				'bg-white border border-gray-200 shadow hover:bg-brand-primary hover:text-white disabled:opacity-40 disabled:cursor-not-allowed',
				className
			)}
			disabled={disabled}
			{...rest}
		>
			{icon}
		</button>
	);
}
