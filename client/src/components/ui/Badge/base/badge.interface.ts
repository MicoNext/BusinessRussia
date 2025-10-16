import type React from 'react';
import type { BadgeRadius, BadgeSize, BadgeVariant } from './badge.tokens';

export interface IBadgeClassNames {
	container?: string;
	leftSection?: string;
	content?: string;
	rightSection?: string;
}

export interface IBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
	children: React.ReactNode;
	leftSection?: React.ReactNode;
	rightSection?: React.ReactNode;
	fullWidth?: boolean;
	circle?: boolean;
	variant?: BadgeVariant;
	size?: BadgeSize;
	radius?: BadgeRadius | number | string;
	color?: string;
	gradient?: { from: string; to: string; deg?: number };
	classNames?: IBadgeClassNames;
}
