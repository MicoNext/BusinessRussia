import { ButtonContent, composeClasses } from './base';
import type { IAnchorButtonProps } from './base';

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
}: IAnchorButtonProps) {
	const classes = composeClasses({ className, size, variant, fullWidth });
	return (
		<a
			href={href}
			{...rest}
			className={classes}
		>
			<ButtonContent
				leftSection={leftSection}
				rightSection={rightSection}
			>
				{children}
			</ButtonContent>
		</a>
	);
}
