import React from 'react';
import clsx from 'clsx';
import type { IBadgeProps } from './base';
import { badgeRadii, badgeSizes, badgeVariants } from './base';

function isBadgeRadius(value: unknown): value is keyof typeof badgeRadii {
	return (
		typeof value === 'string' &&
		Object.prototype.hasOwnProperty.call(badgeRadii, value)
	);
}

export function Badge({
	children,
	leftSection,
	rightSection,
	fullWidth,
	circle,
	variant = 'light',
	size = 'md',
	radius = 'xl',
	color,
	gradient,
	className,
	classNames,
	style,
	...rest
}: IBadgeProps) {
	const baseClasses = 'inline-flex items-center font-medium select-none';
	const sizeClasses = badgeSizes[size];
	const radiusClasses =
		typeof radius === 'string'
			? isBadgeRadius(radius)
				? badgeRadii[radius]
				: ''
			: typeof radius === 'number'
			? ''
			: badgeRadii.xl;
	const variantClasses = variant === 'gradient' ? '' : badgeVariants[variant];

	const containerClasses = clsx(
		baseClasses,
		sizeClasses,
		radiusClasses || badgeRadii.xl,
		variantClasses,
		fullWidth && 'w-full justify-center',
		circle && 'px-0 min-w-[2.5rem] justify-center',
		className,
		classNames?.container
	);

	const gradientStyle =
		variant === 'gradient' && gradient
			? {
					backgroundImage: `linear-gradient(${gradient.deg ?? 90}deg, ${
						gradient.from
					}, ${gradient.to})`,
					color: 'white',
			  }
			: undefined;

	const colorStyle = color ? { color } : undefined;

	return (
		<span
			className={containerClasses}
			style={{
				...gradientStyle,
				...colorStyle,
				borderRadius:
					typeof radius === 'number' || typeof radius === 'string'
						? String(radius)
						: undefined,
				...style,
			}}
			{...rest}
		>
			{leftSection ? (
				<span
					className={clsx(
						'mr-1.5 inline-flex items-center',
						classNames?.leftSection
					)}
				>
					{leftSection}
				</span>
			) : null}
			<span className={clsx('inline-flex items-center', classNames?.content)}>
				{children}
			</span>
			{rightSection ? (
				<span
					className={clsx(
						'ml-1.5 inline-flex items-center',
						classNames?.rightSection
					)}
				>
					{rightSection}
				</span>
			) : null}
		</span>
	);
}
