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

export interface IIconButtonProps
	extends React.ComponentProps<React.ElementType>,
		IButtonStyleProps {
	component: React.ElementType;
	icon: React.ReactNode;
	className?: string;
	size?: 'sm' | 'md' | 'lg';
	disabled?: boolean;
}

export interface IUnstyledButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	rightSection?: React.ReactNode;
	leftSection?: React.ReactNode;
	classNames?: {
		container?: string;
		leftSection?: string;
		content?: string;
		rightSection?: string;
	};
}
