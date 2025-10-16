import Link from 'next/link';
import { ButtonContent, composeClasses } from './base';
import type { ILinkButtonProps } from './base';

export function LinkButton({
	children,
	href,
	className,
	size,
	variant,
	fullWidth,
	leftSection,
	rightSection,
}: ILinkButtonProps) {
	const classes = composeClasses({ className, size, variant, fullWidth });
	return (
		<Link
			href={href}
			className={classes}
		>
			<ButtonContent
				leftSection={leftSection}
				rightSection={rightSection}
			>
				{children}
			</ButtonContent>
		</Link>
	);
}
