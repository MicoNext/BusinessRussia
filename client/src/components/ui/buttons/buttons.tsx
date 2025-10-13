import Link from 'next/link';
import clsx from 'clsx';
import {
	AnchorButtonProps,
	ButtonContentProps,
	ButtonProps,
	ButtonStyleProps,
	LinkButtonProps,
} from './buttons.interfaces';

const baseSizes: Record<'sm' | 'md' | 'lg', string> = {
	sm: 'h-9 px-3 text-sm',
	md: 'h-10 px-4 text-sm',
	lg: 'h-11 px-5 text-base',
};

const variants: Record<'primary' | 'accent' | 'outline' | 'ghost', string> = {
	primary:
		'bg-brand-primary text-white hover:brightness-95 focus-visible:ring-brand-primary',
	accent:
		'bg-brand-accent text-white hover:brightness-95 focus-visible:ring-brand-accent',
	outline:
		'border border-gray-300 text-gray-800 hover:bg-gray-50 focus-visible:ring-gray-300',
	ghost: 'text-gray-800 hover:bg-gray-50 focus-visible:ring-gray-300',
};

function composeClasses({
	size = 'md',
	variant = 'outline',
	fullWidth,
	textWrap,
	className,
}: ButtonStyleProps): string {
	return clsx(
		'inline-flex rounded-md font-medium focus:outline-none focus-visible:ring-2 transition',
		baseSizes[size],
		variants[variant],
		fullWidth && 'w-full',
		!textWrap && 'text-nowrap',
		className
	);
}

export function Button({
	children,
	className,
	size,
	variant,
	fullWidth,
	leftSection,
	rightSection,
	...rest
}: ButtonProps) {
	const classes = composeClasses({ className, size, variant, fullWidth });
	return (
		<button
			type={rest.type ?? 'button'}
			{...rest}
			className={classes}
		>
			<ButtomContent
				leftSection={leftSection}
				rightSection={rightSection}
			>
				{children}
			</ButtomContent>
		</button>
	);
}

export function AnchorButton({
	children,
	href,
	className,
	size,
	variant,
	fullWidth,
	leftSection,
	rightSection,
	...rest
}: AnchorButtonProps) {
	const classes = composeClasses({ className, size, variant, fullWidth });
	return (
		<a
			href={href}
			{...rest}
			className={classes}
		>
			<ButtomContent
				leftSection={leftSection}
				rightSection={rightSection}
			>
				{children}
			</ButtomContent>
		</a>
	);
}

export function LinkButton({
	children,
	href,
	className,
	size,
	variant,
	fullWidth,
	leftSection,
	rightSection,
}: LinkButtonProps) {
	const classes = composeClasses({ className, size, variant, fullWidth });
	return (
		<Link
			href={href}
			className={classes}
		>
			<ButtomContent
				leftSection={leftSection}
				rightSection={rightSection}
			>
				{children}
			</ButtomContent>
		</Link>
	);
}

function ButtomContent({
	children,
	leftSection,
	rightSection,
}: Readonly<ButtonContentProps>) {
	return (
		<>
			{leftSection && <ButtomSection>{leftSection}</ButtomSection>}
			<span className='inline-flex items-center'>{children}</span>
			{rightSection && <ButtomSection>{rightSection}</ButtomSection>}
		</>
	);
}

function ButtomSection({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <span className='inline-flex items-center'>{children}</span>;
}

export default Button;
