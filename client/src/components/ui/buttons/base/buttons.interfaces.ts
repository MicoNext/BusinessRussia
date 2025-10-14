import type React from 'react';
import type { TButtonSize, TButtonVariant } from './buttons.tokens';

export interface IButtonStyleProps {
	className?: string;
	size?: TButtonSize;
	variant?: TButtonVariant;
	fullWidth?: boolean;
	textWrap?: boolean;
	leftSection?: React.ReactNode;
	rightSection?: React.ReactNode;
}

export interface IButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		IButtonStyleProps {
	children: React.ReactNode;
}

export interface IAnchorButtonProps
	extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
		IButtonStyleProps {
	children: React.ReactNode;
	href: string;
}

export interface ILinkButtonProps extends IButtonStyleProps {
	children: React.ReactNode;
	href: string;
}
