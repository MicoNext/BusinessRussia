export interface ButtonContentProps {
	children: React.ReactNode;
	leftSection?: React.ReactNode;
	rightSection?: React.ReactNode;
}

export interface ButtonStyleProps {
	className?: string;
	size?: 'sm' | 'md' | 'lg';
	variant?: 'primary' | 'accent' | 'outline' | 'ghost';
	fullWidth?: boolean;
	textWrap?: boolean;
}

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		ButtonStyleProps,
		ButtonContentProps {
	children: React.ReactNode;
}

export interface AnchorButtonProps
	extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
		ButtonStyleProps,
		ButtonContentProps {
	children: React.ReactNode;
	href: string;
}

export interface LinkButtonProps extends ButtonStyleProps, ButtonContentProps {
	children: React.ReactNode;
	href: string;
}
